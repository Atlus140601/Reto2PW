document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formulario_registro");
    const mensajeGeneral = document.getElementById("mensaje_general");

    const nombre = document.getElementById("nombre");
    const ci = document.getElementById("ci");
    const contrasenna = document.getElementById("contrasenna");
    const confirmacion = document.getElementById("confirmacion");

    const errorNombre = document.getElementById("error_nombre");
    const errorCi = document.getElementById("error_ci");
    const errorContrasenna = document.getElementById("error_contrasenna");
    const errorConfirmacion = document.getElementById("error_confirmacion");

    // AUXILIARES

    function marcarError(input, spanError, mensaje) {
        input.classList.add("input-error");
        input.classList.remove("input-ok");
        spanError.textContent = mensaje;
    }

    function marcarOk(input, spanError) {
        input.classList.remove("input-error");
        input.classList.add("input-ok");
        spanError.textContent = "";
    }

    function limpiarMensajes() {
        mensajeGeneral.className = "";
        mensajeGeneral.textContent = "";
        errorNombre.textContent = "";
        errorCi.textContent = "";
        errorContrasenna.textContent = "";
        errorConfirmacion.textContent = "";
        [nombre, ci, contrasenna, confirmacion].forEach(function (input) {
            input.classList.remove("input-error", "input-ok");
        });
    }


    // VALIDACIONES


    function validarNombre() {
        const valor = nombre.value.trim();
        if (valor === "") {
            marcarError(nombre, errorNombre, "El nombre no puede estar vacío.");
            return false;
        }
        marcarOk(nombre, errorNombre);
        return true;
    }

    function validarCi() {
        const valor = ci.value.trim();

        if (valor === "") {
            marcarError(ci, errorCi, "El CI no puede estar vacío.");
            return false;
        }
        if (!/^\d+$/.test(valor)) {
            marcarError(ci, errorCi, "El CI solo debe contener números.");
            return false;
        }
        // EXACTAMENTE 11 caracteres
        if (valor.length !== 11) {
            marcarError(ci, errorCi, "El CI debe tener exactamente 11 dígitos.");
            return false;
        }
        marcarOk(ci, errorCi);
        return true;
    }

    function validarContrasenna() {
        const valor = contrasenna.value;

        if (valor === "") {
            marcarError(contrasenna, errorContrasenna, "La contraseña no puede estar vacía.");
            return false;
        }
        marcarOk(contrasenna, errorContrasenna);
        return true;
    }

    function validarConfirmacion() {
        const valor = confirmacion.value;

        if (valor === "") {
            marcarError(confirmacion, errorConfirmacion, "La confirmación no puede estar vacía.");
            return false;
        }
        if (valor !== contrasenna.value) {
            marcarError(confirmacion, errorConfirmacion, "Las contraseñas no coinciden.");
            return false;
        }
        marcarOk(confirmacion, errorConfirmacion);
        return true;
    }

    // EVENTOS

    nombre.addEventListener("blur", validarNombre);
    ci.addEventListener("blur", validarCi);
    contrasenna.addEventListener("blur", validarContrasenna);
    confirmacion.addEventListener("blur", validarConfirmacion);

    contrasenna.addEventListener("input", function () {
        if (confirmacion.value !== "") {
            validarConfirmacion();
        }
    });

    // SUBMIT

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        // Limpiamos solo los textos de error, no las clases, porque las re-asignamos abajo
        errorNombre.textContent = "";
        errorCi.textContent = "";
        errorContrasenna.textContent = "";
        errorConfirmacion.textContent = "";
        mensajeGeneral.className = "";
        mensajeGeneral.textContent = "";

        const vNombre = validarNombre();
        const vCi = validarCi();
        const vContrasenna = validarContrasenna();
        const vConfirmacion = validarConfirmacion();

        if (vNombre && vCi && vContrasenna && vConfirmacion) {
            mensajeGeneral.className = "exito";
            mensajeGeneral.textContent = "¡Registro exitoso! Todos los datos son válidos.";
        } else {
            mensajeGeneral.className = "fracaso";
            mensajeGeneral.textContent = "Corrige los errores marcados antes de continuar.";
        }
    });

    document.getElementById("btn_limpiar").addEventListener("click", function () {
        // Limpia los valores de los inputs
        nombre.value = "";
        ci.value = "";
        contrasenna.value = "";
        confirmacion.value = "";

        // Limpia los mensajes y clases de estado
        limpiarMensajes();

        // Enfoca el primer campo
        nombre.focus();
    });

});