document.getElementById("userform").addEventListener("submit",async function(event) {
    event.preventDefault();

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;
let responseMessage=document.getElementById("responseMessage");

if(!name || !email || !password){
    responseMessage.innerHTML="All fields are required.";
    return;
}
let formData={name,email,password};
try{
    let response = await fetch("https://jsonplaceholder.typicode.com/posts",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
    });
    let result=await response.json();
    if(response.ok){
        responseMessage.innerHTML="User registered successfully.";
        document.getElementById("userform").reset();
    }
    else{
        responseMessage.innerHTML="Something went wrong.";
    }
}catch(error){
    responseMessage.innerHTML="Error submitting form.";
}
});
async function fetchPosts(){
 try{
    let response=await fetch("https://jsonplaceholder.typicode.com/posts");
    if(!response.ok){
        throw new Error("Network response was not ok");
    }
    let data=await response.json();
    let postsTable=document.getElementById("postsTable");
    postsTable.innerHTML="";
    data.forEach(post => {
        let row =`<tr>
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.body}</td>
            </tr>`;
            postsTable.innerHTML += row;     
    });
    document.getElementById("dataTable").style.display = "table";
 }catch(error){
    console.error("Error fetching posts:", error);
    document.getElementById("postsTable").innerHTML = "<tr><td colspan='3'>Failed to load posts.</td></tr>";
 }
}