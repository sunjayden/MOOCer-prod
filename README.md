# MOOCer-Platform

A comprehensive platform for online course management. https://moocer.herokuapp.com/

This repository contains source code for MOOCer 2.0. MOOCer 2.0 is a fullstack Javscript application with ExpressJS backend and React frontend.

## Instructions

Below are the isnturctions to set up environment and run the project.

### Environment Setup

To run the application, the environment need to have npm and Node.js setup.

###### To check if you have node and npm installed type the following command in your terminal

```
node -v
npm -v
```

This should output your version of node and npm.

###### To install Node and npm

Follow the instructions from the [npm offical site](https://www.npmjs.com/get-npm).

### Installation

To install the required packages.

```
npm install
```

### Database Setup

To use your own MongoDB server, replace DB_CONNECTION in .env file to your MongoDB URI.

### Data Import
This is optional if the current MongoDB URI is still running.

The data import file is in server/data/ directory. Replace the MongoDB URI in the import.js file and import all the courses and reviews.

```
node import.js
```

### Run the Project

```
npm run build

npm start
```
Navigate to localhost:8080 to view the platform.

### Project Structure

The file structure of the project

```
MOOCer
|__README.md
|__package.json
|__.gitignore
|__server.js
|__public
  |__favicon.ico
  |__index.html
  |__robots.txt
|__server *** Backend Folder ***
  |__validation.js
  |__data *** Data Source Folder ***
    |__import.js
    |__udacity.js
    |__coursera.js
  |__models
    |__Course.js
    |__Review.js
    |__User.js
  |__routes
    |__course.js
    |__review.js
    |__user.js
    |__verifyToken.js
|__src *** Frontend Folder ***
  |__index.js
  |__config.js
  |__App.js
  |__App.css ** styling **
  |__components
    |__about
      |__about.jsx
      |__about.css
    |__auth
      |__authentication.jsx
      |__authentication.css
      |__loginbox.jsx
      |__registerbox.jsx
    |__catalog
      |__catalog.jsx
      |__catalog.css
      |__catalog-item.jsx
      |__catalog-item.css
    |__classroom
      |__classroom.jsx
      |__classroom.css
    |__course
      |__course-detail.jsx
      |__lesson.jsx
      |__lesson.css
      |__reviews.jsx
      |__reviews.css
    |__footer
      |__footer.jsx
    |__header
      |__navigation.jsx
      |__navigation.css
    |__home
      |__home.jxs
      |__home.css
    |__imgs
      |__bg.svg
      |__home.png
      |__log.png
      |__profile1.svg
      |__profile2.svg
    |__profile
      |__profile.jxs
      |__profile.css
      |__profile-experiences.jxs
      |__edit-profile.jxs
      |__edit-profile.css
      |__user-info.jsx
      |__tab-panel.jsx
      |__add-experience.jsx
      |__add-school.jsx
    |__route
      |__profileRoute.jsx
    |__utils
      |__auth.jsx
      |__storage.jsx
```
