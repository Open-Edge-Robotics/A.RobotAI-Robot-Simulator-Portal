import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Menu, MenuItem } from "@mui/material";
import { COLUMN_KEBAB, COLUMN_STYLE } from "@/constants/instance";
import KebabButton from "@/components/shared/KebabButton";

type SimulationListTableProps = {
  rows: { [key: string]: string | number }[];
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
    setSelectedRowId(rowId); // 해당 행의 ID를 저장
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
            width: "fit-content", // 드롭다운의 너비
            borderRadius: "4px", // 테두리 둥글게
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // 그림자
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
        <MenuItem
          onClick={handleExecute}
          sx={{
            padding: "4px", // 메뉴 아이템의 패딩
            fontSize: "14px", // 글자 크기
            borderRadius: "4px",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="primary">
            실행
          </Button>
        </MenuItem>
        <MenuItem
          onClick={handleStop}
          sx={{
            padding: "4px", // 메뉴 아이템의 패딩
            fontSize: "14px", // 글자 크기
            borderRadius: "4px",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="warning">
            중지
          </Button>
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{
            padding: "4px", // 메뉴 아이템의 패딩
            fontSize: "14px", // 글자 크기
            borderRadius: "4px",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="error">
            삭제
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SimulationListTable;
