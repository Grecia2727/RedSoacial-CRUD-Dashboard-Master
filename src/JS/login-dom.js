// const faceButton = document.getElementById('faceButton');
// const googleButton = document.getElementById('googleButton');
const registerButtonEmpresa = document.getElementById('registerButtonEmpresa');
const registerButtonColaborador = document.getElementById('registerButtonColaborador');
const registerButtonUsuario = document.getElementById('registerButtonUsuario');
const loginButton = document.getElementById('loginButton');
const formInicio = document.getElementById('formInicio');
const formRegisterEmpresa = document.getElementById('formRegisterEmpresa');
const formRegisterColaborador = document.getElementById('formRegisterColaborador');
const formRegisterUsuario = document.getElementById('formRegisterUsuario');
const formIdentificate = document.getElementById('formIdentificate');
const registerLink = document.getElementById('registerLink');
const emailLogin = document.getElementById('email-login');
const passwordLogin = document.getElementById('password-login'); 
const updatePassword = document.getElementById('update-password');

const nameUser = document.getElementById('nameUser');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirPassword = document.getElementById('confirPassword')
const validInputs = document.getElementById('valid-inputs');
const validInputs2 = document.getElementById('valid-inputs2');
const errorPassword = document.getElementById('error-password');

// ***************** Campos del formulario Empresa  ************************
const razonSocial = document.getElementById('razonSocial');
const RUC = document.getElementById('RUC');
const nameContactoEmpresa = document.getElementById('nameContactoEmpresa');
const celularEmpresa = document.getElementById('celularEmpresa');
const sectorEmpresa = document.getElementById('sectorEmpresa');
const emailEmpresa = document.getElementById('emailEmpresa');
const passwordEmpresa = document.getElementById('passwordEmpresa');
const errorpasswordEmpresa = document.getElementById('error-passwordEmpresa');
const confirPasswordEmpresa = document.getElementById('confirPasswordEmpresa');

// ***************** Campos del formulario Colaborador  ************************
const empresaPertenece = document.getElementById('empresaPertenece');
const nameColaborador = document.getElementById('nameColaborador');
const celularColaborador = document.getElementById('celularColaborador');
const emailColaborador = document.getElementById('emailColaborador');
// const passwordColaborador = document.getElementById('passwordColaborador');
const errorpasswordColaborador = document.getElementById('error-passwordColaborador');
const confirPasswordColaborador = document.getElementById('confirPasswordColaborador');

// ***************** Campos del formulario Usuario  ************************
const nameUsuario = document.getElementById('nameUsuario');
const celularUsuario = document.getElementById('celularUsuario');
const emailUsuario = document.getElementById('emailUsuario');
const passwordUsuario = document.getElementById('passwordUsuario');
const errorpasswordUsuario = document.getElementById('error-passwordUsuario');
const confirPasswordUsuario = document.getElementById('confirPasswordUsuario');

// ***************** No tienes cuenta, Registrate  ************************
if (registerLink != null) {
  registerLink.addEventListener('click', () => {
    formIdentificate.classList.replace('hidden','show');
    formInicio.classList.add('hidden');
    
    // nameUser.value = '';
    // email.value = '';
    // password.value = '';
    // confirPassword.value = '';
    // validInputs.innerHTML = '';
  })
}


// ***************** Inicializo select "Identificate"  ************************
$(document).ready(function(){
  $('select').formSelect();
});

