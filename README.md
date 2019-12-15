# Jing's Pets Website

#### Status: In-Progress

* Implement CRUD (Create, Read, Update, DELETE) functions; 
* Node.js and Express framework;
* Handlebars templating engine;
* MySQL/MariaDB database.

#### Database

* Cat >0---|| Room
* Dog >0---|| Room
* Cat >0---0<Dog
* Cat 0| --- 0<Friend
* Dog 0| --- 0<Friend

#### Todo

* update room page:
fill only first part of a room name, should display full room name
* nullable:room.area,cat.room, dog.room
* self

```
npx express-generator --view=hbs
npm install
npm install mysql --save
node bin/www (or npm start)
```
