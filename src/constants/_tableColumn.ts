import {
  INSTANCE_OPTION_LIST,
  SIMULATION_OPTION_LIST,
  TEMPLATE_OPTION_LIST,
} from "@/constants/_filterOption";
import { GridColDef } from "@mui/x-data-grid";

const COLUMN_STYLE = {
  resizable: false,
  filterable: false,
  align: "center" as const,
  headerAlign: "center" as const,
};

// 시뮬레이션 목록 테이블 컬럼 목록
const SIMULATION_LIST_COLUMN_LIST: GridColDef[] = [
  {
    field: SIMULATION_OPTION_LIST[0].value,
    headerName: SIMULATION_OPTION_LIST[0].label,
    flex: 2,
    ...COLUMN_STYLE,
  },
  {
    field: SIMULATION_OPTION_LIST[2].value,
    headerName: SIMULATION_OPTION_LIST[2].label,
    flex: 3,

    ...COLUMN_STYLE,
  },
  {
    field: SIMULATION_OPTION_LIST[1].value,
    headerName: SIMULATION_OPTION_LIST[1].label,
    flex: 1,
    ...COLUMN_STYLE,
  },
  {
    field: SIMULATION_OPTION_LIST[3].value,
    headerName: SIMULATION_OPTION_LIST[3].label,
    flex: 1,
    ...COLUMN_STYLE,
  },
  {
    field: SIMULATION_OPTION_LIST[4].value,
    headerName: SIMULATION_OPTION_LIST[4].label,
    flex: 1,
    ...COLUMN_STYLE,
  },
  {
    field: SIMULATION_OPTION_LIST[5].value,
    headerName: SIMULATION_OPTION_LIST[5].label,
    flex: 2,
    ...COLUMN_STYLE,
  },
];

// 인스턴스 목록 테이블 컬럼 목록
const INSTANCE_LIST_COLUMN_LIST: GridColDef[] = [
  {
    field: INSTANCE_OPTION_LIST[0].value,
    headerName: INSTANCE_OPTION_LIST[0].label,
    flex: 2,
    ...COLUMN_STYLE,
  },
  {
    field: INSTANCE_OPTION_LIST[2].value,
    headerName: INSTANCE_OPTION_LIST[2].label,
    flex: 2,

    ...COLUMN_STYLE,
  },
  {
    field: INSTANCE_OPTION_LIST[1].value,
    headerName: INSTANCE_OPTION_LIST[1].label,
    flex: 1,
    ...COLUMN_STYLE,
  },
  {
    field: INSTANCE_OPTION_LIST[3].value,
    headerName: INSTANCE_OPTION_LIST[3].label,
    flex: 1,
    ...COLUMN_STYLE,
  },
  {
    field: INSTANCE_OPTION_LIST[4].value,
    headerName: INSTANCE_OPTION_LIST[4].label,
    flex: 2,
    ...COLUMN_STYLE,
  },
  {
    field: INSTANCE_OPTION_LIST[5].value,
    headerName: INSTANCE_OPTION_LIST[5].label,
    flex: 2,
    ...COLUMN_STYLE,
  },
  {
    field: INSTANCE_OPTION_LIST[6].value,
    headerName: INSTANCE_OPTION_LIST[6].label,
    flex: 1,
    ...COLUMN_STYLE,
  },
];

// 템플릿 목록 테이블 컬럼 목록
const TEMPLATE_LIST_COLUMN_LIST: GridColDef[] = [
  {
    field: TEMPLATE_OPTION_LIST[0].value,
    headerName: TEMPLATE_OPTION_LIST[0].label,
    flex: 2,
    ...COLUMN_STYLE,
  },
  {
    field: TEMPLATE_OPTION_LIST[1].value,
    headerName: TEMPLATE_OPTION_LIST[1].label,
    flex: 1,
    ...COLUMN_STYLE,
  },
  {
    field: TEMPLATE_OPTION_LIST[2].value,
    headerName: TEMPLATE_OPTION_LIST[2].label,
    flex: 3,
    ...COLUMN_STYLE,
  },
  {
    field: TEMPLATE_OPTION_LIST[3].value,
    headerName: TEMPLATE_OPTION_LIST[3].label,
    flex: 3,
    ...COLUMN_STYLE,
  },
  {
    field: TEMPLATE_OPTION_LIST[4].value,
    headerName: TEMPLATE_OPTION_LIST[4].label,
    flex: 1,
    ...COLUMN_STYLE,
  },
];

const COLUMN_KEBAB_SIMULATION = {
  field: "actions",
  headerName: "",
  flex: 1,
};

const COLUMN_KEBAB_TEMPLATE = {
  field: "actions",
  headerName: "",
  flex: 1,
};

export {
  COLUMN_STYLE,
  SIMULATION_LIST_COLUMN_LIST,
  INSTANCE_LIST_COLUMN_LIST,
  TEMPLATE_LIST_COLUMN_LIST,
  COLUMN_KEBAB_SIMULATION,
  COLUMN_KEBAB_TEMPLATE,
};
