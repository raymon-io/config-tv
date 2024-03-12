import { ConfigPlugin } from 'expo/config-plugins';
import { ConfigData } from './types';
/** Copies TV banner image to the Android resources drawable folders. If image does not exist, throw an exception. */
export declare const withTVAndroidBannerImage: ConfigPlugin<ConfigData>;
