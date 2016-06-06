# Crisp API Node 

## Installation

`npm install --save node-crisp-api`


## API Overview


```js
var Crisp = require("node-crisp-api");
var ClispClient  = new Crisp();
```

To use Crisp, first, you have to login

```js
ClispClient.userSession.loginWithEmail(
	"youraccount@gmail.com",
	"your_password"
)
.then(function() {
	//You are now logged
});
```

When you are logged you can then use the Crisp API

```js
ClispClient.userProfile.get().then(function(myProfile) {
	console.log("Hello" + myProfile.first_name);
});
```

### Available resources & methods

*Where you see `params` it is a plain JavaScript object, e.g. `{ email: 'foo@example.com' }`*

 * userSession
 	* `loginWithEmail(email, password)` 
 	* `recoverPassword(email)` 
 	* `logout()` 
 * userAccount
 	* `get()` 
 	* `create(params)`
 * userNotification
 	* `get()` 
 	* `update(params)`
 * userProfile
  	* `get()` 
 	* `update(params)`
 * userSchedule
  	* `get()` 
 	* `update(params)`
 * userWebsites
  	* `get()`
 * website
  	* `create(params)`
  	* `delete(websiteId)`
 * websiteConversations
  	* `getList(websiteId, page)`
  	* `getOne(websiteId, sessionId)`
 * websiteOperators
  	* `getList(websiteId)`
  	* `getOne(websiteId, operatorId)`
  	* `deleteOne(websiteId, operatorId)`
  	* `createOne(websiteId, parameters)`

  
