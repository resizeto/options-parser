/* eslint-env jest */
const { OptionValueInvalidError } = require('./errors.js')
const Options = require('./options.js')

test('backgroundalpha', () => {
  let options = new Options()
  let values = ['1', '0', '0.5']
  let expected = [1.0, 0.0, 0.5]
  let expectedRGB = [
    'rgb(0, 0, 0)',
    'rgba(0, 0, 0, 0)',
    'rgba(0, 0, 0, 0.5)'
  ]
  expect(options.options.backgroundalpha).toBe(1)
  values.forEach((val, index) => {
    options.backgroundalpha = val
    expect(options.options.backgroundalpha).toBe(expected[index])
    expect(options.options.backgroundrgb).toBe(expectedRGB[index])
  })
})

test('backgroundcolor', () => {
  let options = new Options()
  let values = ['fff', 'ffffff']
  expect(options.options.backgroundcolor).toBe('#000')
  values.forEach((val) => {
    options.backgroundcolor = val
    expect(options.options.backgroundcolor).toBe(`#${val}`)
    expect(options.options.backgroundrgb).toBe('rgb(255, 255, 255)')
  })
})

test('blur', () => {
  let options = new Options()
  let values = ['0.3', '100', '1000']
  let expected = [0.3, 100, 1000]
  expect(options.options.blur).toBe(null)
  expect(() => { options.blur = '0' }).toThrow(OptionValueInvalidError)
  expect(() => { options.blur = '0.2' }).toThrow(OptionValueInvalidError)
  expect(() => { options.blur = '1001' }).toThrow(OptionValueInvalidError)
  values.forEach((val, index) => {
    options.blur = val
    expect(options.options.blur).toBe(expected[index])
  })
})

test('fit', () => {
  let options = new Options()
  let values = ['cover', 'contain', 'fill', 'inside', 'outside']
  expect(options.options.fit).toBe('cover')
  expect(() => { options.fit = 'notvalid' }).toThrow(OptionValueInvalidError)
  values.forEach((val) => {
    options.fit = val
    expect(options.options.fit).toBe(val)
  })
})

test('gravity', () => {
  let options = new Options()
  let values = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'entropy', 'attention']
  expect(options.options.gravity).toBe('center')
  expect(() => { options.gravity = 'notvalid' }).toThrow(OptionValueInvalidError)
  values.forEach((val) => {
    options.gravity = val
    expect(options.options.gravity).toBe(val)
  })
})

test('height', () => {
  let options = new Options()
  let values = ['1', '100.25', '1000']
  let expected = [1.0, 100.25, 1000]
  expect(options.options.height).toBe(null)
  values.forEach((val, index) => {
    options.height = val
    expect(options.options.height).toBe(expected[index])
  })
})

test('left', () => {
  let options = new Options()
  let values = ['1', '100.25', '1000']
  let expected = [1.0, 100.25, 1000]
  expect(options.options.left).toBe(null)
  values.forEach((val, index) => {
    options.left = val
    expect(options.options.left).toBe(expected[index])
  })
})

test('mirror', () => {
  let options = new Options()
  let values = ['x', 'y']
  expect(options.options.mirror).toBe(null)
  expect(() => { options.mirror = 'a' }).toThrow(OptionValueInvalidError)
  values.forEach((val) => {
    options.mirror = val
    expect(options.options.mirror).toBe(val)
  })
})

test('output', () => {
  let options = new Options()
  let values = ['jpeg', 'png', 'webp']
  expect(options.options.output).toBe(null)
  expect(() => { options.output = 'invalid' }).toThrow(OptionValueInvalidError)
  values.forEach((val) => {
    options.output = val
    expect(options.options.output).toBe(val)
  })
})

test('quality', () => {
  let options = new Options()
  let values = ['1', '100', '50']
  let expected = [1, 100, 50]
  expect(options.options.quality).toBe(80)
  expect(() => { options.quality = '0' }).toThrow(OptionValueInvalidError)
  expect(() => { options.quality = '101' }).toThrow(OptionValueInvalidError)
  values.forEach((val, index) => {
    options.quality = val
    expect(options.options.quality).toBe(expected[index])
  })
})

test('rotate', () => {
  let options = new Options()
  let values = ['0', '-450', '10.5']
  let expected = [0, -450.0, 10.5]
  expect(options.options.rotate).toBe(null)
  values.forEach((val, index) => {
    options.rotate = val
    expect(options.options.rotate).toBe(expected[index])
  })
})

test('top', () => {
  let options = new Options()
  let values = ['1', '100.25', '1000']
  let expected = [1.0, 100.25, 1000]
  expect(options.options.top).toBe(null)
  values.forEach((val, index) => {
    options.top = val
    expect(options.options.top).toBe(expected[index])
  })
})

test('version', () => {
  let options = new Options()
  let values = ['test', '3']
  expect(options.options.version).toBe(null)
  values.forEach((val) => {
    options.version = val
    expect(options.options.version).toBe(val)
  })
})

test('width', () => {
  let options = new Options()
  let values = ['1', '100.25', '1000']
  let expected = [1.0, 100.25, 1000]
  expect(options.options.width).toBe(null)
  values.forEach((val, index) => {
    options.width = val
    expect(options.options.width).toBe(expected[index])
  })
})
