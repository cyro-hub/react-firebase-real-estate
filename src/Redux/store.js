import {createStore,combineReducers} from 'redux';
import reducer from './reducers/reducer'

// const reducer = combineReducers({
//     rentals:rentals,
// })

const store = createStore(reducer);

export default store;