import { ConfigPlugin } from 'expo/config-plugins';
import { ConfigData } from './types';
/** Dangerously makes changes needed for TV in SplashScreen.storyboard. */
export declare const withTVSplashScreen: ConfigPlugin<ConfigData>;
export declare function addTVSplashScreenModifications(src: string): string;
