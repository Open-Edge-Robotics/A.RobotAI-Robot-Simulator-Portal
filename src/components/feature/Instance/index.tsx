"use client";

import React from "react";
import { MENU_ITEMS } from "@/constants/navbar";
import PageTitle from "@/components/common/PageTitle";
import ButtonGroup from "@/components/shared/ButtonGroup";
import FilterGroup from "@/components/shared/FilterGroup";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const OPTION_LIST = [
  { label: "React.js", value: "react" },
  { label: "Vue.js", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
];

// TODO: API에서 받아오기
const rows = [
  {
    id: 1,
    name: "Instance A",
    description: "First instance",
    created_at: "2023-01-01",
  },
  {
    id: 2,
    name: "Instance B",
    description: "Second instance",
    created_at: "2023-02-14",
  },
  {
    id: 3,
    name: "Instance C",
    description: "Third instance",
    created_at: "2023-03-22",
  },
  {
    id: 4,
    name: "Instance D",
    description: "Fourth instance",
    created_at: "2023-04-05",
  },
  {
    id: 5,
    name: "Instance E",
    description: "Fifth instance",
    created_at: "2023-05-15",
  },
  {
    id: 6,
    name: "Instance F",
    description: "Sixth instance",
    created_at: "2023-06-10",
  },
  {
    id: 7,
    name: "Instance G",
    description: "Seventh instance",
    created_at: "2023-07-23",
  },
  {
    id: 8,
    name: "Instance H",
    description: "Eighth instance",
    created_at: "2023-08-30",
  },
  {
    id: 9,
    name: "Instance I",
    description: "Ninth instance",
    created_at: "2023-09-12",
  },
  {
    id: 10,
    name: "Instance J",
    description: "Tenth instance",
    created_at: "2023-10-01",
  },
  {
    id: 11,
    name: "Instance K",
    description: "Eleventh instance",
    created_at: "2023-11-15",
  },
  {
    id: 12,
    name: "Instance L",
    description: "Twelfth instance",
    created_at: "2023-12-10",
  },
  {
    id: 13,
    name: "Instance M",
    description: "Thirteenth instance",
    created_at: "2024-01-20",
  },
  {
    id: 14,
    name: "Instance N",
    description: "Fourteenth instance",
    created_at: "2024-02-25",
  },
  {
    id: 15,
    name: "Instance O",
    description: "Fifteenth instance",
    created_at: "2024-03-15",
  },
  {
    id: 16,
    name: "Instance P",
    description: "Sixteenth instance",
    created_at: "2024-04-05",
  },
  {
    id: 17,
    name: "Instance Q",
    description: "Seventeenth instance",
    created_at: "2024-05-25",
  },
  {
    id: 18,
    name: "Instance R",
    description: "Eighteenth instance",
    created_at: "2024-06-10",
  },
  {
    id: 19,
    name: "Instance S",
    description: "Nineteenth instance",
    created_at: "2024-07-01",
  },
  {
    id: 20,
    name: "Instance T",
    description: "Twentieth instance",
    created_at: "2024-08-18",
  },
  {
    id: 21,
    name: "Instance U",
    description: "Twenty-first instance",
    created_at: "2024-09-05",
  },
  {
    id: 22,
    name: "Instance V",
    description: "Twenty-second instance",
    created_at: "2024-10-12",
  },
  {
    id: 23,
    name: "Instance W",
    description: "Twenty-third instance",
    created_at: "2024-11-01",
  },
  {
    id: 24,
    name: "Instance X",
    description: "Twenty-fourth instance",
    created_at: "2024-12-25",
  },
  {
    id: 25,
    name: "Instance Y",
    description: "Twenty-fifth instance",
    created_at: "2025-01-10",
  },
  {
    id: 26,
    name: "Instance Z",
    description: "Twenty-sixth instance",
    created_at: "2025-02-20",
  },
  {
    id: 27,
    name: "Instance AA",
    description: "Twenty-seventh instance",
    created_at: "2025-03-30",
  },
  {
    id: 28,
    name: "Instance AB",
    description: "Twenty-eighth instance",
    created_at: "2025-04-10",
  },
  {
    id: 29,
    name: "Instance AC",
    description: "Twenty-ninth instance",
    created_at: "2025-05-22",
  },
  {
    id: 30,
    name: "Instance AD",
    description: "Thirtieth instance",
    created_at: "2025-06-15",
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "인스턴스 ID", width: 200, resizable: false },
  { field: "description", headerName: "설명", width: 400, resizable: false },
  { field: "name", headerName: "이름", width: 200, resizable: false },
  {
    field: "created_at",
    headerName: "생성일",
    type: "string",
    width: 200,
    resizable: false,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const Instance = () => {
  const [instanceId, setInstanceId] = React.useState("");

  const [selectedRow, setSelectedRow] = React.useState<any>(null);

  // 행 선택 시 실행되는 handler
  const handleRowSelection = (selectionModel: any) => {
    if (selectionModel.length <= 0) setSelectedRow(null);
    if (selectionModel.length > 0) {
      const selectedRowData = rows.find((row) => row.id === selectionModel[0]);
      setSelectedRow(selectedRowData);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PageTitle className="text-white">{MENU_ITEMS[1].label}</PageTitle>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <ButtonGroup />
          <FilterGroup
            optionList={OPTION_LIST}
            placeholder="인스턴스를 선택하세요"
          />
        </div>
        <Paper sx={{}} className="w-full rounded-[4px] px-4 py-2 text-center">
          <DataGrid
            className=""
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            onRowSelectionModelChange={handleRowSelection}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Instance;
