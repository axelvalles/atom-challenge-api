import {initializeApp} from "firebase-admin/app";
import {converter} from "./utils";
import {Task} from "./models/task.model";
import {getFirestore} from "firebase-admin/firestore";

initializeApp();
const firestore = getFirestore();
// configure all models with "converter" functionality to add types
const collections = {
  tasks: firestore.collection("tasks").withConverter(converter<Task>()),
};

export {firestore, collections};
