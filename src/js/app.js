  const firestore = firebase.firestore();
  const settings = {// your settings...  
    timestampsInSnapshots: true};
  firestore.settings(settings);

/*  const timestamp = snapshot.get('created_at');
  const date = timestamp.toDate();*/

  // Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function saveMessage(){

  let comments = document.getElementById("comments").value;

  db.collection("comments").add({
    
    message: comments

  })
  .then(function(docRef) {
   // console.log("Document written with ID: ", docRef.id);
    document.getElementById("comments").value="";
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
    
           if (error.code) {
            alert(error.message);
           }
  });
}

//leer info 
let displayMessages = document.getElementById("displayMessages"); 
db.collection("comments").onSnapshot((querySnapshot) => { //se reemplaza get x onSnapshot para obtener actualizaciones en tiempo real. Tambien se saca .then
    displayMessages.innerHTML="";
  querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data().message}`);
      displayMessages.innerHTML += `
          <div>${doc.data().message} 
            <button type="button" class="btn btn-danger" onclick="deleteMessage('${doc.id}')">Eliminar</button>
            </button>
            <hr>
          </div>
      `
  });
});

//borrar info 
function deleteMessage (id) {

  db.collection("comments").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
   
   if (error.code) {
    alert(error.message);
   }
  });
}
