import firebase = require('firebase/app')

import { Rock } from './rock'

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
const app: firebase.app.App = firebase.initializeApp(firebaseConfig)

// const storage: firebase.storage.Storage = app.storage()
// const storageRef = storage.ref()

let rock = new Rock()

window.addEventListener('DOMContentLoaded', function (event) {
    rock.init()
})

window.onorientationchange = function () {
    var orientation = window.orientation;
    switch (orientation) {
        case 0:
        case 90:
        case -90: window.location.reload()
            break;
    }
}