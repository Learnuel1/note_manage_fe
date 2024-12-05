const logout  = document.getElementById("logout");
logout.addEventListener("click", async () => {
  try {
    console.log(header)
    const url = `${baseUrl}${routes.logout}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': "application/json", 
        authorization: getUserAuth().accessToken,
      }
    })
    const result  = await res.json();
    console.log(result)
    if(!res.ok){
      throw new Error(result.error)
    } 
    window.location= "../pages/login.html";
  } catch (error) {
    console.log(error);
    alert(error.message)
  }
})