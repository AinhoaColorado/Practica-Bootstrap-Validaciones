// recuperamos los usuarios registrados del localstorage
//recuperamos la lista de usuarios que se nos da en string PERO antes de guardarla en la variable la convertimos en array.
const usersList = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY));

if (usersList !== null && usersList.length > 0) {
  const cardsContainer = document.getElementById("container");

  for (const user of usersList) {
    cardsContainer.innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <p class="card-text">${user.email}</p>
            </div>
        </div>
    `;
  }
}
