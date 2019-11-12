export const contactsReducer = (state, action) =>{
    switch(action.type){
        case 'ADD':
            return {...state, contacts:[...state.contacts, action.payload]}

        default:
            return state;
    }
}
