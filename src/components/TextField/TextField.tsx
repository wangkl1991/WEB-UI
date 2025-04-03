import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import clsx from 'clsx';

export type TextFieldVariant = 'outlined' | 'filled' | 'standard';
export type TextFieldSize = 'small' | 'medium' | 'large';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const getSizeStyles = (size: TextFieldSize) => {
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

const getVariantStyles = (variant: TextFieldVariant, error: boolean) => {
  const errorColor = ({ theme }) => theme.colors.error;
  const normalColor = ({ theme }) => theme.colors.text.primary;
  const borderColor = error ? errorColor : normalColor;

  switch (variant) {
    case 'outlined':
      return css`
        border: 1px solid ${borderColor};
        background-color: transparent;
        &:focus {
          border-color: ${({ theme }) => theme.colors.primary};
          box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '33'};
        }
        &:hover:not(:disabled):not(:focus) {
          border-color: ${({ theme }) => theme.colors.text.primary};
        }
      `;
    case 'filled':
      return css`
        border: 1px solid transparent;
        border-bottom: 1px solid ${borderColor};
        background-color: ${({ theme }) => theme.colors.action.hover};
        border-top-left-radius: ${({ theme }) => theme.borderRadius.sm};
        border-top-right-radius: ${({ theme }) => theme.borderRadius.sm};
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        &:focus {
          border-bottom-color: ${({ theme }) => theme.colors.primary};
          box-shadow: 0 1px 0 0 ${({ theme }) => theme.colors.primary};
          background-color: ${({ theme }) => theme.colors.action.selected};
        }
        &:hover:not(:disabled):not(:focus) {
          background-color: ${({ theme }) => theme.colors.action.selected};
        }
      `;
    case 'standard':
      return css`
        border: none;
        border-bottom: 1px solid ${borderColor};
        background-color: transparent;
        border-radius: 0;
        &:focus {
          border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
          margin-bottom: -1px;
        }
        &:hover:not(:disabled):not(:focus) {
          border-bottom: 2px solid ${({ theme }) => theme.colors.text.primary};
          margin-bottom: -1px;
        }
      `;
    default:
      return css``;
  }
};

const Container = styled.div<{
  $fullWidth: boolean;
  $disabled: boolean;
}>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: ${(props) => (props.$fullWidth ? '100%' : '240px')};
  opacity: ${(props) => (props.$disabled ? 0.7 : 1)};
`;

const InputLabel = styled.label<{
  $error: boolean;
  $required: boolean;
}>`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${(props) =>
    props.$error ? props.theme.colors.error : props.theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  
  &::after {
    content: ${(props) => (props.$required ? '"*"' : '""')};
    color: ${({ theme }) => theme.colors.error};
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`;

const InputBase = styled.input<{
  $variant: TextFieldVariant;
  $size: TextFieldSize;
  $error: boolean;
  $startAdornment: boolean;
  $endAdornment: boolean;
}>`
  box-sizing: border-box;
  outline: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.text.primary};
  width: 100%;
  margin: 0;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  ${(props) => getVariantStyles(props.$variant, props.$error)}
  ${(props) => getSizeStyles(props.$size)}
  
  padding-left: ${(props) => props.$startAdornment ? '2.5em' : null};
  padding-right: ${(props) => props.$endAdornment ? '2.5em' : null};
  
  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.action.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};
    border-color: transparent;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.7;
  }
`;

const HelperText = styled.div<{
  $error: boolean;
}>`
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${(props) =>
    props.$error ? props.theme.colors.error : props.theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;

const Adornment = styled.div<{
  $position: 'start' | 'end';
}>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  ${props => props.$position === 'start' ? 'left: 0.75em;' : 'right: 0.75em;'}
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      variant = 'outlined',
      size = 'medium',
      fullWidth = false,
      error = false,
      helperText,
      startAdornment,
      endAdornment,
      required = false,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) => {
    const inputClasses = clsx('astra-input', className);

    return (
      <Container
        className="astra-textfield"
        $fullWidth={fullWidth}
        $disabled={disabled}
      >
        {label && (
          <InputLabel
            htmlFor={rest.id}
            $error={error}
            $required={required}
          >
            {label}
          </InputLabel>
        )}
        
        <div style={{ position: 'relative' }}>
          {startAdornment && (
            <Adornment $position="start">{startAdornment}</Adornment>
          )}
          
          <InputBase
            ref={ref}
            className={inputClasses}
            $variant={variant}
            $size={size}
            $error={error}
            $startAdornment={!!startAdornment}
            $endAdornment={!!endAdornment}
            disabled={disabled}
            required={required}
            aria-invalid={error}
            {...rest}
          />
          
          {endAdornment && (
            <Adornment $position="end">{endAdornment}</Adornment>
          )}
        </div>
        
        {helperText && (
          <HelperText $error={error}>{helperText}</HelperText>
        )}
      </Container>
    );
  }
); 