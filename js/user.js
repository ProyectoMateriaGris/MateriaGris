
/* FUNCION QUE OBSERVA EL ESTADO DEL USUARIO*/

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    var usuario = firebase.auth().currentUser;

        if(usuario != null){
            var user_email = usuario.email;


            if (document.getElementById("caja_log")) {
                document.getElementById("caja_log").innerHTML = 
                `
                <div class="caja_log2">
                <a href="Perfil_user.html"><p>${user_email}</p></a>
                <button onclick="logout()"><u>Cerrar sesión</u></button>
                </div>
                `
            } else {
                document.getElementById("name_user").innerHTML= user_email 
            }


            

        }
    }
  });


/* FUNCION LOGIN PARA INGRESO DE USUARIOS EXISTENTES */

function login(){

    var email = document.getElementById("email_login").value; 
    var pass = document.getElementById("pass_login").value;


    firebase.auth().signInWithEmailAndPassword(email, pass)
    // Aqui con el metodo then se utiliza para hacer acciones cuando el ingreso del usuario se realizo correctamente
    .then(function(){

        window.alert("Usted se logueó exitosamente");
        console.log("Usuario logueado");

        document.location.href = "Perfil_user.html";

    })
    // Aqui caso contrario no ya que aca se pone cuando hay un error la ingresar el usuario
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Usuario no logueado");
        // ...
    });
}


/* FUNCIÓN REGISTRO PARA REGISTRAR USUARIOS NUEVOS */
function registrar(){

    var email_reg = document.getElementById("email_reg").value; 
    var pass_reg = document.getElementById("pass_reg").value;

    firebase.auth().createUserWithEmailAndPassword(email_reg, pass_reg)
    // Aqui con el metodo then se utiliza para hacer acciones cuando el ingreso del usuario se realizo correctamente
    .then(function(){

        window.alert("Registro exitoso : " + email_reg);
        console.log("Usuario registrado");

        document.location.href = "Perfil_user.html";

    })
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Usuario no registrado");
        // ...
      });
}

/* FUNCIÓN QUE PERMITIRÁ CERRAR SESION A LOS USUARIOS*/

function logout(){
    firebase.auth().signOut();
    document.location.href ="index.html";
}

function logout2(){
    firebase.auth().signOut();
    document.location.href ="../index.html";
}
