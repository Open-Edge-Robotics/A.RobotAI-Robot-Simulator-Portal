import FlexCol from "@/components/common/FlexCol";
import { MENU_ITEMS } from "@/constants/_navbar";
import { Button, Typography } from "@mui/material";
import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const page = () => {
  return (
    <FlexCol className="h-screen items-center justify-center gap-4">
      <FiAlertCircle size={200} color="#acafb4" />
      <FlexCol className="items-center gap-2">
        <Typography variant="h4" className="text-white">
          페이지 없음
        </Typography>
        <Typography variant="h6" className="text-white">
          페이지를 찾을 수 없습니다
        </Typography>
      </FlexCol>
      <Button href={MENU_ITEMS[1].href} variant="contained" color="inherit">
        인스턴스 페이지로 돌아가기
      </Button>
    </FlexCol>
  );
};

export default page;
