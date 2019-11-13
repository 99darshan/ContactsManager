export const contactsReducer = (state, action) =>{
    switch(action.type){
        case 'ADD':
            return {...state, contacts:[...state.contacts, action.payload]}
        case 'FETCH_ALL_CONTACTS':    
            return {...state, contacts:[ ...action.payload.res], isFetching: action.payload.isFetching}
        default:
            return state;
    }
}
