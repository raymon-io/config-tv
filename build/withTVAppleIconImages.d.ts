import { ConfigPlugin } from 'expo/config-plugins';
import { ConfigData } from './types';
/**
 * Constructs Apple TV brand assets from images passed into the `appleTVImages` plugin property
 * If any images do not exist, an exception is thrown.
 */
export declare const withTVAppleIconImages: ConfigPlugin<ConfigData>;
