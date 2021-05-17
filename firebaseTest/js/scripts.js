/*!
* Start Bootstrap - Blog Post v4.3.0 (https://startbootstrap.com/template/blog-post)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-post/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


 
var firebaseConfig = {
    apiKey: "AIzaSyCRJxdzuodYh3i3eydNsAE8xFjxSHWdW0w",
    authDomain: "blogtest-14ada.firebaseapp.com",
    projectId: "blogtest-14ada",
    storageBucket: "blogtest-14ada.appspot.com",
    messagingSenderId: "975556708270",
    appId: "1:975556708270:web:adbeb20e73ce92c1e0aa3f",
    measurementId: "G-YJX9MWHRRT"
  };
  
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  let posts=document.querySelector('#post-container')
  const db=firebase.firestore();
  function appendpost(title, author, time, content, id)
  {
      let div=document.createElement("div");
      div.setAttribute("class", "post-preview");
      let a=document.createElement("a");
      a.setAttribute("href", "post.html");
      
      let h2=document.createElement("h2");
      h2.classList.add("post-title");
      let small=document.createElement("p");
      small.setAttribute("class", "post-meta");
      let p=document.createElement("p");
      let j=document.createElement("hr")

      h2.textContent=title;
      small.textContent="Posted by "+author+" on "+ time;
      p.textContent=content;

      a.appendChild(h2);
      
      a.appendChild(p);
      
      div.appendChild(a);
      div.appendChild(small);
      posts.appendChild(div);
      posts.appendChild(j);

 }

  function getPosts(){
    db.collection("posts").orderBy("Created", "desc").get().then(snapshot =>
      {
        snapshot.docs.forEach(docs => {
          console.log(docs.id);
          appendpost(
            docs.data().Title,
            docs.data().Author,
            docs.data().Created,
            docs.data().Content,
            docs.id
          )
        });
      }).catch(err=>{
        console.log(err);
      })
  }
getPosts()




