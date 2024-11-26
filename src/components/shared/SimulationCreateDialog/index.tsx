import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Button, Dialog, Typography } from "@mui/material";
import { SCHEMA_NAME, SIMULATION_LENGTH_LIMIT } from "@/schema/_schema";
import { CreateSimulationFormType } from "@/type/_simulation";
import InputField from "@/components/common/InputField";

type SimulationCreateDialogProps = {
  isOpen: boolean;
  errors: FieldErrors<CreateSimulationFormType>;
  handleCloseDialog: () => void;
  register: UseFormRegister<CreateSimulationFormType>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const SimulationCreateDialog = ({
  isOpen,
  errors,
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
      <form
        className="flex w-full flex-col items-center justify-center gap-8 p-8"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">시뮬레이션 생성</Typography>
        <div className="flex w-full flex-col gap-3">
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
        </div>
        <div className="ml-auto flex gap-2">
          <Button
            variant="outlined"
            color="info"
            type="button"
            onClick={handleCloseDialog}
          >
            취소
          </Button>
          <Button variant="contained" color="primary" type="submit">
            생성
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default SimulationCreateDialog;
