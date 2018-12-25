
// ***************** Inicializo SIDE NAV ************************
$(document).ready(function(){
  $('.sidenav').sidenav();
});

// ***************** Función para cerrar sesion *****************
const signOut = () => {
	firebase.auth().signOut().then(() => {
	}).catch((error) => {
	});
}


// ************ Acceso a la plataforma, sólo al Usuario Logueado **********
// firebase.auth().onAuthStateChanged(function (user) {
// 	if (user) {
// 		console.log("usuario logueado");
// 	} else {
// 		console.log("usuario NO logueado");
// 		window.location.href = 'index.html';
// 	}
// });


