const http = require("http");
const https = require("https");

let Apsis = {};

Apsis.endpoints = new Map([
    ['transaction.sendEmail', '/v1/transactional/projects/{projectId}/sendEmail'],
]);

Apsis.demogaraphicKeyValueBindings = new Map([
    ['firstName', 'Fornamn'],
    ['lastName', 'Efternamn'],
    ['phone', 'PhoneNumber'],
    ['company', 'Organisation'],
    ['area', 'Lan'],
]);

Apsis.init = (options) => {
    if(!options.ApiKey)
        throw new Error("API Key is required to initate the API");

    this.options = Object.assign({
        https: true
    }, options);

    this.options.ApiKey = new Buffer(options.ApiKey).toString('base64');
};

Apsis.request = (path, method, body) => {
    body = JSON.stringify(body);

    let options = {
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

    let requester = this.options.https ? https : http;
    options.port = this.options.https ? 8443 : 80;

    return new Promise((resolve, reject) => {
        let req = requester.request(options, (res) => {
            let data = "";

            res.setEncoding('utf8');
            res.on('data', (d) => {
                data += d;
            });

            res.on('end', (response) => {
                resolve(JSON.parse(data));
            });
        });

        req.on('error', reject);

        req.write(body);
        req.end();
    });
};

Apsis.sendTransactionEmail = (projectId, recipientData, subscriberData) => {

    let endpoint = Apsis.endpoints.get('transaction.sendEmail').replace('{projectId}', projectId);

    let data = {};

    data.Name = recipientData.name;
    data.Email = recipientData.email;

    data.DemDataFields = buildDemographicsData(subscriberData);
    data.Format = 'HTML';
    data.SendingType = 't';

    function buildDemographicsData(input) {
        let _demographics = [];

        for (let [key, value] of Apsis.demogaraphicKeyValueBindings) {

            if ( input.hasOwnProperty(key) )
                _demographics.push({
                    'Key': value,
                    'Value': input[key]
                })
        }

        return _demographics
    }

    return Apsis.request(endpoint, 'POST', data);
}

module.exports = Apsis;
