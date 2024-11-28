import {
  Select,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValueText,
} from "@/components/common/Select";
import { Option } from "@/components/shared/FilterGroup";

type Props = {
  optionList: Option[];
  onSelect: (value: string) => void;
};

const SimulationFilter = ({ optionList, onSelect }: Props) => {
  return (
    <Select
      className="relative w-80 text-center align-middle"
      onSelect={onSelect}
    >
      <SelectTrigger className="w-full rounded-[4px] bg-white py-2 pl-14 pr-16">
        <SelectValueText
          className="text-sm"
          placeholder={"시뮬레이션을 선택하세요"}
        />
      </SelectTrigger>
      <SelectGroup className="top-10 max-h-40 w-full rounded-[4px] bg-white p-2 shadow-md">
        {optionList.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            label={item.label}
            className="w-full rounded-[4px] px-2 py-1 text-sm hover:bg-gray-200"
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectGroup>
      <SelectIcon color="#000000" className="absolute right-2 top-3" />
    </Select>
  );
};

export default SimulationFilter;
