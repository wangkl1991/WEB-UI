# AstraUI

AstraUI is a modern React component library designed to provide a comprehensive set of UI components for building beautiful and responsive web applications.

## Features

- 🎨 **Customizable Theming**: Complete theming system that allows you to customize colors, typography, spacing, and more.
- 📱 **Responsive Design**: Components designed to work seamlessly across all device sizes.
- ♿ **Accessibility**: Built with accessibility in mind, following WAI-ARIA standards.
- 🔄 **TypeScript Support**: Full TypeScript support with comprehensive type definitions.
- 📚 **Storybook Documentation**: Detailed component documentation and examples using Storybook.

## Installation

```bash
# npm
npm install astra-ui styled-components

# yarn
yarn add astra-ui styled-components

# pnpm
pnpm add astra-ui styled-components
```

## Quick Start

```jsx
import React from 'react';
import { ThemeProvider, Button, Card, CardContent, TextField } from 'astra-ui';

function App() {
  return (
    <ThemeProvider>
      <Card>
        <CardContent>
          <h1>Welcome to AstraUI</h1>
          <TextField label="Email" placeholder="Enter your email" fullWidth />
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default App;
```

## Available Components

AstraUI comes with several essential components:

- **ThemeProvider**: Provides theming context to your application
- **Button**: Customizable button component with various styles and sizes
- **TextField**: Input component with labels, validation, and adornments
- **Card**: Container component with various sub-components (CardHeader, CardContent, CardActions, CardMedia)
- **Modal**: Dialog component with various sub-components (ModalTitle, ModalContent, ModalActions)
- **Alert**: Notification component for displaying feedback messages with different severity levels
- More components coming soon!

## Theming

AstraUI is built with a powerful theming system that allows you to customize the look and feel of all components.

```jsx
import { ThemeProvider, defaultTheme } from 'astra-ui';

// Create your custom theme by extending the default theme
const customTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#1e88e5',
    secondary: '#ff5722',
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your application */}
    </ThemeProvider>
  );
}
```

## Component Examples

### Modal Component

```jsx
import React, { useState } from 'react';
import { 
  Button, 
  Modal, 
  ModalTitle, 
  ModalContent, 
  ModalActions 
} from 'astra-ui';

function ModalExample() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalTitle>Modal Title</ModalTitle>
        <ModalContent>
          <p>This is the content of the modal dialog.</p>
        </ModalContent>
        <ModalActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
}
```

### Alert Component

```jsx
import React from 'react';
import { Alert } from 'astra-ui';

function AlertExample() {
  return (
    <div>
      <Alert severity="info" title="Information">
        This is an informational alert.
      </Alert>
      
      <Alert severity="success">
        Operation completed successfully!
      </Alert>
      
      <Alert severity="warning" variant="outlined">
        Warning: This action cannot be undone.
      </Alert>
      
      <Alert 
        severity="error" 
        variant="filled" 
        onClose={() => console.log('Alert closed')}
      >
        An error occurred during the process.
      </Alert>
    </div>
  );
}
```

## Development

To run the component library locally:

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build the library
npm run build
```

## License

MIT
