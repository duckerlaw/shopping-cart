// สร้าง context api => ให้บริการข้อมูลแก่ component ใน app

import { createContext, useContext, useEffect, useReducer } from "react";
import CartData from "../data/CartData";
import Reducer from "./Reducer";

const initState = {
    cart:CartData,
    total:0,
    amount:0,
}
const CartContext = createContext()

export const MyCartContext = ()=> {
    return useContext(CartContext)
}

const CartProvider = ({children})=> {
    const [state,dispatch] = useReducer(Reducer,initState)
    
    useEffect(()=>{
        dispatch({type:"CALCULATE_TOTAL"})
    },[state.cart]) //เมื่อมีการเปลี่ยนแปลงข้อมูลใน state cart ให้เกิดaction CALCULATE_TOTAL

    const removeItem = (id) =>{
        console.log("รหัสที่ต้องการลบ = ",id);
        dispatch({type:"REMOVE_ITEM",payload:id})
    }

    const formatNumber = (num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const toggleQuantity = (id,type) =>{
        dispatch({type:"TOGGLE_QUANTITY",payload:{id,type}})
    }
    return (
        // กำหนดข้อมูลใน CartContext ด้วยคำสั่ง Provider
        <CartContext.Provider value={{...state,removeItem,toggleQuantity,formatNumber}}> 
            {children}
        </CartContext.Provider>
    )
}

export {CartContext,CartProvider}