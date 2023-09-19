Changelog
=========

## v8.1.0

### Bug Fixes

* Fixed an issue where `CrispClient.rebindSocket` and `CrispClient._connectLoopback` base methods would not work due to undefined `this` references.

## v8.0.3

### Changes

* Updated `socket.io-client` dependency to latest.

## v8.0.2

### Changes

* Updated TypeScript definitions.

## v8.0.1

### Changes

* Updated TypeScript definitions.

## v8.0.0

### New Features

* Added support for all Helpdesk REST API routes, which have been opened to integrations.

## v7.4.2

### Bug Fixes

* Minor `README.md` title fixes.

## v7.4.1

### Bug Fixes

* Changed type of exported services in JSDoc to `any` so that TypeScript projects can use resource methods without `tsc` throwing errors.

## v7.4.0

### New Features

* Generated up-to-date TypeScript definitions.

### Bug Fixes

* Fixed the automatic generation of TypeScript definitions.

## v7.3.0

### New Features

* Added the new `CrispClient.website.listConversationFiles` method.

## v7.2.0

### New Features

* Automated the package release process via GitHub Actions (ie. `npm publish`).

## v7.1.0

### New Features

* Added `CrispClient.verifyWidget` to verify Widget Events.

## v7.0.0

### Breaking Changes

* ⚠️ Renamed the `CrispClient.rebind` method into `CrispClient.rebindSocket` (update your code if you use it).

### New Features

* Added support for receiving Web Hooks through the RTM events pipeline (via `CrispClient.setRtmMode(Crisp.RTM_MODES.WebHooks)`).

## v6.4.1

### Bug Fixes

* Return more informative error reasons for non `2xx / 3xx` response codes on `HEAD` requests.

## v6.4.0

### New Features

* Added the new `CrispClient.website.requestUserFeedbackForConversation` method.

## v6.3.2

### Bug Fixes

* Prevent Got from throwing errors for non `2xx / 3xx` response codes.
* Fixed body payload type.

## v6.3.1

### Breaking Changes

* ⚠️ Support for NodeJS 8 has been removed. The minimum version is now NodeJS 10.

### Changes

* Upgraded dependencies (closes [#30](https://github.com/crisp-im/node-crisp-api/issues/30)).

## v6.3.0

### New Features

* Added the new `CrispClient.rebind` method, which requests the RTM API to rebind to newly installed/subscribed websites (depending on the authentication tier).

## v6.2.0

### New Features

* Added the new `CrispClient.website.getVerifyStatusForConversation` method.
* Added the new `CrispClient.website.updateVerifyStatusForConversation` method.

## v6.1.0

### New Features

* Added the new `CrispClient.website.removeMessageInConversation` method.
* Added support for the `message:removed` RTM API event.

## v6.0.0

### Breaking Changes

* ⚠️ Support for NodeJS 6 has been removed. The minimum version is now NodeJS 8.
* ⚠️ The `CrispClient.on` method now returns a `Promise`. Please update your code accordingly. We do recommend that you add error catchers.

### New Features

* The RTM API URL is now dynamically pulled from the REST API, based on the authentication tier. This allows for (much) more efficient message routing at Crisp scale, and offers performance and stability benefits to your integration.

### Bug Fixes

* Fixed an issue where the library would not reconnect to the RTM API when it lost connection with the server.

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

* ⚠️ The package has been renamed from `node-crisp-api` to `crisp-api`. Since it is typical of NPM packages to skip the `node-` prefix in their name, we chose to normalize the package name to this community standard. The programmatic API did not change, so you can simply update the package name to the new name in your `package.json` and all imports.

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

**🆘 Major changes follow, that will likely require that you update your integration code. If you want to wait to apply those changes, we recommend that you pin `node-crisp-api` to `3.0.0` or lower in your `package.json`.**

* ⚠️ All resource methods have been nested into their parent category, eg. `website`. So all calls to eg. `CrispClient.websiteConversation` or `CrispClient.websitePeople` become `CrispClient.website`. This makes API calls more readable throughout your code.

## v3.0.0

### Breaking Changes

**🆘 Major changes follow, that will likely require that you update your integration code. If you want to wait to apply those changes, we recommend that you pin `node-crisp-api` to `2.0.0` or lower in your `package.json`.**

* ⚠️ The programmatic interface to `node-crisp-api` has been completely revamped, so that all REST API methods specified in [REST API Reference (V1)](https://docs.crisp.chat/references/rest-api/v1/) are also available in this wrapper. Most method names have been changed as to match their name in the reference. Please check the [README](./README.md) for a full list of available methods.
