import React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { INSTANCE_OPTION_LIST } from "@/constants/_filterOption";
import { BaseInstance } from "@/type/_field";

export const PAGE_SIZE_OPTION_LIST = [15, 20, 25, 30];

type InstanceListTableProps = {
  rows: BaseInstance[];
  columns: GridColDef[];
  paginationModel: { page: number; pageSize: number };
  isCheckable?: boolean;
  onRowClick: (params: GridRowParams) => void;
  onMultipleRowClick?: (rowSelectionModel: GridRowSelectionModel) => void;
};

const InstanceListTable = ({
  rows,
  columns,
  paginationModel,
  isCheckable,
  onRowClick,
  onMultipleRowClick,
}: InstanceListTableProps) => {
  return (
    <DataGrid
      className="w-full rounded-[4px] bg-white px-2 text-center"
      sx={{
        border: 0,
        "& .MuiDataGrid-cell:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-cell:hover": {
          cursor: "pointer",
        },
        "& .MuiDataGrid-columnHeader:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-columnHeader": {
          fontWeight: "bolder",
        },
        "& .MuiDataGrid-columnHeader:hover": {
          cursor: "default",
        },
      }}
      rows={rows}
      columns={columns}
      getRowId={(row) => row[INSTANCE_OPTION_LIST[1].value]}
      pageSizeOptions={PAGE_SIZE_OPTION_LIST}
      initialState={{ pagination: { paginationModel } }}
      onRowClick={onRowClick}
      hideFooterSelectedRowCount
      disableColumnResize
      disableColumnSorting
      disableColumnSelector
      disableColumnMenu
      disableDensitySelector
      disableVirtualization
      checkboxSelection={isCheckable}
      onRowSelectionModelChange={onMultipleRowClick}
    />
  );
};

export default InstanceListTable;
