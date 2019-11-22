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

## URI Transform Options

## Options

* `backgroundalpha`: Default is `1`. Possible values are 0-1. This applies when cropping an image which results in the original image not completely covering the new dimensions. Example: `backgroundalpha:0.5`
* `backgroundcolor`: Default is `000`. This is the hex color code value excluding the `#`. This is parsed by the [color](https://www.npmjs.com/package/color) module. This applies when cropping an image which results in the original image not completely covering the new dimensions. Example: `backgroundcolor:000`
* `blur`: Possible values are 0.3-1000. Example: `blur:0.5`
* `fit`: Default is `cover`. Possible values are: `cover`, `contain`, `fill`, `inside`, and `outside`. Check the [sharp docs](https://sharp.pixelplumbing.com/en/stable/api-resize/) for more information. Example: `fit:cover`
* `gravity`: Default is `center`. Possible values are: `north`, `northeast`, `east`, `southeast`, `south`, `southwest`, `west`, `northwest`, `center`, `entropy`, `attention`. Check the [sharp docs](https://sharp.pixelplumbing.com/en/stable/api-resize/) for more information. Example: `gravity:attention`
* `height`: Default is to respect ratio. Acceptable values are a positive integer. Example: `height:100`
* `left`: This can be a float. Used for custom extraction/crop from the top left corner. Example: `width:100,height:100,left:100,top:100`
* `mirror`: Possible values are: `x` or `y`. Will mirror the image across the given axis. Example: `mirror:x`
* `output`: Default is to use the extension of the image. Possible values are: `jpeg`, `png`, or `webp`. Example: `output:webp`
* `quality`: Default is 80. Possible values are 1-100. Applies to `jpeg` and `webp`. Example: `quality:50`
* `rotate`: The value should be an angle and can be a float. The image is auto rotated based on exif data before applying other transforms. Example: `rotate:45`
* `signature`: Not required but recommended. A sha1 hex digest of the options (excluding signature) and path to the image. This will be verified on the server before processing.
* `top`: This can be a float. Used for custom extraction/crop from the top left corner. Example: `width:100,height:100,left:100,top:100`
* `version`: This is primarily for cache busting. Example: `version:101`
* `width`: Default is to respect ratio. Acceptable values are a positive integer. Example: `width:100`

## Compound Transforms

It is possible to do to multiple transformations serially by separating groups of options with a semi-colon. For example we could extract part of an image and then resize.

```
/top:20,left:5,width:250,height:250-width:100,height:100,gravity:entropy-signature:sha1hexdigest/path/to/image.jpg`
```

## Delimiters

There are a few options for what delimiters you can use out of the box. Here is a break down of the URI fragment that is relevant.

* Key-Value pairs (`width:100`): These can be separated by `_`, `:`, or `=`.
* Options or groups of key-value pairs (`width:100,height:100`): These can only be separated by `,`.
* Groups of options (`width:100-blur:0.3`): These can only be separated by `-`.


## Signing

It is highly recommended that you sign your URIs and keep your token private. This provides a level of protection against unauthorized transforms. Here is an example of generating a signed URI:

```
const crypto = require('crypto')

const secretToken = 'my-secret-token'

function sign (token, options, path) {
  const hmac = crypto.createHmac('sha1', token)
  hmac.update(`${options}/${path}`)
  const signature = hmac.digest('hex')
  return `${options}-signature:${signature}/${path}`
}

const signedFragment = sign(secretToken, 'width:100', 'path/to/image.jpg')
```
