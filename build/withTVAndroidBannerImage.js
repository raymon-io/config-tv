"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTVAndroidBannerImage = void 0;
const config_plugins_1 = require("expo/config-plugins");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const drawableDirectoryNames = [
    'drawable',
    'drawable-hdpi',
    'drawable-mdpi',
    'drawable-xhdpi',
    'drawable-xxhdpi',
    'drawable-xxxhdpi',
];
/** Copies TV banner image to the Android resources drawable folders. If image does not exist, throw an exception. */
const withTVAndroidBannerImage = (c, params = {}) => {
    const androidTVBannerPath = (0, utils_1.androidTVBanner)(params);
    return (0, config_plugins_1.withDangerousMod)(c, [
        'android',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        async (config) => {
            if (!androidTVBannerPath) {
                return config;
            }
            (0, utils_1.verboseLog)(`adding TV banner image ${androidTVBannerPath} to Android resources`, {
                params,
                platform: 'android',
                property: 'manifest',
            });
            for (const drawableDirectoryName of drawableDirectoryNames) {
                const drawableDirectoryPath = path_1.default.join(config.modRequest.platformProjectRoot, 'app', 'src', 'main', 'res', drawableDirectoryName);
                if (!(0, fs_1.existsSync)(drawableDirectoryPath)) {
                    await fs_1.promises.mkdir(drawableDirectoryPath);
                }
                await fs_1.promises.copyFile(androidTVBannerPath, path_1.default.join(drawableDirectoryPath, 'tv_banner.png'));
            }
            return config;
        },
    ]);
};
exports.withTVAndroidBannerImage = withTVAndroidBannerImage;
