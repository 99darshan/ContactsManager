export const contactsReducer = (state, action) =>{
    switch(action.type){
        case 'ADD':
            return {...state, contacts:[...state.contacts, action.payload]}
        case 'FETCH_ALL_CONTACTS':
            console.table(action.payload);
            console.log({...state, contacts:[ ...action.payload]});
            return {...state, contacts:[ ...action.payload]}
        default:
            return state;
    }
}
