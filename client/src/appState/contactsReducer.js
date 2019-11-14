export const contactsReducer = (state, action) =>{
    switch(action.type){
        case 'ADD':
            return {...state, contacts:[...state.contacts, action.payload.newContact]}
        
        //case 'EDIT':
            //updateContact(action.payload);
        case 'FETCH_ALL_CONTACTS':    
            return  {...state, contacts:[ ...action.payload.contacts], isFetching: action.payload.isFetching}
        default:
            return state;
    }
}

// ADD action should not call create contact, it should be called from save button click and on sucess the ADD action should be triggered to update the global state; same goes for the update
// TODO: export to services, on error dispatch error action, set loading and not loading state
async function createContact(contact){
    const response = await fetch('http://localhost:5000/contacts',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    })
    console.log(response.status);
    console.log(response);
}