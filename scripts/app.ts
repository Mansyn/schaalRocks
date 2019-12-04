import * as firebase from 'firebase/app';
import { Schaal } from './schaal';

const firebaseConfig = {
    apiKey: "AIzaSyDnTXR3p46lZ2hdG4hvv6TmTU6YXOsOeTs",
    authDomain: "stennifer-0.firebaseapp.com",
    databaseURL: "https://stennifer-0.firebaseio.com",
    projectId: "stennifer-0",
    storageBucket: "stennifer-0.appspot.com",
    messagingSenderId: "946338578328",
    appId: "1:946338578328:web:74d7dd7c433bac60f7b5ed"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app = new Schaal('schaal rocks');
console.log(app.myName() + ' starting up...');

app.loadRocks();

window.addEventListener('load', function () {
    app.draginit();
}, false);
