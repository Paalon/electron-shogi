import builder from "electron-builder";
import fs from "fs";

const target = process.argv[2];

/**
* @type {import('electron-builder').Configuration}
* @see https://www.electron.build/configuration/configuration
*/
const config = {
  productName: "ElectronShogi",
  extraMetadata: {
    main: "dist/packed/background.js"
  },
  extends: null,
  files: [
    "dist/assets",
    "dist/board",
    "dist/character",
    "dist/icon",
    "dist/piece",
    "dist/sound",
    "dist/index.html",
    "dist/packed",
    "!node_modules/**/*",
  ],
  afterPack: function(context) {
    if (context.electronPlatformName === 'darwin') {
      return;
    }
    let localeDir = context.appOutDir+'/locales/';
    for (const file of fs.readdirSync(localeDir)) {
      switch (file) {
        case "en-US.pak":
        case "ja.pak":
          break;
        default:
          fs.unlinkSync(localeDir + file);
          break;
      }
    }
  },
  win: {
    fileAssociations: {
      name: "Kifu",
      ext: ["kif", "kifu", "csa"],
    },
  },
  nsis: {
    allowElevation: false,
    packElevateHelper: false,
  },
  mac: {
    electronLanguages: ["en", "ja"],
    fileAssociations: {
      name: "Kifu",
      ext: ["kif", "kifu", "csa"],
    },
    extendInfo: {
      CFBundleDocumentTypes: [
        {
          CFBundleTypeExtensions: ["kif", "kifu", "csa"],
          CFBundleTypeName: "Kifu",
          CFBundleTypeRole: "Editor",
          LSHandlerRank: "Owner",
        },
      ],
    },
  },
  linux: {
    target: "AppImage",
    fileAssociations: [
      { name: "KIF", ext: "kif", },
      { name: "KIFU", ext: "kifu" },
      { name: "CSA", ext: "csa" },
    ],
  },
  publish: null,
};

switch (target) {
  case "portable":
    config.win.target = "portable";
    break;
}

builder.build({ config })
.then((result) => {
  console.log(JSON.stringify(result))
})
.catch((error) => {
  throw error;
})
