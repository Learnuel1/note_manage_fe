
const signin = document.getElementById("signin");
signin.addEventListener("click", async (e)=> {
  try {
    e.preventDefault();
    let password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    if(!password) throw new Error("Password required");
    if(!email) throw new Error("Email required");
    const user = {
      password,
      email
    };
    const url = `${baseUrl}${routes.login}`;
const res = await fetch(url, {
  method: "POST",
  headers: {
    'content-type': "application/json"
  },
  body: JSON.stringify(user)
});
const result = await res.json() 
if(!res.ok){
  throw new Error(result.error)
}  
const {accessToken, refreshToken} = result;
const auth = {accessToken, refreshToken};
 localStorage.setItem("auth", JSON.stringify(auth));
 alert(result.message);
 // redirect to dashboard
 window.location = "../pages/dashboard.html"
  } catch (error) {
    alert(error.message)
  }
})