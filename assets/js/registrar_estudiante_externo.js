const back_link = document.getElementById("back_link");
const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrar_estudiantee");
  const btnRegistrar = document.getElementById("btn_registrar");
  const inputs = form.querySelectorAll("input[required]");

  function checkInputs() {
    let allFilled = true;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
      }
    });
    btnRegistrar.disabled = !allFilled;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", checkInputs);
  });

  checkInputs();
});

document
  .getElementById("registrar_estudiantee")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const estudiante = {
      id: parseInt(document.getElementById("identificacion").value),
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      universidad: document.getElementById("universidad").value,
      programa: document.getElementById("programa").value,
      categoria: document.getElementById("vinculo").value,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/estudiante/externo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(estudiante),
        }
      );

      if (response.ok) {
        modal.hide();
        const result = await response.text();
        showAlert(result, "success");
        setTimeout(() => {
          window.location = "../html/user_home.html";
        }, 3000);
      } else {
        
        localStorage.setItem("message","La identificcion ya ha sido registrada anteriormente");
        setTimeout(() => {
          window.location = "../html/user_home.html";
        }, 1300);
      }
    } catch (error) {
      modal.hide();
      console.error("Error registering estudiante:", error);
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
