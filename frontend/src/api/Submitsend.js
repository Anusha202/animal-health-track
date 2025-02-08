let API = "http://localhost:5001/api";

export const submitMessage = (send) => {
    return fetch(`${API}/contact/submitmessage`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(send)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

//get all message
export const getallmessage = () => {
    return fetch(`${API}/contact/getmessage`)
    .then(res => res.json())
    .catch(error => console.log(error))
}
//get message by id
export const getmessage = (id) => {
    return fetch(`${API}/contact/getmessage/${id}`)
    .then(res=>res.json())
    .catch(error=>console.log(error))
}