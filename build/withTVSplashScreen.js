"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTVSplashScreenModifications = exports.withTVSplashScreen = void 0;
const config_plugins_1 = require("expo/config-plugins");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
/** Dangerously makes changes needed for TV in SplashScreen.storyboard. */
const withTVSplashScreen = (config, params = {}) => {
    return (0, config_plugins_1.withDangerousMod)(config, [
        'ios',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        async (config) => {
            if (!config.modRequest.projectName) {
                throw new Error(`The ${utils_1.packageNameAndVersion} plugin requires a configured project name.`);
            }
            const file = path_1.default.join(config.modRequest.platformProjectRoot, config.modRequest.projectName, 'SplashScreen.storyboard');
            const contents = await fs_1.promises.readFile(file, 'utf8');
            const modifiedContents = addTVSplashScreenModifications(contents);
            (0, utils_1.verboseLog)('modifying SplashScreen.storyboard for tvOS', {
                params,
                platform: 'ios',
                property: 'splashscreen',
            });
            await fs_1.promises.writeFile(file, modifiedContents, 'utf-8');
            return config;
        },
    ]);
};
exports.withTVSplashScreen = withTVSplashScreen;
const splashScreenStringsForPhone = [
    'com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB',
    'targetRuntime="iOS.CocoaTouch"',
    'id="retina5_5"',
    '<deployment identifier="iOS"/>',
];
const splashScreenStringsForTV = [
    'com.apple.InterfaceBuilder.AppleTV.Storyboard',
    'targetRuntime="AppleTV"',
    'id="appleTV"',
    '<deployment identifier="tvOS"/>',
];
function modifySource(src, originalStrings, replacementStrings) {
    let modifiedSource = src;
    originalStrings.forEach((s, i) => {
        const original = new RegExp(`${s}`, 'g');
        const replacement = replacementStrings[i];
        modifiedSource = modifiedSource.replace(original, replacement);
    });
    return modifiedSource;
}
function addTVSplashScreenModifications(src) {
    return modifySource(src, splashScreenStringsForPhone, splashScreenStringsForTV);
}
exports.addTVSplashScreenModifications = addTVSplashScreenModifications;
