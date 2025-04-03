import React from 'react';
import styled, { css } from 'styled-components';
import clsx from 'clsx';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const getButtonStyles = (variant: ButtonVariant, color: ButtonColor) => {
  switch (variant) {
    case 'contained':
      return css`
        background-color: ${({ theme }) => theme.colors[color]};
        color: white;
        border: none;
        &:hover {
          background-color: ${({ theme }) => theme.colors[color] + 'dd'};
        }
      `;
    case 'outlined':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors[color]};
        border: 1px solid ${({ theme }) => theme.colors[color]};
        &:hover {
          background-color: ${({ theme }) => theme.colors[color] + '14'};
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors[color]};
        border: none;
        &:hover {
          background-color: ${({ theme }) => theme.colors[color] + '14'};
        }
      `;
    default:
      return css``;
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
        font-size: ${({ theme }) => theme.typography.fontSize.sm};
      `;
    case 'medium':
      return css`
        padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
        font-size: ${({ theme }) => theme.typography.fontSize.md};
      `;
    case 'large':
      return css`
        padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
        font-size: ${({ theme }) => theme.typography.fontSize.lg};
      `;
    default:
      return css``;
  }
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $color: ButtonColor;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  ${(props) => getButtonStyles(props.$variant, props.$color)}
  ${(props) => getSizeStyles(props.$size)}

  &:disabled {
    color: ${({ theme }) => theme.colors.text.disabled};
    background-color: ${({ theme }) => theme.colors.action.disabled};
    cursor: not-allowed;
    box-shadow: none;
    border: none;
  }

  .button-icon {
    display: inherit;
    margin-right: ${(props) =>
      props.children ? ({ theme }) => theme.spacing.xs : 0};
    margin-left: ${(props) =>
      props.children ? 0 : ({ theme }) => theme.spacing.xs};
    font-size: 1.125em;

    &.start-icon {
      margin-left: 0;
      margin-right: ${({ theme }) => theme.spacing.xs};
    }

    &.end-icon {
      margin-left: ${({ theme }) => theme.spacing.xs};
      margin-right: 0;
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  disabled = false,
  className,
  children,
  ...rest
}) => {
  const buttonClasses = clsx('astra-button', className);

  return (
    <StyledButton
      className={buttonClasses}
      $variant={variant}
      $color={color}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled}
      {...rest}
    >
      {startIcon && <span className="button-icon start-icon">{startIcon}</span>}
      {children}
      {endIcon && <span className="button-icon end-icon">{endIcon}</span>}
    </StyledButton>
  );
}; 