"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("expo/config-plugins");
const withTVAndroidManifest_1 = require("./withTVAndroidManifest");
const withTVAppleIconImages_1 = require("./withTVAppleIconImages");
const withTVPodfile_1 = require("./withTVPodfile");
const withTVSplashScreen_1 = require("./withTVSplashScreen");
const withTVXcodeProject_1 = require("./withTVXcodeProject");
const withTVAndroidRemoveFlipper_1 = require("./withTVAndroidRemoveFlipper");
const withTVAndroidBannerImage_1 = require("./withTVAndroidBannerImage");
const utils_1 = require("./utils");
const withTVNoEffect = (config, params = {}) => {
    (0, utils_1.verboseLog)(`${utils_1.packageNameAndVersion}: isTV == false, plugin will have no effect`, {});
    return config;
};
const withTVPlugin = (config, params = {}) => {
    const isTV = (0, utils_1.isTVEnabled)(params);
    if (!isTV) {
        config = withTVNoEffect(config, params);
        return config;
    }
    config = (0, withTVAppleIconImages_1.withTVAppleIconImages)(config, params); // This should be done before Apple Xcode project config
    config = (0, withTVXcodeProject_1.withTVXcodeProject)(config, params);
    config = (0, withTVPodfile_1.withTVPodfile)(config, params);
    config = (0, withTVSplashScreen_1.withTVSplashScreen)(config, params);
    config = (0, withTVAndroidBannerImage_1.withTVAndroidBannerImage)(config, params); // This should be done before Android manifest config
    config = (0, withTVAndroidManifest_1.withTVAndroidManifest)(config, params);
    config = (0, withTVAndroidRemoveFlipper_1.withTVAndroidRemoveFlipper)(config, params);
    return config;
};
const pkg = require('../package.json');
exports.default = (0, config_plugins_1.createRunOncePlugin)(withTVPlugin, pkg.name, pkg.version);
