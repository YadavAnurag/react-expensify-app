import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_API_ID,
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };












// database.ref().set({
//   name: 'luna Oscura',
//   age: 23,
//   stressLevel: 6,
//   isSingle: true,
//   job: {
//     title: 'Software Devloper',
//     company: 'Google'
//   },
//   location: {
//     city: 'Gorakhpur',
//     country: 'India'
//   }
// }).then(()=>{
//   console.log('Data is saved');
// }).catch((e)=>{
//   console.log('Data saving failed', e);
// });

// database.ref('attributes').set({
//   height: 176,
//   weight: 65
// }).then(()=>{
//   console.log('age changed');
// }).catch((e)=>{
//   console.log('age not changed', e);
// });


// -> remove
// database.ref('isSingle')
//   .remove()
//   .then(()=>{
//     console.log('data removed');
//   }).catch((e)=> console.log('data not removed',e));

// -> update
// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Ambedkar Nagar'
// }).then(()=>{
//   console.log('company and stressLevel changed successfully');
// }).catch(()=>{
//   console.log('company and stressLevel not changed successfully');
// });


// -> value change 
// database.ref()
//   .once('value')
//   .then((snapshot)=>{
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch((e)=>{
//     console.log('Error fetching data', e);
//   });


// -> subscription

// const onValueChange = database.ref().on('value', (snapshot)=>{
//   console.log(snapshot.val());
// }, (e) => {
//   console.log('Error while fetching data ', e);
// });

// setTimeout(()=>{
//   database.ref('age').set(31);
// }, 2000);

// setTimeout(()=>{
//   database.ref('age').set(32);
//   database.ref().off('value', onValueChange);
// }, 3000);

// setTimeout(()=>{
//   database.ref('age').set(33);
// }, 4000);


// -> challenge 
// setup data subuscription -> Andrew is software developer at Amazon.
// change the data and make sure it reprints

// database.ref().once('value')
//   .then((snapshot)=>{
//     const {name, job} = snapshot.val();
//     console.log(`${name} is ${job.title} at ${job.company}`);
//   }).catch((e)=>{console.log('Error', e)});

// const onPersonDataChange = database.ref().on('value', (snapshot)=>{
//   const {name, job} = snapshot.val();
//   console.log(`${name} is ${job.title} at ${job.company}`);
// }, (e)=> {
//   console.log('Error while fetching person data');
// }); 

// setTimeout(()=>{
//   database.ref().update({
//     name: 'Kushwaha',
//     'job/title': 'Debugger',
//     'job/company': 'Microsoft'
//   }).then(()=>{
//     console.log('person data changed')
//   }).catch((e)=>{
//     console.log('Error ', e);
//   });
// }, 5000)



// -> challenge add expenses array

// const onExpenseChange = database.ref('expenses')
//   .on('value', (snapshot)=>{
//     const expenses = [];

//     snapshot.forEach((childSnapshot)=>{
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(expenses);
//   });

// const expenses = [
//   {
//     description: 'UC',
//     note: '',
//     amount: 199,
//     createdAt: 23
//   },
//   {
//     description: 'Rent',
//     note: '',
//     amount: 739,
//     createdAt: 843
//   },
//   {
//     description: 'Samose',
//     note: '',
//     amount: 52,
//     createdAt: 233262
//   }
// ];

// database.ref('expenses').push(expenses[0]);
// database.ref('expenses').push(expenses[1]);
// database.ref('expenses').push(expenses[2]);



// challenge Child event handler
// database.ref('expenses')
//   .on('child_removed', (snapshot)=>{
//     console.log(snapshot.key, snapshot.val());
//   });

// database.ref('expenses')
//   .on('child_changed', (snapshot)=>{
//     console.log(snapshot.key, snapshot.val());
//   });

// database.ref('expenses')
//   .on('child_added', (snapshot)=>{
//     console.log(snapshot.key, snapshot.val());
//   });
  