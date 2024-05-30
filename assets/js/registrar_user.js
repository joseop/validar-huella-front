// Función para mostrar alertas
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

// Evento de envío del formulario
document
  .getElementById("registrar_user_form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const bibliotecario = {
      id: parseInt(document.getElementById("identificacion").value),
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      usuario: document.getElementById("usuario").value,
      contrasena: document.getElementById("contrasena").value,
      vinculo: document.getElementById("vinculo").value,
      fechaVencimiento: document.getElementById("tiempo").value,
      correo: document.getElementById("correo").value,
    };

    try {
      const response = await fetch("http://localhost:8080/api/bibliotecario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bibliotecario),
      });

      if (response.ok) {
        const result = await response.text();
        showAlert(
          "El bibliotecario " + result + " ha sido guardado",
          "success"
        );
        setTimeout(() => {
          window.location = "../../index.html";
        }, 3000);
      } else {
        showAlert("Este usuario ya existe", "danger");
      }
    } catch (error) {
      console.error(
        "Error registering bibliotecario: El usuario o correo ya existen",
        error
      );
    }
  });

const back_link = document.getElementById("back_link");
back_link.addEventListener("click", (e) => {
  window.location = "../../";
});

document
  .getElementById("iconoBuscar")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    const identificacion = document.getElementById("identificacion").value;
    if (identificacion.trim() === "") {
      showAlert("Por favor ingrese un ID antes de buscar", "warning");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/bibliotecario/${identificacion}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const bibliotecario = await response.json();

        document.getElementById("nombre").value = bibliotecario.nombre;
        document.getElementById("apellido").value = bibliotecario.apellido;
        document.getElementById("usuario").value = bibliotecario.usuario;
        document.getElementById("contrasena").value = bibliotecario.contrasena;
        document.getElementById("correo").value = bibliotecario.correo;
        document.getElementById("vinculo").value = bibliotecario.vinculo;
        document.getElementById("tiempo").value =
          bibliotecario.fechaVencimiento;

        document.getElementById("nombre").disabled = false;
        document.getElementById("apellido").disabled = false;
        document.getElementById("correo").disabled = false;
        document.getElementById("vinculo").disabled = false;
        document.getElementById("tiempo").disabled = false;
        document.getElementById("btnGuardarUser").disabled = false;
        document.getElementById("identificacion").disabled = true;  

        showAlert("Bibliotecario encontrado", "info");
      } else {
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("usuario").value = "";
        document.getElementById("contrasena").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("vinculo").value = "";
        document.getElementById("tiempo").value = "";

        document.getElementById("nombre").disabled = false;
        document.getElementById("apellido").disabled = false;
        document.getElementById("usuario").disabled = false;
        document.getElementById("contrasena").disabled = false;
        document.getElementById("correo").disabled = false;
        document.getElementById("vinculo").disabled = false;
        document.getElementById("tiempo").disabled = false;
        document.getElementById("btnGuardarUser").disabled = false;
        document.getElementById("identificacion").disabled = true;  

        showAlert(
          "Bibliotecario no encontrado, puede proceder a crear uno nuevo",
          "warning"
        );
      }
    } catch (error) {
      console.error("Error buscando bibliotecario:", error);
      showAlert("Error buscando bibliotecario", "danger");
    }
  });
