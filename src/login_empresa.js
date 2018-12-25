let formRegistroDatosEmpresa;      
let refRegistroDatosEmpresa;


// Guardar datos de login de EMPRESA en BD
const saveDataEmpresa = (userId, name, email, imageUrl) => {
    firebase.database().ref('login_empresa/' + userId).
    set({
      username: name,
      email: email,
      picture: imageUrl,
      id: userId,
      razonSocial: razonSocial,   
    });
  }
  
    // Registro de EMPRESAS Nuevas
  const registerNewEmpresa = (email, password) => { 
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          const user = result.user;
          console.log(user)
          console.log("registrando datos")
          if (user.displayName == null) {
            username = document.getElementById('nameContactoEmpresa').value;
          } else {
            username = user.displayName;
            console.log(username)
          }
          if (user.photoURL == null) {
            picture = "https://thumbs.dreamstime.com/b/icono-del-usuario-46707697.jpg";
          } else {
            picture = user.photoURL;
          } if (razonSocial == null) {
            razonSocial = document.getElementById("razonSocial");
          } else {
            picture = user.photoURL;
          } 

               
          console.log(user.uid);
          console.log(username);
          console.log(user.displayName);
          saveDataEmpresa(user.uid, username, user.email, picture, razonSocial);
    
          check();
          validInputs.innerHTML = '';
          validInputs.value='';
          alert('Tu usuario ha sido registrado! \nConfirma el mensaje de verificación en tu correo y seguidamente puedes Iniciar Sesión');
          formRegisterEmpresa.classList.replace('show','hidden');
          formRegisterEmpresa.classList.add('hidden');
          formInicio.classList.remove('hidden');
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          if (error.message === 'auth/email-already-in-use') {
            validInputs.innerHTML = "El email ingresado ya está en uso";
          } else if (error.message === 'The email address is already in use by another account.') {
            validInputs.innerHTML = "El email está siendo utilizado por otro usuario";      
          }
        }) 
    }

    // =====================================================================

    const enviarRegistroDatosEmpresaAFirebase =()=>{
      // Insertando datos, al FIrebase
      refRegistroDatosEmpresa.push({
        razonsocial: razonSocial.value,
        ruc: RUC.value,
        namecontactoempresa:  nameContactoEmpresa.value,
        celularempresa: celularEmpresa.value,
        sectorEmpresa: sectorEmpresa.value,
        emailEmpresa: emailEmpresa.value,
        passwordempresa: passwordEmpresa.value,
      });
    
     // Despues de registrarse y guardar los datos, Recargamos la página.
      window.onload
    }
      const inicializarRegistroDatosEmpresa = () => {
      formRegistroDatosEmpresa = document.getElementById("formRegisterEmpresa");   
      document.getElementById('registerButtonEmpresa').addEventListener('click', () => {
          enviarRegistroDatosEmpresaAFirebase();
        });   
      refRegistroDatosEmpresa = firebase.database().ref().child("RegistroDeDatosEmpresa");
    }

    inicializarRegistroDatosEmpresa();

// ================================================================
// ================================================================
const publicButton = document.getElementById('buttonPost');

// Función para ingresar nueva sede
const writeNewPost = (uid, name, textSede, state) => {
  let postData = {
    id: uid,
    author: name,
    newPost: textSede,
    privacy: state,
    likeCount: 0,
    usersLikes: [] 
  };

  // Key para nueva publicación
  let postKey = firebase.database().ref().child('posts').push().key;    
  let updates = {};
  updates['/posts/' + postKey] = postData;
  updates['/user-posts/' + uid + '/' + postKey] = postData;
  return firebase.database().ref().update(updates);
}

