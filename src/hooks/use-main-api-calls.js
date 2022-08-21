import React, {useEffect} from "react";
import {RegistrationUser} from "../platform/api/auth";

const useMainApiCalls = ()=>{

  useEffect(()=>{
    getTestUserAccount()
  },[])

  const getTestUserAccount = async () => {
    await RegistrationUser({
      firstName: 'Admin',
      lastName: 'Adminyan',
      age: '99',
      gender: 'male',
      position: 'Developer',
      email: 'test@gmail.com',
      phoneNumber: '077001000',
      profileImage: '',
      dateOfBirth: null,
      password:'asdasd321'
    })
  }
  return {getTestUserAccount}
}

export default useMainApiCalls