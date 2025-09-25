import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]:value }));
  };

  const placeOrder = async (event) => {
  event.preventDefault();

  let orderItems = [];
  food_list.forEach((item) => {
    if (cartItems[item._id] > 0) {
      orderItems.push({ ...item, quantity: cartItems[item._id] });
    }
  });

  let orderData = {
    address: data,
    items: orderItems,
    amount: getTotalCartAmount() + 2, // delivery fee agar lagana ho
  };

  try {
    //  yeh line agar fail hoti hai to catch block chalega
    let response = await axios.post(
      url + "/api/order/checkout",
      orderData,
      { headers: { token } }
    );

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url); // stripe page pe redirect
    } else {
      alert("Error while creating checkout session");
    }
  } catch (error) {
    console.error("Axios Error:", error);
    alert("Payment request failed. Please try again.");
  }
};

  return (
      <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler}value={data.firstName}type="text"placeholder="First name"/>
          <input required name="lastName" onChange={onChangeHandler}value={data.lastName}type="text"placeholder="Last name"/>
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
        <input required  name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
        <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required  name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
           {/* <button onClick={handleCheckout}>Proceed to Payment</button> */}
            {/* <button onClick={handleCheckout} disabled={loading}> {loading ? "Processing..." : "Checkout"} </button> */}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;




