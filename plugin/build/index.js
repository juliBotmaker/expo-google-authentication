"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Documentation for config plugin build: https://www.npmjs.com/package/expo-module-scripts.
// Documentation for config plugins: https://docs.expo.dev/config-plugins/introduction/.
const Scheme_1 = require("@expo/config-plugins/build/ios/Scheme");
const pkg = require("../../package.json");
const config_plugins_1 = require("expo/config-plugins");
const withGooglePlugin = (config, options) => {
    return (0, config_plugins_1.withInfoPlist)(config, (config) => {
        config.modResults = (0, Scheme_1.appendScheme)(options.iosUrlScheme, config.modResults);
        return config;
    });
};
exports.default = (0, config_plugins_1.createRunOncePlugin)(withGooglePlugin, pkg.name, pkg.version);
