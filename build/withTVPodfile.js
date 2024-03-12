"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTVPodfileModifications = exports.withTVPodfile = void 0;
const generateCode_1 = require("@expo/config-plugins/build/utils/generateCode");
const config_plugins_1 = require("expo/config-plugins");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
/** Dangerously makes or reverts TV changes in the project Podfile. */
const withTVPodfile = (c, params = {}) => {
    return (0, config_plugins_1.withDangerousMod)(c, [
        'ios',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        async (config) => {
            const file = path_1.default.join(config.modRequest.platformProjectRoot, 'Podfile');
            const contents = await fs_1.promises.readFile(file, 'utf8');
            const modifiedContents = addTVPodfileModifications(contents);
            (0, utils_1.verboseLog)('modifying Podfile for tvOS', {
                params,
                platform: 'ios',
                property: 'podfile',
            });
            await fs_1.promises.writeFile(file, modifiedContents, 'utf-8');
            return config;
        },
    ]);
};
exports.withTVPodfile = withTVPodfile;
const MOD_TAG = 'react-native-tvos-import';
function addTVPodfileModifications(src) {
    if (src.indexOf('platform :tvos') !== -1) {
        return src;
    }
    const newSrc = (0, generateCode_1.mergeContents)({
        tag: MOD_TAG,
        src,
        newSrc: "source 'https://github.com/react-native-tvos/react-native-tvos-podspecs.git'\nsource 'https://cdn.cocoapods.org/'\n",
        anchor: /^/,
        offset: 0,
        comment: '#',
    }).contents;
    return newSrc.replace('platform :ios', 'platform :tvos');
}
exports.addTVPodfileModifications = addTVPodfileModifications;
