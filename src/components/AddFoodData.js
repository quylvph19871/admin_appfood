import React, { useState } from 'react'
import './AddFoodData.css'
//firebase import
import { db, storage } from '../firebase/FireBaseConfig'
import { addDoc, collection } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
const AddFoodData = () => {
    const [foodName, setFoodName] = useState('')
    const [foodPrice, setFoodPrice] = useState('');
    const [foodImage, setfoodImage] = useState(null);
    const [foodCategory, setFoodCategory] = useState('');
    const [foodDescription, setFoodDescription] = useState('');
    const [restaurantName, setRestaurantName] = useState('');


    const [foodImageUrl, setFoodImageUrl] = useState('');

    const [foodType, setFoodType] = useState('');
    const [mealType, setMealType] = useState('');
    const [foodAddon, setFoodAddon] = useState('');
    const [foodAddonPrice, setFoodAddonPrice] = useState('');

    const [restaurantPhone, setRestaurantPhone] = useState('');
    const [restaurantEmail, setRestaurantEmail] = useState('');
    const [restaurantAddressBuilding, setRestaurantAddressBuilding] = useState('');
    const [restaurantAddressStreet, setRestaurantAddressStreet] = useState('');
    const [restaurantAddressCity, setRestaurantAddressCity] = useState('');
    const [restaurantAddressPincode, setRestaurantAddressPincode] = useState('');


    // console.log(foodName, foodPrice, foodImage, foodCategory, foodDescription, restaurantName, restaurantAddress, restaurantPhone)

    const handlSubmit = (e) => {
        e.preventDefault()

        if (foodImage == null) {
            alert('Bạn hãy thêm ảnh')
            return
        }
        else {
            const imageRef = ref(storage, `FoodImages/ ${foodImage.name}`)
            uploadBytes(imageRef, foodImage)
                .then(() => {
                    alert('Tải ảnh lên thành công')
                    getDownloadURL(imageRef)
                        .then((url) => {
                            // setFoodImageUrl(url)

                            const foodData = {
                                foodName,
                                foodPrice,
                                foodImageUrl: url,
                                foodCategory,
                                foodDescription,
                                restaurantName,
                                // địa chỉ nhà hàng
                                restaurantPhone,
                                foodType,
                                mealType,
                                foodAddon,
                                foodAddonPrice,
                                restaurantEmail,
                                restaurantAddressBuilding,
                                restaurantAddressStreet,
                                restaurantAddressCity,
                                restaurantAddressPincode
                            }
                            console.log(foodData)
                            try {
                                const docRef = addDoc(collection(db, 'FoodData'), foodData);
                                alert("Data added successfully", docRef.id);
                            } catch (error) {
                                alert('Error adding document', error);
                            }
                        })
                }).catch((error) => {
                    alert(error.message)
                })
        }





    }
    return (
        <div className='form-outer'>
            <h1>Add Food Data</h1>
            <form className='form-inner'>

                <label>Tên sản phẩm</label>
                <input type="text" name='food_name'
                    onChange={(e) => {
                        setFoodName(e.target.value)
                    }} />
                <br />
                <label>Mô tả sản phẩm</label>
                <input type="text" name='food_description'
                    onChange={(e) => {
                        setFoodDescription(e.target.value)
                    }} />
                <br />
                <div className='form-row'>

                    <div className='form-col'>

                        <label>Giá sản phẩm</label>
                        <input type="number" name='food_price'
                            onChange={(e) => {
                                setFoodPrice(e.target.value)
                            }} />
                    </div>

                    <div className='form-col'>
                        <label>Loại sản phẩm</label>
                        <select name="food_type" onChange={(e) => { setFoodType(e.target.value) }}>
                            <option value="null">Chọn loại sản phẩm</option>
                            <option value="veg">Ăn chay</option>
                            <option value="non-veg">Không ăn chay</option>

                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-col">
                        <label>Chọn danh mục thực phẩm</label>
                        <select name="food_category" onChange={(e) => { setFoodCategory(e.target.value) }}>
                            <option value="null">Chọn danh mục thực phẩm</option>
                            <option value="viennam">Việt Nam</option>
                            <option value="american">Mỹ</option>
                            <option value="chineese">Trung Quốc</option>
                            <option value="italia">Italia</option>
                            <option value="korea">Hàn Quốc</option>

                        </select>
                    </div>

                    <div className="form-col">
                        <label>Loại bữa ăn</label>
                        <select name="meal_type" onChange={(e) => { setMealType(e.target.value) }}>
                            <option value="null">Chọn loại bữa ăn</option>
                            <option value="breakfast">Bữa sáng</option>
                            <option value="lunch">Bữa trưa</option>
                            <option value="dinner">Bữa tối</option>
                            {/* <option value="staters">Trung Quốc</option> */}
                        
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-col">
                        <label>Thêm hàng</label>
                        <input type="text" name='food_addon'
                        onChange={(e)=>{setFoodAddon(e.target.value)}}/>
                    </div>

                    <div className="form-col">
                        <label>Thêm giá</label>
                        <input type="text" name='food_addon_price'
                        onChange={(e)=>{setFoodAddonPrice(e.target.value)}}/>
                    </div>

                </div>

               
                <br />
                <label>Ảnh sản phẩm</label>
                <input type="file" name='food_image'
                    onChange={(e) => {
                        setfoodImage(e.target.files[0])
                    }} />
                <br />
                <label>Tên nhà hàng</label>
                <input type="text" name='restaurant_name'
                    onChange={(e) => {
                        setRestaurantName(e.target.value)
                    }} />
                <br />
                <div className="form-row">
                    <div className="form-col">
                        <label>Số/Tên tòa nhà hàng</label>
                        <input type="text" name='restaurant_address_building'
                        onChange={(e) =>{setRestaurantAddressBuilding(e.target.value)}}/>
                    </div>

                    <div className="form-col">
                        <label>Tên đường / Khu vực nhà hàng</label>
                        <input type="text" name='restaurant_address_stresst'
                            onChange={(e) => { setRestaurantAddressStreet(e.target.value) }} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-col">
                        <label>Thành phố nhà hàng</label>
                        <input type="text" name='restaurant_address_city'
                            onChange={(e) => { setRestaurantAddressCity(e.target.value) }} />
                    </div>

                    <div className="form-col">
                        <label>Mã pin nhà hàng</label>
                        <input type="number" name='restaurant_address_pincode'
                            onChange={(e) => { setRestaurantAddressPincode(e.target.value) }} />
                    </div>
                </div>

                <div className="form-row">

                    <div className="form-col">
                        <label>Số điện thoại nhà hàng</label>
                        <input type="number" name='restaurant_phone'
                            onChange={(e) => { setRestaurantPhone(e.target.value) }} />
                    </div>
                    
                    <div className="form-col">
                        <label>Mail nhà hàng</label>
                        <input type="email" name='restaurant_email'
                            onChange={(e) => { setRestaurantEmail(e.target.value) }} />
                    </div>

                   
                </div>
                <br />
                <button onClick={handlSubmit}>Thêm sản phẩm</button>



            </form>
        </div>
    )
}

export default AddFoodData
