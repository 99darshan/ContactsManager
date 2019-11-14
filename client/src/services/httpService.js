/**
 * 
 * @param {string} url 
 * @param {any} dispatch 
 * receives an url and a dispatch object
 * makes http requests and dispatches an action to update the existing state once the request completes
 */
export async function Get(url, dispatch){
    try {
        // TODO: port to base url, what if status code other than 200 or 500
        //let response = await fetch('http://localhost:5000/contacts');
        let response = await fetch(url);
        if(response.status ===  200)
        {
            let res = await response.json();
            dispatch({
              type: "FETCH_ALL_CONTACTS",
              payload: {contacts: res.values, isFetching: false}
            });
            
        }

        if(response.status === 500)
        {
            // TODO: determine how error is returned from API 
            let res = await response.json();
            dispatch({
                type:"ERROR",
                payload:{isFetching: false, hasError: true, error: res} 
            })
        }
        
        //initialState = {...initialState, contacts:[...res], isFetching:false}
        //console.table(res);
        //console.table(initialState);
        
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:"ERROR",
            payload:{message: "Error Fetching Data From The Api"}
        })
    }
};


export async function Post(url, reqBody, dispatch){
    // TODO: try catch
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    });
    dispatch({
        type:"ADD",
        payload:{
            newContact: {...reqBody}
        }
    })

}