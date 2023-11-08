import { doc, getDoc } from 'firebase/firestore'
import Navbar from '../Navbar/Navbar'
import './ShowOrderSpecific.css'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../firebase/FireBaseConfig'

const ShowOrderSpecific = () => {
    const { orderid } = useParams();
    const [orderdata, setOrderData] = useState([])

    const getTorderData = async () => {
        const docRef = doc(db, 'UserOrders', orderid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data: ", docSnap.data());
            setOrderData(docSnap.data())
        } else {
            console.log("No such document!")
        }
    }
    console.log(orderdata);

    useEffect(() => {
        getTorderData()
    }, [])
  return (
    <div className='order-section'>
          <Navbar />
          <h1 className="order-head1">Order Details</h1>
          <div className="orderdetails-form">
              <div className="orderdetail_row">
                  <p>Tên</p>
                  <p>{orderdata.ordername }</p>
              </div>
              <div className="orderdetail_row">
                  <p>Địa chỉ</p>
                  <p>{orderdata.orderaddress}</p>
              </div>
              <div className="orderdetail_row">
                  <p>Số điện thoại</p>
                  <p>{orderdata.orderphone}</p>
              </div>
              <div className="orderdetail_row">
                  <p>Trạng thái</p>
                  <p>{orderdata.orderstatus}</p>
              </div>

          </div>
          <Link to='/orders'><button className="goback-btn">Go back</button></Link>

    </div>
  )
}

export default ShowOrderSpecific

