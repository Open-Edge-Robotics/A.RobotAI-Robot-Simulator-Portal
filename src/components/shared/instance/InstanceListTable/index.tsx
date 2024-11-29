import React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { InstanceListResponse } from "@/type/response/_instance";
import { INSTANCE_OPTION_LIST } from "@/constants/_filterOption";

type InstanceListTableProps = {
  rows: InstanceListResponse;
  columns: GridColDef[];
  paginationModel: { page: number; pageSize: number };
  onRowClick: (params: GridRowParams) => void;
  onMultipleRowClick: (rowSelectionModel: GridRowSelectionModel) => void;
};

const InstanceListTable = ({
  rows,
  columns,
  paginationModel,
  onRowClick,
  onMultipleRowClick,
}: InstanceListTableProps) => {
  return (
    <DataGrid
      className="w-full rounded-[4px] bg-white px-2 text-center"
      getRowId={(row) => row[INSTANCE_OPTION_LIST[0].value]}
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
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
      onRowClick={onRowClick}
      hideFooterSelectedRowCount
      disableRowSelectionOnClick
      disableColumnResize
      disableColumnSorting
      disableColumnSelector
      disableColumnMenu
      disableDensitySelector
      disableVirtualization
      checkboxSelection
      onRowSelectionModelChange={onMultipleRowClick}
      pageSizeOptions={[paginationModel.pageSize]}
    />
  );
};

export default InstanceListTable;
