/* eslint-env jest */
const { OptionKeyUnknownError, OptionValueInvalidError, SignatureMismatchError, SignatureMissingError } = require('./errors.js')
const Parser = require('./parser.js')
const crypto = require('crypto')

function sign (token, options, path) {
  const hmac = crypto.createHmac('sha1', token)
  hmac.update(`${options}/${path}`)
  const signature = hmac.digest('hex')
  return `${options};signature:${signature}/${path}`
}

const path = 'path/to/image.jpg'

test('path works with leading /', () => {
  const options = 'width:100'
  const parser = new Parser(`/${options}/${path}`)
  parser.parse()
  expect(parser.path).toBe(path)
  expect(parser.optionsString).toBe(options)
})

test('path works without leading /', () => {
  const options = 'width:100'
  const parser = new Parser(`${options}/${path}`)
  parser.parse()
  expect(parser.path).toBe(path)
  expect(parser.optionsString).toBe(options)
})

test('signature missing', () => {
  const parser = new Parser(`width:100/${path}`, '123', true)
  expect(parser.token).toBe('123')
  expect(parser.signatureRequired).toBe(true)
  expect(() => { parser.parse() }).toThrow(SignatureMissingError)
  expect(() => { parser.verifySignature() }).toThrow(SignatureMismatchError)
})

test('signature mismatch', () => {
  const uri = sign('456', 'width:100', path)
  const parser = new Parser(uri, '123', true)
  expect(() => { parser.parse() }).not.toThrow(SignatureMissingError)
  expect(() => { parser.parse() }).toThrow(SignatureMismatchError)
})

test('signature match', () => {
  const uri = sign('123', 'width:100', path)
  const parser = new Parser(uri, '123', true)
  expect(() => { parser.parse() }).not.toThrow(SignatureMissingError)
  expect(() => { parser.parse() }).not.toThrow(SignatureMismatchError)
})

test('unknown option key', () => {
  const parser = new Parser(`notakey:notavalue/${path}`)
  expect(() => { parser.parse() }).toThrow(OptionKeyUnknownError)
})

test('invalid option value', () => {
  const parser = new Parser(`blur:0/${path}`)
  expect(() => { parser.parse() }).toThrow(OptionValueInvalidError)
})

test('optionsCollection is a collection of frozen objects', () => {
  const parser = new Parser(`width:100;blur:0.3/${path}`)
  const parsedOptionsCollection = parser.parse()
  expect(parsedOptionsCollection.length).toBe(2)
  expect(Object.isFrozen(parsedOptionsCollection[0])).toBe(true)
  expect(Object.isFrozen(parsedOptionsCollection[1])).toBe(true)
})

test('multiple options without signature', () => {
  const options = [
    ['width', '100'],
    ['height', '100'],
    ['output', 'webp']
  ]
  const expected = [
    ['width', 100],
    ['height', 100],
    ['output', 'webp']
  ]

  const delimiters = ['_', ':', '=']

  delimiters.forEach((delimiter) => {
    const optionsString = options.map((option) => option.join(delimiter)).join(',')

    const uri = `${optionsString}/${path}`
    const parser = new Parser(uri)
    const parsedOptionsCollection = parser.parse()[0]

    expected.forEach((expectedSetting) => {
      expect(parsedOptionsCollection[expectedSetting[0]]).toBe(expectedSetting[1])
    })
  })
})

test('multiple options with signature', () => {
  const options = [
    ['width', '100'],
    ['height', '100'],
    ['output', 'webp']
  ]
  const expected = [
    ['width', 100],
    ['height', 100],
    ['output', 'webp']
  ]

  const delimiters = ['_', ':', '=']

  delimiters.forEach((delimiter) => {
    const optionsString = options.map((option) => option.join(delimiter)).join(',')

    const uri = sign('123', optionsString, path)
    const parser = new Parser(uri, '123', true)
    const parsedOptionsCollection = parser.parse()[0]

    expected.forEach((expectedSetting) => {
      expect(parsedOptionsCollection[expectedSetting[0]]).toBe(expectedSetting[1])
    })
  })
})

test('compound options without signature', () => {
  const optionsCollection = [
    [
      ['width', '100'],
      ['height', '100']
    ],
    [
      ['blur', '0.3'],
      ['output', 'webp']
    ]
  ]
  const expectedCollection = [
    [
      ['width', 100],
      ['height', 100]
    ],
    [
      ['blur', 0.3],
      ['output', 'webp']
    ]
  ]

  const delimiters = ['_', ':', '=']

  delimiters.forEach((delimiter) => {
    const options = optionsCollection.map((options) => {
      return options.map((option) => option.join('_')).join(',')
    }).join(';')

    const parser = new Parser(`${options}/${path}`)
    const parsedOptionsCollection = parser.parse()
    parsedOptionsCollection.forEach((parsedOptions, index) => {
      expectedCollection[index].forEach((expectedSetting) => {
        expect(parsedOptions[expectedSetting[0]]).toBe(expectedSetting[1])
      })
    })
  })
})

test('compound options with signature', () => {
  const optionsCollection = [
    [
      ['width', '100'],
      ['height', '100']
    ],
    [
      ['blur', '0.3'],
      ['output', 'webp']
    ]
  ]
  const expectedCollection = [
    [
      ['width', 100],
      ['height', 100]
    ],
    [
      ['blur', 0.3],
      ['output', 'webp']
    ]
  ]

  const delimiters = ['_', ':', '=']

  delimiters.forEach((delimiter) => {
    const options = optionsCollection.map((options) => {
      return options.map((option) => option.join('_')).join(',')
    }).join(';')

    const uri = sign('123', options, path)
    const parser = new Parser(uri, '123', true)
    const parsedOptionsCollection = parser.parse()
    parsedOptionsCollection.forEach((parsedOptions, index) => {
      expectedCollection[index].forEach((expectedSetting) => {
        expect(parsedOptions[expectedSetting[0]]).toBe(expectedSetting[1])
      })
    })
  })
})
