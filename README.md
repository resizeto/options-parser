# resize.to options parser

[![Greenkeeper badge](https://badges.greenkeeper.io/resizeto/options-parser.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/resizeto/options-parser/badge.svg?branch=master)](https://coveralls.io/github/resizeto/options-parser?branch=master)

Parses a URI fragment and returns a collection of options to pass along to a [transformer](https://github.com/resizeto/transformer). This is a building block for creating image transformation services.

Example:

```
const uriFragment = 'width:100,height:100,output:webp/path/to/image.jpg'
const parser = new Parser(uriFragment)
const optionsCollection = parser.parse()
// optionsCollection == [{ width: 100, height: 100, output: 'webp' }]
// parser.path == 'path/to/image.jpg'
```

There are a few options for what delimiters you can use out of the box. Here is a break down of the URI fragment that is relevant.

* Key-Value pairs (`width:100`): These can be separated by `_`, `:`, or `=`.
* Options or groups of key-value pairs (`width:100,height:100`): These can only be separated by `,`.
* Groups of options (`width:100;blur:0.3`): These can only be separated by `;`.

This also supports URI signing which provides a level of protection against unauthorized transforms but the token must remain private. Here is an example of generating a signed URI:

```
const crypto = require('crypto')

const secretToken = 'my-secret-token'

function sign (token, options, path) {
  const hmac = crypto.createHmac('sha1', token)
  hmac.update(`${options}/${path}`)
  const signature = hmac.digest('hex')
  return `${options};signature:${signature}/${path}`
}

const signedFragment = sign(secretToken, 'width:100', 'path/to/image.jpg')
```
