# GraphQL Node.JS API built with Typescript template
### Introduction
This project is built so that I have a template to use whenever I need a backend API.
It uses Node.JS and Express library on top where we use Apollo Server on top to create our API. We use the ExpressMiddleware from Apollo so we could add our own Node.JS REST Endpoints if we need. This could be for handling file upload as you might want to use REST Endpoints for that instead of GraphQL upload libraries. 

### Prisma
Prisma is a ORM for PostgreSQL and can easily be swapped out for something else depending on needs. 

### PostgreSQL 
The database I use is PostgreSQL but can easily be changed to any database you'd want to use in your backend. 
The example in the template is just for starting out. 

### CommonJS / ESM
In this template I am sticking with CommonJS. Why? Just easier to develop and maintain for now. Typescript doesn't make it easy to develop a full ESM 
project with problems such as needing File Extensions on all your imports which makes development anoying. To fix it you need to change some configuration and it seems alot easier to stick with CommonJS for now. This will obviously change in the future as more and more libraries are changing to ESM. That means upgrading dependencies will suck in the future if you stick with CommonJS, but for now it's fine. 

