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
;same problem with cat.color
* nullable:room.area, cat.room(if null, update not working), dog.room
* self relation
* age: invalid-feedback, DOB(https://www.w3schools.com/sql/sql_default.asp)

```
npx express-generator --view=hbs
npm install
npm install mysql --save
node bin/www (or npm start)
```
