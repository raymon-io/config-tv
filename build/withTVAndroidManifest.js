"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTouchscreenHardwareFeatureToManifest = exports.setTVBanner = exports.removePortraitOrientation = exports.setLeanBackLauncherIntent = exports.withTVAndroidManifest = void 0;
const config_plugins_1 = require("expo/config-plugins");
const utils_1 = require("./utils");
const { getMainActivity, getMainApplication } = config_plugins_1.AndroidConfig.Manifest;
const withTVAndroidManifest = (config, params = {}) => {
    const androidTVBannerPath = (0, utils_1.androidTVBanner)(params);
    return (0, config_plugins_1.withAndroidManifest)(config, (config) => {
        config.modResults = setLeanBackLauncherIntent(config, config.modResults, params);
        config.modResults = removePortraitOrientation(config, config.modResults, params);
        config.modResults = addTouchscreenHardwareFeatureToManifest(config, config.modResults, params);
        if (androidTVBannerPath) {
            config.modResults = setTVBanner(config, config.modResults, params, androidTVBannerPath);
        }
        return config;
    });
};
exports.withTVAndroidManifest = withTVAndroidManifest;
const LEANBACK_LAUNCHER_CATEGORY = 'android.intent.category.LEANBACK_LAUNCHER';
function getMainLaunchIntent(androidManifest) {
    const mainActivity = getMainActivity(androidManifest);
    const intentFilters = mainActivity?.['intent-filter'];
    const mainLaunchIntents = (intentFilters ?? []).filter((i) => {
        const action = i.action ?? [];
        if (action.length === 0) {
            return false;
        }
        return action[0]?.$['android:name'] === 'android.intent.action.MAIN';
    });
    return mainLaunchIntents.length ? mainLaunchIntents[0] : undefined;
}
function leanbackLauncherCategoryExistsInMainLaunchIntent(mainLaunchIntent) {
    const mainLaunchCategories = mainLaunchIntent.category ?? [];
    const mainLaunchIntentCategoriesWithLeanbackLauncher = mainLaunchCategories.filter((c) => c.$['android:name'] === LEANBACK_LAUNCHER_CATEGORY);
    return mainLaunchIntentCategoriesWithLeanbackLauncher.length > 0;
}
function setLeanBackLauncherIntent(_config, androidManifest, params) {
    const mainLaunchIntent = getMainLaunchIntent(androidManifest);
    if (!mainLaunchIntent) {
        throw new Error(`${utils_1.packageNameAndVersion}: no main intent in main activity of Android manifest`);
    }
    if (!leanbackLauncherCategoryExistsInMainLaunchIntent(mainLaunchIntent)) {
        // Leanback needs to be added
        (0, utils_1.verboseLog)('adding TV leanback launcher category to main intent in AndroidManifest.xml', {
            params,
            platform: 'android',
            property: 'manifest',
        });
        const mainLaunchCategories = mainLaunchIntent.category ?? [];
        mainLaunchCategories.push({
            $: {
                'android:name': LEANBACK_LAUNCHER_CATEGORY,
            },
        });
        mainLaunchIntent.category = mainLaunchCategories;
    }
    return androidManifest;
}
exports.setLeanBackLauncherIntent = setLeanBackLauncherIntent;
function removePortraitOrientation(_config, androidManifest, params) {
    const mainActivity = getMainActivity(androidManifest);
    if (mainActivity?.$) {
        const metadata = mainActivity?.$ ?? {};
        if (metadata['android:screenOrientation']) {
            (0, utils_1.verboseLog)('removing screen orientation from AndroidManifest.xml', {
                params,
                platform: 'android',
                property: 'manifest',
            });
            delete metadata['android:screenOrientation'];
        }
    }
    return androidManifest;
}
exports.removePortraitOrientation = removePortraitOrientation;
function setTVBanner(_config, androidManifest, params, androidTVBannerPath) {
    if (!androidTVBannerPath) {
        return androidManifest;
    }
    const mainApplication = getMainApplication(androidManifest);
    if (mainApplication?.$) {
        const metadata = mainApplication?.$ ?? {};
        (0, utils_1.verboseLog)('adding TV banner to AndroidManifest.xml', {
            params,
            platform: 'android',
            property: 'manifest',
        });
        metadata['android:banner'] = '@drawable/tv_banner';
    }
    return androidManifest;
}
exports.setTVBanner = setTVBanner;
function addTouchscreenHardwareFeatureToManifest(_config, androidManifest, params) {
    // Add `<uses-feature android:name="android.hardware.touchscreen" android:required="false"/>` to the AndroidManifest.xml
    if (!Array.isArray(androidManifest.manifest['uses-feature'])) {
        androidManifest.manifest['uses-feature'] = [];
    }
    if (!androidManifest.manifest['uses-feature'].find((item) => item.$['android:name'] === 'android.hardware.touchscreen') &&
        !androidManifest.manifest['uses-feature'].find((item) => item.$['android:name'] === 'android.hardware.faketouch') &&
        !androidManifest.manifest['uses-feature'].find((item) => item.$['android:name'] === 'android.software.leanback')) {
        (0, utils_1.verboseLog)('adding TV touchscreen hardware feature tag to AndroidManifest.xml', {
            params,
            platform: 'android',
            property: 'manifest',
        });
        androidManifest.manifest['uses-feature']?.push({
            $: {
                'android:name': 'android.hardware.touchscreen',
                'android:required': 'false',
            },
        });
        androidManifest.manifest['uses-feature']?.push({
            $: {
                'android:name': 'android.hardware.faketouch',
                'android:required': 'false',
            },
        });
        // add android.software.leanback to false
        androidManifest.manifest['uses-feature']?.push({
            $: {
                'android:name': 'android.software.leanback',
                'android:required': 'false',
            },
        });
    }
    return androidManifest;
}
exports.addTouchscreenHardwareFeatureToManifest = addTouchscreenHardwareFeatureToManifest;
