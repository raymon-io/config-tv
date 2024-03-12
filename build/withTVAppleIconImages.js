"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTVAppleIconImages = void 0;
const config_plugins_1 = require("expo/config-plugins");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const { getProjectName } = config_plugins_1.IOSConfig.XcodeUtils;
/**
 * Constructs Apple TV brand assets from images passed into the `appleTVImages` plugin property
 * If any images do not exist, an exception is thrown.
 */
const withTVAppleIconImages = (c, params = {}) => {
    return (0, config_plugins_1.withDangerousMod)(c, [
        'ios',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        async (config) => {
            if (!params.appleTVImages) {
                return config;
            }
            (0, utils_1.verboseLog)(`adding Apple TV brand assets to Apple TV native code`, {
                params,
                platform: 'ios',
                property: 'xcodeproject',
            });
            utils_1.appleTVImageTypes.forEach((imageType) => {
                const imagePath = (0, utils_1.appleTVImagePathForType)(params, imageType);
                if (!imagePath) {
                    throw new Error(`One or more image paths not defined`);
                }
                if (!(0, fs_1.existsSync)(imagePath)) {
                    throw new Error(`No image found at path ${imagePath}`);
                }
            });
            const projectRoot = config.modRequest.projectRoot;
            const iosImagesPath = path_1.default.join(getIosNamedProjectPath(projectRoot), IMAGES_PATH);
            const iconSmallSourceImages = [
                {
                    path: params.appleTVImages.iconSmall,
                    scale: '1x',
                },
                {
                    path: params.appleTVImages.iconSmall2x,
                    scale: '2x',
                },
            ];
            const iconLargeSourceImages = [
                {
                    path: params.appleTVImages.icon,
                    scale: '1x',
                },
            ];
            /*
            const appStoreIconSourceImages: SourceImageJson[] = [
              {
                path: params.appleTVImages.icon,
              },
            ];
             */
            const topShelfSourceImages = [
                {
                    path: params.appleTVImages.topShelf,
                    scale: '1x',
                },
                {
                    path: params.appleTVImages.topShelf2x,
                    scale: '2x',
                },
            ];
            const topShelfWideSourceImages = [
                {
                    path: params.appleTVImages.topShelfWide,
                    scale: '1x',
                },
                {
                    path: params.appleTVImages.topShelfWide2x,
                    scale: '2x',
                },
            ];
            const sourceBrandAssets = {
                name: 'TVAppIcon',
                assets: [
                    {
                        role: 'top-shelf-image',
                        size: '1920x720',
                        imageSet: {
                            name: 'Top Shelf Image',
                            sourceImages: topShelfSourceImages,
                        },
                    },
                    {
                        role: 'top-shelf-image-wide',
                        size: '2320x720',
                        imageSet: {
                            name: 'Top Shelf Image Wide',
                            sourceImages: topShelfWideSourceImages,
                        },
                    },
                    /*
                    {
                      role: 'primary-app-icon',
                      size: '1280x768',
                      imageStack: {
                        name: 'App Icon - App Store',
                        sourceLayers: [
                          {
                            name: 'Front',
                            sourceImages: appStoreIconSourceImages,
                          },
                          {
                            name: 'Middle',
                            sourceImages: appStoreIconSourceImages,
                          },
                          {
                            name: 'Back',
                            sourceImages: appStoreIconSourceImages,
                          },
                        ],
                      },
                    },
                     */
                    {
                        role: 'primary-app-icon',
                        size: '400x240',
                        imageStack: {
                            name: 'App Icon - Small',
                            sourceLayers: [
                                {
                                    name: 'Front',
                                    sourceImages: iconSmallSourceImages,
                                },
                                {
                                    name: 'Middle',
                                    sourceImages: iconSmallSourceImages,
                                },
                                {
                                    name: 'Back',
                                    sourceImages: iconSmallSourceImages,
                                },
                            ],
                        },
                    },
                    {
                        role: 'primary-app-icon',
                        size: '1280x768',
                        imageStack: {
                            name: 'App Icon - Large',
                            sourceLayers: [
                                {
                                    name: 'Front',
                                    sourceImages: iconLargeSourceImages,
                                },
                                {
                                    name: 'Middle',
                                    sourceImages: iconLargeSourceImages,
                                },
                                {
                                    name: 'Back',
                                    sourceImages: iconLargeSourceImages,
                                },
                            ],
                        },
                    },
                ],
            };
            await (0, utils_1.createBrandAssetsAsync)(iosImagesPath, sourceBrandAssets);
            return config;
        },
    ]);
};
exports.withTVAppleIconImages = withTVAppleIconImages;
function getIosNamedProjectPath(projectRoot) {
    const projectName = getProjectName(projectRoot);
    return path_1.default.join(projectRoot, 'ios', projectName);
}
const IMAGES_PATH = 'Images.xcassets';