function functionIdentificate() {
  var x = document.getElementById("identificate").value;

  if(identificate.value === 'Empresa'){
    formInicio.classList.add('hidden'); 
    formRegisterEmpresa.classList.remove('hidden');
    formRegisterColaborador.classList.add('hidden');
    formIdentificate.classList.replace('show','hidden');
    formRegisterUsuario.classList.add('hidden');

  }else if(identificate.value === 'Colaborador'){
    formInicio.classList.add('hidden'); 
    formRegisterEmpresa.classList.add('hidden');
    formRegisterColaborador.classList.remove('hidden');
    formIdentificate.classList.replace('show','hidden');
    formRegisterUsuario.classList.add('hidden');

  }else{
    formInicio.classList.add('hidden'); 
    formRegisterEmpresa.classList.add('hidden');
    formRegisterColaborador.classList.add('hidden');
    formIdentificate.classList.replace('show','hidden');
    formRegisterUsuario.classList.remove('hidden');
  }
}

// ***************** Registra datos de las EMPRESAS ************************************
if (registerButtonEmpresa != null) {
  registerButtonEmpresa.addEventListener('click', () => {
  erazonSocial = razonSocial.value;
  eRUC = RUC.value;
  enameContactoEmpresa = nameContactoEmpresa.value;
  ecelularEmpresa = celularEmpresa.value;
  esectorEmpresa = sectorEmpresa.value;
  eemailEmpresa = emailEmpresa.value;
  epasswordEmpresa = passwordEmpresa.value;
  econfirPasswordEmpresa = confirPasswordEmpresa.value;

  if (validationRegisterEmpresa(erazonSocial, eRUC, enameContactoEmpresa, ecelularEmpresa, esectorEmpresa, eemailEmpresa, epasswordEmpresa, econfirPasswordEmpresa) === true) {
    registerNewEmpresa(eemailEmpresa, epasswordEmpresa);
  }
  else {
    if (isNotEmpty(erazonSocial) === false) {
      validInputs.innerHTML = 'Ingrese Razón Social';
    } else if (isNotEmpty(eRUC) === false){
      validInputs.innerHTML = 'Ingrese número de RUC de la empresa';
    } else if (isNotEmpty(enameContactoEmpresa) === false){
      validInputs.innerHTML = 'Ingrese un nombre del contacto';
    } else if (isNotEmpty(ecelularEmpresa) === false){
      validInputs.innerHTML = 'Ingrese teléfono o celular de la empresa';
    } else if (maxLenght(ecelularEmpresa) === false) {
      validInputs.innerHTML = 'Verifique el número ingresado';
    } else if (isNotEmpty(esectorEmpresa) === false){
      validInputs.innerHTML = 'Ingrese sector';
    } else if (isEmail(eemailEmpresa) === false) {
      validInputs.innerHTML = 'Ingrese email válido';
    } else if (isNotEmpty(epasswordEmpresa) === false) {
      validInputs.innerHTML = 'Ingrese contraseña con mínimo 6 caracteres';
    } else if (isNotEmpty(econfirPasswordEmpresa) === false) {
      validInputs.innerHTML = 'Confirmar contraseña';
    } else if (equalPassword(epasswordEmpresa, econfirPasswordEmpresa) === false) {
      validInputs.innerHTML = 'Las contraseñas no coinciden';
    } else if (miniLenght(epasswordEmpresa) === false) {
      validInputs.innerHTML = 'Su contraseña debe tener mínimo 6 caracteres';
    }
  }
});
}


// ***************** Registra datos de los COLABORADORES ********************************
if (registerButtonColaborador != null) {
  registerButtonColaborador.addEventListener('click', () => {
    cempresaPertenece = empresaPertenece.value;
    cnameColaborador = nameColaborador.value;
    ccelularColaborador = celularColaborador.value;
    cemailColaborador = emailColaborador.value;
    cpasswordColaborador = passwordColaborador.value;
    cconfirPasswordColaborador = confirPasswordColaborador.value;

  if (validationRegisterColaborador(cempresaPertenece, cnameColaborador, ccelularColaborador, cemailColaborador, cpasswordColaborador, cconfirPasswordColaborador) === true) {
   registerNewColaborador(cemailColaborador, cpasswordColaborador);
  }
  else {
    if (isNotEmpty(cempresaPertenece) === false) {
      validInputs.innerHTML = 'Ingrese nombre de la empresa donde labora';
    } else if (isNotEmpty(cnameColaborador) === false) {
      validInputs.innerHTML = 'Ingrese su nombre';
    } else if (isNotEmpty(ccelularColaborador) === false) {
      validInputs.innerHTML = 'Ingrese su número de celular';
    } else if (isEmail(cemailColaborador) === false) {
      validInputs.innerHTML = 'Ingrese email válido';
    } else if (isNotEmpty(cpasswordColaborador) === false) {
      validInputs.innerHTML = 'Ingrese contraseña con mínimo 6 caracteres';
    } else if (isNotEmpty(cconfirPasswordColaborador) === false) {
      validInputs.innerHTML = 'Confirmar contraseña';
    } else if (equalPassword(cpasswordColaborador, cconfirPasswordColaborador) === false) {
      validInputs.innerHTML = 'Las contraseñas no coinciden';
    } else if (miniLenght(cpasswordColaborador) === false) {
      validInputs.innerHTML = 'Su contraseña debe tener mínimo 6 caracteres';
    }
  }
});
}


// ***************** Registra datos de los USUARIOS *************************************
if (registerButtonUsuario != null) {
  registerButtonUsuario.addEventListener('click', () => {
    unameUsuario = nameUsuario.value;
    ucelularUsuario = celularUsuario.value;
    uemailUsuario = emailUsuario.value;
    upasswordUsuario = passwordUsuario.value;
    uconfirPasswordUsuario = confirPasswordUsuario.value;

  if (validationRegisterUser(unameUsuario, ucelularUsuario, uemailUsuario, upasswordUsuario, uconfirPasswordUsuario) === true) {
    registerNew(emailUser, passwordUser);
  }
  // else {
  //   if (isNotEmpty(nameUsers) === false) {
  //     validInputs.innerHTML = 'Ingrese su nombre';
  //   } else if (isEmail(emailUser) === false) {
  //     validInputs.innerHTML = 'Ingrese email válido';
  //   } else if (isNotEmpty(passwordUser) === false) {
  //     validInputs.innerHTML = 'Ingrese contraseña con mínimo 6 caracteres';
  //   } else if (isNotEmpty(confirPasswordUser) === false) {
  //     validInputs.innerHTML = 'Confirmar contraseña';
  //   } else if (equalPassword(passwordUser, confirPasswordUser) === false) {
  //     validInputs.innerHTML = 'Las contraseñas no coinciden';
  //   } else if (miniLenght(passwordUser) === false) {
  //     validInputs.innerHTML = 'Su contraseña debe tener mínimo 6 caracteres';
  //   }
  // }
});
}


// *********** Loguea al Usuario **************************
if (loginButton != null) {
loginButton.addEventListener('click', () => {
  if (isValidLogin(emailLogin.value, passwordLogin.value)) {
    login(emailLogin.value, passwordLogin.value);
    validation(); 
  } else {
    validInputs2.innerHTML = 'email y/o password incorrecto';
  }
});
}



// *********** Resetea contraseña **************************
if (updatePassword != null) {
  updatePassword.addEventListener('click', () => {
    if (emailLogin.value === '') {
      validInputs2.innerHTML = 'Ingrese un correo válido para resetear contraseña';
    } else if (validationUpdatePassword(emailLogin.value)) {
        resetPassword(emailLogin.value);
        validInputs2.innerHTML = 'Se envió correo para el cambio de contraseña';
    }
  });
  }


  // *********** Loguea con Google **************************
// if (googleButton != null) {
//   googleButton.addEventListener('click', (e) => {
//     if (e.target) {
//       loginGoogle();
//     }
//   });
//   }
  
  // *********** Loguea al Facebook **************************
  // if (faceButton != null) {
  // faceButton.addEventListener('click', (e) => {
  //   if (e.target) {
  //     loginFacebook()
  //   }
  // });
  // }
  