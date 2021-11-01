//a class that have all of the methodes that we need to work with local storage and ui
class UI {
  constructor() {}
  //to open the form of contact
  static openForm(forWhat) {
    form.classList.add("open");
    openFormButton.style.display = "none";
    if (forWhat == "update") {
      saveContactButton.textContent = "update";
    } else if (forWhat == null) {
      saveContactButton.textContent = "save";
      deleteContactButton.style.display = "none";
    }
  }

  //to close the form of contact
  static closeForm() {
    form.classList.remove("open");
    UI.resetForm();
    openFormButton.style.display = "block";
  }

  //to reset the form
  static resetForm() {
    document.querySelector("#name").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#website").value = "";
    document.querySelector("#description").value = "";
    document.querySelector(".for-phone").style.color = "black";
    document.querySelector(".for-name").style.color = "black";
  }

  //to set the array of contacts in local storage
  static addToLs() {
    userStorage.setItem("contacts", JSON.stringify(Contact.list));
  }

  //to get and set item from local storage
  static getItemFromLs() {
    if (userStorage.getItem("contacts") == null) {
      Contact.list = [];
    } else {
      let forfilter = JSON.parse(userStorage.getItem("contacts"));
      Contact.list = forfilter.filter(
        (value) => Object.keys(value).length != 0
      );
      UI.addToLs();
      UI.loadContacts();
    }
  }

  //to load the contacts
  static loadContacts() {
    Contact.list.forEach((contact) => {
      let contactOBJ = new Contact(
        contact.name,
        contact.phone_number,
        contact.website,
        contact.description
      );
      contactOBJ.createContact();
    });
  }

  //to create an instance from Contact and call check values
  static saveContact(e) {
    e.preventDefault();
    let contact = new Contact(
      document.querySelector("#name").value,
      document.querySelector("#phone").value,
      document.querySelector("#website").value,
      document.querySelector("#description").value
    );
    contact.checkValues(e);
  }

  //to delete a contact
  static deleteContact(e) {
    e.preventDefault();
    document
      .querySelector(`[data-contactNumber = '${Contact.clickedContact}']`)
      .remove();
    Contact.list[Contact.clickedContact] = {};
    UI.addToLs();
    deleteContactButton.style.display = "none";
    saveContactButton.textContent = "save";
    UI.closeForm();
  }

  //to delte all of the contact
  static deleteAllContact(e) {
    document.querySelectorAll(`.contact`).forEach((element) => {
      element.remove();
    });
    Contact.list = [];
    Contact.counter = 0;
    UI.addToLs();
  }
}
