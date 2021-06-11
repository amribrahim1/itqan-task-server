const express = require('express');

const admin = require('firebase-admin');
const serviceAccount = require("./itqan-task-firebase-adminsdk-l3sz7-ca3934bbfb.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

app.listen(port, () => console.log(`Node.js server on port ${port}!`))