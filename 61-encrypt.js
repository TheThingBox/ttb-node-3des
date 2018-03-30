module.exports = function(RED) {
  "use strict";
  var crypto = require("crypto");

  function Des3Encrypt(n) {
    RED.nodes.createNode(this, n);
    this.key = n.key;
    var node = this;
    this.on("input", function(msg) {
      var key = node.key;
      if(msg.key){
        key = msg.key;
      }
      var payload = msg.payload;
      if(typeof payload !== "string") {
        payload = JSON.stringify(payload);
      }
      msg.payload = encrypt3DES(payload, key);
      node.send(msg);
    });
  }
  RED.nodes.registerType("3DesEncrypt", Des3Encrypt);

  function encrypt3DES(plaintext, key) {
    var iv = new Buffer("0000000000000000", "hex");
    var hexkey = new Buffer(key, "hex");
    var cipher = crypto.createCipheriv("des3", hexkey, iv);
    return cipher.update(plaintext, "utf8", "hex") + cipher.final("hex");
  }
}
