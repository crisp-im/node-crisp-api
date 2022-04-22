Changelog
=========

## v5.3.0

### New Features

* Added the new `CrispClient.plugin.getConnectEndpoints` method.

## v5.2.0

### Changes

* Upgraded Socket.IO from v2 to v4, meaning that `node-crisp-api` is now connecting to the RTM API over EIO protocol version 4 (versus EIO 3 before).

## v5.1.0

### New Features

* Added support for the `session:set_subject` RTM API event.

## v5.0.4

### Changes

* Added a new parameter `mode` to the `CrispClient.website.initiateNewCallSessionForConversation` method.

## v5.0.3

### Changes

* Improved `README.md` references to REST API and RTM API resources.

## v5.0.2

### Changes

* Added a new parameter `data` to the `CrispClient.website.deliverWidgetDataFetchActionForConversation` method.

## v5.0.1

### Changes

* Minor `README.md` title change.

## v5.0.0

### Breaking Changes

* The package has been renamed from `node-crisp-api` to `crisp-api`. Since it is typical of NPM packages to skip the `node-` prefix in their name, we chose to normalize the package name to this community standard. The programmatic API did not change, so you can simply update the package name to the new name in your `package.json` and all imports.

## v4.2.0

### New Features

* Added the new `CrispClient.website.updatePeopleData` method.

## v4.1.1

### Bug Fixes

* Fixed TypeScript types not being picked up correctly.

## v4.1.0

### New Features

* Added TypeScript definitions.

## v4.0.2

### Bug Fixes

* Fixed a typo in the `BucketURL` resource include from its `Bucket` service.

## v4.0.1

### Changes

* The `CrispClient.website.debugExistingBrowsingSession` method has been removed, following the sunset of the LiveDebug feature across our products.

## v4.0.0

### Breaking Changes

**⚠️ Major changes follow, that will likely require that you update your integration code. If you want to wait to apply those changes, we recommend that you pin `node-crisp-api` to `3.0.0` or lower in your `package.json`.**

* All resource methods have been nested into their parent category, eg. `website`. So all calls to eg. `CrispClient.websiteConversation` or `CrispClient.websitePeople` become `CrispClient.website`. This makes API calls more readable throughout your code.

## v3.0.0

### Breaking Changes

**⚠️ Major changes follow, that will likely require that you update your integration code. If you want to wait to apply those changes, we recommend that you pin `node-crisp-api` to `2.0.0` or lower in your `package.json`.**

* The programmatic interface to `node-crisp-api` has been completely revamped, so that all REST API methods specified in [REST API Reference (V1)](https://docs.crisp.chat/references/rest-api/v1/) are also available in this wrapper. Most method names have been changed as to match their name in the reference. Please check the [README](./README.md) for a full list of available methods.
