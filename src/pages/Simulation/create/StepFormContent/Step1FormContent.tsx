import { Input, Select, Textarea } from "innogrid-ui";

import Fieldset from "@/components/common/Fieldset";
import Label from "@/components/common/Label";

import type { Mec, SimulationFormData } from "../../types";

interface Step1FormContentProps {
  name: string;
  descirption: string;
  mec: Mec | null;
  onChangeFormData: <K extends keyof SimulationFormData>(key: K, value: SimulationFormData[K]) => void;
}

const getMockMecList = (): Mec[] => [
  { id: "mec1", name: "MEC-001" },
  { id: "mec2", name: "MEC-002" },
  { id: "mec3", name: "MEC-003" },
];

export default function Step1FormContent({ name, descirption, mec, onChangeFormData }: Step1FormContentProps) {
  const mecList = getMockMecList();

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-gray-100 bg-white p-6 shadow-xs">
      {/* 시뮬레이션 이름 */}
      <Fieldset>
        <Label label="시뮬레이션 이름" required />
        <Input
          type="text"
          value={name}
          placeholder="시뮬레이션 이름을 입력하세요"
          size={{ width: "100%", height: "40px" }}
          onChange={(e) => onChangeFormData("name", e.target.value)}
        />
      </Fieldset>

      {/* 시뮬레이션 설명 */}
      <Fieldset>
        <Label label="설명" />
        <Textarea
          value={descirption}
          placeholder="시뮬레이션 설명을 입력하세요"
          onChange={(e) => onChangeFormData("description", e.target.value)}
        />
      </Fieldset>

      {/* MEC 선택 */}
      <Fieldset>
        <Label label="MEC ID" required />
        <Select
          options={mecList}
          value={mec}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          size="l-large"
          onChange={(option) => onChangeFormData("mec", option)}
        />
      </Fieldset>
    </div>
  );
}
