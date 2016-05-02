const http = require("http");
const https = require("https");

var Apsis = {};

Apsis.init = (options) => {
  if(!options.ApiKey) throw new Error("API Key is required to initate the API");

  this.options = Object.assign({
    https: true
  }, options);
  this.options.ApiKey = new Buffer(options.ApiKey).toString('base64');
}

Apsis.request = (path, method, body) => {
  body = JSON.stringify(body);
  var options = {
    hostname: 'se.api.anpdm.com',
    path: path,
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-Length': body.length,
      'Authorization': `Basic ${this.options.ApiKey}`
    }
  };

  var requester = this.options.https ? https : http;
  options.port = this.options.https ? 8443 : 80;

  return new Promise((resolve, reject) => {
    var req = requester.request(options, (res) => {
      var data = "";

      res.setEncoding('utf8');
      res.on('data', (d) => {
        data += d;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', reject);

    req.write(body);
    req.end();
  });
}

/*
  SUBSCRIBER METHODS
*/
Apsis.subscriber = {
  create: (MailingListId, UpdateIfExists, subscriber) => {
    var path = `/v1/subscribers/mailinglist/${MailingListId}/create?updateIfExists=${UpdateIfExists}`;
    return Apsis.request(path, 'POST', subscriber);
  }
}

module.exports = Apsis;
