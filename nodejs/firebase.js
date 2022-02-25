const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const a = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');
const uuid = require('uuid');//this for unique id generation
const firebase = require("firebase/app");

const serviceAccount = require('C:/Users/valev/OneDrive - University of Waterloo/Desktop/drop-off/dropoff-practice-firebase-adminsdk-vv0vl-eb5993597c.json');
const fb = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'gs://dropoff-practice.appspot.com'
});

var firebaseClient = require('firebase');
firebaseClient.initializeApp(config)
firebaseClient.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error){
    console.log(error);
    firebase.auth().
})

/*
const db = getFirestore();

const docRef = db.collection('users').doc('vvalecha01@gmail.com');

 docRef.set({
  email: 'vvalecha01@gmail.com',
  propertyCount: 0,
});

const docRef2 = db.doc('users/vvalecha01@gmail.com/properties/na');

 docRef2.set({
});
const bucket = getStorage().bucket();
bucket.upload('./test2.pdf', { uploadType: "media",
metadata: {
  metadata: {
    firebaseStorageDownloadTokens: uuid.v1()
  }
}})

*/



