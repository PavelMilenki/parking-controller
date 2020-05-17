import React from 'react';
import {Provider} from "react-redux";
import store from "./redux/store";
import {Parking} from "./components/Parking";

export const App = () => {
    return <Provider store={store}><Parking/></Provider>
};

