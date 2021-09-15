import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import {getSpotByPk} from "../../store/spots"
import {useDispatch ,useSelector} from "react-redux"
import Reservation from "../Reservation"
import "./Spot.css"

let SpotPage = () => {
    let {spotId} = useParams()
    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getSpotByPk(+spotId))
    },[])
    let spot = useSelector((state)=>state.spots)
    spot = Object.values(spot)[0]
    return (
        <div id = "spot-container">
            <h1 id = "spot-title">{spot && spot.name}</h1>

            <div className = 'spot-top-container'>
                <div>Superhost</div>
                <div>{spot && `${spot.city},${spot.state},United States`}</div>
            </div>
            <div id = "spot-image-container">
                <img id = "spot-image" src = {spot && spot.image}></img>
            </div>

            <div id = "spot-bottom-container">
                <div className = "spot-bottom-left">
                    <div id = "spot-description-title">
                        <div>Hosted by {spot && spot.User.firstName}</div>
                        <img id = "spot-profile-image" src = {spot && spot.User.image}></img>
                    </div>
                    <div id = "spot-details">
                        <div>
                            <strong>Entire Home</strong>
                            <p>You’ll have the chalet to yourself.</p>
                        </div>
                        <div>
                            <strong>Enhanced Clean</strong>
                            <p>This host committed to Airbnb's 5-step enhanced cleaning process.</p>
                        </div>
                        <div>
                            <strong>{spot && spot.id && spot.User.firstName} is a SuperHost</strong>
                            <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                        </div>
                    </div>
                    <div id = "spot-description">
                        {spot && spot.description}
                    </div>
                </div>
                <div id = "spot-bottom-right">
                        <Reservation spot={spot}/>
                </div>
            </div>
        </div>
    )
}

export default SpotPage
