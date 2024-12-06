import ActionMenuItem from "@/components/common/ActionMenuItem";
import AlertModal from "@/components/common/AlertModal";
import KebabButton from "@/components/shared/button/KebabButton";
import { PAGE_SIZE_OPTION_LIST } from "@/components/shared/instance/InstanceListTable";
import { TEMPLATE_OPTION_LIST } from "@/constants/_filterOption";
import { COLUMN_KEBAB, COLUMN_STYLE } from "@/constants/_tableColumn";
import { TemplateListResponse } from "@/type/response/_template";
import { Menu } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import React from "react";

type Props = {
  rows: TemplateListResponse;
  columns: GridColDef[];
  paginationModel: { page: number; pageSize: number };
  isLoading: boolean;
  onDelete: (id: number) => void;
};

const TemplateListTable = ({
  rows,
  columns,
  paginationModel,
  isLoading,
  onDelete,
}: Props) => {
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
      ...COLUMN_KEBAB,
      renderCell: (params: GridCellParams) => (
        <KebabButton
          id={params.row[TEMPLATE_OPTION_LIST[1].value]}
          onClick={(e) =>
            handleClick(e, params.row[TEMPLATE_OPTION_LIST[1].value])
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
        getRowId={(row) => row[TEMPLATE_OPTION_LIST[1].value]}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={PAGE_SIZE_OPTION_LIST}
        disableAutosize
        loading={isLoading}
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
          onClick={handleModalOpen}
          buttonText="삭제"
          color="error"
        />
      </Menu>
      <AlertModal
        isOpen={isModalOpen}
        title="경고"
        message="템플릿 삭제 시 되돌릴 수 없습니다. 그래도 삭제하시겠습니까?"
        onClose={handleModalClose}
        onAccept={handleDelete}
      />
    </>
  );
};

export default TemplateListTable;
