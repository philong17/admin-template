import { LoadingOverlay } from '@mantine/core';

const LoadingPage = () => {
  return <LoadingOverlay visible zIndex={1000} overlayProps={{ blur: 2 }} />;
};

export default LoadingPage;
