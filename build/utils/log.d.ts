import { ConfigData } from '../types';
export declare function verboseLog(message: string, options?: {
    params?: ConfigData;
    platform?: 'android' | 'ios';
    property?: string;
}): void;
