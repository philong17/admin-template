import { ChipType } from '@/utils/types/common.type';
import { Chip, Group } from '@mantine/core';

interface AppChipProps {
  chips: ChipType[];
  selected?: string[];
  onChange?: (value: string[]) => void;
}

const AppChip = ({ chips, selected, onChange }: AppChipProps) => {
  return (
    <Chip.Group multiple value={selected} onChange={onChange}>
      <Group gap={16}>
        {chips.map((chip) => (
          <Chip key={chip.value} value={chip.value} variant='outline' icon={null}>
            {chip.label}
          </Chip>
        ))}
      </Group>
    </Chip.Group>
  );
};

export default AppChip;
