***SEVERE***

1. Missing async for saveUser function (line 8)
	* will cause errors -- cannot use await on a non async function)

2. User is const but is changed (line 38)
	* will cause errors -- const variable declaration is not meant to be re-assigned)

3. Callback is not a function but an object (line 13-15)
	* will cause errors 

4. Assignment instead of comparison operator in if statement (line 39)
	* will cause unintended behavior -- this will always evaluate to true since it's an assignment)

5. Missing response when user is not null but password doesnt match (line 47)
	* will cause broken flow -- the logic for the api resolver does not cover all potential situations/cases thus potentially causing an invalid state. in this case, user will get no response

6. Why is param for loadUser destructured? (line 18)
	* unless request.params.username is also an object that has userName in it, the destructured assignment is incorrect

7. Hardcoded username/password (line 5-6, line 27-32)
	* all usernames/passwords should be set as either environment variables or imported via json and never hard coded as this presents a huge security risk

8. All credentials should always use at minimum salt+hashing (direct compare on line 45)
	* passwords should always be at minimum salt+hash combination, ideally a authorizer like oauth. passwords should never be stored as plain text

9. User profile page is not protected? (line 49-52) 
	* the user profile page has no password check thus anyone could access someone else's profile or meta just by passing in the desired user's name in the request params
	

*MEDIUM PRIORITY*

1. Missing error handler for callback after database.store (line 13-15)
	* should handle any errors that occur during database saves

2. API functionality (loaduser, saveuser) should be decoupled from the api resolver
	* since all the functions are in one file, readability and maintainability of the the code is heavily decreased. should think in a modular fashion

3. Should always be returning json for all api endpoints
	* since json is the universal format for most api's, and to keep a structured and normalized data transfer between front and back end, the format of the api response should be standardized to json. unless the browser is given raw html (as in this case), data should be set as `application/json`

4. Database url should be env vars
	* it is very tedious and inefficient to hardcode any global variables such as database ip address. best practice is to set an environment variable such that if the ip changes, you can make the change in one place rather than multiple places scattered across the code

5. Server start is missing request validation
	* all api request bodies should be type and format validated


_LOW PRIORITY_

- Missing semicolons
- Non-descript variable names
- Alternating function declaration (line 8, 18)
- Has both require and import syntax (line 1-3)
- Non-descript folder structure for libraries
- Why is overrideIfPresent declared when used once? can directly pass owip to the param
- Should be if, else if, else (line 39-57)
- Should always use strict comparisons === (line 45, 49)
- Non descript commenting
