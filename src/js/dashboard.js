const loggedInUser = document.getElementById("username");
loggedInUser.textContent = getUserInfo().name;

const newNote = document.getElementById("addNote");
const addNoteX= document.getElementById("Cancel");

const dataTable = document.getElementById("datatable");
const addNewNote = document.getElementById("Submit")

newNote.addEventListener('click', ()=>{
  try {
    const modal = document.getElementById("addNoteModal");
  modal.classList.add("show");
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
  
})
addNoteX.addEventListener('click', ()=>{
  try {
    const modal = document.getElementById("addNoteModal");
  modal.classList.remove("show");
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
  
})

const deleteNote = (e) => {
  try {
    const button  = e.currentTarget;
    if(button.name === "delete"){
      // send delete request
    }
    console.log(button)
    console.log(button.id)
    console.log(button.name)
    console.log(button.classList)
  } catch (error) { 
    alert(error.message)
  }
}

const loadData = async() =>{
  try {
    const url = `${baseUrl}${routes.note}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'content-type': "application/json"
      },
      
    });
    const result = await res.json()
    if(!res.ok){
      throw new Error(result.error)
    } 
    const {notes} =  result;
    // populate the table with data
    notes.forEach((cur)=>{
      const tableRow = `<tr class="trow">
                    <td> ${cur.title}</td>
                    <td> ${cur.text}
                    </td>
                    <td>${ new Date(cur.createdAt).toLocaleDateString()}</td>
                    <td> <button class="btn" id="${cur._id}" name="delete" onclick="deleteNote(event)"> Delete</button></td>
                  </tr>`;
                  dataTable.insertAdjacentHTML("beforeend", tableRow);
    })
  } catch (error) {
    console.log(error.message);
    alert(error.message)
  }
}

const addNote = async (data) =>{
  try {
    const url = `${baseUrl}${routes.note}`;
    const res = await fetch(url, {
      method: "POST", 
      headers: {
        'content-type': "application/json",
        authorization: `bearer ${getUserAuth().accessToken}`
      },
      body:  JSON.stringify(data),
    })
    const result  = await res.json();
    if(!res.ok){
      if(res.status === 401){
        const newToken = await genRefreshToken();
        console.log(newToken);
        if(!newToken.error) await logoutUser();
        else await addNote();
      }
      throw new Error(result.error)
    }
  } catch (error) {
    console.log(error.message);
    alert(error.message)
  }
}
addNewNote.addEventListener('click', async(e)=>{
  try {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const text = document.getElementById("text").value;
    const data = {
      title, text
    }
    await addNote(data);
    loadData();
  } catch (error) {
    alert(error.message)
  }
})
loadData();