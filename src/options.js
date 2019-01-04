const Color = require('color')
const { OptionValueInvalidError } = require('./errors.js')

// All setters expect to get a string
class Options {
  constructor () {
    this.options = Object.assign({}, this.defaults)
  }

  updateBackgroundRGB () {
    let color = Color(this.options.backgroundcolor).alpha(this.options.backgroundalpha)
    this.options.backgroundrgb = color.rgb().string()
  }

  get defaults () {
    return {
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
    }
  }

  set backgroundalpha (value) {
    this.options.backgroundalpha = parseFloat(value)
    this.updateBackgroundRGB()
  }

  set backgroundcolor (value) {
    this.options.backgroundcolor = `#${value}`
    this.updateBackgroundRGB()
  }

  set blur (value) {
    value = parseFloat(value)
    if (value < 0.3 || value > 1000) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'blur'`)
    this.options.blur = value
  }

  set fit (value) {
    let valid = ['cover', 'contain', 'fill', 'inside', 'outside']
    if (valid.indexOf(value) === -1) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'fit'`)
    this.options.fit = value
  }

  set gravity (value) {
    let valid = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'entropy', 'attention']
    if (valid.indexOf(value) === -1) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'gravity'`)
    this.options.gravity = value
  }

  set height (value) {
    this.options.height = parseFloat(value)
  }

  set left (value) {
    this.options.left = parseFloat(value)
  }

  set mirror (value) {
    let valid = ['x', 'y']
    if (valid.indexOf(value) === -1) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'mirror'`)
    this.options.mirror = value
  }

  set output (value) {
    let valid = ['jpeg', 'png', 'webp']
    if (valid.indexOf(value) === -1) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'output'`)
    this.options.output = value
  }

  set quality (value) {
    value = parseInt(value, 10)
    if (value < 1 || value > 100) throw new OptionValueInvalidError(`'${value}' is an invalid value for option 'quality'`)
    this.options.quality = value
  }

  set rotate (value) {
    this.options.rotate = parseFloat(value)
  }

  set top (value) {
    this.options.top = parseFloat(value)
  }

  set version (value) {
    this.options.version = value
  }

  set width (value) {
    this.options.width = parseFloat(value)
  }
}

module.exports = Options
