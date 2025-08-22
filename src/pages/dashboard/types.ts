export interface SystemOverviewConfig {
  label: string;
  iconName: string;
  iconColor: string;
  iconBgColor: string;
}

export interface SystemOverviewData {
  total: number;
  running: number;
  mec: number;
  instance: number;
}
