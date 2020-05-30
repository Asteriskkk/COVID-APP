
// all api call or http call here

const apiCall = (payload)=>{
    console.log(payload,'payload')
    return fetch(payload.url,{
        method: payload.method,
        mode: 'cors',
       })
      .then(res =>{
        if(res.ok) return res.json()
        else throw new Error
      })
      
}

export default apiCall