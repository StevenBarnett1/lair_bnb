import React, { useState, useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { Route, Switch } from "react-router-dom";
import Splash from "./Splash"
import ExploreNearby from "./ExploreNearby";
import FutureGetaways from "./FutureGetaways";
import LiveAnywhere from "./LiveAnywhere";
import ThingsToDo from "./ThingsToDo";
import Footer from "./Footer"
import "./HomePage.css"

const HomePage = () => {

    return (
        <div id = "home-page">
            <Splash />
            <ExploreNearby />
            <LiveAnywhere />
            <ThingsToDo />
            <Footer/>
        </div>
    )
}

export default HomePage
