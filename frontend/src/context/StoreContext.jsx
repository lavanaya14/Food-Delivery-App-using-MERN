import { createContext, useEffect, useState } from "react";
import axios from "axios"
export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } 
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(
        url+"/api/cart/add",
        {itemId},
        {
          headers:{token},
          // withCredentials: true
        }
      );
    }
  };


//   const addToCart = async (itemId) => {
//   setCartItems((prev) => ({
//     ...prev,
//     [itemId]: (prev[itemId] || 0) + 1
//   }));

//   if (token) {
//     try {
//       await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
//     } catch (err) {
//       console.error("Failed to add item to cart", err);
//     }
//   }
// };


  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };


//   const removeFromCart = async (itemId) => {
//   setCartItems((prev) => {
//     if (!prev[itemId]) return prev;
//     const updated = { ...prev, [itemId]: prev[itemId] - 1 };
//     if (updated[itemId] <= 0) delete updated[itemId];
//     return updated;
//   });

//   if (token) {
//     try {
//       await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
//     } catch (err) {
//       console.error("Failed to remove item from cart", err);
//     }
//   }
// };


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if(itemInfo){

        totalAmount += itemInfo.price * cartItems[item];
      } else{
         console.warn(`Item with ID ${item} not found in food list.`);
      }
    }
  }
    return totalAmount;
  };

  // const getTotalCartAmount = () => {
  // let totalAmount = 0;
  // for (const itemId in cartItems) {
  //   if (cartItems[itemId] > 0) {
  //     const itemInfo = food_list.find((product) => String(product._id) === String(itemId));
  //     if (itemInfo) {
  //       totalAmount += itemInfo.price * cartItems[itemId];
  //     }
  //   }
  // }
  // return totalAmount;
// };


  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;











