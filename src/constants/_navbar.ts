const MENU_ITEMS = [
  { id: 0, href: "/dashboard", label: "통합 대시보드", children: [] },
  { id: 1, href: "/instance", label: "인스턴스", children: [] },
  { id: 2, href: "/template", label: "템플릿", children: [] },
  {
    id: 3,
    href: "/simulation",
    label: "시뮬레이션",
    children: [
      {
        id: 4,
        href: "/simulation",
        label: "시뮬레이션",
      },
      { id: 5, href: "/simulation/monitor", label: "모니터링" },
    ],
  },
  { id: 6, href: "/mec", label: "MEC", children: [] },
  { id: 7, href: "/resource", label: "자원 관리", children: [] },
];

export { MENU_ITEMS };
