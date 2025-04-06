

const formData = document.getElementById("holeForm");

//Definimos una función para poder llamarla más tarde puesto que el código para mostrar el mensaje es identico para todos. Lo único que varía es el mensaje a mostrar, por eso se lo pasamos por parámetros.

function showMessage(type, message, redirect) {
  let messageContainer = document.getElementById("messageDiv");
  messageContainer.innerText = message;
  messageContainer.hidden = false;

  if (type === "success") {
    messageContainer.classList = "alert alert-success";
  } else if (type === "warning") {
    messageContainer.classList = "alert alert-warning";
  } else {
    alert("Algo has hecho mal");
  }

  setTimeout(function () {
    messageContainer.innerText = "";
    messageContainer.hidden = true;
    if (redirect) {
      window.location.href = "vistausuario.html";
    }
  }, 3000);
}

formData.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameData = document.getElementById("name").value;
  const emailData = document.getElementById("email").value;
  const passwordData = document.getElementById("password").value;
  const repeatPassword = document.getElementById("password2").value;

  // validación de que los campos deben estar rellenados
  if (!nameData || !emailData || !passwordData || !repeatPassword) {
    showMessage("warning", "Es obligatorio rellenar todos los campos", false);
    return;
  }

  // validación de que el email tenga un patrón válido: https://regex101.com/r/SOgUIV/2

  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

  if (!emailRegex.test(emailData)) {
    showMessage("warning", "El email introducido no es correcto", false);
    return;
  }

  if (passwordData !== repeatPassword) {
    showMessage("warning", "Las contraseñas no coinciden", false);
    return;
  }

  // validación de que la contraseña tenga un patrón válido: https://regex101.com/r/0bH043/3

  const passRegex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;

  if (!passRegex.test(passwordData)) {
    showMessage(
      "warning",
      "La contraseña no es válida. Debe incluir al menos una letra mayúscula, una minúscula, un número, un carácter especial y tener entre 8 y 16 caracteres de longitud.",
      false
    );
    return;
  }

  let user = {
    name: nameData,
    email: emailData,
    contraseña: passwordData,
  };

  let actualUsersValueLocalStorageString =
    localStorage.getItem(USERS_STORAGE_KEY);

  let actualUsersValueLocalStorageArray =
    JSON.parse(actualUsersValueLocalStorageString) || [];
  actualUsersValueLocalStorageArray.push(user);

  let newUsersValueString = JSON.stringify(actualUsersValueLocalStorageArray);

  localStorage.setItem(USERS_STORAGE_KEY, newUsersValueString);
  showMessage("success", "Usuario registrado correctamente", true);
});


