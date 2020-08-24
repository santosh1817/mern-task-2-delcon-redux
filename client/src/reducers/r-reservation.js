const reservationReducer=(state=[],action)=>{
    switch(action.type){
        case 'SET_RESERVATION':{
            return [...action.payload]
        }
        case 'ADD_RESERVATION':{
            return [...state,action.payload]
        }
        default:
            return [...state]
    }
}
export default reservationReducer