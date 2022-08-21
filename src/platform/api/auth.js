import axios from "axios";
import {ApiUrl} from "../../routers";




export const RegistrationUser = async (data) =>{
  return await axios.post(`${ApiUrl}userRegistration`, data )
}

export const DeleteUser = (id) => {
  return  axios.delete(`${ApiUrl}userRegistration/${id}`, )
}

export const GetAccountsList = () => {
  return  axios.get(`${ApiUrl}userRegistration`, )
}
export const GetMyAccount = (id) => {
  return  axios.get(`${ApiUrl}userRegistration/${id}`, ).catch(err=>err)
}
export const addProductData = async (data) =>{
  delete data._id
  return await axios.post(`${ApiUrl}productList`,data)
}
export const GetProductsList = () => {
  return  axios.get(`${ApiUrl}productList`, )
}

export const GetProductDetails = (id) => {
  return  axios.get(`${ApiUrl}productList/${id}`, )
}
export const ManageProductDetail = (id, data) => {
  delete data._id
  return  axios.put(`${ApiUrl}productList/${id}`, data)
}


export const DeleteProduct = (id) =>{
  return axios.delete(`${ApiUrl}productList/${id}`,)
}
export const EditUser = (id,data) =>{
  delete data._id
  return axios.put(`${ApiUrl}userRegistration/${id}`,data)
}