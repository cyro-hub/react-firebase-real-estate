import * as typesOfActions from '../actionTypes'
import store from '../store'

export const getRental = (rentals)=>{
    store.dispatch({type:typesOfActions.getRental,payload:rentals})
}

export const getSales = (sales)=>
   { store.dispatch({type:typesOfActions.getSales,payload:sales})}


export const getRentalsTrending=(trending)=>{
    store.dispatch({type:typesOfActions.getRentalTrending,payload:trending})
}


export const getSalesTrending = (trending) => {
    store.dispatch({ type: typesOfActions.getSalesTrending, payload: trending })
}

export const getFaq=(faq)=>{
    store.dispatch({type:typesOfActions.getFaq,payload:faq})
}