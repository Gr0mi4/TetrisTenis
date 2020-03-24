import firebase from "firebase";

const config = {
    apiKey: "AIzaSyBilCkCSViob7PzbFGGu4sJldpCCg8598E",
    authDomain: "tetristennis.firebaseapp.com",
    databaseURL: "https://tetristennis.firebaseio.com",
    projectId: "tetristennis",
    storageBucket: "tetristennis.appspot.com",
    messagingSenderId: "620115769692",
    appId: "1:620115769692:web:b9f5884546de79432ee999",
    measurementId: "G-Q5HHDS5FHB"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();