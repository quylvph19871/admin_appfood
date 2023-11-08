
import React, { useEffect, useState } from 'react'
import './OrderSelection.css'
import Navbar from '../Navbar/Navbar'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase/FireBaseConfig'
import { Link } from 'react-router-dom'
const OrderSelection = () => {

    const [allorders, setAllOrders] = useState([])
    const [allordersStatus, setAllOrdersStatus] = useState('')
    const [keyWord, setKeyWord] = useState('')

    useEffect(() => {
        getAllOrder();
    }, []);

    const getAllOrder = async () => {
        setAllOrders([]);
        const querySnapshot = await getDocs(collection(db, "UserOrders"));
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            setAllOrders((prev) => [...prev, doc.data()])
        })
    }
    allorders.map((item) => {
        console.log(item.orderid);
    })

    const changeOrderStatus = (id, orderdata, status) => {
        const docRef = doc(db, 'UserOrders', id);
        const data = {
            ...orderdata,
            orderstatus: status
        }
        setDoc(docRef, data).then(() => {
            alert('Thành công!')
        }).catch((error) => {
            alert('Thất bại', error)
        })
        getAllOrder()
    }

    const changeDeliveryboyname = (id, orderdata, name) => {
        const docRef = doc(db, 'UserOrders', id);
        const data = {
            ...orderdata,
            deliveryboy_name: name
        }
        setDoc(docRef, data).then(() => {
            alert('Thành công!')
        }).catch((error) => {
            alert('Thất bại', error)
        })
        getAllOrder()
    }

    const changeDeliveryboyPhone = (id, orderdata, phone) => {
        const docRef = doc(db, 'UserOrders', id);
        const data = {
            ...orderdata,
            deliveryboy_phone: phone
        }
        setDoc(docRef, data).then(() => {
            alert('Thành công!')
        }).catch((error) => {
            alert('Thất bại', error)
        })
        getAllOrder()
    }

    const uniqueOrderIds = new Set();
    const filteredOrders = allorders
        .filter((val) => {
            if (allordersStatus === '') {
                return val;
            } else if (val.orderstatus) {
                const lowerCaseOrderStatus = val.orderstatus.toLowerCase();
                if (lowerCaseOrderStatus.includes(allordersStatus.toLowerCase())) {
                    return val;
                }
            }
        })
        .filter((val) => {
            if (keyWord === '') {
                return val;
            } else if (val.orderid) {
                const lowerCaseOrderId = val.orderid.toLowerCase();
                if (lowerCaseOrderId.includes(keyWord.toLowerCase())) {
                    return val;
                }
            }

            if (val.orderstatus) {
                const lowerCaseOrderStatus = val.orderstatus.toLowerCase();
                if (lowerCaseOrderStatus.includes(keyWord.toLowerCase())) {
                    return val;
                }
            }

            if (val.deliveryboy_name) {
                const lowerCaseDeliveryboyName = val.deliveryboy_name.toLowerCase();
                if (lowerCaseDeliveryboyName.includes(keyWord.toLowerCase())) {
                    return val;
                }
            }
        });

    const filteredOrdersWithoutDuplicates = filteredOrders.filter((order) => {
        if (!uniqueOrderIds.has(order.orderid)) {
            uniqueOrderIds.add(order.orderid);
            return true;
        }
        return false;
    });
    return (
        <div className='order-section'>
            <Navbar />
            <h1 className="order-head1">Order Section</h1>
            <div className="order-s1">
                <input type="text" placeholder='Tìm kiếm theo id của đơn hàng hoặc trạng thái giao hàng' className='searchbar'
                    onChange={(e) => setKeyWord(e.target.value)} />
                <div className="order-s1-in">
                    <p >Sắp xếp theo trạng thái thứ tự</p>
                    <select className='ordertxt' onChange={(e) => setAllOrdersStatus(e.target.value)}>
                        <option value="">All</option>
                        <option value="pending">Đang chờ xử lý</option>
                        <option value="ontheway">Đang trên đường</option>
                        <option value="delivered">Đã giao</option>
                        <option value="cancelled">Hủy</option>
                    </select>
                </div>
            </div>
            <div className="order__container">
                <div className="order-row-card1">
                    <p className="ordertxt">id đơn hàng</p>
                    <p className="ordertxt">Trả tiền</p>
                    <p className="ordertxt">Tình trạng đơn hàng</p>
                    <p className="ordertxt">Tên</p>
                    <p className="ordertxt">Số điện thoại</p>
                    <p className="ordertxt">Phí</p>
                    <p className="ordertxt">Hiển thị</p>

                </div>
                <div className="order__container">
                    {filteredOrdersWithoutDuplicates.map((order) => {
                        return (
                            <div className="order__container">
                                  <div className="order-row_card">
                                    <p className="ordertxt">{order.orderid}</p>
                                    <p className="ordertxt">{order.orderpayment}</p>
                                    <div className='order-card'>
                                        <div className="order-card-in1">
                                            {order.orderstatus === 'pending' &&
                                                <select className='ordertxt1' onChange={(e) => changeOrderStatus(order.orderid, order, e.target.value)}>
                                                    <option value="pending">Đang chờ xử lý</option>
                                                    <option value="ontheway">Đang trên đường</option>
                                                    <option value="delivered">Đã giao</option>
                                                    <option value="cancelled">Hủy</option>
                                                </select>
                                            }
                                            {order.orderstatus === 'ontheway' &&
                                                <select className='ordertxt1' onChange={(e) => changeOrderStatus(order.orderid, order, e.target.value)}>
                                                    <option value="ontheway">Đang trên đường</option>
                                                    <option value="pending">Đang chờ xử lý</option>
                                                    <option value="delivered">Đã giao</option>
                                                    <option value="cancelled">Hủy</option>
                                                </select>
                                            }
                                            {order.orderstatus === 'delivered' &&
                                                <select className='ordertxt1' onChange={(e) => changeOrderStatus(order.orderid, order, e.target.value)}>
                                                    <option value="delivered">Đã giao</option>
                                                    <option value="pending">Đang chờ xử lý</option>
                                                    <option value="ontheway">Đang trên đường</option>
                                                    <option value="cancelled">Hủy</option>
                                                </select>}
                                            {order.orderstatus === 'cancelled' && <p className='ordertxt1'>{order.orderstatus}</p>}
                                        </div>
                                    </div>

                                    {/* <div className="ordertxt"> */}
                                        {order.deliveryboy_name ? <p className='ordertxt'>{order.deliveryboy_name}</p> : <p>
                                        <input type="text" placeholder='nhập tên' className='orderinput'
                                            onBlur={(e) => { changeDeliveryboyname(order.orderid, order, e.target.value) }} /></p>}
                                    {/* </div>
                                    <div className="ordertxt"> */}
                                         {order.deliveryboy_phone ? <p className='ordertxt'>{order.deliveryboy_phone}</p> : <p>
                                        <input type="text" placeholder='nhập số điện thoại' className='orderinput'
                                            onBlur={(e) => { changeDeliveryboyPhone(order.orderid, order, e.target.value) }} /></p>}
                                {/* </div> */}
                                   
                                    <p className='ordertxt'>{order.ordercost}</p>
                                    <Link to={`/orderdetails/${order.orderid}`}> <button >Hiển thị</button></Link>
                                   
                                </div>
                                </div>
                              
                            )

                        })}
                </div>
            </div>
        </div>
    )
}

export default OrderSelection

