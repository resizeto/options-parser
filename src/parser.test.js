/* eslint-env jest */
const { OptionKeyUnknownError, OptionValueInvalidError, SignatureMismatchError, SignatureMissingError } = require('./errors.js')
const Parser = require('./parser.js')
const crypto = require('crypto')

function sign (token, options, path) {
  let hmac = crypto.createHmac('sha1', token)
  hmac.update(`${options}/${path}`)
  let signature = hmac.digest('hex')
  return `${options};signature:${signature}/${path}`
}

let path = 'path/to/image.jpg'

test('path works with leading /', () => {
  let options = 'width:100'
  let parser = new Parser(`/${options}/${path}`)
  parser.parse()
  expect(parser.path).toBe(path)
  expect(parser.optionsString).toBe(options)
})

test('path works without leading /', () => {
  let options = 'width:100'
  let parser = new Parser(`${options}/${path}`)
  parser.parse()
  expect(parser.path).toBe(path)
  expect(parser.optionsString).toBe(options)
})

test('signature missing', () => {
  let parser = new Parser(`width:100/${path}`, '123', true)
  expect(parser.token).toBe('123')
  expect(parser.signatureRequired).toBe(true)
  expect(() => { parser.parse() }).toThrow(SignatureMissingError)
  expect(() => { parser.verifySignature() }).toThrow(SignatureMismatchError)
})

test('signature mismatch', () => {
  let uri = sign('456', 'width:100', path)
  let parser = new Parser(uri, '123', true)
  expect(() => { parser.parse() }).not.toThrow(SignatureMissingError)
  expect(() => { parser.parse() }).toThrow(SignatureMismatchError)
})

test('signature match', () => {
  let uri = sign('123', 'width:100', path)
  let parser = new Parser(uri, '123', true)
  expect(() => { parser.parse() }).not.toThrow(SignatureMissingError)
  expect(() => { parser.parse() }).not.toThrow(SignatureMismatchError)
})

test('unknown option key', () => {
  let parser = new Parser(`notakey:notavalue/${path}`)
  expect(() => { parser.parse() }).toThrow(OptionKeyUnknownError)
})

test('invalid option value', () => {
  let parser = new Parser(`blur:0/${path}`)
  expect(() => { parser.parse() }).toThrow(OptionValueInvalidError)
})

test('multiple options without signature', () => {
  let options = [
    ['width', '100'],
    ['height', '100'],
    ['output', 'webp']
  ]
  let expected = [
    ['width', 100],
    ['height', 100],
    ['output', 'webp']
  ]

  let delimiters = ['_', ':', '=']

  delimiters.forEach((delimiter) => {
    let optionsString = options.map((option) => option.join(delimiter)).join(',')

    let uri = `${optionsString}/${path}`
    let parser = new Parser(uri)
    let parsedOptionsCollection = parser.parse()[0]

    expected.forEach((expectedSetting) => {
      expect(parsedOptionsCollection.options[expectedSetting[0]]).toBe(expectedSetting[1])
    })
  })
})

test('multiple options with signature', () => {
  let options = [
    ['width', '100'],
    ['height', '100'],
    ['output', 'webp']
  ]
  let expected = [
    ['width', 100],
    ['height', 100],
    ['output', 'webp']
  ]

  let delimiters = ['_', ':', '=']

  delimiters.forEach((delimiter) => {
    let optionsString = options.map((option) => option.join(delimiter)).join(',')

    let uri = sign('123', optionsString, path)
    let parser = new Parser(uri, '123', true)
    let parsedOptionsCollection = parser.parse()[0]

    expected.forEach((expectedSetting) => {
      expect(parsedOptionsCollection.options[expectedSetting[0]]).toBe(expectedSetting[1])
    })
  })
})

test('compound options without signature', () => {
  let optionsCollection = [
    [
      ['width', '100'],
      ['height', '100']
    ],
    [
      ['blur', '0.3'],
      ['output', 'webp']
    ]
  ]
  let expectedCollection = [
    [
      ['width', 100],
      ['height', 100]
    ],
    [
      ['blur', 0.3],
      ['output', 'webp']
    ]
  ]

  let delimiters = ['_', ':', '=']

  delimiters.forEach((delimiter) => {
    let options = optionsCollection.map((options) => {
      return options.map((option) => option.join('_')).join(',')
    }).join(';')

    let parser = new Parser(`${options}/${path}`)
    let parsedOptionsCollection = parser.parse()
    parsedOptionsCollection.forEach((parsedOptions, index) => {
      expectedCollection[index].forEach((expectedSetting) => {
        expect(parsedOptions.options[expectedSetting[0]]).toBe(expectedSetting[1])
      })
    })
  })
})

test('compound options with signature', () => {
  let optionsCollection = [
    [
      ['width', '100'],
      ['height', '100']
    ],
    [
      ['blur', '0.3'],
      ['output', 'webp']
    ]
  ]
  let expectedCollection = [
    [
      ['width', 100],
      ['height', 100]
    ],
    [
      ['blur', 0.3],
      ['output', 'webp']
    ]
  ]

  let delimiters = ['_', ':', '=']

  delimiters.forEach((delimiter) => {
    let options = optionsCollection.map((options) => {
      return options.map((option) => option.join('_')).join(',')
    }).join(';')

    let uri = sign('123', options, path)
    let parser = new Parser(uri, '123', true)
    let parsedOptionsCollection = parser.parse()
    parsedOptionsCollection.forEach((parsedOptions, index) => {
      expectedCollection[index].forEach((expectedSetting) => {
        expect(parsedOptions.options[expectedSetting[0]]).toBe(expectedSetting[1])
      })
    })
  })
})
