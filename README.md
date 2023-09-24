# Table of Contents
- [Description](#description)
- [Setup](#setup)
- [Launch](#launch)
## Description

**TinderForFriends**  is a social app designed to help you discover and connect with events organized by your friends and acquaintances. Much like the popular dating app Tinder, TinderForFriends simplifies the process of finding events you'd like to attend or join. Swipe right on an event if you're interested, and swipe left if it doesn't catch your attention.

## Setup 
### Install Expo CLI
 Go to the official Expo website's [Expo ](https://docs.expo.dev/get-started/installation/)

###   Download and Install MySQL
 Go to the official MySQL website's download page at   [MySQL Website](https://dev.mysql.com/downloads/mysql/)

###  Clone the repository from git
    cd ./path/to/your/desired/directory
    git clone  https://github.com/dark6668/TInderForFriends.git

###   Install Project Dependencies 

**FrontEnd** 

    cd ./path/to/your/root/project

    npm install

**backEnd**

    cd ./path/to/your/root/project/backEnd
    npm install


###   Add data to MySql
Copy Paste this schema [Sql Schema](./backEnd/schema.sql)

###   Add .env file
    
### BackEnd
    cd ./path/to/your/root/project/backEnd 
    
    touch .env

Add the following configuration variables: 
| Configuration Variable | Value   |
|-----------------------|----------|
| DATABASE_PASSWORD     | PASSWORD |
| DATABASE_USER         | USER     |
| DATABASE_NAME         | NAME     |
| DATABASE_HOST         | HOST     |

### FrontEnd
    cd ./path/to/your/root/project
    
    touch .env

Add the following configuration variables: 

| Configuration Variable | Value|
|----------------------- |------|
| API_URL                |  http://YOUR_IP_ADDRESS:3000/api|


## Launch

**backEnd**

    cd ./path/to/your/root/project/backEnd 

    npm start

**FrontEnd**
    
    cd ./path/to/your/root/project

    npx expo start