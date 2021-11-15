import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignupForm from "./SignupForm"
import {addModal,toggleModalView} from "../../store/session"
import {useDispatch,useSelector} from "react-redux"
function FormModal() {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const modalType= useSelector((state)=>state.session.modalType)
  const modalView = useSelector(state => state.session.modalView)
  let userForm
  console.log("INSIDE FORM MODAL")
  console.log("MODAL VIEW: ",modalView)
  if(modalView && modalType==="login"){
    userForm = (<LoginForm/>)
  }
  else if (modalView && modalType === "signup"){
    userForm = (<SignupForm/>)
  }

  // else if (modalView && modalType ==)

  return (
    <>
      {modalView && (
        <Modal onClose={() => dispatch(toggleModalView(false))}>
          {userForm}
        </Modal>
      )}
    </>
  );
}

export default FormModal;
