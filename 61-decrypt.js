module.exports = function(RED) {
    "use strict";
    var crypto = require("crypto");

    function Des3Decrypt(n) {
        RED.nodes.createNode(this, n);
        this.key = n.key;
        var node = this;
        this.on("input", function(msg) {
            var key = node.key;
            if(msg.key)
                key = msg.key;
            msg.payload = decrypt3DES(msg.payload, key);
            node.send(msg);
        });
    }
    RED.nodes.registerType("3DesDecrypt", Des3Decrypt);

    function decrypt3DES(ciphertext, key) {
        var iv = new Buffer("0000000000000000", "hex");
        var hexkey = new Buffer(key, "hex");
        var decipher = crypto.createDecipheriv("des3", hexkey, iv);
        return decipher.update(ciphertext, "hex", "utf8") + decipher.final("utf8");
    }

}
