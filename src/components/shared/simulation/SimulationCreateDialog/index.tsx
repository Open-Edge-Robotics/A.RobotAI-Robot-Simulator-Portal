import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Alert, Dialog } from "@mui/material";
import { SCHEMA_NAME, SIMULATION_LENGTH_LIMIT } from "@/schema/_schema";
import { CreateSimulationFormType } from "@/type/_simulation";
import InputField from "@/components/common/InputField";
import { AxiosError } from "axios";
import { Result } from "@/type/response/_default";
import { API_MESSAGE } from "@/constants/api/_errorMessage";
import Form from "@/components/common/Form";
import FormTitle from "@/components/common/FormTitle";
import FormButtonContainer from "@/components/common/FormButtonContainer";
import CancelButton from "@/components/shared/button/CancelButton/indext";
import CreateButton from "@/components/shared/button/CreateButton";
import FlexCol from "@/components/common/FlexCol";

type SimulationCreateDialogProps = {
  isOpen: boolean;
  errors: FieldErrors<CreateSimulationFormType>;
  error: AxiosError<Result<null>, any> | null;
  handleCloseDialog: () => void;
  register: UseFormRegister<CreateSimulationFormType>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const SimulationCreateDialog = ({
  isOpen,
  errors,
  error,
  handleCloseDialog,
  register,
  handleSubmit,
}: SimulationCreateDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialog}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
        },
      }}
    >
      <Form onSubmit={handleSubmit}>
        <FormTitle>시뮬레이션 생성</FormTitle>
        {error?.response?.status === 409 && (
          <Alert severity="error">{API_MESSAGE.SIMULATION.CREATE[409]}</Alert>
        )}
        {error?.response?.status === 500 && (
          <Alert severity="error">{API_MESSAGE.SIMULATION.CREATE[500]}</Alert>
        )}
        {!error && (
          <Alert severity="info">{API_MESSAGE.SIMULATION.CREATE.DEFAULT}</Alert>
        )}
        <FlexCol className="w-full gap-3">
          <InputField
            name={SCHEMA_NAME.SIMULATION.NAME as keyof CreateSimulationFormType}
            label="이름"
            placeholder="시뮬레이션 이름을 입력해주세요"
            maxLength={SIMULATION_LENGTH_LIMIT.NAME.MAX}
            register={register}
            errors={errors}
          />
          <InputField
            name={
              SCHEMA_NAME.SIMULATION
                .DESCRIPTION as keyof CreateSimulationFormType
            }
            label="설명"
            placeholder="시뮬레이션 설명을 입력해주세요"
            maxLength={SIMULATION_LENGTH_LIMIT.DESCRIPTION.MAX}
            register={register}
            errors={errors}
          />
        </FlexCol>
        <FormButtonContainer>
          <CancelButton onClick={handleCloseDialog} />
          <CreateButton type="submit" />
        </FormButtonContainer>
      </Form>
    </Dialog>
  );
};

export default SimulationCreateDialog;
