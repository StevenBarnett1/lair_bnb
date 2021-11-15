import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import Calendar from 'react-calendar'
import {addModal,toggleModalView,toggleModalRequired} from "../../store/session"
import 'react-calendar/dist/Calendar.css';
import "./Reservation.css"
import { postBooking } from "../../store/bookings";
import FormModal from "../Modal";
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const Reservation = ({spot}) => {
    const [available,setAvailable] = useState(false)
    const [date, setDate] = useState(new Date());
    const [checkin,setCheckin] = useState("")
    const [checkout,setCheckout] = useState("")
    const [guests,setGuests] = useState("")
    const [calendar, toggleCalendar] = useState(true)
    const [activeType,toggleActiveType] = useState("")
    const [dateDifference,setDateDifference] = useState("")
    const [disabledDates,setDisabledDates]= useState([])
    const [errors,setErrors] = ([])
    const [selfBookings,setSelfBookings] = useState([])
    const user = useSelector(state => state.session.user)
    const modalRequired = useSelector(state=>state.session.modalRequired)
    let findDisabledDates = (start,end) => {

        if(typeof start === "string"){
            start = new Date(start)
        }
        if(typeof end === "string"){
            end = new Date(end)
        }
        let dates = []
        let currentDate = start
        while (currentDate <= end) {
            dates.push(currentDate);
            currentDate = currentDate.addDays(1);
        }
        console.log("disabled dates"
        )
        setDisabledDates([...disabledDates,...dates])
    }
    console.log("USER: ",user, spot)

    let findDisabledDatesNoUpdate = (start,end) => {

        if(typeof start === "string"){
            start = new Date(start)
        }
        if(typeof end === "string"){
            end = new Date(end)
        }
        let dates = []
        let currentDate = start
        while (currentDate <= end) {
            dates.push(currentDate);
            currentDate = currentDate.addDays(1);
        }
        return dates
    }

    useEffect(()=>{
        if(spot){
            let bookings = Object.values(spot.Bookings)
            console.log("bookings here: ",bookings.length)
            let start = new Date();
            let end = new Date()
            end.setDate(end.getDate()-1)
            start.setFullYear(start.getFullYear() - 1);

            let finalDates = findDisabledDatesNoUpdate(start,end)

            bookings.forEach(booking=>{
                finalDates = [...finalDates, ...findDisabledDatesNoUpdate(booking.checkin,booking.checkout)]
                console.log("NEW DATES: ",...findDisabledDatesNoUpdate(booking.checkin,booking.checkout))
            })
            for(let date of finalDates){
                console.log(date instanceof Date)
            }
            console.log("FINAL DATES: ",finalDates)
            setDisabledDates(finalDates)
        }
    },[spot])

    useEffect(()=>{
        if(spot && user){
            setSelfBookings(spot.Bookings.filter(booking=>Number(booking.buyerId) === Number(user.id)))
        }
    },[spot])



    useEffect(()=>{
        toggleCalendar(!calendar)
        if(activeType === "checkin") setCheckin(date)
        else if(activeType==="checkout") setCheckout(date)
        toggleActiveType("")

    },[date])

    useEffect(()=>{
        if(checkin && checkout){
            setDateDifference((checkout.getTime() - checkin.getTime())/1000/60/60/24)
        }
    },[checkin,checkout])

    useEffect(()=>{
        console.log("in use effect")
        if(modalRequired){
            dispatch(addModal("login"))
            dispatch(toggleModalView(true))
            dispatch(toggleModalRequired(false))
        }
    },[modalRequired])

    const dispatch = useDispatch()
    let currentUser = useSelector((state)=>state.session.user)
    const modalView = useSelector(state=>state.session.modalView)
    console.log("REQUIRE SIGN IN: ",modalRequired)

    let onClick = (e)=>{
        console.log("in on click",currentUser)
        e.preventDefault()
        if(!currentUser){
            dispatch(toggleModalView(true))
            dispatch(addModal("login"))
        }
        else{
        if(available){
            let booking = {checkin,checkout,buyerId:currentUser.id,spotId:spot.id}
            dispatch(postBooking(booking))
            setSelfBookings([...selfBookings,booking])
            findDisabledDates(checkin,checkout)
            setAvailable(false)
        }
        else {
            if(checkin && checkout){
                if(disabledDates.filter(date=>date <= checkout && date >= checkin).length){
                    window.alert("Sorry overlapping dates")
                    setCheckout("")
                    setCheckin("")
                }
                else if (checkin === checkout){
                    window.alert("You cannot leave on the day you arrive!")
                    setCheckout("")
                    setCheckin("")
                }
                 else if (checkin >= checkout){
                    window.alert("You cannot leave before you've arrived!")
                    setCheckout("")
                    setCheckin("")
                }
                else setAvailable((current)=>!current)
            }
            }

        }
        }

        console.log("INSIDE RESERVATION")
        console.log("MODAL REQUIRED: ",modalRequired)
        console.log("MODAL VIEW: ",modalView)


    return (
        <div id = "reservation-container" style = {available ? {height:"325px"} : {height:"275px"}}>
            <div id = "reservation-inner-container" >
                <div id = "reservation-price-rating-container">
                    <div><strong style={{fontSize:'25px',fontWeight:800}}>${spot &&spot.price}</strong> / night</div>
                    <div><strong style={{fontSize:'18px',fontWeight:800}}>☆{spot && spot.rating}</strong></div>
                </div>
                <div id = "spot-reservation-buttons">
                    <div id = "spot-reservation-date-buttons">
                        <div id = "spot-checkin" onClick={e=>{
                            toggleCalendar(!calendar)
                            toggleActiveType("checkin")
                            }}>
                            <strong>CHECK-IN</strong>
                            <div>{checkin ? `${monthNames[checkin.getMonth()]} ${checkin.getDate()}`:"Add-date"}</div>
                        </div>

                        <div id = "spot-checkout"  onClick={e=>{
                            toggleCalendar(!calendar)
                            toggleActiveType("checkout")
                            }}>
                            <strong>CHECKOUT</strong>
                            <div>{checkout ? `${monthNames[checkout.getMonth()]} ${checkout.getDate()}`:"Add-date"}</div>
                        </div>
                    </div>

                    <div id = "spot-guests" >
                        <strong>GUESTS</strong>
                        <input type = "text" onChange = {(e)=>setGuests(e.target.value)} value = {guests} style = {{border:"none"}}/>
                    </div>
                </div>

                <button id = "reserve-button" onClick={onClick}>{available ? "Reserve" : "Check Availability"}</button>
            </div>

            <div id = "reservation-total-price" style = {available ? {visibility:"visible"} : {fontSize:"0px",visibility:"hidden",height:"10px"}}>
                    <div>Total:</div>
                    <div>${spot && spot.price * (dateDifference)}</div>
            </div>
            <div id = "reservation-cancel-link" style = {selfBookings.length ? {display:"flex"} : {display:"none"} }>
                    Make changes to current reservations
            </div>
            <div id = "calendar-container" style = {calendar ? {display:"block"} : {display:"none"}}>
                    <Calendar
                        tileDisabled={({date, view}) =>
                        (view === 'month') && // Block day tiles only
                        disabledDates.some(disabledDate =>
                            date.getFullYear() === disabledDate.getFullYear() &&
                            date.getMonth() === disabledDate.getMonth() &&
                            date.getDate() === disabledDate.getDate()
                        )}
                        onChange={setDate}
                        value={date}
                    />
            </div>
            {modalView && !currentUser ? (<FormModal/>): null}
        </div>
    )
}

export default Reservation
