/* eslint-env jest */
const { OptionValueInvalidError } = require('./errors.js')
const Options = require('./options.js')

test('backgroundalpha', () => {
  const options = new Options()
  const values = ['1', '0', '0.5']
  const expected = [1.0, 0.0, 0.5]
  const expectedRGB = [
    'rgb(0, 0, 0)',
    'rgba(0, 0, 0, 0)',
    'rgba(0, 0, 0, 0.5)'
  ]
  expect(options.options.backgroundalpha).toBe(1)
  expect(options.backgroundalpha).toBe(1)
  expect(options.backgroundalpha).toBe(1)
  values.forEach((val, index) => {
    options.backgroundalpha = val
    expect(options.options.backgroundalpha).toBe(expected[index])
    expect(options.backgroundalpha).toBe(expected[index])
    expect(options.options.backgroundrgb).toBe(expectedRGB[index])
    expect(options.backgroundrgb).toBe(expectedRGB[index])
  })
})

test('backgroundcolor', () => {
  const options = new Options()
  const values = ['fff', 'ffffff']
  expect(options.options.backgroundcolor).toBe('#000')
  expect(options.backgroundcolor).toBe('#000')
  values.forEach((val) => {
    options.backgroundcolor = val
    expect(options.options.backgroundcolor).toBe(`#${val}`)
    expect(options.backgroundcolor).toBe(`#${val}`)
    expect(options.options.backgroundrgb).toBe('rgb(255, 255, 255)')
    expect(options.backgroundrgb).toBe('rgb(255, 255, 255)')
  })
})

test('blur', () => {
  const options = new Options()
  const values = ['0.3', '100', '1000']
  const expected = [0.3, 100, 1000]
  expect(options.options.blur).toBe(null)
  expect(() => { options.blur = '0' }).toThrow(OptionValueInvalidError)
  expect(() => { options.blur = '0.2' }).toThrow(OptionValueInvalidError)
  expect(() => { options.blur = '1001' }).toThrow(OptionValueInvalidError)
  values.forEach((val, index) => {
    options.blur = val
    expect(options.options.blur).toBe(expected[index])
    expect(options.blur).toBe(expected[index])
  })
})

test('fit', () => {
  const options = new Options()
  const values = ['cover', 'contain', 'fill', 'inside', 'outside']
  expect(options.options.fit).toBe('cover')
  expect(() => { options.fit = 'notvalid' }).toThrow(OptionValueInvalidError)
  values.forEach((val) => {
    options.fit = val
    expect(options.options.fit).toBe(val)
    expect(options.fit).toBe(val)
  })
})

test('gravity', () => {
  const options = new Options()
  const values = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'entropy', 'attention']
  expect(options.options.gravity).toBe('center')
  expect(() => { options.gravity = 'notvalid' }).toThrow(OptionValueInvalidError)
  values.forEach((val) => {
    options.gravity = val
    expect(options.options.gravity).toBe(val)
    expect(options.gravity).toBe(val)
  })
})

test('height', () => {
  const options = new Options()
  const values = ['1', '100.25', '1000']
  const expected = [1.0, 100.25, 1000]
  expect(options.options.height).toBe(null)
  values.forEach((val, index) => {
    options.height = val
    expect(options.options.height).toBe(expected[index])
    expect(options.height).toBe(expected[index])
  })
})

test('left', () => {
  const options = new Options()
  const values = ['1', '100.25', '1000']
  const expected = [1.0, 100.25, 1000]
  expect(options.options.left).toBe(null)
  values.forEach((val, index) => {
    options.left = val
    expect(options.options.left).toBe(expected[index])
    expect(options.left).toBe(expected[index])
  })
})

test('mirror', () => {
  const options = new Options()
  const values = ['x', 'y']
  expect(options.options.mirror).toBe(null)
  expect(() => { options.mirror = 'a' }).toThrow(OptionValueInvalidError)
  values.forEach((val) => {
    options.mirror = val
    expect(options.options.mirror).toBe(val)
    expect(options.mirror).toBe(val)
  })
})

test('output', () => {
  const options = new Options()
  const values = ['jpeg', 'png', 'webp']
  expect(options.options.output).toBe(null)
  expect(() => { options.output = 'invalid' }).toThrow(OptionValueInvalidError)
  values.forEach((val) => {
    options.output = val
    expect(options.options.output).toBe(val)
    expect(options.output).toBe(val)
  })
})

test('quality', () => {
  const options = new Options()
  const values = ['1', '100', '50']
  const expected = [1, 100, 50]
  expect(options.options.quality).toBe(80)
  expect(() => { options.quality = '0' }).toThrow(OptionValueInvalidError)
  expect(() => { options.quality = '101' }).toThrow(OptionValueInvalidError)
  values.forEach((val, index) => {
    options.quality = val
    expect(options.options.quality).toBe(expected[index])
    expect(options.quality).toBe(expected[index])
  })
})

test('rotate', () => {
  const options = new Options()
  const values = ['0', '-450', '10.5']
  const expected = [0, -450.0, 10.5]
  expect(options.options.rotate).toBe(null)
  values.forEach((val, index) => {
    options.rotate = val
    expect(options.options.rotate).toBe(expected[index])
    expect(options.rotate).toBe(expected[index])
  })
})

test('top', () => {
  const options = new Options()
  const values = ['1', '100.25', '1000']
  const expected = [1.0, 100.25, 1000]
  expect(options.options.top).toBe(null)
  values.forEach((val, index) => {
    options.top = val
    expect(options.options.top).toBe(expected[index])
    expect(options.top).toBe(expected[index])
  })
})

test('version', () => {
  const options = new Options()
  const values = ['test', '3']
  expect(options.options.version).toBe(null)
  values.forEach((val) => {
    options.version = val
    expect(options.options.version).toBe(val)
    expect(options.version).toBe(val)
  })
})

test('width', () => {
  const options = new Options()
  const values = ['1', '100.25', '1000']
  const expected = [1.0, 100.25, 1000]
  expect(options.options.width).toBe(null)
  values.forEach((val, index) => {
    options.width = val
    expect(options.options.width).toBe(expected[index])
    expect(options.width).toBe(expected[index])
  })
})

test('defaults are frozen', () => {
  const options = new Options()
  expect(Object.isFrozen(options.defaults)).toBe(true)
})

test('options are frozen', () => {
  const options = new Options()
  expect(Object.isFrozen(options.options)).toBe(true)
})

test('hasOption', () => {
  const options = new Options()
  expect(options.hasOption('gravity')).toBe(true)
  expect(options.hasOption('unknown')).toBe(false)
})

test('extendable', () => {
  class MyOptions extends Options {
    get defaults () {
      return Object.freeze(Object.assign({}, super.defaults, {
        text: '',
        gravity: 'special'
      }))
    }

    set text (value) {
      this._options.text = value
    }

    set gravity (value) {
      const valid = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'entropy', 'attention', 'special']
      if (valid.indexOf(value) === -1) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'gravity'`)
      this._options.gravity = value
    }
  }

  const options = new MyOptions()
  const textValues = ['test', '3']
  const gravityValues = ['north', 'special']

  expect(options.hasOption('text')).toBe(true)
  expect(options.options.text).toBe('')
  expect(options.text).toBe('')
  textValues.forEach((val) => {
    options.text = val
    expect(options.options.text).toBe(val)
    expect(options.text).toBe(val)
  })

  expect(options.options.gravity).toBe('special')
  expect(options.gravity).toBe('special')
  gravityValues.forEach((val) => {
    options.gravity = val
    expect(options.options.gravity).toBe(val)
    expect(options.gravity).toBe(val)
  })
})
