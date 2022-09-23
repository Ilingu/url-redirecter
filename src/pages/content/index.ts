import type { ChromeStorage } from "@src/utils/storage";
import type { FunctionJob } from "@src/utils/types";

// Modules Funcs recipient
let isURL: (url: string) => boolean;
let getAllUrls: () => Promise<FunctionJob<ChromeStorage>>;

// Fetch and assign module
import("@src/utils/utils").then(async ({ IsURL }) => {
  isURL = IsURL; // Load Utils
  LoadDependencies(); // Dispatch Load State
});
import("@src/utils/storage").then(async ({ GetAllUrls }) => {
  getAllUrls = GetAllUrls; // Load storage utils
  LoadDependencies(); // Dispatch Load State
});
// Handle Module Loads and trigger main when load end
let NumberOfModulesToLoad = 2;
const LoadDependencies = () => {
  NumberOfModulesToLoad--;
  if (NumberOfModulesToLoad <= 0) main();
};

/* APP */
const main = async () => {
  console.log("[URLREDIRECTER]: ContentScript loaded");

  const { success, data: Urls } = await getAllUrls();
  if (!success || !Urls) return console.log("No Matching Url");

  const CurrentUrl = window.location.host;

  const toRedirect = Object.keys(Urls).find((url) =>
    CurrentUrl.toLowerCase().includes(url.toLowerCase())
  );
  if (!toRedirect) return console.log("No Matching Url");

  const MatchUrl = Urls[toRedirect];
  if (!CurrentUrl || !isURL(MatchUrl)) return console.log("No Matching Url");

  window.location.replace(MatchUrl + window.location.pathname);
};
