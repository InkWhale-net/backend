let { decodeAddress, encodeAddress } = require("@polkadot/keyring");
let { hexToU8a, isHex } = require("@polkadot/util");
const toStream = require('it-to-stream');
let FileType = require('file-type');
let axios = require("axios");
let { BN, BN_ONE } = require('@polkadot/util');

const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);

module.exports.send_telegram_message = async (message) => {

    const { data } = await axios({
      baseURL: "https://api.telegram.org/bot5345932208:AAHTgUrXV3TBDsJpASGRzh5_NxRpt1RV4ws",
      url: "/sendMessage",
      method: "post",
      data: {
        "chat_id": -646752258,
        "text": message
      },
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        'Access-Control-Allow-Origin': '*',
      },
    });
}

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

// For read-only queries we don't need the exact gas limit
// as the account will not be charged for making the call.
module.exports.readOnlyGasLimit = function (api) {
  return api.registry.createType('WeightV2', {
    refTime: new BN(1_000_000_000_000),
    proofSize: MAX_CALL_WEIGHT,
  });
}

