class OptionValueInvalidError extends Error {
  get name () {
    return 'OptionValueInvalidError'
  }
}
class OptionKeyUnknownError extends Error {
  get name () {
    return 'OptionKeyUnknownError'
  }
}
class SignatureMismatchError extends Error {
  get name () {
    return 'SignatureMismatchError'
  }
}
class SignatureMissingError extends Error {
  get name () {
    return 'SignatureMissingError'
  }
}

module.exports = {
  OptionValueInvalidError,
  OptionKeyUnknownError,
  SignatureMismatchError,
  SignatureMissingError
}
