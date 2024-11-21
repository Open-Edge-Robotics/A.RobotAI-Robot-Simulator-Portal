import React from "react";
import { UseFormRegister } from "react-hook-form";
import { CreateInstanceFormData } from "@/type/_instance";
import { Dialog, Typography } from "@mui/material";
import { INSTANCE_LENGTH_LIMIT, SCHEMA_NAME } from "@/schema/_schema";
import { MOCK_OPTION_LIST } from "@/constants/mockData/instance";
import InputField from "@/components/common/InputField";
import CreateButton from "@/components/shared/CreateButton";
import CancelButton from "@/components/shared/CancelButton/indext";
import SelectField from "@/components/common/SelectField";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  register: UseFormRegister<CreateInstanceFormData>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  setSelectedSimulationId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTemplateId: React.Dispatch<React.SetStateAction<string>>;
};

const InstanceCreateDialog = ({
  isOpen,
  onClose,
  register,
  handleSubmit,
  setSelectedSimulationId,
  setSelectedTemplateId,
}: Props) => {
  // TODO: API에서 시뮬레이션 및 템플릿 목록 불러오기
  const [simulationList, setSimulationList] = React.useState(MOCK_OPTION_LIST);
  const [templateList, setTemplateList] = React.useState(MOCK_OPTION_LIST);

  const handleSimulationClick = (id: string) => {
    setSelectedSimulationId(id);
  };

  const handleTemplateClick = (id: string) => {
    setSelectedTemplateId(id);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
        },
      }}
    >
      <form
        className="flex w-full scroll-m-0 flex-col items-center justify-center gap-8 p-8"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">인스턴스 생성</Typography>
        <div className="flex w-full flex-col gap-3">
          <InputField
            name={SCHEMA_NAME.INSTANCE.NAME as keyof CreateInstanceFormData}
            label="이름"
            placeholder="인스턴스 이름을 입력해주세요"
            maxLength={INSTANCE_LENGTH_LIMIT.NAME.MAX}
            register={register}
          />
          <InputField
            name={
              SCHEMA_NAME.INSTANCE.DESCRIPTION as keyof CreateInstanceFormData
            }
            label="설명"
            placeholder="인스턴스 설명을 입력해주세요"
            maxLength={INSTANCE_LENGTH_LIMIT.DESCRIPTION.MAX}
            register={register}
          />
          <SelectField
            optionList={simulationList}
            label="시뮬레이션"
            placeholder="시뮬레이션을 선택하세요."
            onSelect={handleSimulationClick}
          />
          <SelectField
            optionList={templateList}
            label="템플릿"
            placeholder="템플릿을 선택하세요."
            onSelect={handleTemplateClick}
          />
          <InputField
            name={SCHEMA_NAME.INSTANCE.COUNT as keyof CreateInstanceFormData}
            label="설명"
            type="number"
            defaultValue={1}
            min={1}
            max={30}
            inputMode="numeric"
            placeholder="인스턴스 설명을 입력해주세요"
            maxLength={INSTANCE_LENGTH_LIMIT.COUNT.MAX}
            register={register}
          />
        </div>
        <div className="ml-auto flex gap-2">
          <CancelButton onClick={onClose} />
          <CreateButton type="submit" />
        </div>
      </form>
    </Dialog>
  );
};

export default InstanceCreateDialog;
