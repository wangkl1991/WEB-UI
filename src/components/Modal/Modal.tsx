import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import clsx from 'clsx';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  fullScreen?: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  className?: string;
}

const getMaxWidth = (maxWidth: ModalProps['maxWidth']) => {
  switch (maxWidth) {
    case 'xs':
      return '444px';
    case 'sm':
      return '600px';
    case 'md':
      return '900px';
    case 'lg':
      return '1200px';
    case 'xl':
      return '1536px';
    case 'full':
      return '100%';
    default:
      return '600px';
  }
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1300;
`;

const ModalContainer = styled.div<{
  $maxWidth: ModalProps['maxWidth'];
  $fullScreen: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme, $fullScreen }) => ($fullScreen ? '0' : theme.borderRadius.md)};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-width: ${({ $maxWidth }) => getMaxWidth($maxWidth)};
  width: ${({ $fullScreen }) => ($fullScreen ? '100%' : 'calc(100% - 32px)')};
  height: ${({ $fullScreen }) => ($fullScreen ? '100%' : 'auto')};
  max-height: ${({ $fullScreen }) => ($fullScreen ? '100%' : 'calc(100% - 64px)')};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:focus {
    outline: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.5rem;
  font-weight: bold;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.action.hover};
  }
`;

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  maxWidth = 'sm',
  fullScreen = false,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalClasses = clsx('astra-modal', className);
  
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (!disableEscapeKeyDown && event.key === 'Escape' && onClose) {
        onClose();
      }
    };
    
    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, disableEscapeKeyDown]);
  
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !disableBackdropClick &&
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      onClose
    ) {
      onClose();
    }
  };
  
  if (!open) {
    return null;
  }
  
  // Create a portal to render the modal at the end of the document body
  return createPortal(
    <Backdrop className="astra-modal-backdrop" onClick={handleBackdropClick}>
      <ModalContainer
        ref={modalRef}
        $maxWidth={maxWidth}
        $fullScreen={fullScreen}
        className={modalClasses}
        tabIndex={-1}
      >
        {onClose && (
          <CloseButton
            onClick={onClose}
            aria-label="Close modal"
            className="astra-modal-close"
          >
            ×
          </CloseButton>
        )}
        {children}
      </ModalContainer>
    </Backdrop>,
    document.body
  );
};

export interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

const StyledModalTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.xl}; /* Space for the close button */
`;

export const ModalTitle: React.FC<ModalTitleProps> = ({ children, className, ...rest }) => {
  const titleClasses = clsx('astra-modal-title', className);
  
  return (
    <StyledModalTitle className={titleClasses} {...rest}>
      {children}
    </StyledModalTitle>
  );
};

export interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

const StyledModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const ModalContent: React.FC<ModalContentProps> = ({ children, className, ...rest }) => {
  const contentClasses = clsx('astra-modal-content', className);
  
  return (
    <StyledModalContent className={contentClasses} {...rest}>
      {children}
    </StyledModalContent>
  );
};

export interface ModalActionsProps {
  children: React.ReactNode;
  className?: string;
  disableSpacing?: boolean;
}

const StyledModalActions = styled.div<{ $disableSpacing: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.spacing.md};
  
  & > :not(:first-child) {
    margin-left: ${({ $disableSpacing, theme }) => ($disableSpacing ? 0 : theme.spacing.sm)};
  }
`;

export const ModalActions: React.FC<ModalActionsProps> = ({
  children,
  className,
  disableSpacing = false,
  ...rest
}) => {
  const actionsClasses = clsx('astra-modal-actions', className);
  
  return (
    <StyledModalActions className={actionsClasses} $disableSpacing={disableSpacing} {...rest}>
      {children}
    </StyledModalActions>
  );
}; 