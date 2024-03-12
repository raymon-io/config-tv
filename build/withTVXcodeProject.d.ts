import { ExpoConfig } from '@expo/config-types';
import { ConfigPlugin, XcodeProject } from 'expo/config-plugins';
import { ConfigData } from './types';
export declare const withTVXcodeProject: ConfigPlugin<ConfigData>;
export declare function setXcodeProjectBuildSettings(config: Pick<ExpoConfig, 'ios'>, { project, params, deploymentTarget, }: {
    project: XcodeProject;
    params: ConfigData;
    deploymentTarget: string;
}): XcodeProject;
