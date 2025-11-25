import dayjs from '@/config/dayjs';
import { ClockIcon } from '@/shared/icons';
import { ActionIcon } from '@mantine/core';
import { TimePicker, TimePickerProps } from '@mantine/dates';
import { useState } from 'react';

export const AppTimeInput = ({ onChange, ...rest }: TimePickerProps) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const pickerControl = (
    <ActionIcon variant='subtle' color='var(--color-grey-8)' onClick={() => setDropdownOpened(true)}>
      <ClockIcon className='size-5' />
    </ActionIcon>
  );

  return (
    <TimePicker
      {...rest}
      onChange={(val) => {
        const parsed = dayjs(val, ['HH:mm:ss', 'HH:mm'], true); // true = strict mode
        if (!parsed.isValid()) {
          console.warn('Invalid time format:', val);
          return;
        }
        onChange?.(parsed.format('HH:mm'));
      }}
      minutesStep={15}
      withDropdown
      rightSection={pickerControl}
      popoverProps={{
        opened: dropdownOpened,
        onChange: (_opened) => !_opened && setDropdownOpened(false),
      }}
    />
  );
};
