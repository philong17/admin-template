import { Modal } from '@mantine/core';
import { ZoomableImage } from './ZoomableImage';

interface ImagePreviewModalProps {
  opened: boolean;
  onClose: () => void;
  src: string | null | undefined;
  alt?: string;
}

export const ImagePreviewModal = ({ opened, onClose, src, alt }: ImagePreviewModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size='auto'
      withCloseButton={false}
      styles={{
        body: {
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        },
        content: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        header: {
          display: 'none',
        },
      }}>
      {src && <ZoomableImage src={src} alt={alt || 'Preview'} />}
    </Modal>
  );
};
