# Table of Contents
- [App](#app)
  - [State](#state)
  - [Functions](#functions)
    - [login](#login)
    - [getAllActivity](#getallactivity)
    - [closeSwiper](#getUser)
    - [logOut](#logout)
    - [getUser](#getUser)
- [Navigation](#Navigation)
  - [Variable](#variable)
  - [Functions](#functions-1)
	- [TabScreen](#tabscreen)
- [HomePage](#homepage)
  - [State](#state-1)
  - [Functions](#functions-2)
    - [valueSignUp](#valueSignUp)
- [LoginPage](#loginpage)
	- [Variable](#variable-1)
	- [Functions](#functions-3)
	  - [signIn](#signIn)
- [SignUp](#signup)
	- [State](#state-2)
	- [Variable](#variable-2)
	- [Functions](#functions-4)
	  - [getImg](#getimg)
	  - [signUp](#signup)
- [AccountPage](#accountPage)
   - [State](#state-3)
	- [Variable](#variable-3)
	- [Functions](#functions-5)
      - [getImg](#getImg-1)
      - [inputValue](#inputValue)
      - [changeItem](#changeItem)
      - [changeInfo](#changeInfo)
- [ActivitiesPage](#Activitiespage)
   - [State](#state-4)
	- [Variable](#variable-4)
	- [Functions](#functions-6)
      - [inputValue](#inputValue-1)
      - [getVlaueOFtime](#getVlaueOFtime)
      - [addActivity](#addActivity)
- [CalendarPage](#CalendarPage)
   - [State](#state-5)
   - [UseEffect](#UseEffect)
	- [Functions](#functions-7)
      - [getYourActivity](#getYourActivity)
      - [notifications](#notifications)
- [SwiperPage](#swiperpage)
- [SwiperBody](#swiperbody)
   - [State](#state-6)
   - [useRef](#useRef)
	- [Functions](#functions-8)
      - [renderCard](#renderCard)
      - [closeSwiper](#closeswiper-1)
      - [handleSwiped](#handleswiped)
- [Components](#components)
    - [Form](#form)
    - [DateTimePick](#DateTimePick)
    - [NotificationsEvent](#NotificationsEvent)
    - [FetchRequest](#FetchRequest)
- [BackEnd](#backend) 
  - [Server](#server)
    - [Api](#api)
       - [Users](#users) 
         - [Routers](#routers) 
         - [Controller](#controller)
           - [getUserActivity](#getUserActivity)
           - [updateUser](#updateUser)
           - [getUserById](#getUserById)
           - [login](#login-1)
           - [signUp](#signUp-1)
       - [Activity](#activity) 
         - [Routers](#routers-1)
         - [Controller](#controller-1)
           - [getAllActivity](#getAllActivity-1)
           - [addActivity](#addActivity-1)
       - [Activity-Registration](#activity-registration)
         - [Routers](#routers-2) 
         - [Controller](#controller-2)
           - [registrationForEvent](#registrationforEvent)
    - [CRUD](#crud)
     - [getAllData](#getAllData)
     - [addToTables](#addToTables)
     - [getItemByID](#getItemByID)
     - [usingJOIN](#usingJOIN)
     - [readFileLocal](#readFileLocal)
     - [updateItem](#updateItem)

   - [Schema-sql](#Schema-sql)
     - [Users](#Users)
     - [Activities](#Activities)
     - [Activity_registration](#Activity_registration)


 #  App

The root page contains all the data information in a state for matching information on all pages.

## State

### `setUsersData`
Contains the data of all the users after the user logs in. It is initialized as an empty array.

### `setShowSwiper`
Manages the visibility of the Swiper component. It is initialized as `true`.

### `setUser`
 Contains the user data. It is initialized as an empty array.


## Functions 


### `logIn`

The `logIn` function is responsible for handling user login. After the user logs in, this function is activated and receives user data as a variable from the `signIn` function in the Login Page.

#### Parameters

- `userData`: An array od object containing users data in the following format:

   ```json
   [{
     "birthYear": String,
     "full_name": String,
     "id": Number,
     "instagram": String,
     "password": String,
     "profile_image": String (URL)
   }]

#### Actions

Upon successful login, the `logIn` function performs the following actions:

1. It pushes the received `userData` to the state variable `setUser`, making user data accessible throughout the application.

2. It sets the state variable `setShowSwiper` to `true`. This action is essential to ensure that if the user disconnects and then reconnects, their state becomes `true` again, ensuring proper functionality.

3. It activates the `getAllActivity` function with the `user.id` as a parameter. This function fetches activity data associated with the logged-in user.

#### Example Usage

Here's an example of how the `logIn` function can be used:

```javascript
const user = {
  birthYear: "1990",
  full_name: "John Doe",
  id: 123,
  instagram: "johndoe123",
  password: "password123",
  profile_image: "https://example.com/profile.jpg"
};
const logIn = (user) => {
  setUser(user);
  setShowSwiper(true);
  getAllActivity(user.id);
};

```
### `getAllActivity`

The `getAllActivity` function is responsible for retrieving all the activities of other users. After the [login](#login) function is activated, this function will be invoked and receives the `user.id` as a parameter from the [login](#login) function in the Login Page.

#### Parameters

- `id`: A Number representing the user's ID.

#### Actions

1. The function takes the `id` and sends it to the server.
2. It sends the HTTP request using the [FetchRequest](#fetchrequest) function and waits for the response(send the request to [UserRouters](#routers) [getUserActivity](#getUserActivity)).

3. It processes the data, potentially transforming it or extracting specific information.

4. The processed data is pushed into the [setUsersData](#setusersdata) State.

This function is essential for fetching and handling user activities, enabling your application to display relevant information to the user.

#### Example Usage

Here's an example of how the `getAllActivity` function can be used with the `fetch` API:
```javascript
	const requst = {
				url: `http://localhost:3000/activity/getAllActivity`,
				body: JSON.stringify({ id: 10 }),
				ContentType: "application/json; charset=UTF-8",
			};
	await FetchRequest(requst)

```
### `getUser`
The `getUser` function is responsible for retrieving all the activities of user.  After the [changeInfo](#changeInfo) in the [AccountPage](#accountpage) function is activated, this function will be invoked and receives the id as a parameter.



#### Parameters

- `id`: A Number representing the user's ID.

#### Actions
1. The function takes the `id` and sends it to the server.

2. It sends the HTTP request using the [FetchRequest](#fetchrequest) function and waits for the response(send the request to [UserRouters](#routers) [getUserById](#getUserById)).

3. The processed data is pushed into the [setuser](#setuser)  State.

#### Example Usage
Here's an example of how the `getUser` function can be used with the `fetch` API:

```javascript
    
const handleUserData = (userData) => {

  console.log(userData);
};

const userId = 123; 
   getUser(userId)
  .then((userData) => {
    handleUserData(userData);
  })
  .catch((error) => {
    console.error(error.message);
  });

```
### `closeSwiper`
The `closeSwiper` function is responsible for closing the Swiper.  After the `closeSwiper` in the [SwiperBody](#swiperBody) function is activated, this function will be invoked. 
#### Actions
1. change the [setShowSwiper](#setshowswiper) to false
#### Example Usage
Here's an example of how the `closeSwiper` function can be used:
```javascript
    
const closeSwiper = () => {
		setShowSwiper(false);
	};
	<View>
				{!props.showSwiper && <Text>Swiper component is false<Text/>}
```
### `logOut`
The `logOut` function is responsible for returning to the [LoginPage](#loginPage).  if you press the  logout button in the [AccountPage](#accountPage)
#### `Actions
1. change the [setUser](#setuser) to empty array

2. change the [setUsersData](#setusersdata)  to empty array

3. change the [setShowSwiper](#setshowswiper) to  false
#### Example Usage
```javascript
	const logOut = () => {
		setUser([]);
		setUsersData([]);
		setShowSwiper(false);
	};
{props.user.length === 0  && 
<HomePage logIn={props.logIn} />
}

```
# Navigation

The navigation page is responsible for guiding users through the various pages the application. It plays a crucial role in helping users access different features and content seamlessly.

## Variable
### `componentList`
 The `componentList` critical part of our application's navigation system. It serves as a centralized list of components that users can navigate to within the application.
 `type`: array of Object

### `tabNavigator`
The `tabNavigator` variable is a central configuration object that plays a crucial role in defining and managing tabs or navigation tabs within our application. It contains essential properties for each tab, including the component name, icon, title and props. It's important to ensure that the `componentName` property is compatible with the actual component it refers to.

## Functions 
### `TabScreen`
The `TabScreen` function is responsible for rendering individual components within their dedicated tabs, allowing users to access and interact with the data associated with each component.

#### Parameters
- `tab`:  object represents a specific instance within our navigation system. It contains information related to navigation and routing within the application including the  componentName

#### Actions

1. Take the value of `tab.route.name `and use it to look up an item in 	the [componentList](#variable) and assign it to the component Variable.

2. Check if the Component Variable is true, indicating whether a component with the given name exists.

3. If the Component Variable is true (i.e., a component with the given name exists), return a tab with all the properties of the corresponding component that are specified in the tabNavigator.
If the Component Variable is false (i.e., there is no component with the given name), return a tab with the text "Component not found for component name."


#### Example Usage
```javascript

const componentList = {
  Home: HomeComponent,
  Profile: ProfileComponent,
  Settings: SettingsComponent,

};

const tabNavigator = [
  {
    componentName: "Home",
    props: { /* Props for Home component */ },
  },
  {
    componentName: "Profile",
    props: { /* Props for Profile component */ },
  },
  {
    componentName: "Settings",
    props: { /* Props for Settings component */ },
  },
 
];

const currentTab = {
  route: {
    name: "Profile",
  },
};

const renderedComponent = TabScreen(currentTab);

return (
  <View>
    {renderedComponent}
  </View>
);
		
```

# HomePage
The HomePage  is responsible for Manages the visibility of the Login And SignUp component.
## State

### `setSignUpPage`
Manages the visibility of the Login And SignUp component. It is initialized as false. if false show Login else show SignUp.


## Functions 
### `valueSignUp`
change the value of the [setSignUpPage](#setsignuppage)
active Upon "prees the Don't Have an account?" in  [loginPage](#loginPage)  and at "Sign In" in [SignUpPage](#signup).
#### Actions
1. change the value to be the opsdie of the courrnt value of [setSignUpPage](#setSignUpPage) 

#### Example Usage
``` javascript
	const [signUpPage, setSignUpPage] = React.useState(false);
	const valueSignUp = () => {
		setSignUpPage((prev) => !prev); 
	};
	return(
		{!signUpPage ? <Text> vlaue is false<Text/> : 
		<Text> vlaue is true<Text/>  } 
	)

```


# LoginPage
The LoginPage is responsible for Manages the Login to the app.


## Variable
### `input`
Contains the names of the input fields and the names of the placeholder
that will go to the [Form](#form). 
`type`: array of Object.

## Functions
### `signIn`
This function is responsible for handling user sign-in actions. It takes a user object as its only parameter.
#### Parameters 
- `user`: An object containing user information for sign-in.
 ```json
   [{
   name: String,
   password: String
   }]
```

#### Actions
1. If one of the fields in the user object are empty, it shows an alert with the message.
2. If neither field is empty, it proceeds with the sign-in process.
3. It converts the user.name to lowercase
4. It splits the lowercase name into an array of sentences using space as a delimiter.
5. It capitalizes the first letter of each sentence in the name.
6. It joins the modified sentences back together with spaces and trims any leading or trailing spaces.
7. It trims the user.password
It constructs an HTTP request object (request) with the following properties:
- url: The URL for the sign-in API endpoint.
- body: The user object converted to JSON format.
- ContentType: The content type of the request, set to "application/ json; charset=UTF-
8. It sends the HTTP request using the [FetchRequest](#fetchrequest) function and waits for the response(send the request to [usersRouters](#routers) and [login](#login-1)).
9. Upon a successful response, it invokes the [logIn](#login) function.



#### Example Usage
``` javascript
const user = {
  name: "john doe",
  password: "secretPassword123",
};

signIn(user);
```
# SignUp
## State
### `setFullImage`
Contains the  IMG data. It is initialized as an null.

## Variable
### `input`
Contains the names of the input fields and the names of the placeholder
that will go to the [Form](#form). 
`type`: array of Object.

## Functions 

### `getImg`
The `getImg` function is responsible for receive the imgDate. will be invoked when press the "Choose a picture" in [ImagePicker](#ImagePicker) with [uploadeImg](#uploadeImg)
#### Parameters
- `fullImage`: A string containing the path of the image
#### Actions
1. take the fullImage and place it inside [setFullImage](#setFullImage)
#### Example Usage
``` javascript
const fullImage = 'file:///storage/emulated/0/__MyDocs/SignInTracker.html'
getImg(fullImage)

```

.### `signUp`
This function is responsible for handling user signUp actions. It takes a valueNewUser object as its only parameter.
#### Parameters 
- `valueNewUser`: An object containing user information for sign-in.
 ```json
   [{
     "name": String,
     "password": String,
     "birthYear": Number,
     "instagram": String,
   }]
```
#### Actions
1. If one of the fields in the valueNewUser object are empty, it shows an alert with the message.
2. If neither field is empty, it proceeds with the sign-in process.
3. It converts the user.name to lowercase
4. It splits the lowercase name into an array of sentences using space as a delimiter.
5. It capitalizes the first letter of each sentence in the name.
6. It joins the modified sentences back together with spaces and trims any leading or trailing spaces.
7. It trims the valueNewUser.password
8.  It appends the valueNewUser data and the [setFullImage](#setFullImage) to the FormData object .
It constructs an HTTP request object (request) with the following properties:
- url: The URL for the sign-in API endpoint.
- body: The user object converted to JSON format.
- ContentType: The content type of the request, set to "application/ json; charset=UTF-
9. It sends the HTTP request using the [FetchRequest](#fetchrequest) function and waits for the response(send the request to [usersRouters](#routers) and [signUp](#signUp-1))
10. Upon a successful response, it invokes the [valueSignUp](#valueSignUp) function with the received data.



#### Example Usage
``` javascript
const user = {
  name: "john doe",
  password: "secretPassword123",
  birthYear: 2002,
  instagram: "@test",
};

signUp(user);
```

# AccountPage

The `AccountPage` contains all the setting of the user.

## State

### `setVisible`
set the visible of the popUp. It is initialized as false .

### `setPopUpValue`
Contains the data of the field input in the form. It is initialized as  
```json
   [{
   name: String,
   placeholder: String
   }]

```


### `setChange`
Contains the value of the field input. It is initialized as 

```json
   [{
   id: props.userInfo.id
   key: String,
   value: String
   }]

```


### `setFullImage`
Contains the img from the Img Picker. It is initialized as null


## Variable
### `settings`
 The `settings` is an array of objects, each representing a different setting .
 ``` json
   [{
     "name": String,
     "nameIcons": String,
     "text": String,
     "placeholder": String,

   }]
 ```
## Functions 

### `getImg`

The `getImg` function is responsible for receive the imgDate. will be invoked when press the "Change Profile Image"  in [ImagePicker](#ImagePicker) with [uploadeImg](#uploadeImg)

#### Parameters
 - `pathImage`: A string containing the path of the image
 
#### Actions
1. take the fullImage and place it inside [setFullImage](#setFullImage)

#### Example Usage
``` javascript
const pathImage = 'file:///storage/emulated/0/__MyDocs/SignInTracker.html'
getImg(fullImage)

```
### `inputValue`

The `inputValue` function is responsible for updating a  the  [setChange](#setChange)with  the new input values.

#### Parameters
- `fieldName`:   A string containing the field name that being updated
- `text`: A string containing the  value  of the field  that being updated

#### Actions
1. Updates the change state object by creating a new object based on the previous state (prevUser).
2. Sets the key property of the new object to the value of the fieldName parameter, which is likely used to specify the field being updated.
3. Sets the value property of the new object to the value of the text parameter, which is the new text input.
#### Example Usage
``` javascript
const user = {
  fieldName: "password",
  text: "secretPassword123",
};

inputValue(user.fieldName,user.text);
```


### `changeItem`

The `changeItem` function is responsible for control the visibility of a pop-out or. It also updates the [setPopUpValue](#setPopUpValue) provided name and placeholder values if they are provided. Additionally, it resets the Change state to an empty object and sets the FullImage state to null .
#### Parameters
-  `name`: A string that  provided to update the name property in the PopUpValue state.
-`placeholder`: A string that update the placeholder property in the PopUpValue state.


#### Actions

1. It toggles the visibility of a pop-out or modal window by flipping the visible state.

2. If name and placeholder are provided, it updates the PopUpValue state by modifying its name and placeholder properties.

3. It resets the Change state with an object containing an id, key, and value properties. The values for id and key are derived from props.userInfo.id, while value is set to an empty string.

4. It sets the FullImage state to null, presumably to clear or reset any displayed full-sized image.

#### Example Usage
``` javascript
const filed = {
  name: "password",
  placeholder: "Secret Password",
};

changeItem(filed.name,filed.placeholder);
```
### `changeInfo`
The `changeInfo` function is responsible for updating user information or a user's profile image. It performs several actions based on the provided item parameter and the state of change and fullImage. It includes data validation, text transformation (for "full_name" key), making network requests to update user information, and handling success or failure responses. 

#### Parameters
- `item`: This parameter specifies the type of information to be updated. It can be "profileImage" or other values depending on the [setChange](#setChange) .

#### Actions
1. Data Validation: It checks if change.value is empty and fullImage is null. If both conditions are met, it shows an alert indicating that all fields must be filled.

2. Text Transformation: If the change.key is "full_name," it transforms the change.value to follow a specific format where the first letter of each word is capitalized, and the rest is in lowercase.

3. Network Request: It sends a network request to update user information using the  It sends the HTTP request using the [FetchRequest](#fetchrequest) function and waits for the response(send the request to [usersRouters](#routers) and [updateUser](#updateUser)). The request URL and body depend on the item parameter. If item is "profileImage," it sends a multipart/form-data request with the user's ID and profile image.

4. UI Updates: After a successful network request, it calls changeItem to potentially close a pop-out , retrieves updated user information with [props.getUser](#getUser), and displays a success alert.

Error Handling: It handles network request errors and displays an alert if the request fails or receives an unexpected response.

#### Example Usage
```  javascript
const change = {
  key: "full_name",
  value: "john doe",
  id: 123,
};
changeInfo(change);
// Update the user's profile image
const change = {
  key: "profileImage",
  value: "profile_image_uri", 
  id: 123,
};
changeInfo("profileImage");


```


# ActivitiesPage 
The `ActivitiesPage` responsible for Manages the add Activities

## State
### `setActivityInfo`
set the Info of the activity. It is initialized as  


```json
{
		activity: "",
		date: "",
		location: "",
		time: "",
		id: props.userInfo.id,
	}
```
## Variable
### `input`
 The `input` is an array of objects, each representing a different input filed .
 ``` json
   [{
     "name": String,
     "placeholder": String,

   }]
 ```
## Functions 

### `inputValue`
The `inputValue` function is responsible for update the activityInfo state object by setting specific fields identified by the fieldName parameter to the provided text value. 
#### Parameters
 - `fieldName`: A string that represents the name of the field in the [activityInfo](#setActivityInfo) state object that you want to update.
- `text`: The new value that you want to assign to the specified field in the [setActivityInfo](#setActivityInfo).

#### Actions
1. The function takes the current state (prevUser) of the activityInfo object and returns a new state object by spreading the previous state and updating the field specified by fieldName with the new value text.

#### Example Usage


``` javascript

inputValue("activity", "Hiking","date", "2023-09-20","location", "Mountain Trail","time", "10:00 AM");


```

### `getVlaueOFtime`
The `getVlaueOFtime` function is responsible for updating the [setActivityInfo](#setActivityInfo) with a new date or time value based on the provided timeOrdate parameter from [DateTimePick](#Datetimepick). 
#### Parameters
 - `timeOrdate`: This parameter is an object that can contain either a date or a time property. It determines whether to update the date or time field in the activityInfo state.
#### Actions
1. The function first creates a copy of the [setActivityInfo](#setActivityInfo) as updatedActivityInfo using the spread operator ({ ...activityInfo }).

2. It checks if the timeOrdate parameter contains a date property. If it does, it updates the date field in [setActivityInfo](#setActivityInfo) with the date value from the timeOrdate parameter.

3. If the timeOrdate parameter contains a time property, it updates the time field in [setActivityInfo](#setActivityInfo) with the time value from the timeOrdate parameter.

4. Finally, it sets the [setActivityInfo](#setActivityInfo) to the updated updatedActivityInfo object, effectively updating the date or time field in the state
#### Example Usage
``` javascript
getVlaueOFtime({ date: "2023-09-20" });

getVlaueOFtime({ time: "10:00 AM" });

```

### `addActivity`
The `addActivity` function is responsible for adding a new activity. 
#### Actions
1. The function begins by performing a series of checks to ensure that all required fields for the new activity are filled. It checks if activity, location, date, and time fields within the [setActivityInfo](#setActivityInfo)  are empty. If any of these fields are empty, it displays an alert stating that all fields must be filled.

2. If all the required fields are filled, the function send a network request 
 using the [FetchRequest](#fetchrequest) function and waits for the response(send the request to [Routers](#routers-1) [addActivity](#addActivity-1))


3.  Once the request is successful, it updates the activityInfo state by resetting the [setActivityInfo](#setActivityInfo) fields to empty strings and displays an alert to indicate that the activity has been added.

Error Handling: If there are any errors during the network request, it displays an alert indicating that the request failed or received an unexpected response.
#### Example Usage
``` javascript 
activityInfo = {
	activity: "Hiking",
		date: "2023-09-20",
		location: "Mountain Trail",
		time: "10:00",
		id: 12,


}

addActivity();

``` 
# CalendarPage
The `CalendarPage` contains all the Event of the user.

## State
### `setSelected`
set the date of the selected date in the calendar. It is initialized as empty string.

### `setYourEvent`
set the Info of the Event you  registered to. It is initialized as empty object
## UseEffect
set up to call [getYourActivity](#getYourActivity) when the component mounts, which happens when you first enter the page.

## Functions 
### `getYourActivity`
The `getYourActivity` function is responsible for retrieving user activity data. 

#### Parameters
- `id`: A Number representing the user's ID.

#### Actions
1. the function send a network request 
 using the [FetchRequest](#fetchrequest) function and waits for the response(send the request to [usersRouters](#routers) and [getUserActivity](#getUserActivity))

2. Upon a successful response, it sets the [setYourEvent](#setYourEvent)  with the retrieved data. 
#### Example Usage

```javascript
const id =10
getYourActivity(); // get Activity for user with id 10
```
### `notifications`
The `notifications` function is responsible for adding a notifications for the event. 
#### Parameters
- `item`: A array of :

```json 
{
"ActivitName": string, 
"ActivityDate": string, 
"ActivityID": number,
"ActivityLocation": string, 
"EventOrganizer": string, 
"User": string
 }

```
#### Actions
1. awaits the [NotificationsEvent](#notificationsevent)(item)
#### Example Usage

```javascript

const item = {"ActivitName": "Walk with the dog", "ActivityDate": "2023-09-11 18:30", "ActivityID": 1, "ActivityLocation": "Mountain Trail", "EventOrganizer": "Test2", "User": "sdad"}
await  NotificationsEvent(itme)
```

# SwiperPage

The `SwiperPage` contains the [SwiperBody](#swiperbody).
if the [showSwiper](#setShowSwiper) is true and the [usersData](#setUsersData)
is not an empty array it show the [SwiperBody](#swiperbody) else it show "Nothing To See"

# SwiperBody
## State
### `setCurrentIndex`
set the index of the card in the swiper. It is initialized 0.
## useRef
### `swiperRef` 
 used to create a reference to the currentIndex

## Functions 
### `renderCard`
The `renderCard` function is responsible for rendering the content of a card in a swiper component. 

#### Parameters
- `user`: An object representing a user . It contains properties like ProfileImage, date, instagram, activity, and location.

#### Actions
1. The function returns a JSX component that represents the content of a card.

2. It displays an image using the Image component, sourcing the image from the user.ProfileImage property.

3. It renders various textual information about the event or notification, such as date, time, Instagram username, event name, and location, using Text components.

4. The function also includes two buttons,  for interaction with the card. These buttons are part of the MaterialCommunityIcons library:

 1. The first button displays a "close" icon and is associated with swiping the card to the left.
 2. The second button displays a "heart" icon and is associated with swiping the card to the right.
  When these buttons are pressed, they interact with the [swiperRef](#swiperRef) to trigger swiping actions (left or right) on the swiper component.
  
#### Example Usage

``` javascript 

const items =[{
  "ProfileImage": "file:///storage/emulated/0/__MyDocs/32232.html",
  "activity": "Kiss ",
   "activityId": 5, 
   "date": "2023-09-11 17:13", 
   "fullName": "Test2", 
   "instagram": "@test2", 
   "location": "Hell", 
   },
   {
  "ProfileImage": "file:///storage/emulated/0/__MyDocs/3232.html",
  "activity": "love ",
   "activityId": 6, 
   "date": "2023-09-20 17:00", 
   "fullName": "Test1", 
   "instagram": "@test1", 
   "location": "Hell232", 
   },
   
   ]


<Swiper
  ref={swiperRef}
  cards={items}
  renderCard={renderCard}
/>

```
  ### `closeSwiper`
  The `closeSwiper` function is responsible for closing the swiper when all there is no more card
#### Actions
1. activity the [props.closeSwiper()](#closeSwiper)

  ### `handleSwiped`
 The `handlerSwiped` function is responsible for handling swipe events, which might involve changing the current index and sending an HTTP request based on user interactions.
#### Parameters
- `swipe`: A value that represents the direction or type of swipe (e.g., "Left" or "Right").
- `index`: An index value that likely corresponds to the position of a card or element within a collection.
#### Actions

1. The function first increments the [currentIndex](#setCurrentIndex) variable by one when a swipe event occurs. 

2. Following the index update, the function prepares an object named  register containing several properties, including userId, organizerId, activityId, and swipe. This object encapsulates data related to a user's interaction with a card.

3. the function send a network request 
 using the [FetchRequest](#fetchrequest) function and waits for the response(send the request to [registrationRouters](#routers-2) and[registrationForEvent](#registrationforEvent))

#### Example Usage

``` javascript 
const swipeDirection = "Left";
const cardIndex = 0; 

handlerSwiped(swipeDirection, cardIndex);
```
# components

# Form
 form component.
## props
 1. `input`:   An array containing objects that define the form input fields, including their key Name Of The Page, names and placeholders. For example:

 ```javascript 
const input = [
  { key: "Login", name: "name", placeholder: "Full Name" },
  { key: "Login", name: "password", placeholder: "Password" },
];

 ```
 2. `submit`:  A function that gets executed when the form's submit button is pressed.
## State
### `setShowPassword`
set the secureTextEntry of the password filed namein the form. It is initialized as false.
### `setValueNewUser`
set the value of the input in the form.  It takes an [input](#props) as its argument, where the keys represent the input field name, and the values represent the initial values for those fields.

## Functions 
### `changeuserValue`
The `changeuserValue` function is responsible for updating the [valueNewUser](#setValueNewUser), which holds the values of input fields in a form.  

#### Parameters
- `fieldName`: A string representing the name of the input field you want to    update.
- `text`: The new value that you want to assign to the specified input field.
#### Parameters
#### Actions
1. The function uses the [setValueNewUser](#setValueNewUser)  to update the state.
2. It takes the previous state (prevUser) and returns a new state object by spreading the previous state and updating the field specified by fieldName with the new value text.

#### Example Usage

```javascript


changeuserValue("password","122")
```
### `toggleShowPassword`
The `toggleShowPassword` function is responsible for toggling the visibility of a password input field. 

#### Actions
1. The function uses the [setShowPassword](#setShowPassword) to update the state.
2. It takes the previous state (prev) and returns the opposite boolean value (!prev), effectively toggling between true and false states.
#### Example Usage
```javascript

	const toggleShowPassword = () => {
		setShowPassword((true) => !true);
	};

```
# ImagePicker
 ImagePicker component.
## props
 - `getImg`:  A function that gets the img path.
 ## State
### `setImage`
set the path  of the . It is initialized as false.

## Functions 
### `uploadeImg`
The `uploadeImg` function is responsible for launching an image picker, requesting camera and gallery permissions if needed, and then setting the selected image. 

#### Actions
1. It uses the PermissionsAndroid API to request camera and gallery permissions. This step ensures that the app has the necessary permissions to access the device's camera and media gallery.
2. It configures the image picker with options that define the behavior of the image selection. These options include settings for image quality, type, maximum dimensions, selection limit (1 image in this case), and whether to include the image data as base64.
3. It then launches the image picker using ImagePicker.launchImageLibraryAsync({ options }).
4. If the user selects an image (i.e., !result.canceled), it sets the selected image's URI to [image](#setImage).
5. Passing Image to the [getImg](#props-1).

#### Example Usage

```javascript
const imgSelected = "file:///storage/emulated/0/__MyDocs/32232.html"
setImage(imgSelected)
props.getImg(imgSelected)
```
# DateTimePick
 DateTimePicker component.

## props
 - `sendVlaueOFtime`:  A function that gets the Vlaue of time and date.

 ## State
### `setShowTimePicker`
set the visibility of the DateTimePicker It is initialized as false.
### `setMode`
set the mode of the DateTimePicker. It is initialized as an empty  string.
### `setTime`
set the value of the the time . It is initialized as new Date.

## Functions 
### `changeTime`
The `changeTime` function is responsible for handling changes to the selected date and time.
#### Actions
1. It sets the [showTimePicker](#setShowTimePicker) state to false, to hide the time picker or date picker.
2. It checks the event.type to determine if the user has confirmed the selection (e.g., "set" event type) and if selectedDate is not null.
If the user has confirmed the selection, it formats the selected date or time:

3. If the mode is "time," it formats the time portion of selectedDate to a 12-hour format with leading zeros for hours and minutes.
If the mode is not "time" (presumably "date" or another mode), it formats the selected date as a string without the time portion.
4. It sets the [time](#setTime) with the selectedDate value, updating the.

5. It calls [sendVlaueOFtime](#props-2) to send the formatted date or time value.

If the user cancels the date or time selection, it sets the time state to the current date (resetting it to the current date and time).

#### Example Usage

```javascript
const time = '2013-10-20 10:20'
setTime(time);
props.sendVlaueOFtime(time);
``` 
### `pickPicker`
The `pickPicker` function is responsible for displaying a time picker or date picker and setting its [mode](#setMode) based on the specified value(time/date).
#### Parameters
- `value`: A string representing the mode for the picker (e.g., "time" for time picker or "date" for date picker).

#### Actions
1. It sets the [showTimePicker](#setShowTimePicker) to true, which triggers the display of the time picker or date picker.

2. It sets the [mode](#setMode) to the specified value. The mode determines whether the picker will function as a time picker or date picke
#### Example Usage

```javascript
const value ='time'
pickPicker(value)
``` 
# NotificationsEvent
Notifications component.
## props
 - `item`:  A array of :

```json 
{
"ActivitName": string, 
"ActivityDate": string, 
"ActivityID": number,
"ActivityLocation": string, 
"EventOrganizer": string, 
"User": string
 }
``` 

## Functions 
1. It splits the [item](#props-3).ActivityDate string into datePart and timePart by using a space as the delimiter.
2. It further splits the timePart into hours and minutes using a colon as the delimiter.
3. It creates a targetDate object using the datePart and sets its hours and minutes to the extracted values from hours and minutes. The seconds are set to 0.
4. It creates a currentTime object representing the current date and time.
5. It calculates the time difference in seconds (timeDifferenceInSeconds) between the targetDate (event time) and the current time.
If the calculated difference is negative, it's set to 0 to avoid scheduling past notifications. 
6. It uses the Notifications.scheduleNotificationAsync function to schedule a notification.
7. The notification content includes the event name, time, location, and organizer, extracted from [item](#props-3).
The trigger object specifies when the notification should be triggered. In this case, it's set to timeDifferenceInSeconds seconds in the future, effectively scheduling the notification to occur at the event's specified time.
8. If the notification scheduling is successful, it displays an alert message: "Notification scheduled successfully."

Error Handling:

It wraps the notification scheduling process in a try...catch block to handle any errors that may occur during scheduling.
#### Example Usage

```javascript
const item = {
"ActivitName": "to play basketball", 
"ActivityDate": "11-03-2000", 
"ActivityID": 1,
"ActivityLocation": "London", 
"EventOrganizer": "adam", 
 }
const time = item.ActivityDate;
	const [datePart, timePart] = time.split(" ");
	const [hours, minutes] = timePart.split(":");
	const targetDate = new Date(datePart);
	targetDate.setHours(hours);
	targetDate.setMinutes(minutes);
	targetDate.setSeconds(0);

	const currentTime = new Date();
	const timeDifferenceInSeconds =
		Math.max(0, targetDate.getTime() - currentTime.getTime()) / 1000;
```



# FetchRequest
FetchRequest component.
## props
 - `requst`:  A array of :

```json 
{
"url": string, 
"body": A JSON string representing the request body, 
"ContentType": A string representing the content type of the request,

 }
``` 

## Functions 
1. It sends an HTTP POST request to the URL specified in the [requst](#props-4).

2. The request includes the request body (requst.body) and sets the "Content-Type" header based on the value specified in requst.ContentType.

3. It checks the HTTP response status code:

4. If the status code is not 200, it rejects the promise with the message "Unauthorized."
5. If the response status code is 200 (indicating a successful response):

6. It parses the response data as JSON using response.json().
7. If parsing is successful, it resolves the promise with the parsed data.

Error Handling: If there are any errors during the response parsing or handling, it logs the error to the console.

# backend

## server
sets up an Express.js server for handling HTTP requests.

#### Import
The code begins by importing necessary Node.js modules and external dependencies. These include `Express.js` for building the server,` CORS` for handling Cross-Origin Resource Sharing, `Body Parser` for parsing JSON data in requests, `Multer `for handling file uploads, and a [db-connection](#db-connection). 
#### Middleware
1. `bodyParser.json()` and `express.json()`: These middlewares are used for parsing JSON data in incoming requests.
2. `cors()`: This middleware is used to enable Cross-Origin Resource Sharing, allowing the server to respond to requests from different origins.
3. `multer` is set up to use memoryStorage for handling file uploads. Files sent in requests will be stored in memory.

#### Routing
The code imports and sets up routers for handling different API routes:
1. [usersRouters](#routers) for [Table Users](#Users-1).
2. [activityRouters](#routers-1) for[Table activity](#activities).
3. [activitiesRegistrationRouters](#routers-2) for [Table activity registration](#activity_registration).

#### Server Start
The server is configured to listen on port 3000. When it starts, it attempts to establish a database connection using the [createDatabaseConnection](#db-connection) function. If the database connection is successful, a message is printed to the console. If there's an error in connecting to the database, an error message is logged, and the server process exits.

## db-connection
set up for connection to database (mysql)
#### Import
1. `mysql2`: This library is imported to create a connection to a MySQL database.
2. `dotenv`: The dotenv library is imported to load environment variables from a .env file .
#### Function
`createDatabaseConnection` - This function returns a promise that will either resolve with a database connection or reject with an error.
##### Actions
1. A database connection is created using the configuration provided in the process.env variables.
2. The `db.connect()` method is used to establish a connection to the database. If an error occurs during the connection attempt, it will be passed to the reject function, causing the promise to be rejected.
If the connection is successful, the resolve function is called with the db object, indicating a successful connection. The db object can then be used to interact with the database. 

## Middleware
### errHandler
## api 
### Users
#### Routers
 a  routes using Express.js for a "Users" controller. These routes handle various user-related actions such as getting user activity, updating user information, getting a user by ID, logging in, and signing up. 

##### Import
1. `express`: The Express.js framework is imported to create and configure routes.
2. `{ Users }`: It imports a controller class named "Users" from [class Users](#class-users).
`usersCrudControler`: An instance of the ["Users"](#class-users) controller .
##### Route Definitions

- `/getUserActivity`: Handles a POST request for getting user activity.
- `/updateUser`: Handles a POST request for updating user information.
- `/getUser`: Handles a POST request for getting a user by ID.
- `/login`: Handles a POST request for user login.
- `/signUp`: Handles a POST request for user sign-up.
 
**module.exports = router; The Express router is exported, making it available for use in [server.js](#server).**

#### Controller

##### Class-Users
extensions of [CRUD](#crud) This means that the Users class will inherit all properties and methods from the CRUD class.
- `Constructor`: This constructor is automatically called when a new instance of the Users class is created.

- `super`:   is used to call the constructor of the [CRUD](#crud). The argument "users" is passed to the [collectionName](#collectionName). 

##### Function
######  `getUserActivity`
The `getUserActivity` function is responsible for handling user activuty.
- `Parameters`:
1. `req`: The HTTP request object containing information about the incoming request.
2. `res`: The HTTP response object used to send a response back to the client.
3. `errHandler`: [errHandler](#errHandler).
- `Actions`:
1. The code begins by destructuring the id from the request's body (req.body).

2. An array named column is defined, which specifies the columns(see TODO) to be selected in the database query.

3. A SQL query is constructed using the ON variable, which represents a SQL JOIN statement. This query joins multiple tables (users, activity_registration, activities, and users2) based on certain conditions, filtering by the provided id and a status condition.

4. The [super.usingJOIN(column, ON)](#usingJOIN) method is called. 

If the database query is successful, the retrieved data is sent as a response with a status code of 200 (OK).

**If there is an error during the database query or any other part of the process, it is caught in a catch block, and an [errHandler](#errHandler) function is called to handle the error.**

**TODO:You get the column from [schema-sql](#Users-1)**


######  `updateUser`
The `updateUser` function is responsible for updating user information based on the provided request data.
- `Parameters`:
1. `req`: The HTTP request object containing information about the incoming request.
2. `res`: The HTTP response object used to send a response back to the client.
3. `errHandler`: [errHandler](#errHandler).
- `Actions`:
1. It begins by checking if a file (req.file) has been attached to the request. If a file is present:
 - It extracts the originalname and buffer from the uploaded file and extracts the id from the request body.

 - Then, it calls the [super.getItemByID("profile_image ", id)](#getItemByID) method to retrieve the existing profile image path for the user.
 
 - The code then writes the new profile image data to the file path specified by the result[0].profile_image.
 
 - Finally, it sends a response with a status code of 200 (OK) and the value true to indicate a successful update.
 2. If no file is attached to the request:
 - It extracts the id, key, and value from the request body's change object.
 - If the key is "password", it hashes the value using bcrypt for password security.
 - It then calls the [super.updateItem(id, key, value)](#updateItem) method to update the user's information.
 - If the update is successful, it sends a response with a status code of 200 (OK) and the value true
**If there is an error during the database query or any other part of the process, it is caught in a catch block, and an [errHandler](#errHandler) function is called to handle the error.**

######  `getUserById`
The `getUserById` function is designed to retrieve user information based on the provided user ID (id).
- `Parameters`:
1. `req`: The HTTP request object containing information about the incoming request.
2. `res`: The HTTP response object used to send a response back to the client.
3. `errHandler`: [errHandler](#errHandler).
- `Actions`:
1. It starts by extracting the id from the request body (req.body).

2. An array named column is defined, specifying the columns to be selected in the database query. It includes the user's ID, full name, birth year, profile image, and Instagram handle (if available).

3. The function then calls [super.getItemByID("profile_image ", id)](#getitembyiD).

4. When the database query is successful, it receives a result object. Within the .then() 

 - The code calls [super.readFileLocal(result[0].profile_image)](#readfilelocal).
 - The profile image data is then assigned to result[0].profile_image.
 - Finally, the function sends a response with a status code of 200 (OK) and the result[0] object, which contains user information, including the updated profile image.
**If there is an error during the database query or any other part of the process, it is caught in a catch block, and an [errHandler](#errHandler) function is called to handle the error.**

**TODO:You get the column from [schema-sql](#users-1)**

######  `login`
The login function is designed for user login authentication based on the provided name (presumably username or full name) and password.
- `Parameters`:
1. `req`: The HTTP request object containing information about the incoming request.
2. `res`: The HTTP response object used to send a response back to the client.
3. `errHandler`: [errHandler](#errHandler).
- `Actions`:
1. It starts by extracting the name and password from the request body (req.body).

2. The code then calls [super.getAllData()](#getAllData).

3. .then():
- The code uses .find() to search through the retrieved user data to find a user object that matches the provided name and has a password that matches after bcrypt hashing and comparison (bcrypt.compareSync(password, item.password)).
- If a matching user is found (isUserInSystem is not undefined), it proceeds to fetch the user's profile image from a local file using[super.readFileLocal(isUserInSystem.profile_image)](#readfilelocal)
The user's profile image data is assigned to isUserInSystem.profile_image.
Finally, the function sends a response with a status code of 200 (OK).
- If `no` matching user is found, the function sends a response with a status code of 401 (Unauthorized) and the string "unauthorized" as the response body to indicate that the login was not successful.

**If there is an error during the database query or any other part of the process, it is caught in a catch block, and an [errHandler](#errHandler) function is called**

######  `signUp`
The `signUp` function is designed for user registration based on the provided data, including a profile image upload.
- `Parameters`:
1. `req`: The HTTP request object containing information about the incoming request.
2. `res`: The HTTP response object used to send a response back to the client.
3. `errHandler`: [errHandler](#errHandler).
- `Actions`:
1. It starts by extracting the buffer from the uploaded file (req.file). This buffer  contains the binary data of the user's profile image.also extracts name, password, birthYear, and instagram from the request body (req.body)

2. A file path (filePath) is constructed using the path.join() method, indicating where the user's profile image will be saved locally ([Img Folder](#user-img)). 

3. The user's password is hashed using bcrypt for security.

4. An array named `value` is constructed to hold the values for insertion into the database. It includes the user's name, hashed password, birth year, file path, and Instagram handle, formatted as a single string.

5. An array named `column` specifies the columns to which the values in value correspond in the database.

6. The code then calls [super.addToTables(column, value)](#addtotables). 

7. .then():

 - The user's profile image is written to the specified file path (filePath) on the server's local filesystem using fs.writeFileSync().
 - Finally, the function sends a response with a status code of 200 (OK) and an object { goog: "good" } as the response body to indicate a successful registration.
**If there is an error during the database query or any other part of the process, it is caught in a catch block, and an [errHandler](#errHandler) function is called to handle the error.**

**TODO:You get the column from [schema-sql](#users-1)**

#### User-img
A folder that contains all the users' photos (the name of the entire file is the name of their Instagram account)

### Activity

#### Routers
 a  routes using Express.js for a "Activities" controller. These routes handle various Activities actions such as add activity and getting all of the Activity. 
 ##### Import
1. `express`: The Express.js framework is imported to create and configure routes.
2. `{ Activities }`: It imports a controller class named "Activities" from [Class-Activities](#class-activities).
`activitiesCrudControler`: An instance of the ["Activities"](#class-activities) controller .
##### Route Definitions

- `/addActivity`: Handles a POST request for  adding activity.
- `/getAllActivity`: Handles a POST request for geting all user activity.

 
**module.exports = router; The Express router is exported, making it available for use in [server.js](#server).**

#### Controller
##### Class-Activities
extensions of [CRUD](#crud) This means that the Activities class will inherit all properties and methods from the CRUD class.
- `Constructor`: This constructor is automatically called when a new instance of the Activities class is created.

- `super`:   is used to call the constructor of the [CRUD](#crud). The argument "activities" is passed to the [collectionName](#collectionName).

##### Function
######  `getAllActivity`
The `getAllActivity` function is designed to fetch a list of all activities from [Activities](#activities). 
- `Parameters`:
1. `req`: The HTTP request object containing information about the incoming request.
2. `res`: The HTTP response object used to send a response back to the client.
3. `errHandler`: [errHandler](#errHandler).
- `Actions`:
1. It starts by extracting the id from the request body (req.body).

2. A SQL query (ON) is constructed as a string to retrieve activities based on certain conditions:

- Activities where the event_organizer is not the same as the user's ID (`activities.event_organizer != ${id}`).
- Activities that the user is not already registered for (activities with IDs not in the subquery).

3. An array named column specifies the columns to be selected in the database query. It includes  activity ID, activity name, date, location, user ID (event organizer), user's full name, profile image, and Instagram handle.

4. The code then calls [super.usingJOIN(column, ON)](#usingJOIN)..

5. .then():

-  For each item in the result, the code attempts to read the user's profile image file and convert it to a base64-encoded string.
The base64-encoded image is assigned to item.profile_image.

- Finally, the function sends a response with a status code of 200 (OK) and newResult, which contains the list of activities with user profile images.

######  `addActivity`
The `addActivity` function is designed to add a new activity.
- `Parameters`:
1. `req`: The HTTP request object containing information about the incoming request.
2. `res`: The HTTP response object used to send a response back to the client.
3. `errHandler`: [errHandler](#errHandler).
- `Actions`:
1. It starts by extracting variables from the request body, including activity, date, location, id, and time.

2. The combinedDateTime variable is constructed by combining the date and time values to create a single datetime value.

3. An array named column specifies the columns to which the values in the VALUES array correspond in the database. It includes columns for activity, date, location, and event_organizer.

4. The VALUES array is constructed with a single string containing the values to be inserted into the database. These values are formatted as a single string with single quotes around text values and without quotes for numeric values.

5. The code then calls [super.addToTables(column, value)](#addtotables).

6. .then():

- The function sends a response with a status code of 200 (OK) and the result.

**If there is an error during the database query or any other part of the process, it is caught in a catch block, and an [errHandler](#errHandler) function is called to handle the error.**

**TODO:You get the column from [schema-sql](#activities)**

### Activity-Registration
#### Routers

 a  routes using Express.js for a "ActivitiesRegistration" controller. handle registrationforEvent action.
 ##### Import
1. `express`: The Express.js framework is imported to create and configure routes.
2. `{ ActivitiesRegistration }`: It imports a controller class named "ActivitiesRegistration" from [Class-ActivitiesRegistration](#class-activitiesregistration).
`activitiesRegistrationCrudControler`: An instance of the ["ActivitiesRegistration"](#class-activitiesregistration) controller .
##### Route Definitions

- `/registration`: Handles a POST request for  registration to activity.

**module.exports = router; The Express router is exported, making it available for use in [server.js](#server).**

#### Controller
##### Class-ActivitiesRegistration
extensions of [CRUD](#crud) This means that the ActivitiesRegistration class will inherit all properties and methods from the CRUD class.
- `Constructor`: This constructor is automatically called when a new instance of the ActivitiesRegistration class is created.

- `super`:   is used to call the constructor of the [CRUD](#crud). The argument "activity_registration" is passed to the [collectionName](#collectionName).
##### Function
######  `registrationForEvent`
The `registrationForEvent` function is designed to register a user for a specific event.
 
- `Parameters`:
1. `req`: The HTTP request object containing information about the incoming request.
2. `res`: The HTTP response object used to send a response back to the client.
3. `errHandler`: [errHandler](#errHandler).

- `Actions`:
1. It starts by extracting variables from the request body including userId, activityId, organizerId, and swipe. These values likely represent details about the registration.

2. The status variable is initially set to 1. However, if swipe is equal to "Left," the status is changed to 0.

3. An array named column specifies the columns to which the values in the values array correspond in the database. It includes columns for user_id, active_id, event_organizer_Id, and status.

4. The values array is constructed with the userId, activityId, organizerId, and status values to be inserted into the database.

5. The code then calls [super.addToTables(column, value)](#addtotables). 

6. .then():

 - The function sends a response with a status code of 200 (OK) and the result    object.

**If there is an error during the database query or any other part of the process, it is caught in a catch block, and an [errHandler](#errHandler) function is called to handle the error.**

**TODO:You get the column from [schema-sql](#activity_registration)**

## CRUD
This class is designed to handle Create, Read, Update, and Delete (CRUD) operations on a collection of data within a database.
##### Class-CRUD

- `Constructor`:The constructor is a special method that is automatically called when a new instance of the CRUD class or its subclasses is created. In this case, the constructor accepts one parameter. 
  - `collectionName` -  represents the name of the  database table that the CRUD operations will be applied to.


##### Function
####  `getAllData`
The `getAllData` function is responsible for retrieving all records from a specified database table base on the [collectionName](#class-crud). 
- `Actions`:

1. Establishes a database connection using the[createDatabaseConnection](#db-connection).
2. Constructs an SQL query to select all records from the specified table.
Wraps the query execution in a promise for better async handling.
3. Retrieves the result of the query, which typically includes all records from the table.

**Handles errors, throwing an Error object if any issues occur during the database operation.**

#### `addToTables`
The `addToTables` function is responsible for inserting data into a specified database table base on the [collectionName](#class-crud).

- `Parameters`:

1. column: An array containing the names of the columns in the table where data will be inserted.

2. VALUES: An array containing the corresponding values to be inserted into the table. The order of values should match the order of columns.

- `Actions`:
1. Establishes a database connection using the[createDatabaseConnection](#db-connection).

2. Constructs an SQL INSERT query to insert data into the specified table.

3. Dynamically generates the column names and values to be inserted based on the provided column and VALUES arrays.
4. Wraps the query execution in a promise for better asynchronous handling.

5. Resolves the promise with true if the insertion is successful.

**Handles errors, throwing an Error object if any issues occur during the database operation.**

#### `getItemByID`


The `getItemByID` function is responsible for retrieving specific data from a database table based on the provided id and the specified column or columns.

- `Parameters`:
1. `column`: An array containing the names of the columns to be selected from the table. You can specify one or more columns.

2. `id`: The unique identifier used to filter the records in the table and retrieve the desired data.

- `Actions`:

1. Establishes a database connection using the[createDatabaseConnection](#db-connection).

2. Constructs an SQL SELECT query to select data from the specified table.

3. Dynamically generates the column names to be selected based on the provided column array.

4. Adds a WHERE clause to the query to filter records based on the provided id.

5. Wraps the query execution in a promise for better asynchronous handling.

6. Resolves the promise with the result of the query.
**Handles errors, throwing an Error object if any issues occur during the database operation.**

#### `usingJOIN`
The `usingJOIN` function is responsible for executing a database query that performs an SQL INNER JOIN operation on the specified table. It allows you to select specific columns based on the provided column parameter and apply the INNER JOIN operation with the ON clause.

- `Parameters`:
1. `column`: An array containing the names of the columns to be selected from the table. You can specify one or more columns.

2. `ON`:A string representing the ON clause for the INNER JOIN operation. It defines the conditions for joining tables..

- `Actions`:
1. Establishes a database connection using the[createDatabaseConnection](#db-connection).

2. Constructs an SQL SELECT query that includes the specified column, the target table, and the INNER JOIN operation based on the provided ON clause.

3. Wraps the query execution in a promise for better asynchronous handling.

4. Resolves the promise with the result of the query.

**Handles errors, throwing an Error object if any issues occur during the database operation.**

#### `readFileLocal`
The `readFileLocal` function is responsible for reading a file from the local file system and encoding it as a base64 string.

- `Parameters`:
1. `path`: A string representing the file path to read from the local file system.

- `Actions`:
1. Reads the contents of the file specified by the path parameter.

2. Encodes the file contents as a base64 string.

3. Wraps the file reading operation in a promise for better asynchronous handling.

4. Resolves the promise with the base64-encoded file contents if the reading is successful.

**Handles errors, throwing an Error object if any issues occur during the database operation.**

#### `updateItem`
The `updateItem` function is responsible for updating a specific item in a database table by modifying a specified column with a new value.

- `Parameters`:
1. `id`: The unique identifier used to identify the record to be updated.

2. `key`: A string representing the column name that needs to be updated.

3. `value`: The new value that should replace the existing value in the specified column.

- `Actions`:
1. Establishes a database connection using the[createDatabaseConnection](#db-connection).

2. Constructs an SQL UPDATE query to modify a specific column with a new value.

3. Wraps the query execution in a promise for better asynchronous handling.

4. Resolves the promise with true if the update operation is successful.

**Handles errors, throwing an Error object if any issues occur during the database operation.**


## Schema-sql

###  Users

| Column Name   | Data Type    | Constraints                 | Description                                |
| ------------- | ------------ | --------------------------- | ------------------------------------------ |
| `id`          | INT          | PRIMARY KEY, AUTO-INCREMENT | Unique identifier for each user.           |
| `full_name`   | VARCHAR(20)  | -                           | Full name of the user (up to 20 characters).|
| `password`    | CHAR(60)     | NOT NULL                   | User's password (hashed).                  |
| `birthYear`   | YEAR         | -                           | User's birth year.                         |
| `profile_image` | TEXT      | -                           | URL or reference to the user's profile image.|
| `instagram`   | TEXT         | -                           | User's Instagram handle or profile link.   |

### Activities

| Column Name       | Data Type    | Constraints                 | Description                                     |
| ----------------- | ------------ | --------------------------- | ----------------------------------------------- |
| id                | INT          | PRIMARY KEY, AUTO-INCREMENT | Unique identifier for each activity.             |
| activity          | VARCHAR(100) | -                           | Name or description of the activity (up to 100 characters). |
| date              | VARCHAR(19)  | -                           | Date and time of the activity (formatted as VARCHAR).        |
| location          | VARCHAR(20)  | -                           | Location of the activity (up to 20 characters).               |
| event_organizer   | INT          | -                           | User ID of the event organizer (foreign key to `users.id`).   |

### Activity_registration

| Column Name         | Data Type    | Constraints                 | Description                                          |
| ------------------- | ------------ | --------------------------- | ---------------------------------------------------- |
| id                  | INT          | PRIMARY KEY, AUTO-INCREMENT | Unique identifier for each registration.             |
| user_id             | INT          | -                           | User ID of the registrant (foreign key to `users.id`).  |
| active_id           | INT          | -                           | Activity ID being registered for (foreign key to `activities.id`). |
| event_organizer_Id  | INT          | NOT NULL                   | User ID of the event organizer (foreign key to `users.id`).     |
| status              | TINYINT(1)  | -                           | Registration status, indicating whether a user is registered.     |