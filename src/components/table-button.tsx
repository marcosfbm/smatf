import { Pressable, PressableProps, Text } from 'react-native';
import { clsx } from 'clsx';
import { formatCurrencyZero } from '@/utils/functions/formar-currency-zero';

type TableProps = PressableProps & {
  title: string;
  isSelected?: boolean;
  total?: number;
};

export function TableButton({ title, isSelected, total, ...rest }: TableProps) {
  return (
    <Pressable
      className={clsx('bg-slate-800 px-4 justify-center rounded-md h-10', isSelected && "border-2 border-fuchsia-700")}
      {...rest}
    >
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
      <Text className={clsx('text-white text-bold font-subtitle text-sm flex-1', (total! > 0) && "bg-fuchsia-700")}>
        {formatCurrencyZero(total ? total : 0)}
      </Text>
    </Pressable>
  );
}