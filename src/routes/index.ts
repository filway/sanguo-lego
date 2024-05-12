import { createRouter, createWebHistory } from "vue-router";
import List from "../views/List.vue";
import Index from "../views/Index.vue";
import Editor from "../views/Editor.vue";
import Download from "../views/Download.vue";
import { SVG } from "@svgdotjs/svg.js";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    disableLoading?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "list",
      component: List,
      meta: { title: "logo智能设计", disableLoading: true },
    },
    {
      path: "/design/:id",
      name: "index",
      component: Index,
      meta: { title: "logo智能设计", disableLoading: true },
    },
    {
      path: "/editor/:id",
      name: "editor",
      component: Editor,
      meta: { title: "编辑我的设计" },
    },
    {
      path: "/download/:id",
      name: "download",
      component: Download,
      meta: { title: "下载", disableLoading: true },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const { title } = to.meta;
  if (title) {
    document.title = title;
  }
  if (from.name === "editor" && to.name === "download") {
    localStorage.setItem("downloadsvg", SVG(".svg0").svg());
  } else {
    localStorage.setItem("downloadsvg", "");
  }
  return true;
});
export default router;
