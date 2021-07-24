import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
const steps: Driver.Step[] = [
  {
    element: ".van-icon-browsing-history-o",
    popover: {
      title: " ",
      description: "点击预览",
    },
  },
  {
    element: ".van-icon-replay",
    popover: {
      title: " ",
      description: "布局重置",
      position: "bottom",
      offset: -100,
    },
  },
  {
    element: ".van-icon-down",
    popover: {
      title: " ",
      description: "进入下载",
      position: "bottom",
      offset: -180,
    },
  },
  {
    element: ".imageBox",
    popover: {
      title: " ",
      description: "选择布局方式",
    },
  },
];

const useDriver = (): void => {
  const driver = new Driver();
  driver.defineSteps(steps);
  driver.start();
};
export default useDriver;
