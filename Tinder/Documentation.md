# Table of Contents
- [App](#app)
  - [Functions](#functions)
    - [login](#login)
    - [getAllActivity](#getallactivity)
    - [closeSwiper](#getUser)
    - [logOut](#logout)
    - [getUser](#getUser)
- [AccountPage](#accountPage)
- [SwiperBody](#swiperBody)
 #  App

## State

Contains three state variables:

### `setUsersData`: 
Contains the data of all the users after the user logs in. It is initialized as an empty array.

### `setShowSwiper`: 
Manages the visibility of the Swiper component. It is initialized as `true`.

### `setUser`:
 Contains the user data. It is initialized as an empty array.


## Functions 


### logIn

The `logIn` function is responsible for handling user login. After the user logs in, this function is activated and receives user data as a variable from the `signIn` function in the Login Page.

### Parameters

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

### Actions

Upon successful login, the `logIn` function performs the following actions:

1. It pushes the received `userData` to the state variable `setUser`, making user data accessible throughout the application.

2. It sets the state variable `setShowSwiper` to `true`. This action is essential to ensure that if the user disconnects and then reconnects, their state becomes `true` again, ensuring proper functionality.

3. It activates the `getAllActivity` function with the `user.id` as a parameter. This function fetches activity data associated with the logged-in user.

### Example Usage

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
### getAllActivity

The `getAllActivity` function is responsible for retrieving all the activities of other users. After the [login](#login) function is activated, this function will be invoked and receives the `user.id` as a parameter from the [login](#login) function in the Login Page.

### Parameters

- `id`: A Number representing the user's ID.

### Actions

1. The function takes the `id` and sends it to the server.
2. It checks the server's response, and if it's not a 200 status, it handles the error.
3. If the response is a 200 status, it retrieves the result as an object.
4. It processes the data, potentially transforming it or extracting specific information.
5. The processed data is pushed into the [setUsersData](#setusersdata) State.

This function is essential for fetching and handling user activities, enabling your application to display relevant information to the user.

### Example Usage

Here's an example of how the `getAllActivity` function can be used with the `fetch` API:


```javascript
try {
			await fetch( url, {
				method: "POST",
				body: JSON.stringify({ id: 1 }),
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
				},
			}).then((response) => {
				if (response.status !== 200) {
					throw new Error(
						`Network request failed or received 
						an unexpected response`,
					);
				}

				response.json().then((result) => {

					const data = result.map((item) => {
						console.log("");
						return {
							organizerId: item.userId,
							activityId: item.activityId,
							activity: item.activity,
							fullName: item.full_name,
							date: item.date,
							ProfileImage: item.profile_image,
							instagram: item.instagram,
							location: item.location,
						};
					});
					setUsersData(data);
				});
			});
		} catch (Err) {
			console.log(Err);
		}
```
### getUser
The `getUser` function is responsible for retrieving all the activities of user.  After the changeInfo in the [AccountPage](#accountpage) function is activated, this function will be invoked and receives the id as a parameter from the changeInfo function in the Login Page.



### Parameters

- `id`: A Number representing the user's ID.

### Actions
1. The function takes the `id` and sends it to the server.
2. It checks the server's response, and if it's not a 200 status, it handles the error.
3. If the response is a 200 status, it retrieves the result as an object.
4. The processed data is pushed into the [setuser](#setuser) State.

### Example Usage
Here's an example of how the `getUser` function can be used with the `fetch` API:

```javascript
    

		await fetch(url, {
			method: "POST",
			body: JSON.stringify({ id: 1 }),
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		}).then((response) => {
			if (response.status !== 200) {
				throw new Error(
					`Network request failed or received 
				an unexpected response`,
				);
			}
			response.json().then((result) => {
				setUser(result);
			});
		});


```
### closeSwiper
The `closeSwiper` function is responsible for closing the Swiper.  After the `closeSwiper` in the [SwiperBody](#swiperBody) function is activated, this function will be invoked. 
### Actions
1. change the [setShowSwiper](#setshowswiper) to false
### Example Usage
Here's an example of how the `closeSwiper` function can be used:
```javascript
    
const closeSwiper = () => {
		setShowSwiper(false);
	};
	<View>
				{!props.showSwiper && <Text>Swiper component is false<Text/>}
```
### logOut
The `logOut` function is responsible for returning to the [LoginPage](#loginPage).  if you press the  logout button in the [AccountPage]
### Actions
1. change the [setUser](#setUser) to empty array
2. change the [setUsersData](#setUsersData) to empty array
3. change the [setShowSwiper](#setShowSwiper) to  false
### Example Usage
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

# loginPage

# AccountPage

# SwiperBody