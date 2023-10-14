import { createRoot } from "react-dom/client";
import App from "./component/App.js";

document.addEventListener("DOMContentLoaded", function () {
  const container = document.createElement("span");
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(App());
});

if ("serviceWorker" in navigator) {
  import(/* webpackChunkName: "workbox" */ "workbox-window")
    .then(({ Workbox }) => {
      new Workbox("/service-worker.js").register();

      return;
    })
    .catch((err) => {
      console.error(err);
    });
}
