import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index.vue";
import Editor from "../views/Editor.vue";
import Download from "../views/Download.vue";

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
  return true;
});
export default router;
