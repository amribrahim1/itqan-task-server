### This is a Node js server of a an App Coding Task of Itqan Systems company.

#### Server Demo:
https://itqan-task-server.herokuapp.com

### Routes

#### Adding a new subscription:
POST `/subscriptions/new` <br>
“Email” is a string, required and must be in email format. <br>
“channel” is a string and required.

#### Retrieving all subscriptions:
GET `/subscriptions` <br>

#### Retrieving subscriptions list filtered by an email address:
GET `/subscriptions/:email` <br>

### How to start the server:

`git clone https://github.com/amribrahim1/itqan-task-server.git` <br>
`cd itqan-task-server` <br>
`npm install`

### The server uses:
Firebase Firestore database <br>
express js

