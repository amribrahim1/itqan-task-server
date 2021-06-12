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

app.post('/subscriptions/new', addSubscription);
app.get('/subscriptions', getSubscription);
app.get('/subscriptions/:email', filterSubscriptions);

function addSubscription(req, res, next) {
    const { email, channel } = req.body;
    if (!email || !channel || email === "" || channel === "") {
        res.status(200).send({
            error: {
                message: "email and channel are required!"
            }
        });
    } else {
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
            res.status(403).send({
                error: {
                    message: "An invalid email address!"
                }
            });
        } else {
            db.collection('subscriptions').add({
                email,
                channel,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            }, { merge: true })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                res.status(200).send({
                    subscriptions: {
                        email, channel
                    }
                });
            })
            .catch((error) => {
                res.status(403).send(error);
            });
        }
    }
}

async function getSubscription(req, res, next) {
    const subRef = db.collection('subscriptions');
    const snapshot = await subRef.get();
    let subscriptions = [];
        snapshot.forEach(doc => {
        subscriptions.push({
            id: doc.id,
         ...doc.data()   
        });
    });
    res.status(200).send({subscriptions});
}

async function filterSubscriptions(req, res, next) {
    const citiesRef = db.collection('subscriptions');
    const snapshot = await citiesRef.where('email', '==', req.params.email).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        res.status(404).send({
            error: {
                message: 'No matching subscriptions with this Email!.'
            }
        });
    } else {
        let subscriptions = [];
        snapshot.forEach(doc => {
            subscriptions.push({
                id: doc.id,
             ...doc.data()   
            });
        });
        res.status(200).send({subscriptions});
    }
}

app.listen(port, () => console.log(`Node.js server on port ${port}!`))