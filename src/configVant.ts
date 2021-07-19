// import all used components in whole projects

import {
  Button,
  Row,
  Col,
  Icon,
  Empty,
  Loading,
  Notify,
  Tab,
  Tabs,
  NavBar,
  Image,
  Popover,
  Slider,
  Dialog,
  Field,
  DropdownItem,
  DropdownMenu,
  Swipe,
  SwipeItem,
  Skeleton,
  Toast,
  Sticky,
} from "vant";
import { App } from "vue";

const components = [
  Button,
  Row,
  Col,
  Icon,
  Empty,
  Loading,
  Notify,
  Tab,
  Tabs,
  NavBar,
  Image,
  Popover,
  Slider,
  Dialog.Component,
  Field,
  DropdownMenu,
  DropdownItem,
  Swipe,
  SwipeItem,
  Skeleton,
  Toast,
  Sticky,
];
const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};
export default {
  install,
};
