import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyALJyGopAxesDluV6hEqV_7SRh0f5Zcb7k",
    authDomain: "albondiga-40c69.firebaseapp.com",
    databaseURL: "https://albondiga-40c69.firebaseio.com",
    // projectId: "albondiga-40c69",
    // storageBucket: "albondiga-40c69.appspot.com",
    // messagingSenderId: "215374744373"
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;