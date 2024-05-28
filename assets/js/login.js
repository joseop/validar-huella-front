const usuario = document.getElementById("usuario");
const contrasena = document.getElementById("contrasena");
const boton = document.getElementById("btn__entrar");

document
  .getElementById("login_form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const login = {
      usuario: usuario.value,
      contrasena: contrasena.value,
    };

    if (usuario.value == "Admin" && contrasena.value == "Admin") {
      window.location = "assets/html/registrar_user.html";
    } else {
      try {
        const response = await fetch(
          "http://localhost:8080/api/bibliotecario/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(login),
          }
        );

        if (response.ok) {
          const result = await response.text();
          showAlert("Bienvenido: " + result, "success");
          setTimeout(() => {
            window.location = "assets/html/user_home.html";
          }, 2000);
        } else {
          showAlert("Usuario o contraseña incorrectos", "danger");
        }
      } catch (error) {
        console.error("Error login bibliotecario:", error);
      }
    }
  });

  function showAlert(message, type) {
    const alertContainer = document.getElementById("alertContainer");
    const alertHtml = `
      <div class="alert alert-${type}" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    alertContainer.innerHTML = alertHtml;
    setTimeout(() => {
      alertContainer.innerHTML = ""; 
    }, 4000);
  }