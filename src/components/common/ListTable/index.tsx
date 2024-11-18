import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type ListTableProps = {
  rows: { [key: string]: string | number }[];
  columns: GridColDef[];
  paginationModel: { page: number; pageSize: number };
  onRowClick?: (params: any) => void;
};

const ListTable = ({
  rows,
  columns,
  paginationModel,
  onRowClick,
}: ListTableProps) => {
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
      disableMultipleRowSelection
      disableColumnSorting
      disableColumnSelector
      disableColumnMenu
      disableDensitySelector
      disableVirtualization
    />
  );
};

export default ListTable;
