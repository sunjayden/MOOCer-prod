# MOOCer-Platform

Production - A comprehensive platform for online course management.

This repository contains source code for MOOCer 2.0. MOOCer 2.0 is a fullstack application with Express Node.js backend and REACT frontend.

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

### To Run the Project

```
npm run build

npm run start
```

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
  |__data
    |__import.js
    |__udacity.js
  |__mdoels
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
