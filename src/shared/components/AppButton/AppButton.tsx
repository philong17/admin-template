import type { ButtonProps } from '@mantine/core';
import { Button } from '@mantine/core';

interface ButtonStylesNames extends ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const AppButton = ({ variant = 'filled', type = 'button', label, ...rest }: ButtonStylesNames) => {
  return (
    <Button
      variant={variant}
      h={50}
      radius={10}
      color='var(--color-primary-6)'
      type={type}
      classNames={{
        label: '!text-base !font-normal ',
      }}
      {...rest}>
      {label}
    </Button>
  );
};

export default AppButton;
