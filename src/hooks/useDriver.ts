/**
 * @author filway
 * @description 引导教学
 */
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
const steps: Driver.Step[] = [
  {
    element: ".van-icon-browsing-history-o",
    popover: {
      title: " ",
      description: "预览场景",
      prevBtnText: "上一步",
      nextBtnText: "下一步",
      closeBtnText: "关闭",
    },
  },
  {
    element: ".van-icon-replay",
    popover: {
      title: " ",
      description: "布局重置",
      position: "bottom",
      offset: -100,
      prevBtnText: "上一步",
      nextBtnText: "下一步",
      closeBtnText: "关闭",
    },
  },
  {
    element: ".van-icon-down",
    popover: {
      title: " ",
      description: "进入下载",
      position: "bottom",
      offset: -180,
      prevBtnText: "上一步",
      nextBtnText: "下一步",
      closeBtnText: "关闭",
    },
  },
  {
    element: ".tab1Box",
    popover: {
      title: " ",
      prevBtnText: "上一步",
      nextBtnText: "下一步",
      closeBtnText: "关闭",
      doneBtnText: "我知道啦!",
      description:
        "您可以通过点击按钮，自定义logo的颜色，文字的内容以及整体结构",
    },
  },
];

const useDriver = (): void => {
  const driver = new Driver();
  driver.setSteps();
  driver.defineSteps(steps);
  driver.start();
};
export default useDriver;
