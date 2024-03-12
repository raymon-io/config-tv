"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verboseLog = void 0;
const debug = require('debug')('expo:react-native-tvos:config-tv');
function verboseLog(message, options) {
    const tokens = [message];
    options?.property && tokens.unshift(options?.property);
    options?.platform && tokens.unshift(options?.platform);
    debug(tokens.join(': '));
}
exports.verboseLog = verboseLog;
