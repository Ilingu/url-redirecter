import { render } from "solid-js/web";
import "./index.css";
import Layout from "./Layout";

const appContainer = document.querySelector("#app-container");
if (!appContainer) {
  throw new Error("Can not find AppContainer");
}

render(Layout, appContainer);
