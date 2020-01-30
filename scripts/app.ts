import * as firebase from 'firebase/app';
//import { Schaal } from './schaal'
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
firebase.initializeApp(firebaseConfig)

//let howl = new Schaal('schaal rocks')
let space = new ThreeSpace()

window.addEventListener('DOMContentLoaded', function (event) {
    space.load()
})

window.addEventListener('resize', space.onWindowResize)