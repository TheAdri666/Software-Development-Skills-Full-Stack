# Final Project for Advanced Web Applications by Adrián Infante Pérez

## What is it?

This is a web application that allows users to register and log in to a system where code snippets can be posted and seen by anyone. Note that non-authenticated users can see the content but cannot post, edit or comment on items.

## How to use it

There are several buttons in the navbar: the first one is the name of the application, which is a link to the homepage, the second is a search bar to look for certain words in the code snippets, the third one is a login button and the fourth one is a register button. These last two buttons are replaced by a log out button and a profile picture when the user is logged in. To use the search bar simply type a keyword and press enter.

The homepage features two spaces for writing code (namely the title and the code snippet itself) and a submit button. These only appear if the user is logged in. Additionally a button available to anyone lets the user view all of the code snippets that are available.

Comments, upvotes and downvotes can be made on the page where all the snippets are visible but in order to see the comments for a post you must click the view link that is available in said page on every single snippet.

The login and register pages are extremely simple, simply type in your email and password for both and confirm your password if you are registering, press submit and wait until the database saves your account.

When the screen gets small things start not to fit on the screen. Therefore most of the content of the navbar is substituted by a hamburger menu on small screens.

## Features

1. NodeJS backend application.
2. Angular-CLI frontend application.
3. MongoDB database.
4. JWT based authentication.
5. Responsive Design.
6. Secure password storage with bcryptjs.
7. Several comments sprayed throughout the app to try and help guide through the reading of the code and also just me venting a little.

## Available npm commands

1. `npm run install`: Installs the dependencies for client and server applications.
2. `npm run preinstall`: Installs the dependencies for the server application. Because it is run automatically when using the previous command it should not be necessary.
3. `npm run dev:server`: Runs the server application in development mode.
4. `npm run dev:client`: Runs the client application in development mode.
5. `npm run build`: Creates the optimized static build files for the client application so they can be served by the server application. Run this when changes are made to the client application.
6. `npm run start`: Starts the server application in production mode. Because the client application should have been built beforehand it does not need to be run, as the files are static and do not change.4
7. `npm run dev:server-windows`: Does the same as #3 but on windows machines.
8. `npm run start-windows`: Does the same as #6 but on windows machines

## Assumptions

1. Assumes that a .env file exists with the key "SECRET".
2. Unless explicitly stated otherwise with the "MONGO_URL" key it assumes that a MongoDB database is running on the URL "mongodb://localhost:27017/testdb".
3. Unless explicitly stated otherwise with the "PORT" key it assumes that the server is running on PORT 1234.

## Please Note!

As this is just an educational project the .env file is included in the repository as none of its contents are classified. Additionally the JWT is stored in localStorage. Note that these are not good practices and should be avoided as they can lead to being hacked.

## To my teacher(s)

In this project I completely ran out of time because my laptop broke in the middle of developing it and I had to spend several days lagging behind. Even with the extra time I had more responsibilities than I could handle and so the project is not finished the way I would like it to, however I will create a video for the react application showcasing how it is supposed to work.
