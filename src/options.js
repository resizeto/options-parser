const Color = require('color')
const { OptionValueInvalidError } = require('./errors.js')

// All setters expect to get a string
class Options {
  constructor () {
    this._options = Object.assign({}, this.defaults)

    // We'll use the keys from the defaults
    // to proxy get calls directly to the
    // _options object
    const keys = Object.keys(this.defaults)

    return new Proxy(this, {
      get (target, name) {
        if (keys.indexOf(name) !== -1) {
          return Reflect.get(target, '_options')[name]
        } else {
          return target[name]
        }
      },

      set (target, name, value) {
        return Reflect.set(...arguments)
      }
    })
  }

  hasOption (key) {
    return key in this._options
  }

  _updateBackgroundRGB () {
    const color = Color(this._options.backgroundcolor).alpha(this._options.backgroundalpha)
    this._options.backgroundrgb = color.rgb().string()
  }

  get options () {
    return Object.freeze(Object.assign({}, this._options))
  }

  get defaults () {
    return Object.freeze({
      backgroundalpha: 1, // 0-1
      backgroundcolor: '#000', // hex without the #
      backgroundrgb: 'rgb(0, 0, 0)', // automatically updated when color or alpha is set
      blur: null, // 0.3-1000
      fit: 'cover', // cover, contain, fill, inside, outside
      gravity: 'center', // north, northeast, east, southeast, south, southwest, west, northwest, center, entropy, attention
      height: null, // auto/aspect ratio by default
      left: null, // number (used for custom extraction/crop)
      mirror: null, // x, y (which axis to mirror it across)
      output: null, // jpeg, png, webp
      quality: 80, // 1-100 applies to jpeg and webp
      rotate: null, //  always auto rotates based on exif
      top: null, // number (used for custom extraction/crop)
      version: null, // anything
      width: null // auto/aspect ratio by default
    })
  }

  set backgroundalpha (value) {
    this._options.backgroundalpha = parseFloat(value)
    this._updateBackgroundRGB()
  }

  set backgroundcolor (value) {
    this._options.backgroundcolor = `#${value}`
    this._updateBackgroundRGB()
  }

  set blur (value) {
    value = parseFloat(value)
    if (value < 0.3 || value > 1000) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'blur'`)
    this._options.blur = value
  }

  set fit (value) {
    const valid = ['cover', 'contain', 'fill', 'inside', 'outside']
    if (valid.indexOf(value) === -1) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'fit'`)
    this._options.fit = value
  }

  set gravity (value) {
    const valid = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'entropy', 'attention']
    if (valid.indexOf(value) === -1) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'gravity'`)
    this._options.gravity = value
  }

  set height (value) {
    this._options.height = parseFloat(value)
  }

  set left (value) {
    this._options.left = parseFloat(value)
  }

  set mirror (value) {
    const valid = ['x', 'y']
    if (valid.indexOf(value) === -1) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'mirror'`)
    this._options.mirror = value
  }

  set output (value) {
    const valid = ['jpeg', 'png', 'webp']
    if (valid.indexOf(value) === -1) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'output'`)
    this._options.output = value
  }

  set quality (value) {
    value = parseInt(value, 10)
    if (value < 1 || value > 100) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'quality'`)
    this._options.quality = value
  }

  set rotate (value) {
    this._options.rotate = parseFloat(value)
  }

  set top (value) {
    this._options.top = parseFloat(value)
  }

  set version (value) {
    this._options.version = value
  }

  set width (value) {
    this._options.width = parseFloat(value)
  }
}

module.exports = Options
