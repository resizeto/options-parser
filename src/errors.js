class OptionValueInvalidError extends Error {}
class OptionKeyUnknownError extends Error {}
class SignatureMismatchError extends Error {}
class SignatureMissingError extends Error {}

module.exports = {
  OptionValueInvalidError,
  OptionKeyUnknownError,
  SignatureMismatchError,
  SignatureMissingError
}
