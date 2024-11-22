import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Button, Dialog, Typography } from "@mui/material";
import { Input } from "@/components/common/Input";
import { Label } from "@/components/common/Label";
import { SCHEMA_NAME, SIMULATION_LENGTH_LIMIT } from "@/schema/_schema";
import { CreateSimulationFormType } from "@/type/_simulation";

type SimulationCreateDialogProps = {
  isOpen: boolean;
  handleCloseDialog: () => void;
  register: UseFormRegister<CreateSimulationFormType>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const SimulationCreateDialog = ({
  isOpen,
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
          <div className="items-centers flex w-full flex-col justify-center gap-2">
            <Label className="w-28 text-nowrap">이름</Label>
            <Input
              className="w-full border border-gray-300 px-4 py-2 text-sm placeholder:text-sm"
              placeholder="시뮬레이션 이름을 입력해주세요"
              autoComplete="off"
              maxLength={SIMULATION_LENGTH_LIMIT.NAME.MAX}
              {...register(
                SCHEMA_NAME.SIMULATION.NAME as keyof CreateSimulationFormType,
              )}
            />
          </div>
          <div className="items-centers flex w-full flex-col justify-center gap-2">
            <Label className="w-28 text-nowrap">설명</Label>
            <Input
              className="w-full border border-gray-300 px-4 py-2 text-sm placeholder:text-sm"
              placeholder="시뮬레이션 설명을 입력해주세요"
              autoComplete="off"
              maxLength={SIMULATION_LENGTH_LIMIT.DESCRIPTION.MAX}
              {...register(
                SCHEMA_NAME.SIMULATION
                  .DESCRIPTION as keyof CreateSimulationFormType,
              )}
            />
          </div>
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
