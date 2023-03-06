import { getApp, getApps, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiAKSdXokfRQFCXnvyqcU_iPNuP44g_lg",
  authDomain: "chatgpt-messenger-e6d3b.firebaseapp.com",
  projectId: "chatgpt-messenger-e6d3b",
  storageBucket: "chatgpt-messenger-e6d3b.appspot.com",
  messagingSenderId: "183165024681",
  appId: "1:183165024681:web:6c79763fec0757e3dd6cb8",
};
const app = getApps()?.length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
