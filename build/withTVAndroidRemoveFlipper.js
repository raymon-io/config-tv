"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTVAndroidRemoveFlipper = void 0;
const config_plugins_1 = require("expo/config-plugins");
const fs_1 = require("fs");
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
/** Dangerously makes or reverts TV changes in the project Podfile. */
const withTVAndroidRemoveFlipper = (c, params = {}) => {
    const androidRemoveFlipper = (0, utils_1.shouldRemoveFlipperOnAndroid)(params);
    return (0, config_plugins_1.withDangerousMod)(c, [
        'android',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        async (config) => {
            if (androidRemoveFlipper) {
                // Modify main application
                const mainApplicationFile = mainApplicationFilePath(config.modRequest.platformProjectRoot);
                (0, utils_1.verboseLog)('removing Flipper from MainApplication file', {
                    params,
                    platform: 'android',
                    property: 'manifest',
                });
                const mainApplicationContents = await fs_1.promises.readFile(mainApplicationFile, 'utf8');
                const mainApplicationModifiedContents = commentOutLinesWithString(mainApplicationContents, 'Flipper');
                await fs_1.promises.writeFile(mainApplicationFile, mainApplicationModifiedContents, 'utf-8');
                // Modify app/build.gradle
                const buildGradleFile = appBuildGradleFilePath(config.modRequest.platformProjectRoot);
                (0, utils_1.verboseLog)('removing Flipper from android/app/build.gradle', {
                    params,
                    platform: 'android',
                    property: 'manifest',
                });
                const buildGradleContents = await fs_1.promises.readFile(buildGradleFile, 'utf-8');
                const buildGradleModifiedContents = commentOutLinesWithString(buildGradleContents, 'flipper');
                await fs_1.promises.writeFile(buildGradleFile, buildGradleModifiedContents, 'utf-8');
            }
            return config;
        },
    ]);
};
exports.withTVAndroidRemoveFlipper = withTVAndroidRemoveFlipper;
const mainApplicationFilePath = (androidRoot) => {
    const paths = glob_1.default.sync(`${androidRoot}/**/MainApplication.*`);
    if (paths.length > 0) {
        return paths[0];
    }
    else {
        throw new Error('AndroidApplication path not found');
    }
};
const appBuildGradleFilePath = (androidRoot) => path_1.default.resolve(androidRoot, 'app', 'build.gradle');
const commentOutLinesWithString = (contents, searchString) => {
    return contents
        .split('\n')
        .map((line) => {
        if (line.indexOf(searchString) !== -1) {
            return line.replace(/^/, '// ');
        }
        return line;
    })
        .join('\n');
};
