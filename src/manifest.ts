import { ManifestType } from "@src/manifest-type";
import packageJson from "../package.json";

const manifest: ManifestType = {
  manifest_version: 3,
  name: packageJson.displayName ?? packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  background: { service_worker: "src/pages/background/index.js" },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icons/34x34.png",
  },
  icons: {
    "128": "icons/128x128.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
    },
  ],
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "assets/img/*"],
      matches: ["*://*/*"],
    },
  ],
  permissions: ["storage"],
};

export default manifest;
