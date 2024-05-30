const identificacion = document.getElementById("identificacion");
const back_link = document.getElementById("back_link");
const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));

document.addEventListener("DOMContentLoaded", function() {
  const btnRegistrar = document.getElementById('btn_registrari');
  const inputEstudianteId = document.getElementById('identificacion');

  function checkInput() {
      btnRegistrar.disabled = !inputEstudianteId.value.trim();
  }

  inputEstudianteId.addEventListener('input', checkInput);

  checkInput(); 
});

document
  .getElementById("registrar_estudiantei")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const estudiante_id = {
      id:identificacion.value
    };

      try {
        const response = await fetch(
          "http://localhost:8080/api/estudiante/interno",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(estudiante_id),
          }
        );

        if (response.ok) {
          modal.hide();
          const result = await response.text();
          showAlert("El estudiante " + result + " ha sido registrado", "success");
            setTimeout(() => {
                window.location = "../html/user_home.html";
            }, 3000);
        } else {
          const result = await response.text();
          localStorage.setItem("message",result);
          setTimeout(() => {
            window.location = "../html/user_home.html";
          }, 1300);
        }
      } catch (error) {
        modal.hide();
        console.error("Error:", error);
      }
    
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
  }, 4000);
}