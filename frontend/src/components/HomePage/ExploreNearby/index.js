import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import './ExploreNearby.css'

const ExploreNearby = () => {
    let [cities,setCities] = useState(['San-Francisco', 'San-Jose', 'Oakland', 'Santa-Barbara', 'Santa-Monica', 'Mammoth-Lakes', 'Sacramento', 'South-Lake-Tahoe'])
    let [icons, setIcons] = useState(['https://a0.muscache.com/im/pictures/69599d82-6ea3-40b6-a5b3-81f84addba6a.jpg?im_q=medq&im_w=240','https://a0.muscache.com/im/pictures/a0eb36e7-b468-4c5e-93b2-819e793563b2.jpg?im_q=medq&im_w=240','https://img.freepik.com/free-vector/city-street-with-houses-road-cars_107791-2592.jpg?w=2000', 'https://a0.muscache.com/im/pictures/73ab906b-eea1-425d-9fea-bf2c79d86556.jpg?im_q=medq&im_w=240', 'https://a0.muscache.com/im/pictures/3849e3f1-d275-43fb-8957-4c90f26e14db.jpg?im_q=medq&im_w=240','https://a0.muscache.com/im/pictures/b948e0e0-c78f-4895-b433-c90401019981.jpg?im_q=medq&im_w=240','https://a0.muscache.com/im/pictures/82293cc1-ba0b-4167-85a6-ed133d478c20.jpg?im_q=medq&im_w=240','https://a0.muscache.com/im/pictures/42901911-940b-45ac-997e-961ebf472195.jpg?im_q=medq&im_w=240'])

    return (
        <>
            <h2 id = "explore-title">Explore nearby</h2>
            <div id="explore-nearby-container">
                {cities.map((city,i)=>(
                    <Link key = {city} to = {`/cities/${city}`} className = "explore-nearby-individual-container" >
                        <img className = "explore-nearby-image" src = {icons[i]}></img>
                        <div className="city">{city.split("-").join(" ")}</div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default ExploreNearby;
