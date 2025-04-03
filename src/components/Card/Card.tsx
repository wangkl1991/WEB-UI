import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'outlined' | 'elevated';
  className?: string;
}

const StyledCard = styled.div<{ $variant: 'outlined' | 'elevated' }>`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background.paper};
  overflow: hidden;
  
  ${({ $variant, theme }) =>
    $variant === 'outlined'
      ? `
        border: 1px solid ${theme.colors.divider};
      `
      : `
        box-shadow: ${theme.shadows.sm};
      `}
`;

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  className,
  ...rest
}) => {
  const cardClasses = clsx('astra-card', className);
  
  return (
    <StyledCard className={cardClasses} $variant={variant} {...rest}>
      {children}
    </StyledCard>
  );
};

export interface CardHeaderProps {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  
  .astra-card-header-content {
    flex: 1;
  }
  
  .astra-card-header-avatar {
    display: flex;
    margin-right: ${({ theme }) => theme.spacing.md};
  }
  
  .astra-card-header-action {
    margin-left: auto;
  }
  
  .astra-card-header-title {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }
  
  .astra-card-header-subheader {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
  }
`;

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subheader,
  avatar,
  action,
  className,
  ...rest
}) => {
  const headerClasses = clsx('astra-card-header', className);
  
  return (
    <StyledCardHeader className={headerClasses} {...rest}>
      {avatar && <div className="astra-card-header-avatar">{avatar}</div>}
      <div className="astra-card-header-content">
        {title && <h3 className="astra-card-header-title">{title}</h3>}
        {subheader && <div className="astra-card-header-subheader">{subheader}</div>}
      </div>
      {action && <div className="astra-card-header-action">{action}</div>}
    </StyledCardHeader>
  );
};

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const StyledCardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:last-child {
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  ...rest
}) => {
  const contentClasses = clsx('astra-card-content', className);
  
  return (
    <StyledCardContent className={contentClasses} {...rest}>
      {children}
    </StyledCardContent>
  );
};

export interface CardActionsProps {
  children: React.ReactNode;
  disableSpacing?: boolean;
  className?: string;
}

const StyledCardActions = styled.div<{ $disableSpacing: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  
  & > :not(:first-child) {
    margin-left: ${({ $disableSpacing, theme }) => ($disableSpacing ? 0 : theme.spacing.sm)};
  }
`;

export const CardActions: React.FC<CardActionsProps> = ({
  children,
  disableSpacing = false,
  className,
  ...rest
}) => {
  const actionsClasses = clsx('astra-card-actions', className);
  
  return (
    <StyledCardActions className={actionsClasses} $disableSpacing={disableSpacing} {...rest}>
      {children}
    </StyledCardActions>
  );
};

export interface CardMediaProps {
  image: string;
  alt?: string;
  height?: string | number;
  className?: string;
}

const StyledCardMedia = styled.div<{ $height: string }>`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: ${({ $height }) => $height};
`;

export const CardMedia: React.FC<CardMediaProps> = ({
  image,
  alt = '',
  height = '200px',
  className,
  ...rest
}) => {
  const mediaClasses = clsx('astra-card-media', className);
  
  return (
    <StyledCardMedia
      className={mediaClasses}
      style={{ backgroundImage: `url(${image})` }}
      $height={typeof height === 'number' ? `${height}px` : height}
      role="img"
      aria-label={alt}
      {...rest}
    />
  );
}; 