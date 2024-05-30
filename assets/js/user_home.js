const boton_validar = document.getElementById("btn__validar");
const boton_externo = document.getElementById("btn__externo");
const boton_interno = document.getElementById("btn__interno");
const back_link = document.getElementById("back_link");
const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
document.addEventListener("DOMContentLoaded", function () {
  const message = localStorage.getItem("message");
  if (message) {
    showAlert(message, "danger");
    localStorage.removeItem("message");
  }
});
boton_validar.addEventListener("click", async function (event) {
  event.preventDefault();
  try {
    const response = await fetch(
      "http://localhost:8080/api/estudiante/huella",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      modal.hide();
      const result = await response.text();
      showAlert(result, "success");
    } else if (response.status === 403) {
      const result = await response.text();
      modal.hide();
      showAlert(result, "danger");
    } else if (response.status === 401) {
      modal.hide();
      showAlert("No hay registro en la base de datos", "danger");
    } else {
      modal.hide();
      showAlert("Error inesperado", "danger");
    }
  } catch (error) {
    modal.hide();
    console.error("Error:", error);
    showAlert("Error al conectar con el servidor", "danger");
  }
});

boton_externo.addEventListener("click", (e) => {
  window.location = "../html/registrar_estudiante_externo.html";
});

boton_interno.addEventListener("click", (e) => {
  window.location = "../html/registrar_estudiante_interno.html";
});

back_link.addEventListener("click", (e) => {
  window.location = "../../index.html";
});

back_link.addEventListener("click", (e) => {
  window.location = "../html/user_home.html";
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
  }, 300000);
}
