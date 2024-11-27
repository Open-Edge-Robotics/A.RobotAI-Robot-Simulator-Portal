import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateInstanceFormType } from "@/type/_instance";
import { Alert, Dialog } from "@mui/material";
import { INSTANCE_LENGTH_LIMIT, SCHEMA_NAME } from "@/schema/_schema";
import InputField from "@/components/common/InputField";
import CreateButton from "@/components/shared/button/CreateButton";
import CancelButton from "@/components/shared/button/CancelButton/indext";
import SelectField from "@/components/common/SelectField";
import { Option } from "@/components/shared/FilterGroup";
import { transformResponseToOptionList } from "@/utils/option";
import { useGetTemplateList } from "@/hooks/template/useGetTemplateList";
import { AxiosError } from "axios";
import { Result } from "@/type/response/_default";
import { API_ERROR_MESSAGE } from "@/constants/api/_errorMessage";
import FormTitle from "@/components/common/FormTitle";
import Form from "@/components/common/Form";
import FormButtonContainer from "@/components/common/FormButtonContainer";
import { LABEL, PLACE_HOLDER } from "@/constants/_form";
import FlexCol from "@/components/common/FlexCol";

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
      <Form onSubmit={handleSubmit}>
        <FormTitle>인스턴스 생성</FormTitle>
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
            {API_ERROR_MESSAGE.INSTANCE.CREATE.DEFAULT}
          </Alert>
        )}
        <FlexCol className="w-full gap-3">
          <InputField
            name={SCHEMA_NAME.INSTANCE.NAME as keyof CreateInstanceFormType}
            label={LABEL.NAME}
            placeholder={PLACE_HOLDER.INSTANCE_CREATE.NAME}
            maxLength={INSTANCE_LENGTH_LIMIT.NAME.MAX}
            register={register}
            errors={errors}
          />
          <InputField
            name={
              SCHEMA_NAME.INSTANCE.DESCRIPTION as keyof CreateInstanceFormType
            }
            label={LABEL.DESCRIPTION}
            placeholder={PLACE_HOLDER.INSTANCE_CREATE.DESCRIPTION}
            maxLength={INSTANCE_LENGTH_LIMIT.DESCRIPTION.MAX}
            register={register}
            errors={errors}
          />
          <SelectField
            optionList={simulationOptionList}
            label={LABEL.SIMULATION}
            placeholder={PLACE_HOLDER.INSTANCE_CREATE.SIMULATION}
            onSelect={handleSimulationClick}
            isError={isError.simulationId}
          />
          <SelectField
            optionList={templateOptionList}
            label={LABEL.TEMPLATE}
            placeholder={PLACE_HOLDER.INSTANCE_CREATE.TEMPLATE}
            onSelect={handleTemplateClick}
            isError={isError.templateId}
          />
          <InputField
            name={SCHEMA_NAME.INSTANCE.COUNT as keyof CreateInstanceFormType}
            label={LABEL.COUNT}
            type="number"
            defaultValue={1}
            min={INSTANCE_LENGTH_LIMIT.COUNT.MIN}
            max={INSTANCE_LENGTH_LIMIT.COUNT.MAX}
            inputMode="numeric"
            placeholder={PLACE_HOLDER.INSTANCE_CREATE.COUNT}
            register={register}
          />
        </FlexCol>
        <FormButtonContainer>
          <CancelButton onClick={onClose} />
          <CreateButton type="submit" />
        </FormButtonContainer>
      </Form>
    </Dialog>
  );
};

export default InstanceCreateDialog;
