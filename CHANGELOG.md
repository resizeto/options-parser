# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.5]

### Changed

- Breaking: The compound/group delimiter was changed from `;` to `-`. The `;` was causing trouble for the S3 404 redirect solution where there isn't a way to URL encode the string to be passed as a query param.

## [0.0.4]

### Added

- Added name to error objects

## [0.0.3]

### Added

- Added `Options#hasOption(optionName)` method

### Changed

- The `Parser#optionsCollection` is a collection of frozen objects rather than an instance of the `Options` class
- Internally using `Options#_options` in Options class
- `Options#options` now returns a frozen object
- `Options#defaults` now returns a frozen object
- Renamed `Options#updateBackgroundRGB` to `Options#_updateBackgroundRGB`
- Limited files being included in npm package
- Updated dependencies

## [0.0.2]

### Added

- Added getters for Options
