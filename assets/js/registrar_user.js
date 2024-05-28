showAlert("Ingreso como Super Usuario", "info");
document.getElementById('registrar_user_form').addEventListener('submit', async function(event) {
  event.preventDefault();


  const bibliotecario = {
      id: parseInt(document.getElementById('identificacion').value),
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value,
      usuario: document.getElementById('usuario').value,
      contrasena: document.getElementById('contrasena').value,
      vinculo: document.getElementById('vinculo').value,
      fechaVencimiento: document.getElementById('tiempo').value,
      correo: document.getElementById('correo').value,
  };

  try {
      const response = await fetch('http://localhost:8080/api/bibliotecario', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(bibliotecario)
      });

      if (response.ok) {
          const result = await response.text();
          showAlert("El bibliotecario " + result + " ha sido registrado", "success");
            setTimeout(() => {
                window.location = "../../index.html";
            }, 3000);
            
      } else {
            showAlert("Error al registrar bibliotecario", "danger");
      }
  } catch (error) {
      console.error('Error registering bibliotecario: El usuario o correo ya existen' , error);
  }
});
const back_link = document.getElementById("back_link");


back_link.addEventListener("click", (e) => {
  window.location = "../../";
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