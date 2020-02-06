import firebase = require('firebase/app')
import 'firebase/storage'

import { ThreeSpace } from './lib/three/space'

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

const storage: firebase.storage.Storage = app.storage()
const storageRef = storage.ref()

let space = new ThreeSpace(storageRef)

window.addEventListener('DOMContentLoaded', function (event) {
    space.load()
})

window.addEventListener('resize', space.onWindowResize)