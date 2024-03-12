import { ConfigPlugin } from 'expo/config-plugins';
import { ConfigData } from './types';
/** Dangerously makes or reverts TV changes in the project Podfile. */
export declare const withTVPodfile: ConfigPlugin<ConfigData>;
export declare function addTVPodfileModifications(src: string): string;
