"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrandAssetsAsync = exports.createImageStackAsync = exports.createImageStackLayerAsync = exports.createImageSetAsync = exports.writeContentsJsonAsync = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
/**
 * Writes the Config.json which is used to assign images to their respective platform, dpi, and idiom.
 *
 * @param directory path to add the Contents.json to.
 * @param contents image json data
 */
async function writeContentsJsonAsync(directory, options) {
    await fs_1.promises.mkdir(directory, { recursive: true });
    await fs_1.promises.writeFile(path_1.default.join(directory, 'Contents.json'), JSON.stringify({
        assets: options.assets,
        images: options.images,
        layers: options.layers,
        info: {
            version: 1,
            // common practice is for the tool that generated the icons to be the "author"
            author: 'expo',
        },
    }, null, 2));
}
exports.writeContentsJsonAsync = writeContentsJsonAsync;
/**
 * Creates an image set directory with its Contents.json and any images
 */
async function createImageSetAsync(destinationPath, imageSet) {
    const imageSetPath = path_1.default.join(destinationPath, `${imageSet.name}.imageset`);
    await writeContentsJsonAsync(imageSetPath, {
        images: imageSet.sourceImages.map((image) => ({
            filename: path_1.default.basename(image.path),
            idiom: 'tv',
            scale: image.scale,
        })),
    });
    for (const image of imageSet.sourceImages) {
        await fs_1.promises.copyFile(image.path, path_1.default.join(imageSetPath, path_1.default.basename(image.path)));
    }
}
exports.createImageSetAsync = createImageSetAsync;
/**
 * Creates an image stack layer directory with its Contents.json and any images
 */
async function createImageStackLayerAsync(destinationPath, layer) {
    const imageStackLayerPath = path_1.default.join(destinationPath, `${layer.name}.imagestacklayer`);
    await writeContentsJsonAsync(imageStackLayerPath, {});
    await createImageSetAsync(imageStackLayerPath, {
        name: 'Content',
        sourceImages: layer.sourceImages,
    });
}
exports.createImageStackLayerAsync = createImageStackLayerAsync;
/**
 * Creates an image stack directory with its Contents.json and any layers
 */
async function createImageStackAsync(destinationPath, stack) {
    const imageStackPath = path_1.default.join(destinationPath, `${stack.name}.imagestack`);
    await writeContentsJsonAsync(imageStackPath, {
        layers: stack.sourceLayers.map((layer) => ({
            filename: `${layer.name}.imagestacklayer`,
        })),
    });
    for (const sourceLayer of stack.sourceLayers) {
        await createImageStackLayerAsync(imageStackPath, {
            name: sourceLayer.name,
            sourceImages: sourceLayer.sourceImages,
        });
    }
}
exports.createImageStackAsync = createImageStackAsync;
/**
 * Creates a brand assets directory with its Contents.json and any assets
 */
async function createBrandAssetsAsync(destinationPath, brandAssets) {
    const brandAssetsPath = path_1.default.join(destinationPath, `${brandAssets.name}.brandassets`);
    await writeContentsJsonAsync(brandAssetsPath, {
        assets: brandAssets.assets.map((brandAsset) => {
            if (brandAsset.imageStack) {
                return {
                    filename: `${brandAsset.imageStack.name}.imagestack`,
                    role: brandAsset.role,
                    size: brandAsset.size,
                    idiom: 'tv',
                };
            }
            else if (brandAsset.imageSet) {
                return {
                    filename: `${brandAsset.imageSet.name}.imageset`,
                    role: brandAsset.role,
                    size: brandAsset.size,
                    idiom: 'tv',
                };
            }
            else {
                return {}; // Should never happen, but need this to keep Typescript happy
            }
        }),
    });
    for (const asset of brandAssets.assets) {
        if (asset.imageSet) {
            await createImageSetAsync(brandAssetsPath, asset.imageSet);
        }
        if (asset.imageStack) {
            await createImageStackAsync(brandAssetsPath, asset.imageStack);
        }
    }
}
exports.createBrandAssetsAsync = createBrandAssetsAsync;
