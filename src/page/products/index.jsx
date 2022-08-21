import React from "react";
import {ROUTER_NAMES} from "../../routers";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "../../state/product/actions";
import {useState} from "react";
import Modal from "../../components/modal";
import {GetProductsList} from "../../platform/api/auth";
import {DeleteProduct} from "../../platform/api/auth";
import {useEffect} from "react";

const Products = () => {
  const dispatch = useDispatch()
  const router = useNavigate()
  const [product, setProduct] = useState({})
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const addProduct = () => {
    router(ROUTER_NAMES.ADD_PRODUCT)
  }
  useEffect(() => {
    getProductList()
  }, [])
  const getProductList = async () => {
    const result = await GetProductsList()
    if (result.data) {
      setProduct(result.data)
    }
  }

  const deleteProduct = async () => {
    const result = await DeleteProduct(selectedProduct)
    if (result) {
      getProductList()
    }
    setIsOpenModal(false)
  }

  const openDeleteModal = (id, e) => {
    setIsOpenModal(true)
    setSelectedProduct(id)
    e.stopPropagation()
  }

  const goToDetails = (id) => {
    router(ROUTER_NAMES.EDIT_PRODUCT.replace(':id', id))
  }
  return <div className="P-full-dashboard">
    <button className='P-button' onClick={addProduct}>Add Products</button>
    <div className='P-dashboard-product'>
      {product.length ? product.map((item, index) => {
        return <div key={index} className='P-box' onClick={() => goToDetails(item._id)}>
          <div className="product-image" style={{backgroundImage: `url('${item.productImage}')`}}>
            <span onClick={(e) => openDeleteModal(item._id, e)}>+</span>
          </div>
          <h2>{item.productName}</h2>
          <p>{item.message}</p>
          {item.price > 2000 ? <span className="P-price"><p
              className="delete-price">{item.price + ' դրամ'}</p><p>{'/' + (item.price - item.price * 20 / 100) + ' դրամ'}</p></span> :
            <p>{item.price + ' դրամ'}</p>}
        </div>
      }) : <h3 className='P-empty-data'>Products List was empty</h3>}

    </div>
    {isOpenModal ? <Modal close={() => setIsOpenModal(false)}>
      <div className='P-delete-products'>
        <h3>Are you sure you want to delete?</h3>
        <button onClick={() => setIsOpenModal(false)}>No</button>
        <button onClick={deleteProduct}>Yes</button>
      </div>

    </Modal> : null}

  </div>
}
export default Products