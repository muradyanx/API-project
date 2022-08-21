import  {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {EditUser} from "../../platform/api/auth";
import {ROUTER_NAMES} from "../../routers";

const useManageUser = ()=>{

  const navigate = useNavigate()
  const [user, setUserData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender:null,
    position: '',
    email: '',
    phoneNumber: '',
    profileImage: '',
    dateOfBirth: null
  })
  const profile = useSelector(state => state.profileReducer.profile)
  useEffect(() =>{
    setUserData(profile)

  },[profile])

  const uploadImage = (e) => {
    const element = e.currentTarget
    const fileList = element.files;
    if (fileList && fileList?.length) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setUserData({...user,profileImage:reader.result})
      });
      reader.readAsDataURL(fileList[0]);
    }
  }
  const manageUser = async ()=>{
    const result = await EditUser(profile._id, user)
    if(result){
      navigate(ROUTER_NAMES.DASHBOARD)
    }
  }
  const handleChange = (e) => {
    setUserData({...user, [e.target.name]: e.target.value})
  }

  const saveChanges = ()=>{
    manageUser()
  }

  return {saveChanges, handleChange, user, uploadImage}
}

export default useManageUser