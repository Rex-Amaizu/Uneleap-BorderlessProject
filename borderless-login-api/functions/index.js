const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const path=require('path');

const admin = require('firebase-admin');
admin.initializeApp();

const app = express();
const db=admin.firestore();
const a=db.collection('users');

app.post('/', async (req, res) => {
  // const userEmail = req.body.user.email;
  findUserAndGetData();
  // const id = resp.docRef;
  async function findUserAndGetData() {
    const userPhone = req.body.phone;

    const snapshot = await a.doc(userPhone).get();
    if (snapshot.exists) {
      const userId = snapshot.id;
      const userData = snapshot.data();

      res.status(200).send(JSON.stringify({id: userId, ...userData}));
    } else {
      res.send('User does not exist!');
    }
  }
});

// app.delete('/:id', async (req, res) => {
//  await admin.firestore().collection('users').doc(req.params.id).delete();
//
//  res.status(200).send('User Deleted');
// });

exports.login = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });