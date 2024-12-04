const signup = document.getElementById("signup");
signup.addEventListener('click', async (e)=> {
  try {
  e.preventDefault();
  let password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const gender = document.getElementById("gender").value;
  const track = document.getElementById("track").value;
  const name = document.getElementById("name").value;
  // data validation
  if(!password || password == null) throw new Error("Password is required")
  if(!name) throw new Error("Name is required")
  if(gender.toLowerCase() !== "male" && gender.toLowerCase() !== "female") throw new Error("Invalid gender")
  if(track === "select") throw new Error("Select a track")
    const user = {
  password,
  gender:gender.toLowerCase(),
  track,
  email,
  name
}
// register user
const url = `${baseUrl}${routes.register}`;
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
alert(result.message);
// redirect to login
window.location = "../pages/login.html";
  } catch (error) {
    alert(error.message)
  }
})


const apiStatus = async () =>{
  try{
  const url = `${baseUrl}${routes.status}`;
    const res = await fetch(url, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      }, 
    });
    const result = await res.json();
    if(!res.ok){
      throw new Error(result.error)
    }   
} catch (error) {
  alert(error.message);
  console.log(error)
}
}
apiStatus();