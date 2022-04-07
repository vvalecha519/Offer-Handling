const express = require('express');
const multer = require('multer');
const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "files");
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split("/")[1];
		cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
	},
});

const multerFilter = (req, file, cb) => {
	if (file.mimetype.split("/")[1] === "pdf") {
		cb(null, true);
	} else {
		cb(new Error("Not a PDF File!!"), false);
	}
};

const upload = multer({
	storage: multerStorage,
});

const app = express();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const uuid = require('uuid');//this for unique id generation
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



const serviceAccount = require('C:/Users/valev/OneDrive - University of Waterloo/Desktop/dropoff-practice-firebase-adminsdk-vv0vl-eb5993597c.json');
const { userInfo } = require('os');
initializeApp({
	credential: cert(serviceAccount),
	storageBucket: 'gs://dropoff-practice.appspot.com'
});

const db = getFirestore();
const bucket = getStorage().bucket();

app.get('/getData', (req, res) => {
	console.log(req)
	res.json({
		"statusCode": 200,
		"statusMessage": "SUCCESS",
		"params": req.query,
	})
})

app.post('/upload', upload.any(), async (req, res) => {
	//loop through codes for that email address and then add if it exists
	//const property = db.collection('users').doc(req.body.listEmail).collection('properties').doc(req.body.code);
	const str = 'users/' + req.body.listEmail + '/properties/' + req.body.code;
	console.log(str);
	const property = db.doc(str);
	const doc = await property.get();
	if (!doc.exists) {
		console.log('No such document!');
	} else {

		//check if new buyer, if so update subscriber count
		const buyer = db.doc(str + '/subscribers/' + req.body.buyEmail);
		console.log(str + '/subscribers/' + req.body.buyEmail);
		const buyerDoc = await buyer.get();
		if (!buyerDoc.exists) {
			//update count
			console.log("buyer does not exist");
			count = doc.data().subCount + 1;
			console.log(count);
			property.set({
				subCount: count,
			}, { merge: true });
		} else {
			console.log("Buyer exists");
		}


		console.log('Document data:', doc.data());
		//add doc to subscriber (collection)
		property.collection('subscribers').doc(req.body.buyEmail).set({
			email: req.body.buyEmail,
			offer: req.files[0].path.substr(6),
		});

		bucket.upload(req.files[0].path, {
			uploadType: "media",
			metadata: {
				metadata: {
					firebaseStorageDownloadTokens: uuid.v1()
				}
			}
		})
	}


	res.send({ sucess: true })
})

app.listen(3000, (req, res) => {
	console.log('Express API is running at port 3000');
})

//use firebase to authenticate and then do not allow going back in the app
app.post("/register", (req, res) => {
	// our register logic goes here...
});

// Login
app.post("/login", (req, res) => {
	// our login logic goes here
});

app.get('/properties/users/:email', async (req, res) => { //get all the listings
	const properties = db.collection("/users/" + req.params.email + "/properties");
	const snapshot = await properties.get();
	const arrProperties = [];
	if (snapshot.empty) {
		console.log('No matching documents.');
		return;
	}

	snapshot.forEach(doc => {
		console.log(doc.id);
		if(doc.id != 'na')
		arrProperties.push(
			{
				address: doc.data().address,
				date: doc.data().date,
				subCount: doc.data().subCount,
				id: doc.id
			}
		)
	});
	console.log(arrProperties);
	res.send(arrProperties)
})

//add properties
app.post('/addproperty/:email',jsonParser,async (req, res) => {
	// our register logic goes here...
	console.log(req.params.email);
	console.log(req);

	console.log(req.body.offerDate)
	console.log(req.body.offerTime)
	console.log(req.body.address)	
	console.log(req.body.offerTime.substring(0,2))
	console.log(req.body.offerTime.substring(3,5))


d = new Date(req.body.offerDate)
d.setHours(req.body.offerTime.substring(0,2))
d.setMinutes(req.body.offerTime.substring(3,5))
	const newProperty = await db.collection('users').doc(req.params.email).collection('properties').add({
  address: req.body.address,
  subCount : 0,
  date : d,
});
//create 0 subs
db.collection('users').doc(req.params.email).collection('properties').doc(newProperty.id).collection('subscribers').doc('na').set({});
console.log('Added document with ID: ', newProperty.id);
});