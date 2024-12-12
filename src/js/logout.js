const logout  = document.getElementById("logout");

logout.addEventListener("click", async () => {
  try {
    // const url = `${baseUrl}${routes.logout}`;
    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     'content-type': "application/json", 
    //     authorization: header.authorization,
    //   }, 
    // })
    // const result  = await res.json();
    // if(!res.ok){
    //   if(res.status === 401){
    //     const newToken = await genRefreshToken();
    //     console.log(newToken);
    //   }
    //   throw new Error(result.error)
    // } 
    // window.location= "../pages/login.html";
     await logoutUser();
  } catch (error) {
    console.log(error);
    alert(error.message)
  }
})

const logoutUser = async () => {
  try {
    const url = `${baseUrl}${routes.logout}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': "application/json", 
        authorization: header.authorization,
      }, 
    })
    const result  = await res.json();
    if(!res.ok){
      if(res.status === 401){
        const newToken = await genRefreshToken();
        if(!newToken.error) await logoutUser();
      }
      throw new Error(result.error)
    } 
    localStorage.clear("auth")
    window.location= "../pages/login.html";
  } catch (error) {
    console.log(error);
    alert(error.message)
  }
}
const genRefreshToken = async () => {
  try {
    // access token expired
        // process to generate new AccessToken and RerefreshToken
        const url = `${baseUrl}${routes.refreshToken}`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            'content-type': "application/json", 
            authorization: header.authorization,
          },
          body: JSON.stringify(getUserAuth())
        })
        const result = await res.json();
        if(!res.ok){
          if(res.status === 401){
            localStorage.clear("auth");
            window.location= "../pages/login.html";
          }else throw new Error(result.error)
        }
        // update localstorage
        localStorage.setItem("auth", JSON.stringify({accessToken: result.accessToken, refreshToken: result.refreshToken}));
        return result;
  } catch (error) {
    alert(error.message)
  }
}