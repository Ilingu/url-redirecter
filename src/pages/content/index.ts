import type { ChromeStorage } from "@src/utils/storage";
import type { FunctionJob } from "@src/utils/types";

const GetAllUrls = async (): Promise<FunctionJob<ChromeStorage>> => {
  try {
    const resp = await chrome.storage.sync.get();
    if (typeof resp !== "object") return { success: false };

    return { success: true, data: resp };
  } catch (err) {
    return { success: false };
  }
};
const IsURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

/* APP */
const main = async () => {
  console.log("[URLREDIRECTER]: ContentScript loaded");

  const { success, data: Urls } = await GetAllUrls();
  if (!success || !Urls) return console.log("No Matching Url");

  const CurrentUrl = window.location.host;

  const toRedirect = Object.keys(Urls).find((url) =>
    CurrentUrl.toLowerCase().includes(url.toLowerCase())
  );
  if (!toRedirect) return console.log("No Matching Url");

  const MatchUrl = Urls[toRedirect];
  if (!CurrentUrl || !IsURL(MatchUrl)) return console.log("No Matching Url");

  window.location.replace(MatchUrl + window.location.pathname);
};
main();
