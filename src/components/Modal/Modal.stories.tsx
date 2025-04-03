import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalTitle, ModalContent, ModalActions } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    fullScreen: {
      control: { type: 'boolean' },
    },
    disableBackdropClick: {
      control: { type: 'boolean' },
    },
    disableEscapeKeyDown: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// We need to use a wrapper with local state for interactive stories
const ModalDemo = (args) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal {...args} open={open} onClose={handleClose}>
        <ModalTitle>Modal Title</ModalTitle>
        <ModalContent>
          <p>This is the content of the modal dialog.</p>
          <p>You can add any components or text here.</p>
        </ModalContent>
        <ModalActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>OK</Button>
        </ModalActions>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
};

export const Small: Story = {
  render: (args) => <ModalDemo {...args} maxWidth="sm" />,
};

export const Large: Story = {
  render: (args) => <ModalDemo {...args} maxWidth="lg" />,
};

export const FullScreen: Story = {
  render: (args) => <ModalDemo {...args} fullScreen />,
};

export const NoCloseButton: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    // Note: no handleClose function
    
    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal {...args} open={open}>
          <ModalTitle>Modal with No Close Button</ModalTitle>
          <ModalContent>
            <p>This modal doesn't have a close button.</p>
            <p>You can only close it using the actions below.</p>
          </ModalContent>
          <ModalActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </ModalActions>
        </Modal>
      </>
    );
  },
}; 