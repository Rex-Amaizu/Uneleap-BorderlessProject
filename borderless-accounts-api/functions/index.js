const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const path=require('path');

const admin = require('firebase-admin');
admin.initializeApp();

const app = express();
const db=admin.firestore();
const a=db.collection('accounts');

app.post('/', async (req, res) => {
  const userPhone = req.body.phone;
  const accountType = req.body.accountType;

  async function addUserCurrentAct(userPhone, accountType) {
    const docRef=a.doc(userPhone).collection('current').doc(userPhone);
    const resp = await docRef.set({
      phone: userPhone,
      accountType: accountType,
      accountNumber: req.body.accountNumber,
      availableBalance: req.body.availableBalance,
      ledgerBalance: req.body.ledgerBalance,
      currency: req.body.currency,
    });

    // const id = resp.docRef;
    const snapshot = await a.doc(userPhone).collection('current').doc(userPhone).get();

    const userId = snapshot.id;
    const userData = snapshot.data();

    res.status(200).send(JSON.stringify({id: userId, ...userData}));
  }

  async function addUserSavingsAct(userPhone, accountType) {
    const docRef=a.doc(userPhone).collection('savings').doc(userPhone);
    const resp = await docRef.set({
      phone: userPhone,
      accountType: accountType,
      accountNumber: req.body.accountNumber,
      availableBalance: req.body.availableBalance,
      ledgerBalance: req.body.ledgerBalance,
      currency: req.body.currency,
    });

    const snapshot = await a.doc(userPhone).collection('savings').doc(userPhone).get();

    const userId = snapshot.id;
    const userData = snapshot.data();

    res.status(200).send(JSON.stringify({id: userId, ...userData}));
  }

  async function addUserDomAct(userPhone, accountType) {
    const docRef=a.doc(userPhone).collection('domiciliary').doc(userPhone);
    const resp = await docRef.set({
      phone: userPhone,
      accountType: accountType,
      accountNumber: req.body.accountNumber,
      availableBalance: req.body.availableBalance,
      ledgerBalance: req.body.ledgerBalance,
      currency: req.body.currency,
    });

    const snapshot = await a.doc(userPhone).collection('domiciliary').doc(userPhone).get();

    const userId = snapshot.id;
    const userData = snapshot.data();

    res.status(200).send(JSON.stringify({id: userId, ...userData}));
  }

  if (accountType === 'current') {
    addUserCurrentAct(userPhone, accountType);
  } else if (accountType === 'savings') {
    addUserSavingsAct(userPhone, accountType);
  } else if (accountType === 'domiciliary') {
    addUserDomAct(userPhone, accountType);
  } else {
    res.send('Invalid Account Type!');
  }
  // const userEmail = user.email(id);
});

// app.delete('/:id', async (req, res) => {
//  await admin.firestore().collection('users').doc(req.params.id).delete();
//
//  res.status(200).send('User Deleted');
// });

exports.accounts = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });