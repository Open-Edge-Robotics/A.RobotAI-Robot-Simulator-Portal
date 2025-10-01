export const SEGMENTS = {
  // 절대 경로들 (최상위 라우트)
  absolute: {
    home: "/",
    dashboard: "/dashboard",
    simulation: "/simulation",
    mec: "/mec",
    template: "/template",
    signup: "/signup",
    login: "/login",
  },
  // 상대 경로들 (중첩 라우트)
  relative: {
    create: "create",
    edit: "edit",
  },
} as const;

export const NAV_ITEMS = [
  {
    title: "대시보드",
    icon: "home",
    href: SEGMENTS.absolute.home,
  },
  {
    title: "시뮬레이션",
    icon: "play_arrow",
    href: SEGMENTS.absolute.simulation,
  },
  {
    title: "템플릿",
    icon: "content_copy",
    href: SEGMENTS.absolute.template,
  },
  {
    title: "MEC",
    icon: "dns",
    href: SEGMENTS.absolute.mec,
  },
];
