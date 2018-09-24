import firebase from 'firebase'
import 'firebase/firestore'

//Firebase
var config = {
  apiKey: "AIzaSyB3MqicAJoujyAQIqh5UPHtsHdkA92eQB8",
  authDomain: "chronicle-firebase11.firebaseapp.com",
  databaseURL: "https://chronicle-firebase11.firebaseio.com",
  projectId: "chronicle-firebase11",
  storageBucket: "chronicle-firebase11.appspot.com",
  messagingSenderId: "297902814384"
};

let fbApp = firebase.initializeApp(config);
fbApp.firestore().settings({timestampsInSnapshots: true})

export default fbApp.firestore();
