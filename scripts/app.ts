import * as firebase from 'firebase/app';
//import { Schaal } from './schaal'
//import { BoxThree } from './lib/three/box'
import { ModelThree } from './lib/three/model'

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
let three = new ModelThree()

window.addEventListener('DOMContentLoaded', function (event) {
    three.init()
})

window.addEventListener('resize', three.onWindowResize)