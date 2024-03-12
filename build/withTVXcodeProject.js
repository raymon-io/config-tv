"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setXcodeProjectBuildSettings = exports.withTVXcodeProject = void 0;
const config_plugins_1 = require("expo/config-plugins");
const utils_1 = require("./utils");
const withTVXcodeProject = (config, params) => {
    const deploymentTarget = (0, utils_1.tvosDeploymentTarget)(params);
    return (0, config_plugins_1.withXcodeProject)(config, async (config) => {
        config.modResults = await setXcodeProjectBuildSettings(config, {
            project: config.modResults,
            params,
            deploymentTarget,
        });
        return config;
    });
};
exports.withTVXcodeProject = withTVXcodeProject;
function setXcodeProjectBuildSettings(config, { project, params, deploymentTarget, }) {
    const configurations = project.pbxXCBuildConfigurationSection();
    // @ts-ignore
    for (const { buildSettings } of Object.values(configurations || {})) {
        // Guessing that this is the best way to emulate Xcode.
        // Using `project.addToBuildSettings` modifies too many targets.
        if (buildSettings !== undefined) {
            buildSettings.SDKROOT = 'appletvos';
        }
        if (typeof buildSettings?.PRODUCT_NAME !== 'undefined') {
            (0, utils_1.verboseLog)(`modifying target ${buildSettings?.PRODUCT_NAME} for tvOS`, {
                params,
                platform: 'ios',
                property: 'xcodeproject',
            });
            buildSettings.TARGETED_DEVICE_FAMILY = '3';
            buildSettings.TVOS_DEPLOYMENT_TARGET = deploymentTarget;
            if (typeof buildSettings?.IOS_DEPLOYMENT_TARGET !== 'undefined') {
                delete buildSettings?.IOS_DEPLOYMENT_TARGET;
            }
            if (params.appleTVImages) {
                // set the app icon source
                if (buildSettings.ASSETCATALOG_COMPILER_APPICON_NAME === 'AppIcon') {
                    buildSettings.ASSETCATALOG_COMPILER_APPICON_NAME = 'TVAppIcon';
                }
            }
        }
    }
    return project;
}
exports.setXcodeProjectBuildSettings = setXcodeProjectBuildSettings;
