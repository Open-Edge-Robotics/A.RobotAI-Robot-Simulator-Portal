import { Input, Select, Textarea } from "innogrid-ui";

import Container from "@/components/common/Container.tsx";
import Fieldset from "@/components/common/Fieldset";
import Label from "@/components/common/Label";
import type { Mec, SimulationFormData } from "@/types/simulation/domain";

interface Step1ContentProps {
  name: string;
  description: string;
  mecId: string | null;
  onFormDataChange: <K extends keyof SimulationFormData>(key: K, value: SimulationFormData[K]) => void;
  mecList: Mec[];
}

export default function Step1Content({ name, description, mecId, onFormDataChange, mecList }: Step1ContentProps) {
  return (
    <Container shadow className="gap-6 p-6">
      {/* 시뮬레이션 이름 */}
      <Fieldset>
        <Label label="시뮬레이션 이름" required />
        <Input
          type="text"
          value={name}
          placeholder="시뮬레이션 이름을 입력하세요"
          size={{ width: "100%", height: "40px" }}
          onChange={(e) => onFormDataChange("name", e.target.value)}
        />
      </Fieldset>

      {/* 시뮬레이션 설명 */}
      <Fieldset>
        <Label label="설명" />
        <Textarea
          value={description}
          placeholder="시뮬레이션 설명을 입력하세요"
          onChange={(e) => onFormDataChange("description", e.target.value)}
        />
      </Fieldset>

      {/* MEC 선택 */}
      <Fieldset>
        <Label label="MEC ID" required />
        <Select
          options={mecList}
          value={mecList.find((mec) => mec.id === mecId) || null}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          size="l-large"
          onChange={(option) => onFormDataChange("mecId", option ? option.id : null)}
        />
      </Fieldset>
    </Container>
  );
}
