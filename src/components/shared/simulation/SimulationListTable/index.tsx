import React from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { Menu } from "@mui/material";
import {
  COLUMN_KEBAB_SIMULATION,
  COLUMN_STYLE,
} from "@/constants/_tableColumn";
import KebabButton from "@/components/shared/button/KebabButton";
import { SimulationListResponse } from "@/type/response/_simulation";
import { SIMULATION_OPTION_LIST } from "@/constants/_filterOption";
import { PAGE_SIZE_OPTION_LIST } from "@/components/shared/instance/InstanceListTable";
import AlertModal from "@/components/common/AlertModal";
import ActionMenuItem from "@/components/common/ActionMenuItem";

type SimulationListTableProps = {
  rows: SimulationListResponse;
  columns: GridColDef[];
  paginationModel: { page: number; pageSize: number };
  isLoading: boolean;
  onRowClick: (params: GridRowParams) => void;
  onExecute?: (id: number) => void;
  onStop?: (id: number) => void;
  onDelete?: (id: number) => void;
};

const SimulationListTable = ({
  rows,
  columns,
  paginationModel,
  isLoading,
  onRowClick,
  onExecute,
  onStop,
  onDelete,
}: SimulationListTableProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, rowId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  // 실행 버튼 클릭 시
  const handleExecute = () => {
    if (!onExecute || !selectedRowId) return;
    onExecute(selectedRowId);
    handleClose();
  };

  // 중지 버튼 클릭 시
  const handleStop = () => {
    if (!onStop || !selectedRowId) return;
    onStop(selectedRowId);
    handleClose();
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  // 삭제 버튼 클릭 -> 삭제 모달에서 삭제 클릭 시
  const handleDelete = () => {
    handleModalClose();
    if (!onDelete || !selectedRowId) return;
    onDelete(selectedRowId);
    handleClose();
  };

  const columnsWithActions: GridColDef[] = [
    ...columns,
    {
      ...COLUMN_KEBAB_SIMULATION,
      renderCell: (params: GridCellParams) => (
        <KebabButton
          id={params.row[SIMULATION_OPTION_LIST[1].value]}
          onClick={(e) =>
            handleClick(e, params.row[SIMULATION_OPTION_LIST[1].value])
          }
        />
      ),
      type: "actions",
      ...COLUMN_STYLE,
    },
  ];

  return (
    <>
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
        columns={columnsWithActions}
        getRowId={(row) => row[SIMULATION_OPTION_LIST[1].value]}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={PAGE_SIZE_OPTION_LIST}
        disableAutosize
        loading={isLoading}
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
          onClick={handleModalOpen}
          buttonText="삭제"
          color="error"
        />
      </Menu>
      <AlertModal
        isOpen={isModalOpen}
        title="경고"
        message="시뮬레이션 삭제 시 되돌릴 수 없습니다. 그래도 삭제하시겠습니까?"
        onClose={handleModalClose}
        onAccept={handleDelete}
      />
    </>
  );
};

export default SimulationListTable;
