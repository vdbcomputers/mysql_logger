/** 
* @description MYSQL Logger Plugin
* @author Jeroen van den Boogaart
* @copyright 
* @license Apache-2.0
* @version v0.0.1
*/

"use strict";

const mysql = require('mysql2');

module.exports.mysqllogger = function (parent) {
    var obj = {};
    obj.parent = parent;

    console.log("[MySQL Logger] geladen");

    // DB pool
    const db = mysql.createPool({
        host: '127.0.0.1',
        user: 'meshuser',
        password: '43x897G@*E27f4gf2rf',
        database: 'meshmonitor'
    });

    function logEvent(type, node, details) {
        db.query(
            "INSERT INTO events2 (event_type, server_name, details, timestamp) VALUES (?,?,?,NOW())",
            [
                type,
                node ? node.name : null,
                JSON.stringify(details || {})
            ],
            (err) => { if (err) console.error("MySQL insert error:", err); }
        );
    }

    // Wordt aangeroepen bij serverstart
    obj.server_startup = function () {
        console.log("[MySQL Logger] Plugin gestart");
        logEvent('server_start', null, {});
    };

    // Wordt aangeroepen bij server shutdown
    obj.server_shutdown = function () {
        logEvent('server_stop', null, {});
    };

    // Wordt aangeroepen als een node connect
    obj.node_connect = function (node) {
        logEvent('node_connected', node, {});
    };

    // Wordt aangeroepen als een node disconnect
    obj.node_disconnect = function (node) {
        logEvent('node_disconnected', node, {});
    };

    return obj;
};
