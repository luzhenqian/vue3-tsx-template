export default [
  {
    path: "/ref_vs_reactive/ref",
    component: () => import("./ref")
  },
  {
    path: "/ref_vs_reactive/reactive",
    component: () => import("./reactive")
  },
];
