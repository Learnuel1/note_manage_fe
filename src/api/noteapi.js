// const baseUrl = "http://localhost:5001/api/v1";
const baseUrl= "https://note-manage-backend.onrender.com/api/v1";

const header = {
  "content-type": "application/json",
  authorization: `bearer ${localStorage.getItem("accessToken")}`
}