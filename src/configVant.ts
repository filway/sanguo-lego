// import all used components in whole projects

import {
  Button, Row, Col, Icon, Empty, Loading, Notify
} from 'vant';
import { App } from 'vue';

const components = [
  Button,
  Row,
  Col,
  Icon,
  Empty,
  Loading,
  Notify
];
const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};
export default {
  install,
};
