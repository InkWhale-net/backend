let { decodeAddress, encodeAddress } = require("@polkadot/keyring");
let { hexToU8a, isHex } = require("@polkadot/util");
const toStream = require('it-to-stream');
let FileType = require('file-type');
let axios = require("axios");

module.exports.splitFileName = function (path) {
    return str.split('\\').pop().split('/').pop();
}

module.exports.randomString = function (length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

module.exports.getFileTypeFromCID = async function (ipfs,cid) {

  let fileExt =  await FileType.fromStream(toStream(ipfs.cat(cid, {
    length: 100 // or however many bytes you need
  })));
  return fileExt;
}


module.exports.isValidAddressPolkadotAddress = function (address) {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    //console.log(error);
    return false;
  }
}

module.exports.delay = function (timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

module.exports.todayFolder = function () {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months = require(1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var hour = dateObj.getHours();

  return year + "/" + month + "/" + day + "/" + hour;
}
