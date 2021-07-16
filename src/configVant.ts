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
];
const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};
export default {
  install,
};
