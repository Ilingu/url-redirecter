import {
  ChromeStorage,
  DeleteUrl,
  GetAllUrls,
  SetUrl,
} from "@src/utils/storage";
import { IsURL } from "@src/utils/utils";
import { createSignal, For, onMount, Show } from "solid-js";

interface Props {
  ActiveNav: number;
}

const Popup = (props: Props) => {
  return (
    <Show when={props.ActiveNav === 0} fallback={<ManageRedirect />}>
      <AddRedirect />
    </Show>
  );
};

const ManageRedirect = () => {
  const [Urls, setUrls] = createSignal<ChromeStorage>({});

  const fetchUrls = async () => {
    const { success, data } = await GetAllUrls();
    if (!success) return;

    setUrls(data);
  };
  onMount(fetchUrls);

  const getRedirectionUrl = (key: string): string => Urls()[key];

  return (
    <div id="Page2">
      <For each={Object.keys(Urls())}>
        {(UrlToRedirect) => (
          <>
            <div class="url">
              <code>{UrlToRedirect}</code> <span>➡</span>{" "}
              <code>{new URL(getRedirectionUrl(UrlToRedirect)).host}</code>
              <span
                class="deleteurl"
                onClick={() => DeleteUrl(UrlToRedirect) && fetchUrls()}
              >
                🚮
              </span>
            </div>
            <hr />
          </>
        )}
      </For>
    </div>
  );
};

const AddRedirect = () => {
  const [InputToRedirect, setInputToRedirect] = createSignal("");
  const [InputRedirection, setInputRedirection] = createSignal("");

  let PrimaryInput: HTMLInputElement;

  const AddRedirectFn = async (
    e: Event & { currentTarget: HTMLFormElement }
  ) => {
    e.preventDefault();

    if (!IsURL(InputToRedirect()) || !IsURL(InputRedirection()))
      return alert("Error, invalid url");

    const { success } = await SetUrl(InputToRedirect(), InputRedirection());
    success && alert("Redirection successfully created");
  };

  onMount(() => {
    PrimaryInput?.focus();
  });

  return (
    <form id="Page1" onSubmit={AddRedirectFn} style={{}}>
      Redirect{" "}
      <input
        type="url"
        value={InputToRedirect()}
        onChange={({ currentTarget }) =>
          setInputToRedirect(currentTarget?.value || "")
        }
        spellcheck={false}
        required
        placeholder="Website A"
        ref={PrimaryInput}
      />{" "}
      ➡
      <input
        type="url"
        value={InputRedirection()}
        onChange={({ currentTarget }) =>
          setInputRedirection(currentTarget?.value || "")
        }
        spellcheck={false}
        required
        placeholder="Website B"
      />
      <button type="submit">✅ Ok</button>
    </form>
  );
};

export default Popup;
