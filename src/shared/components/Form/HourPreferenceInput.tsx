import { DateInWeekEnums } from '@/utils/enums/common.enum';
import { cn } from '@/utils/helpers/cn.helper';
import { dateInWeekMapper } from '@/utils/helpers/common.helper';
import { HoursPreferenceType } from '@/utils/types/common.type';
import { NumberInput, Select, SimpleGrid } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useEffect, useMemo, useState } from 'react';
import { AppTimeInput } from './AppTimeInput';

interface HourPreferenceInputField {
  hours_preference?: HoursPreferenceType[] | undefined;
  class_per_week?: number | undefined;
}

interface HourPreferenceInputProps<T extends HourPreferenceInputField> {
  form: UseFormReturnType<T>;
  className?: string;
  readOnly?: boolean;
  label?: string;
}

export const HourPreferenceInput = <T extends HourPreferenceInputField>({
  form,
  className,
  readOnly,
  label = 'Thời gian học',
}: HourPreferenceInputProps<T>) => {
  const classNames = {
    label: 'text-primary-6 !font-medium',
    input: '!text-base',
  };

  const { class_per_week } = form.getInitialValues();

  const [classPerWeek, setClassPerWeek] = useState<number>(class_per_week ?? 0);
  const formHourPreferences = form.values?.hours_preference;
  const hourPreferences = useMemo(() => {
    if (!Array.isArray(formHourPreferences)) return [] as HoursPreferenceType[];
    return formHourPreferences as HoursPreferenceType[];
  }, [formHourPreferences]);
  const selectedDates = hourPreferences
    .map((slot) => slot?.date)
    .filter((date): date is DateInWeekEnums => Boolean(date)) as DateInWeekEnums[];

  useEffect(() => {
    if (!hourPreferences.length) return;

    let requiresUpdate = false;
    const normalizedSlots = hourPreferences.map((slot) => {
      if (!slot?.start) return slot;
      const computedEnd = calculateEndTime(slot.start);
      if (!slot?.end || slot.end !== computedEnd) {
        requiresUpdate = true;
        return { ...slot, end: computedEnd } as HoursPreferenceType;
      }
      return slot;
    });

    if (requiresUpdate) {
      form.setFieldValue('hours_preference' as any, normalizedSlots as any);
    }
  }, [hourPreferences, form]);

  const syncHourPreference = (classPerWeek: number) => {
    const currentItems = (form.getValues().hours_preference || []) as HoursPreferenceType[];
    const targetCount = Math.max(0, classPerWeek);

    if (targetCount === currentItems.length) return;

    const firstItem = currentItems[0];

    const newItems: HoursPreferenceType[] = Array.from({ length: targetCount }, (_, index) => {
      return (
        currentItems[index] || {
          date: DateInWeekEnums.MONDAY,
          start: firstItem?.start || '07:00',
          end: firstItem?.end || '09:00',
        }
      );
    });

    form.setFieldValue('hours_preference' as any, newItems as any);
  };

  const calculateEndTime = (startTime: string): string => {
    if (!startTime) return '';
    const [hours = NaN, minutes = NaN] = startTime.split(':').map((value) => Number(value));
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return '';

    let endHours = hours + 2;
    if (endHours >= 24) endHours -= 24;

    return `${String(endHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const updateHourPreferenceItem = (index: number, payload: Partial<HoursPreferenceType>) => {
    const previousList = ((form.getValues().hours_preference || []) as HoursPreferenceType[]).slice();
    const currentItem = previousList[index] || {
      date: DateInWeekEnums.MONDAY,
      start: '07:00',
      end: '09:00',
    };

    previousList[index] = { ...currentItem, ...payload };
    form.setFieldValue('hours_preference' as any, previousList as any);
  };

  const handleStartTimeChange = (index: number, startTime: string) => {
    const [hours = NaN] = startTime.split(':').map((value) => Number(value));
    if (Number.isNaN(hours)) return;

    updateHourPreferenceItem(index, { start: startTime });

    const endTime = calculateEndTime(startTime);
    if (endTime) {
      updateHourPreferenceItem(index, { end: endTime });
    }
  };

  form.watch('class_per_week', ({ value }) => {
    setClassPerWeek(value ?? 0);
  });

  return (
    <div className={cn('space-y-2', className)}>
      <label className='text-grey-8 text-sm font-medium'>{label}</label>
      <div className='space-y-4'>
        <NumberInput
          label='Số buổi học trong tuần'
          classNames={classNames}
          readOnly={readOnly}
          min={1}
          max={5}
          {...form.getInputProps('class_per_week')}
          onChange={(value) => {
            form.getInputProps('class_per_week').onChange(value);
            syncHourPreference(parseInt(String(value)));
          }}
        />
        {Array.from({ length: classPerWeek }).map((_, index) => {
          const currentSlotDate = hourPreferences[index]?.date as DateInWeekEnums | undefined;
          const dayOptions = Object.values(DateInWeekEnums).map((day) => ({
            value: day,
            label: dateInWeekMapper(day),
            disabled: selectedDates.includes(day) && day !== currentSlotDate,
          }));

          return (
            <SimpleGrid key={index} cols={{ base: 1, sm: 3 }} spacing='md'>
              <Select
                data={dayOptions}
                label='Chọn ngày'
                placeholder='Chọn ngày'
                classNames={classNames}
                readOnly={readOnly}
                {...form.getInputProps(`hours_preference.${index}.date`)}
              />
              <AppTimeInput
                label='Giờ bắt đầu (07:00 - 20:00)'
                classNames={classNames}
                readOnly={readOnly}
                min='07:00'
                max='20:00'
                {...form.getInputProps(`hours_preference.${index}.start`)}
                onChange={(value) => handleStartTimeChange(index, value)}
              />
              <AppTimeInput
                label='Giờ kết thúc'
                classNames={classNames}
                readOnly={true}
                {...form.getInputProps(`hours_preference.${index}.end`)}
              />
            </SimpleGrid>
          );
        })}
      </div>
    </div>
  );
};
