export type ContentsJsonImageIdiom = 'tv';
export type ContentsJsonImageAppearance = {
    appearance: 'luminosity';
    value: 'dark';
};
export type ContentsJsonImageScale = '1x' | '2x' | '3x';
export type ContentsJsonImageRole = 'primary-app-icon' | 'top-shelf-image' | 'top-shelf-image-wide';
export interface ContentsJsonImage {
    appearances?: ContentsJsonImageAppearance[];
    idiom: ContentsJsonImageIdiom;
    size?: string;
    scale?: ContentsJsonImageScale;
    filename: string;
}
export interface ContentsJsonImageLayer {
    filename: string;
}
export interface ContentsJsonAsset {
    filename?: string;
    idiom?: ContentsJsonImageIdiom;
    role?: ContentsJsonImageRole;
    size?: string;
}
export interface ContentsJson {
    assets?: ContentsJsonAsset[];
    images?: ContentsJsonImage[];
    layers?: ContentsJsonImageLayer[];
    info: {
        version: number;
        author: string;
    };
}
export interface SourceImageJson {
    path: string;
    scale?: string;
}
export interface SourceImageSetJson {
    name: string;
    sourceImages: SourceImageJson[];
}
export interface SourceImageLayerJson {
    name: string;
    sourceImages: SourceImageJson[];
}
export interface SourceImageStackJson {
    name: string;
    sourceLayers: SourceImageLayerJson[];
}
export interface SourceBrandAssetJson {
    role: ContentsJsonImageRole;
    size: string;
    imageStack?: SourceImageStackJson;
    imageSet?: SourceImageSetJson;
}
export interface SourceBrandAssetsJson {
    name: string;
    assets: SourceBrandAssetJson[];
}
/**
 * Writes the Config.json which is used to assign images to their respective platform, dpi, and idiom.
 *
 * @param directory path to add the Contents.json to.
 * @param contents image json data
 */
export declare function writeContentsJsonAsync(directory: string, options: {
    assets?: ContentsJsonAsset[];
    images?: ContentsJsonImage[];
    layers?: ContentsJsonImageLayer[];
}): Promise<void>;
/**
 * Creates an image set directory with its Contents.json and any images
 */
export declare function createImageSetAsync(destinationPath: string, imageSet: SourceImageSetJson): Promise<void>;
/**
 * Creates an image stack layer directory with its Contents.json and any images
 */
export declare function createImageStackLayerAsync(destinationPath: string, layer: SourceImageLayerJson): Promise<void>;
/**
 * Creates an image stack directory with its Contents.json and any layers
 */
export declare function createImageStackAsync(destinationPath: string, stack: SourceImageStackJson): Promise<void>;
/**
 * Creates a brand assets directory with its Contents.json and any assets
 */
export declare function createBrandAssetsAsync(destinationPath: string, brandAssets: SourceBrandAssetsJson): Promise<void>;
