# 6003-backend 

# MERN Stack: MONGODB, EXPRESS, REACT, NODE.JS.

# Welcome to my 6003CEM- Back End API Deferrel Project.

This is the back-end section of my Trading Licenses Application.

Functions attempted:

- The public can register, log in, then fill out an online application for a trading license (the
  format/fields of the license are up to you, but you probably want to include company name,
  address, and other relevant details about the business).
  
- Authentication and authorisation should prevent the API being used by non-registered users,
  except to register.
  
- All URI endpoints, HTTP verbs, and JSON data representations handled by the API are
  documented using the OpenAPI Specification (OAS) standard, version ≥2.0.
  
- Code and project documentation for both the front and back end components are provided.

- A video demonstrating the core functionality of the developed API/web application, the tests
  being run, and the OpenAPI HTML documentation being shown on screen, is provided.
  
- The TLD staff can change the status of any application as it progresses, from 'new' to 'pending'
  to 'accepted' or 'rejected'.
  
- The public can see the status of each of their own applications, but not those of any other user.

- When a new application is received the API automatically emails a central mailbox (you can use
  your personal email inbox or a throwaway inbox such as at "mailinator.com" for the
  demonstration) to alert the office manager.

Packages used: 

- bcrypt
- concurrently
- cors
- dotenv
- express
- express-async-handler
- joi
- jsonwebtoken
- koa
- koa-bodyparser
- koa-router
- mongoose
- path
- winston


Tutorials used:

- https://www.youtube.com/playlist?list=PLJM1tXwlGdaf57oUx0rIqSW668Rpo_7oU
- https://www.youtube.com/playlist?list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE
- https://www.youtube.com/playlist?list=PLs4co9a6NhMzi2DQS_I4rqmNZdq-jSpsa 

# Commands:

# npm start

- This starts the backend server.

# npm test

- This runs the tests for the backend.
