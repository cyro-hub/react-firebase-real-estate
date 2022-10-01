import * as typesOfActions from '../actionTypes'
import store from '../store'

export const getRental = (rentals)=>{
    // localStorage.setItem('rents',JSON.stringify(rentals))
    store.dispatch({type:typesOfActions.getRental,payload:rentals})
}

export const getSales = (sales)=>
   {
    //    localStorage.setItem('sales',JSON.stringify(sales)) 
       store.dispatch({type:typesOfActions.getSales,payload:sales})}


export const getRentalsTrending=(trending)=>{
    // localStorage.setItem('trendingRents',JSON.stringify(trending))
    store.dispatch({type:typesOfActions.getRentalTrending,payload:trending})
}


export const getSalesTrending = (trending) => {
    // localStorage.setItem('trendingSales',JSON.stringify(trending))
    store.dispatch({ type: typesOfActions.getSalesTrending, payload: trending })
}

export const getFaq=(faq)=>{
    // localStorage.setItem('faq',JSON.stringify(faq))
    store.dispatch({type:typesOfActions.getFaq,payload:faq})
}