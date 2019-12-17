import * as firebase from 'firebase/app';
import { Schaal } from './schaal'

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let app = new Schaal('schaal rocks')
console.log(app.myName() + ' starting up...')

window.addEventListener('load', function () {
    app.setup()
}, false)
