cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-certificates/www/certificate.js",
        "id": "cordova-plugin-certificates.Certificates",
        "pluginId": "cordova-plugin-certificates",
        "clobbers": [
            "cordova.plugins.certificates"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-certificates": "0.6.4"
}
// BOTTOM OF METADATA
});