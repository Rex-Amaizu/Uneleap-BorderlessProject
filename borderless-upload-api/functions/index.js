const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');

const admin = require('firebase-admin');
admin.initializeApp();

const app = express();

app.put('/:id', async (req, res) => {
  const body = req.body;

  await admin.firestore().collection('users').doc(req.params.id).update({
    ...body,
  });

  res.status(200).send('User ID uploaded successfully');
});

// app.delete('/:id', async (req, res) => {
//  await admin.firestore().collection('users').doc(req.params.id).delete();
//
//  res.status(200).send('User Deleted');
// });

exports.upload = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });