let formRegistroDatosColaborador;      
let refRegistroDatosColaborador;


// Guardar datos de login de COLABORADOR en BD
const saveDataColaborador = (userId, name, email, imageUrl) => {
    firebase.database().ref('login_colaborador/' + userId).
    set({
      username: name,
      email: email,
      picture: imageUrl,
      id: userId,
    });
  }
  
    // Registro de COLABORADOR Nuevos
  const registerNewColaborador = (email, password) => { 
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          const user = result.user;
          if (user.displayName == null) {
            username = document.getElementById('nameColaborador').value;
          } else {
            username = user.displayName;
            console.log("nameColaborador")
          }
          if (user.photoURL == null) {
            picture = "https://thumbs.dreamstime.com/b/icono-del-usuario-46707697.jpg";
          } else {
            picture = user.photoURL;
          } 
               
          console.log(user.uid);
          console.log(username);
          console.log(user.displayName);
          saveDataColaborador (user.uid, username, user.email, picture);
     
          check();
          validInputs.innerHTML = '';
          validInputs.value='';
          alert('Tu usuario ha sido registrado! \nConfirma el mensaje de verificación en tu correo y seguidamente puedes Iniciar Sesión');
          formRegisterColaborador.classList.replace('show','hidden');
          formRegisterColaborador.classList.add('hidden');
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

    const enviarRegistroDatosColaboradorAFirebase =()=>{
      // Insertando datos, al FIrebase
      refRegistroDatosColaborador.push({
        empresapertenece: empresaPertenece.value,
        namecolaborador: nameColaborador.value,
        celularcolaborador:  celularColaborador.value,
        emailcolaborador: emailColaborador.value,
        sectorempresa: sectorEmpresa.value,
        emailempresa: emailEmpresa.value,
        confirpasswordColaborador: confirPasswordColaborador.value,
      });
    
     // Despues de registrarse y guardar los datos, Recargamos la página.
      window.onload
    }
      const inicializarRegistroDatosColaborador = () => {
      formRegistroDatosColaborador = document.getElementById("formRegisterColaborador");   
      document.getElementById('registerButtonColaborador').addEventListener('click', () => {
          enviarRegistroDatosColaboradorAFirebase();
        });   
        refRegistroDatosColaborador = firebase.database().ref().child("RegistroDeDatosColaborador");
    }

    inicializarRegistroDatosColaborador();
