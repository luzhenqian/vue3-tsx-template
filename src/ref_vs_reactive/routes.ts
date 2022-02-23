export default [
  {
    path: "/ref_vs_reactive/ref",
    component: () => import("./ref")
  },
  {
    path: "/ref_vs_reactive/reactive",
    component: () => import("./reactive")
  },
  {
    path: "/get_el_ref",
    component: () => import("./get_el_ref")
  },
];
