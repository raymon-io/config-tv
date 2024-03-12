import { ExpoConfig } from 'expo/config';
import { AndroidConfig, ConfigPlugin } from 'expo/config-plugins';
import { ConfigData } from './types';
export declare const withTVAndroidManifest: ConfigPlugin<ConfigData>;
export declare function setLeanBackLauncherIntent(_config: Pick<ExpoConfig, 'android'>, androidManifest: AndroidConfig.Manifest.AndroidManifest, params: ConfigData): AndroidConfig.Manifest.AndroidManifest;
export declare function removePortraitOrientation(_config: Pick<ExpoConfig, 'android'>, androidManifest: AndroidConfig.Manifest.AndroidManifest, params: ConfigData): AndroidConfig.Manifest.AndroidManifest;
export declare function setTVBanner(_config: Pick<ExpoConfig, 'android'>, androidManifest: AndroidConfig.Manifest.AndroidManifest, params: ConfigData, androidTVBannerPath: string | undefined): AndroidConfig.Manifest.AndroidManifest;
export declare function addTouchscreenHardwareFeatureToManifest(_config: Pick<ExpoConfig, 'android'>, androidManifest: AndroidConfig.Manifest.AndroidManifest, params: ConfigData): AndroidConfig.Manifest.AndroidManifest;
