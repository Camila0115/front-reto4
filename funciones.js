const urlbase = 'http://localhost:8080/api/user';

//Metodo para iniciar sesion
const iniciarSesion = () => {
    console.log("Estoy en iniciar sesion");
    const email = $("#email").val();
    const clave = $("#password").val();

    if(email.length === 0 || clave.length === 0){
        mostrarMensaje('Debe completar todos los campos para continuar',true);
        $("#loading").html("")
        return;
    }

    $.ajax({
        url: `${urlbase}/${email}/${clave}`,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            $("#loading").html("");
            console.log(respuesta);
            if (respuesta.id===null){
                mostrarMensaje('Usuario y/o clave incorrectos', true);
            }else{
                mostrarMensaje('Iniciaste sesión correctamente',false);
    
                setTimeout(()=>{
                    window.location.href = 'menu.html';
                }, 1000);
                
            }
        },
        error: function (xhr, status) {
            $("#loading").html("");
            console.log(xhr);
            console.log(status);    
            console.log("Error al validar")
            mostrarMensaje('¡Ups!, informacion invalida', true);
        }
    });
    
}

//Metodo para mostrar un mensaje de error o de csatisfaccion
const mostrarMensaje = (cuerpo, error) => {
    if(error == true){
        console.log("Mensaje de error");
        let contenido =  '<div th:if="${param.error}" class="alert alert-danger" role="alert">';
            contenido += cuerpo;
            contenido += '</div>';
        $("#mensaje").html(contenido);
    }else if(error == false){
        console.log("Mensaje exitoso");
        let contenido = '<div th:if="${param.logout}" class="alert alert-success" role="alert">';
            contenido += cuerpo;
            contenido +='</div>';
        $("#mensaje").html(contenido);
    }
    
}

const nuevoUsuario = () =>{
    console.log("Estoy en nuevo usuario");
    const nombre = $('#name').val();
    const email = $('#email').val();
    const clave = $('#password').val();
    const confirmar = $('#password-repiter').val();
    console.log("El registro es:",nombre,email,clave,confirmar);

    if(nombre.length === 0 || email.length === 0 || clave.length === 0 || confirmar.length === 0){
        mostrarMensaje('Complete todos los campos por favor',true);
        return;
    }else if(clave != confirmar){
        mostrarMensaje('Las claves no coinciden',true);
        return;
    }else if(clave.length < 6){
        mostrarMensaje('La clave debe tener minimo 6 caracteres', true);
        return;
    }

    let parameters = {email:email,password:clave,name:nombre}
    var url =  urlbase +'/new'
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType:'JSON',
        data : JSON.stringify(parameters),
        url: url,
        success: function(respuesta) {
            mostrarMensaje('Usuario generado con exito',false);
        },
        error:function(respuesta){
            mostrarMensaje('Se presento un error',false);
        }
      })
}

const getUser = () =>{
    var url =  urlbase +'/all'
    $.ajax({        
        type:'GET',
        contentType: "application/json; charset=utf-8",
        dataType:'JSON',
        url: url,
        success: function(solucion) {
            console.log(solucion);
            
            let miTabla = '<table border>';
            miTabla += '<tr>';
            miTabla += '<td>'+  '<FONT COLOR="black" size = "5" face ="Courier">' + "ID"   + '</FONT>' + '</td>';
            miTabla += '<td>' + '<FONT COLOR="black" size = "5" face ="Courier">' + "MESSAGETEXT" + '</FONT>' + '</td>';
            miTabla += '</tr>';
            
            for(i=0; i<solucion.length; i++){
                miTabla += '<tr>';
                miTabla += '<td>'+ '<FONT COLOR="black" size = "5" face ="Courier">'+solucion[i].id    + '</FONT>' + '</td>';
                miTabla += '<td>'+ '<FONT COLOR="black" size = "5" face ="Courier">'+solucion[i].name  + '</FONT>' + '</td>';
                miTabla += '<td>'+ '<FONT COLOR="black" size = "5" face ="Courier">'+solucion[i].email  + '</FONT>' + '</td>';
                miTabla += '<td>'+ '<FONT COLOR="black" size = "5" face ="Courier">'+solucion[i].password  + '</FONT>' + '</td>';
                miTabla += '</tr>';
            }
            miTabla += '</table>';
            $("#resultado").append(miTabla);
        },
        error: function(){
            alert('ha sucedido un problema');
        }
    });
}