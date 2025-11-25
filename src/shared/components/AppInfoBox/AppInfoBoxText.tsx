import { cn } from '@/utils/helpers/cn.helper';

interface AppInfoBoxProps {
  label: string;
  value: string;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export const AppInfoBoxText = ({ label, value, className, labelClassName, valueClassName }: AppInfoBoxProps) => {
  return (
    <div className={cn('flex flex-col gap-1 border-b border-gray-200 pb-2.5', className)}>
      <p className={cn('text-sm text-gray-500', labelClassName)}>{label}</p>
      <p className={cn('text-dark-500', valueClassName)}>{value}</p>
    </div>
  );
};
