import * as typesOfActions from '../actionTypes'

export default function reducer(state={},action){
    switch(action.type){
        case typesOfActions.getRental:
            return{
                ...state, rentals:action.payload
            }
        case typesOfActions.getSales:
            return{
                ...state,sales:action.payload
            }
        case typesOfActions.getFaq:
            return{
                ...state,faq:action.payload
            }
        case typesOfActions.getUserInfo:
            return{
                ...state,user:action.payload
            }
        case typesOfActions.getRentalTrending:
            return{
                ...state,rentalsTrending:action.payload
            }
        case typesOfActions.getSalesTrending:
            return {
                ...state, salesTrending: action.payload
            }
        default:
            return {...state}
    }

}