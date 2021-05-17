

document.querySelector('#submitbtn').addEventListener('click', 
function(){
    let auth=document.querySelector('#author').value
    let content=document.querySelector('#content').value
    let dat=document.querySelector('#date').value
    let title=document.querySelector('#title').value
    console.log(auth);
    await putdata(auth,title, dat, content )
    window.location.href="index.html"

})

async function putdata(auth, title, dat, content){
    db.collection("posts").doc().set({
        Author:auth,
        Title:title,
        Created:dat,
        Content:content


    })
}