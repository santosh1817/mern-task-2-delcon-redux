import {createStore,combinereducers, combineReducers} from 'redux'
import usersReducer from '../reducers/r-user'
import reservationReducers from '../reducers/r-reservation'

const configureStore=()=>{
    const store=createStore(combineReducers({
        user:usersReducer,
        reservation:reservationReducers
    }))
    return store
}
export default configureStore