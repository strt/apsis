apsis
===
[![npm version](https://badge.fury.io/js/apsis.svg)](https://badge.fury.io/js/apsis)

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

Right now this package only has one method; create a subscriber to a mailing list.

```js
apsis.subscriber.create(MailingListId, UpdateIfExists, subscriber)
```

## Todo
* Add implementation for missing API methods
