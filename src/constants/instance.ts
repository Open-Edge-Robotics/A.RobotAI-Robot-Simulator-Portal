import { GridColDef } from "@mui/x-data-grid";

const COLUMN_STYLE = {
  resizable: false,
  filterable: false,
  align: "center" as const,
  headerAlign: "center" as const,
};

const COLUMN_LIST: GridColDef[] = [
  {
    field: "id",
    headerName: "인스턴스 ID",
    flex: 1,
    ...COLUMN_STYLE,
  },
  {
    field: "description",
    headerName: "설명",
    flex: 3,

    ...COLUMN_STYLE,
  },
  {
    field: "name",
    headerName: "이름",
    flex: 2,
    ...COLUMN_STYLE,
  },
  {
    field: "createdAt",
    headerName: "생성일",
    flex: 1,
    ...COLUMN_STYLE,
  },
];

export { COLUMN_LIST };
