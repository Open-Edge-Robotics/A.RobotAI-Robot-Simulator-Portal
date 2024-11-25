import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  ButtonProps,
  Menu,
  MenuItem,
  MenuItemProps,
} from "@mui/material";
import { COLUMN_KEBAB, COLUMN_STYLE } from "@/constants/_tableColumn";
import KebabButton from "@/components/shared/KebabButton";
import { SimulationListResponse } from "@/type/response/_simulation";
import { SIMULATION_OPTION_LIST } from "@/constants/_filterOption";

type ActionMenuItemProps = {
  buttonText: string;
} & ButtonProps &
  MenuItemProps;

const ActionMenuItem = ({
  onClick,
  buttonText,
  ...props
}: ActionMenuItemProps) => (
  <MenuItem
    onClick={onClick}
    sx={{
      padding: "4px",
      fontSize: "14px",
      borderRadius: "4px",
      justifyContent: "center",
    }}
  >
    <Button variant="contained" {...props}>
      {buttonText}
    </Button>
  </MenuItem>
);

type SimulationListTableProps = {
  rows: SimulationListResponse;
  columns: GridColDef[];
  paginationModel: { page: number; pageSize: number };
  onRowClick?: (params: any) => void;
  onExecute?: (id: string) => void;
  onStop?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const SimulationListTable = ({
  rows,
  columns,
  paginationModel,
  onRowClick,
  onExecute,
  onStop,
  onDelete,
}: SimulationListTableProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, rowId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleExecute = () => {
    if (!onExecute || !selectedRowId) return;
    onExecute(selectedRowId);
    handleClose();
  };

  const handleStop = () => {
    if (!onStop || !selectedRowId) return;
    onStop(selectedRowId);
    handleClose();
  };

  const handleDelete = () => {
    if (!onDelete || !selectedRowId) return;
    onDelete(selectedRowId);
    handleClose();
  };

  const columnsWithActions = [
    ...columns,
    {
      ...COLUMN_KEBAB,
      renderCell: (params: any) => (
        <KebabButton
          id={params.id}
          onClick={(e) => handleClick(e, params.id)}
        />
      ),
      ...COLUMN_STYLE,
    },
  ];

  return (
    <>
      <DataGrid
        className="w-full rounded-[4px] bg-white px-2 text-center"
        getRowId={(row) => row[SIMULATION_OPTION_LIST[0].value]}
        rows={rows}
        columns={columnsWithActions}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[paginationModel.pageSize]}
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            width: "fit-content",
            borderRadius: "4px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          },
          "& .MuiPaper-root:hover": {
            background: "white",
          },
          "& .MuiList-root": {
            padding: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            textAlign: "center",
          },
        }}
      >
        <ActionMenuItem
          onClick={handleExecute}
          buttonText="실행"
          color="primary"
        />
        <ActionMenuItem
          onClick={handleStop}
          buttonText="중지"
          color="warning"
        />
        <ActionMenuItem
          onClick={handleDelete}
          buttonText="삭제"
          color="error"
        />
      </Menu>
    </>
  );
};

export default SimulationListTable;