import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { defaultTheme, Theme } from '../../styles/theme';

export interface ThemeProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = defaultTheme,
  children,
}) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}; 