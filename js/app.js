//variables
let openFormButton = document.querySelector(".add-contact");
let closeFormButton = document.querySelector(".cancel");
let form = document.querySelector(".modal");
let saveContactButton = document.querySelector(".save");
let deleteContactButton = document.querySelector(".delete");
let userStorage = window.localStorage;
let deleteAllButton = document.querySelector(".delete-all");

//event listeners
openFormButton.addEventListener("click", (e) => {
  e.preventDefault();
  UI.openForm();
});
closeFormButton.addEventListener("click", (e) => {
  e.preventDefault();
  UI.closeForm();
});
document.addEventListener("DOMContentLoaded", () => {
  UI.getItemFromLs();
  UI.resetForm();
});
deleteAllButton.addEventListener("click", UI.deleteAllContact);
saveContactButton.addEventListener("click", UI.saveContact);
deleteContactButton.addEventListener("click", UI.deleteContact);
