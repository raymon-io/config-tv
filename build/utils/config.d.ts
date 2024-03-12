import { ConfigData } from '../types';
export declare const packageNameAndVersion: string;
export declare function isTVEnabled(params: ConfigData): boolean;
export declare function tvosDeploymentTarget(params: ConfigData): string;
export declare function shouldRemoveFlipperOnAndroid(params: ConfigData): boolean;
export declare function androidTVBanner(params: ConfigData): string | undefined;
export declare const appleTVImageTypes: string[];
export declare function appleTVImagePathForType(params: ConfigData, imageType: string): string | undefined;
