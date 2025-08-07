import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: #4A90E2;
    --color-primary-light: #7ab3ef;
    --color-danger: #D0021B;
    --color-danger-light: #e86071;
    --color-text: #2d3748;
    --color-text-light: #718096;
    --color-bg: #f7fafc;
    --color-card-bg: #ffffff;
    --color-border: #e2e8f0;
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
  }
`;