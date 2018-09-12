apsis
===
[![npm version](https://badge.fury.io/js/apsis-js.svg)](https://badge.fury.io/js/apsis-js)

Npm package for apsis newsletter marketing service.

## Getting Started

Install using npm:
```
npm install apsis
```

Require and initiate in your project:
```js
const apsis = require('apsis');

apsis.init({
  ApiKey: xxx
});
```

Each method returns a promise.

## Methods

Right now this package only has one method.

```js
Apsis.sendTransactionEmail(projectId, recipientData, subscriberData)
```
