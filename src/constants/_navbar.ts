const MENU_ITEMS = [
  { href: "/dashboard", label: "통합 대시보드", children: [] },
  { href: "/instance", label: "인스턴스", children: [] },
  { href: "/template", label: "템플릿", children: [] },
  {
    href: "simulation",
    label: "시뮬레이션",
    children: [
      { href: "/simulation", label: "시뮬레이션" },
      { href: "/simulation/monitor", label: "모니터링" },
    ],
  },
  { href: "/mec", label: "MEC", children: [] },
  { href: "/resource", label: "자원 관리", children: [] },
];

export { MENU_ITEMS };
