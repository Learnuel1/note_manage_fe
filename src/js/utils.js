const signup = document.getElementById("signup");
signup.addEventListener('click', (e)=> {
  try {
  e.preventDefault();
  let password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const gender = document.getElementById("gender").value;
  const track = document.getElementById("track").value;
  // data validation
  if(!password || password == null) throw new Error("Password is required")
  if(gender.toLowerCase() !== "male" && gender.toLowerCase() !== "female") throw new Error("Invalid gender")
  if(track === "select") throw new Error("Select a track")
    const user = {
  password,
  gender,
  track,
  email
}
console.log(user)
  } catch (error) {
    alert(error.message)
  }
})