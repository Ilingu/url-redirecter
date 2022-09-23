import { createEffect, createSignal } from "solid-js";
import Popup from "./Popup";

const Layout = () => {
  const [ActiveNav, setActiveNav] = createSignal(0);

  createEffect(() => {
    const ActiveId = ActiveNav();
    if (ActiveId > 1) return setActiveNav(0);
    if (ActiveId === 0) document.body.style.height = "100px";
    else document.body.style.height = "260px";
  });

  return (
    <main>
      <nav>
        <div
          onClick={() => setActiveNav(0)}
          class={ActiveNav() === 0 ? "active" : ""}
        >
          New Redirect
        </div>
        <div
          onClick={() => setActiveNav(1)}
          class={ActiveNav() === 1 ? "active" : ""}
        >
          Manager
        </div>
      </nav>
      <Popup ActiveNav={ActiveNav()} />
    </main>
  );
};

export default Layout;
