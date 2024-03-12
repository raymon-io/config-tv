"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appleTVImagePathForType = exports.appleTVImageTypes = exports.androidTVBanner = exports.shouldRemoveFlipperOnAndroid = exports.tvosDeploymentTarget = exports.isTVEnabled = exports.packageNameAndVersion = void 0;
const getenv_1 = require("getenv");
class Env {
    /** Enable prebuild for TV */
    get EXPO_TV() {
        return (0, getenv_1.boolish)('EXPO_TV', false);
    }
}
const env = new Env();
const pkg = require('../../package.json');
const defaultTvosDeploymentVersion = '13.4';
exports.packageNameAndVersion = `${pkg.name}@${pkg.version}`;
function isTVEnabled(params) {
    return env.EXPO_TV || (params?.isTV ?? false);
}
exports.isTVEnabled = isTVEnabled;
function tvosDeploymentTarget(params) {
    return params?.tvosDeploymentTarget ?? defaultTvosDeploymentVersion;
}
exports.tvosDeploymentTarget = tvosDeploymentTarget;
function shouldRemoveFlipperOnAndroid(params) {
    return params?.removeFlipperOnAndroid ?? true;
}
exports.shouldRemoveFlipperOnAndroid = shouldRemoveFlipperOnAndroid;
function androidTVBanner(params) {
    return params?.androidTVBanner;
}
exports.androidTVBanner = androidTVBanner;
exports.appleTVImageTypes = [
    'icon',
    'iconSmall',
    'iconSmall2x',
    'topShelf',
    'topShelf2x',
    'topShelfWide',
    'topShelfWide2x',
];
function appleTVImagePathForType(params, imageType) {
    switch (imageType) {
        case 'icon':
            return params?.appleTVImages?.icon;
        case 'iconSmall':
            return params?.appleTVImages?.iconSmall;
        case 'iconSmall2x':
            return params?.appleTVImages?.iconSmall2x;
        case 'topShelf':
            return params?.appleTVImages?.topShelf;
        case 'topShelf2x':
            return params?.appleTVImages?.topShelf2x;
        case 'topShelfWide':
            return params?.appleTVImages?.topShelfWide;
        case 'topShelfWide2x':
            return params?.appleTVImages?.topShelfWide2x;
        default:
            return undefined;
    }
}
exports.appleTVImagePathForType = appleTVImagePathForType;
