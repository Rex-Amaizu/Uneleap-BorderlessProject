const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');

const admin = require('firebase-admin');
admin.initializeApp();

const app = express();

app.put('/', async (req, res) => {
  generateActNumAndUpdate();

  async function generateActNumAndUpdate() {
    const userId = req.body.phone;

    const seq = (Math.floor(Math.random() * 100000000) + 100000000).toString().substring(1);
    const prefix = '29';
    const actNum = prefix+seq;

    const accountNumbers = await admin.firestore().collectionGroup('users').where('accountNumber', '==', actNum);
    accountNumbers.get().then(function(querySnapshot) {
      if (!querySnapshot.empty) {
        return generateActNumAndUpdate();
      }
    });

    const body = req.body;

    await admin.firestore().collection('users').doc(userId).update({
      email: req.body.email,
      fname: req.body.fname,
      lname: req.body.lname,
      country: req.body.country,
      imageId: '',
      accountNumber: actNum,
    });
    res.status(200).send('User details updated successfully');
  }
});

// app.delete('/:id', async (req, res) => {
//  await admin.firestore().collection('users').doc(req.params.id).delete();
//
//  res.status(200).send('User Deleted');
// });

exports.userinfo = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });