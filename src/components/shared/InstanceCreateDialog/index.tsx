import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateInstanceFormType } from "@/type/_instance";
import { Alert, Dialog, Typography } from "@mui/material";
import { INSTANCE_LENGTH_LIMIT, SCHEMA_NAME } from "@/schema/_schema";
import InputField from "@/components/common/InputField";
import CreateButton from "@/components/shared/CreateButton";
import CancelButton from "@/components/shared/CancelButton/indext";
import SelectField from "@/components/common/SelectField";
import { Option } from "@/components/shared/FilterGroup";
import { transformResponseToOptionList } from "@/utils/option";
import { useGetTemplateList } from "@/hooks/template/useGetTemplateList";
import { AxiosError } from "axios";
import { Result } from "@/type/response/_default";
import { API_ERROR_MESSAGE } from "@/constants/api/_errorMessage";

type Props = {
  isOpen: boolean;
  simulationOptionList: Option[];
  errors: FieldErrors<CreateInstanceFormType>;
  isError: {
    templateId: boolean;
    simulationId: boolean;
  };
  error: AxiosError<Result<null>, any> | null;
  onClose: () => void;
  register: UseFormRegister<CreateInstanceFormType>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  setSelectedSimulationId: (id: string) => void;
  setSelectedTemplateId: (id: string) => void;
};

const InstanceCreateDialog = ({
  isOpen,
  simulationOptionList,
  errors,
  isError,
  error,
  onClose,
  register,
  handleSubmit,
  setSelectedSimulationId,
  setSelectedTemplateId,
}: Props) => {
  const [templateOptionList, setTemplateOptionList] = React.useState<Option[]>(
    [],
  );

  const { data, isLoading } = useGetTemplateList();

  React.useEffect(() => {
    if (!isLoading && data) {
      const formattedData = transformResponseToOptionList(
        data.data,
        SCHEMA_NAME.TEMPLATE.ID,
        SCHEMA_NAME.TEMPLATE.TYPE,
      );
      setTemplateOptionList(formattedData);
    }
  }, [isLoading, data]);

  const handleSimulationClick = (id: string) => setSelectedSimulationId(id);
  const handleTemplateClick = (id: string) => setSelectedTemplateId(id);

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
        {error?.response?.status === 404 && (
          <Alert severity="error">
            {API_ERROR_MESSAGE.INSTANCE.CREATE[404]}
          </Alert>
        )}
        {error?.response?.status === 500 && (
          <Alert severity="error">
            {API_ERROR_MESSAGE.INSTANCE.CREATE[500]}
          </Alert>
        )}
        {!error && (
          <Alert severity="info">
            {" "}
            {API_ERROR_MESSAGE.INSTANCE.CREATE.DEFAULT}
          </Alert>
        )}
        <div className="flex w-full flex-col gap-3">
          <InputField
            name={SCHEMA_NAME.INSTANCE.NAME as keyof CreateInstanceFormType}
            label="이름"
            placeholder="인스턴스 이름을 입력해주세요"
            maxLength={INSTANCE_LENGTH_LIMIT.NAME.MAX}
            register={register}
            errors={errors}
          />
          <InputField
            name={
              SCHEMA_NAME.INSTANCE.DESCRIPTION as keyof CreateInstanceFormType
            }
            label="설명"
            placeholder="인스턴스 설명을 입력해주세요"
            maxLength={INSTANCE_LENGTH_LIMIT.DESCRIPTION.MAX}
            register={register}
            errors={errors}
          />
          <SelectField
            optionList={simulationOptionList}
            label="시뮬레이션"
            placeholder="시뮬레이션을 선택하세요"
            onSelect={handleSimulationClick}
            isError={isError.simulationId}
          />
          <SelectField
            optionList={templateOptionList}
            label="템플릿"
            placeholder="템플릿을 선택하세요"
            onSelect={handleTemplateClick}
            isError={isError.templateId}
          />
          <InputField
            name={SCHEMA_NAME.INSTANCE.COUNT as keyof CreateInstanceFormType}
            label="개수"
            type="number"
            defaultValue={1}
            min={INSTANCE_LENGTH_LIMIT.COUNT.MIN}
            max={INSTANCE_LENGTH_LIMIT.COUNT.MAX}
            inputMode="numeric"
            placeholder="인스턴스 개수를 입력해주세요"
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
