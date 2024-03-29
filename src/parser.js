const { OptionKeyUnknownError, SignatureMismatchError, SignatureMissingError } = require('./errors.js')
const Options = require('./options.js')
const crypto = require('crypto')

class Parser {
  constructor (uri, token, signatureRequired) {
    this.uri = uri.replace(/^\//, '')
    this.token = token
    this.signatureRequired = signatureRequired
    this.optionDelimiters = /[,]/
    this.compoundDelimiters = /[-]/
    this.keyValueDelimiters = /[_:=]/
    this.signatureRegExp = /[,-]signature[_:=]([\w\d]+)/
    this.optionsCollection = []
  }

  uriComponents () {
    const components = this.uri.split('/')
    this.optionsString = components.shift()
    const signatureMatch = this.optionsString.match(this.signatureRegExp)
    if (signatureMatch) {
      this.signature = signatureMatch[1]
      this.optionsString = this.optionsString.replace(this.signatureRegExp, '')
    }
    this.path = components.join('/')
  }

  parse () {
    this.uriComponents()

    if (this.signature) this.verifySignature()
    else if (this.signatureRequired) throw new SignatureMissingError('Signature not found')

    this.optionsCollection = this.optionsString.split(this.compoundDelimiters).map((optionsString) => {
      const options = new Options()
      optionsString.split(this.optionDelimiters).map((optionString) => {
        const [key, value] = optionString.split(this.keyValueDelimiters)
        if (!options.hasOption(key)) throw new OptionKeyUnknownError(`${key} is not a known option`)
        options[key] = value
      })
      return options.options
    })

    return this.optionsCollection
  }

  verifySignature () {
    const hmac = crypto.createHmac('sha1', this.token)
    hmac.update(`${this.optionsString}/${this.path}`)
    const signature = hmac.digest('hex')
    if (this.signature !== signature) throw new SignatureMismatchError('Signature did not match')
  }
}

module.exports = Parser
