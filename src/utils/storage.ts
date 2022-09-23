import type { FunctionJob } from "./types";
import { IsURL } from "./utils";

export type ChromeStorage = {
  [key: string]: string;
};

export const SubToUrlUpdate = <T = never>(
  cbFn: (key: string, newValue: T) => void
) => {
  chrome.storage.onChanged.addListener(function (changes) {
    for (const [key, { newValue }] of Object.entries(changes))
      cbFn(key, newValue);
  });
};

export const GetAllUrls = async (): Promise<FunctionJob<ChromeStorage>> => {
  try {
    const resp = await chrome.storage.sync.get();
    if (typeof resp !== "object") return { success: false };

    return { success: true, data: resp };
  } catch (err) {
    return { success: false };
  }
};

export const SetUrl = async (
  UrlToRedirect: string,
  RedirectionUrl: string
): Promise<FunctionJob> => {
  if (!IsURL(UrlToRedirect) || !IsURL(RedirectionUrl)) return;

  UrlToRedirect = new URL(UrlToRedirect).host;
  RedirectionUrl = new URL(RedirectionUrl).origin;

  try {
    await chrome.storage.sync.set({ [UrlToRedirect]: RedirectionUrl });
    console.log("Storage Set!");

    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

export const DeleteUrl = async (
  UrlToRedirect: string
): Promise<FunctionJob> => {
  if (!IsURL("https://" + UrlToRedirect)) return;

  try {
    await chrome.storage.sync.remove(UrlToRedirect);
    console.log("Storage Updated!");

    return { success: true };
  } catch (err) {
    return { success: false };
  }
};
