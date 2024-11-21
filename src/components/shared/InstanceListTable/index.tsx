import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type InstanceListTableProps = {
  rows: { [key: string]: string | number }[];
  columns: GridColDef[];
  paginationModel: { page: number; pageSize: number };
  onRowClick: (params: any) => void;
  onMultipleRowClick: (params: any) => void;
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
