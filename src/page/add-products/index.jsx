import React, {useEffect} from "react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTER_NAMES} from "../../routers";
import {addProductData, GetProductDetails, ManageProductDetail} from "../../platform/api/auth";


const AddProducts = () => {
  const navigate = useNavigate()
  const params = useParams()

  const productsCategoryList = [
    {
      name: 'Phones & Accessories',
      id: 1
    },
    {
      name: 'Electronics',
      id: 2
    },
    {
      name: `Women's Clothing`,
      id: 3
    },
    {
      name: `Clothing for men`,
      id: 4
    },
    {
      name: `Everything for Children`,
      id: 5
    }, {
      name: `Car Products`,
      id: 6
    },
    {
      name: `Sports and Entertainment`,
      id: 7
    },
    {
      name: `Home & Pet Products`,
      id: 8
    }
  ]

  useEffect(() => {
    console.log(params)
    if (params.id) {
      getDetails()
    }
  }, [])


  const getDetails = async () => {
    const result = await GetProductDetails(params.id)
    if (result) {
      setProductData(result.data)
    }
  }


  const [productData, setProductData] = useState({
    productName: '',
    message: '',
    productImage: '',
    price: '',
    category: null
  })

  const handleChange = (e) => {
    setProductData({...productData, [e.target.name]: e.target.value})

  }
  const uploadImage = (e) => {
    const element = e.currentTarget
    const fileList = element.files;
    console.log(element.files)
    if (fileList && fileList?.length) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        console.log(reader)

        setProductData({...productData, productImage: reader.result})
      });
      reader.readAsDataURL(fileList[0]);
    }
  }

  const selectCategory = (categoryId) => {
    setProductData({...productData, category: categoryId})
  }

  const saveChanges = async () => {
    if (params.id) {
      const result = await ManageProductDetail(params.id, productData)
      if (result) {
        navigate(ROUTER_NAMES.PRODUCTS)
      }
    } else {
      const result = await addProductData(productData)
      if (result.data._id) {
        navigate(ROUTER_NAMES.PRODUCTS)
      }
    }
  }


  return <div className="Add-Product">
    <div className='P-manage-form'>
      <p>Product Name</p>
      <label>
        <input value={productData.productName} onChange={handleChange} name={'productName'} className='P-input'
               type="text" placeholder='Product Name'/>
      </label>
    </div>
    <div className='P-manage-form'>
      <p>Price</p>
      <label>
        <input value={productData.price} onChange={handleChange} name={'price'} className='P-input' type="number"
               placeholder='Price'/>
      </label>
    </div>
    <div className='P-manage-form'>
      <p>Description</p>
      <label>
        <input value={productData.message} onChange={handleChange} name={'message'} className='P-input' type="text"
               placeholder='Description'/>
      </label>
    </div>
    <div className='P-manage-form'>
      <p>Category</p>
      <div className='P-category-list'>
        {productsCategoryList.map((item, index) => {
          return <label className='P-category-box'>
            <input value={item.id} checked={productData.category === item.id} onChange={() => selectCategory(item.id)}
                   name={'category'}
                   className='P-input' type="radio"/>
            <p>{item.name}</p>
          </label>
        })}
      </div>
    </div>

    <div className='P-manage-form'>
      <p>Product Image</p>
      <label>
        <input onChange={uploadImage} type="file"/>
      </label>
    </div>

    <button onClick={saveChanges} className='P-save-changes'> Save Changes</button>

  </div>
}

export default AddProducts