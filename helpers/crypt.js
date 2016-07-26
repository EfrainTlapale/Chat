const crypto = require('crypto');

exports.encrypt = function(text){
  var cipher = crypto.createCipher('aes-256-cbc',process.env.CRYPT || 'cbduicbduisbuewwef568485""$+2634');
  var crypted = cipher.update(text.toString(),'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

exports.decrypt = function(text){
  var decipher = crypto.createDecipher('aes-256-cbc',process.env.CRYPT || 'cbduicbduisbuewwef568485""$+2634');
  var dec = decipher.update(text.toString(),'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}