# devQuest
> or: How I learned Phaser 3 in 7 business days

## Table of Contents
* [Introduction](#introduction)
* [Live Link](#live-link)
* [Technologies](#technologies)
* [Dependencies](#dependencies)
* [Getting Started](#getting-started)
* [Wireframes](#wireframes)
* [User Stories](#user-stories)
* [Project Status](#project-status)
* [Phaser 3 Notes](#phaser-3-notes)
* [Other Notes and Reminders](#other-notes-and-reminders)
* [References](#references)

## Introduction
devQuest consists of two parts: a user-based forum, and a game made with Phaser 3. Having never made a browser-based video game before, I wanted to create a simple but addictive little platformer that I could possibly expand at a later date.

## Link to Live Site
http://play-devquest.herokuapp.com

## Technologies
* HTML / CSS
* Javascript
* Phaser 3
* AngularJS
* ExpressJS
* NodeJS
* MongoDB / Mongoose
* MongoDB Atlas
* Git/Github
* Heroku

## Dependencies
* bcrypt v.3.0.6
* dotenv v.8.1.0
* express v.4.17.1
* express-session v.1.16.2
* mongoose v.5.7.1

## Getting Started
1. Fork the repo and clone it to your local machine
2. In your terminal, in the root folder, run: npm install
3. Run: node server.js
4. Open your browser and go to "localhost:3000"
5. Please note that even if you choose to run off your local machine, the app is formatted to connect to MongoDB Atlas.

## Wireframes
![Example wireframe](./public/images/wireframe.png)

## User Stories
* Users should be able to create an account and log into that account with a password.
* Logged in users should be able to update their own profiles, including an avatar and short bio.
* Logged in users should be view the usernames, avatars, and bios of all other users.
* Logged in users should be able to read all forum posts.
* Logged in users should be able to post messages to the forum.
* Logged in users should be able to edit or delete messages that they themselves posted.
* Anyone should be able to go to the site and play the game.

## Project Status
Currently complete, though I may return to it later as I learn more about Phaser.

## Phaser 3 Notes
Features I would like to add as my understanding of Phaser 3 increases:
* A world map that users can use to navigate levels.
* Health and/or extra lives.
* An API call to update a leaderboard of logged in users.
* A way to interact with and kill enemies, possibly by stomping on them.

## Other Notes and Reminders
* When a user puts in the wrong name and password, put some sort of notification on the screen.

## References
Resources for this site and game were taken from the following:
* site bg: http://www.subtlepatterns.com
* forest bg: Eder Muniz
* blue sprite: https://craftpix.net/
* bat sprite: https://opengameart.org/users/bagzie
* music: https://soundcloud.com/pascalbelisle
* star, sound bites: https://ansimuz.itch.io/
* .json maps were created using Tiled: https://www.mapeditor.org/
