import { DATE_FORMATS } from '@/utils/constants/dateFormat.constant';
import { cn } from '@/utils/helpers/cn.helper';
import { formatDate } from '@/utils/helpers/common.helper';
import { Textarea } from '@mantine/core';

interface AppInfoBoxNoteProps {
  isEditMode: boolean;
  value: string;
  onChange: (value: string) => void;
  note: string | null;
  updatedAt: string;
  updatedBy: string;
  className?: string;
}

export const AppInfoBoxNote = ({ isEditMode, note, updatedAt, updatedBy, value, onChange, className }: AppInfoBoxNoteProps) => {
  return (
    <div className={cn('col-span-2', className)}>
      <p className='text-yellow-6 mb-1 text-sm font-medium'>Ghi chú</p>
      {isEditMode ? (
        <Textarea radius={10} rows={2} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <p className='text-dark-500 rounded-[10px] border border-gray-200 px-6 py-5'>{note || 'Không có ghi chú!'}</p>
      )}

      <span className='text-grey-8 text-xs italic'>
        Cập nhật lần cuối: {formatDate(updatedAt, DATE_FORMATS.DATE_TIME)} bởi {updatedBy}
      </span>
    </div>
  );
};
