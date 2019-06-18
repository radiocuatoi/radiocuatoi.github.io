import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    (s, a) => s,
    {},
    composeEnhancers(applyMiddleware(thunk))
);
window.store = store;

export const redux = (name) => {
    return (targetClass, targetName, descriptor) => {
        console.log(`redux(${name}) targetClass=`, targetClass);
        console.log(`redux(${name}) targetName=`, targetName);
        console.log(`redux(${name}) descriptor=`, descriptor);
        if (descriptor) return descriptor;
        return targetClass;
    }
};

export const reducer = (name) => {
    return (targetClass, targetName, descriptor) => {
        console.log(`reducer(${name}) targetClass=`, targetClass);
        console.log(`reducer(${name}) targetName=`, targetName);
        console.log(`reducer(${name}) descriptor=`, descriptor);
        if (descriptor) return descriptor;
        return targetClass;
    }
};

export const action = (name) => {
    return (targetClass, targetName, descriptor) => {
        console.log(`action(${name}) targetClass=`, targetClass);
        console.log(`action(${name}) targetName=`, targetName);
        console.log(`action(${name}) descriptor=`, descriptor);
        if (descriptor) return descriptor;
        return targetClass;
    }
};