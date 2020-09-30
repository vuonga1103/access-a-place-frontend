# Access-A-Place
[Video Demo]()

Access-A-Place is a crowdsource web application that allows user to view, bookmark, and write reviews of establishments based on accessibility.

[Link to Backend API](https://github.com/vuonga1103/access-a-place-backend)


## Table of Contents
* [Getting Started](#getting-started)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Tools](#tools)

![Access-A-Place](https://i.ibb.co/4R6sZyk/Screen-Shot-2020-09-29-at-2-50-03-PM.png)

<a name="getting-started"/>

## Getting Started
1. Install [Rails Backend API](https://github.com/vuonga1103/access-a-place-backend)
2. Install [Node.js and npm](https://www.npmjs.com/get-npm)

    ```$ brew install node```
    
3. Clone this repo and cd into the directory
4. Install all dependencies

    ```$ npm install```

5. Make sure the Rails server is running and then run the app

    ```$ npm start```
    
<a name="features"/>

## Features

### Search Establishments
![Search Establishments](https://i.ibb.co/23Q28D5/Screen-Shot-2020-09-29-at-3-13-37-PM.png)
* Search among 50 million businesses worldwide via city, state, country, zip, or by distance from current location via Yelp Fusion API data 
* See displayed an interactive and dynamic map of location pins via Mapbox API
* Sort search results by overall accessibility ratings

### View An Establishment
![View An Establishment](https://i.ibb.co/2jxsXGD/Screen-Shot-2020-09-29-at-2-59-20-PM.png)
* View information regarding an establishment's hours of operation, location, categories, and accessibility reviews
* View photos of the establishment in a dynamic carousel

### Review an Establishment
![Review an Establishment](https://i.ibb.co/rpxKqnS/Screen-Shot-2020-09-29-at-3-08-56-PM.png)
* Select ratings for the establishment based on accessibility criterias (parking, entrance, interior, bathroom) via "react-rating" library
* Delete a review

### Bookmark Establishments
![Bookmark Establishments](https://i.ibb.co/6v3CgvC/Screen-Shot-2020-09-29-at-3-15-22-PM.png)
* Save an establishment via bookmark
* Unsave a bookmark

### User's Profile
![User's Profile](https://i.ibb.co/hdfJSSn/Screen-Shot-2020-09-29-at-3-16-49-PM.png)
![Ranking Status](https://i.ibb.co/PrhQDc1/Screen-Shot-2020-09-29-at-3-17-39-PM.png)
* View a user's profile, which includes list of recent reviews and bookmarks
* View a user's ranking status on mouseover of icon, based on number of reviews submitted

### Auth & Account Features
![Auth & Account Features](https://i.ibb.co/LZ3vtFJ/Screen-Shot-2020-09-29-at-3-05-02-PM.png)
* Log in via email and password or existing Google account, completed with "react-google-oauth" library and "omniauth-google-oauth2" gem, and use of JWT, HTTParty, Passgen gems
* Option to edit or delete account

<a name="tech-stack"/>

## Tech Stack
* React.js
* Redux
* Ruby on Rails API (Backend: https://github.com/vuonga1103/access-a-place-backend)
* PostgreSQL
* HTML/CSS
* Bulma
* Active Record

<a name="tools"/>

## Tools
* [Rack CORS](https://github.com/cyu/rack-cors)
* [ActiveModel::Serializer](https://github.com/rails-api/active_model_serializers)
* [BCrypt](https://github.com/codahale/bcrypt-ruby)
* [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* [Yelp Fusion API](https://www.yelp.com/fusion)
* [JWT](https://github.com/jwt/ruby-jwt)
* [HTTParty](https://github.com/jnunemaker/httparty)
* [Passgen](https://github.com/cryptice/Passgen)
* [OmniAuth Google OAuth2](https://github.com/zquestz/omniauth-google-oauth2)
* [React Google OAuth](https://www.npmjs.com/package/react-google-login)
* [Query String](https://www.npmjs.com/package/query-string)
* [Bulma Switch](https://www.npmjs.com/package/bulma-switch)
* [React Map GL](https://github.com/visgl/react-map-gl)
* [React Rating](https://www.npmjs.com/package/react-rating)
* [Alice Carousel](https://www.npmjs.com/package/react-alice-carousel)
* [MomentJS](https://momentjs.com/)
