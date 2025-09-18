/*
 * MeshCentral MySQL Logger Plugin (TEST versie)
 */

module.exports.plugin = function (parent) {
    console.log("[MySQL Logger] plugin.js geladen");

    this.onServerStart = () => {
        console.log("[MySQL Logger] Plugin gestart");
    };
};
