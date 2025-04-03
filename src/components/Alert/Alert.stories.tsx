import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: ['error', 'warning', 'info', 'success'],
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'outlined', 'filled'],
    },
    title: {
      control: 'text',
    },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: 'This is an informational alert — check it out!',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Alert Title',
    children: 'This is an informational alert with a title.',
  },
};

export const Success: Story = {
  args: {
    severity: 'success',
    children: 'This is a success alert — check it out!',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    children: 'This is a warning alert — check it out!',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    children: 'This is an error alert — check it out!',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'This is an outlined alert — check it out!',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: 'This is a filled alert — check it out!',
  },
};

export const WithCloseButton: Story = {
  args: {
    onClose: () => alert('Close clicked'),
    children: 'This is an alert with a close button.',
  },
}; 