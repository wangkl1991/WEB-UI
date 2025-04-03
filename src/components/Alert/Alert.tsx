import React from 'react';
import styled, { css } from 'styled-components';
import clsx from 'clsx';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';
export type AlertVariant = 'standard' | 'outlined' | 'filled';

export interface AlertProps {
  severity?: AlertSeverity;
  variant?: AlertVariant;
  title?: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const getSeverityColor = (severity: AlertSeverity, theme: any) => {
  switch (severity) {
    case 'error':
      return theme.colors.error;
    case 'warning':
      return theme.colors.warning;
    case 'info':
      return theme.colors.info;
    case 'success':
      return theme.colors.success;
    default:
      return theme.colors.info;
  }
};

const getVariantStyles = (variant: AlertVariant, severity: AlertSeverity) => {
  switch (variant) {
    case 'standard':
      return css`
        background-color: ${({ theme }) => `${getSeverityColor(severity, theme)}14`};
        color: ${({ theme }) => getSeverityColor(severity, theme)};
      `;
    case 'outlined':
      return css`
        background-color: transparent;
        border: 1px solid ${({ theme }) => getSeverityColor(severity, theme)};
        color: ${({ theme }) => getSeverityColor(severity, theme)};
      `;
    case 'filled':
      return css`
        background-color: ${({ theme }) => getSeverityColor(severity, theme)};
        color: white;
      `;
    default:
      return css``;
  }
};

const AlertContainer = styled.div<{
  $severity: AlertSeverity;
  $variant: AlertVariant;
}>`
  display: flex;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  ${(props) => getVariantStyles(props.$variant, props.$severity)}
`;

const AlertIcon = styled.div`
  margin-right: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: flex-start;
  font-size: 1.25rem;
`;

const AlertContent = styled.div`
  flex: 1;
  padding: 0;
`;

const AlertTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const AlertMessage = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  margin-left: ${({ theme }) => theme.spacing.sm};
  color: inherit;
  font-size: 1.25rem;
  line-height: 1;
  align-self: flex-start;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const getIconBySeverity = (severity: AlertSeverity) => {
  switch (severity) {
    case 'error':
      return '✕';
    case 'warning':
      return '⚠';
    case 'info':
      return 'ℹ';
    case 'success':
      return '✓';
    default:
      return 'ℹ';
  }
};

export const Alert: React.FC<AlertProps> = ({
  severity = 'info',
  variant = 'standard',
  title,
  children,
  onClose,
  className,
  ...rest
}) => {
  const alertClasses = clsx('astra-alert', className);
  const icon = getIconBySeverity(severity);
  
  return (
    <AlertContainer
      className={alertClasses}
      $severity={severity}
      $variant={variant}
      {...rest}
    >
      <AlertIcon className="astra-alert-icon">{icon}</AlertIcon>
      <AlertContent className="astra-alert-content">
        {title && <AlertTitle className="astra-alert-title">{title}</AlertTitle>}
        <AlertMessage className="astra-alert-message">{children}</AlertMessage>
      </AlertContent>
      {onClose && (
        <CloseButton onClick={onClose} aria-label="Close alert" className="astra-alert-close">
          ×
        </CloseButton>
      )}
    </AlertContainer>
  );
}; 