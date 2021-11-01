// a class that have all of the methods to create a contact
class Contact {
  //constructor of Contact class
  constructor(name, phoneNumber, website = "", description = "") {
    (this.name = name),
      (this.phoneNumber = phoneNumber),
      (this.website = website),
      (this.description = description);
  }
  //a static counter for data-contactNumber id in the element
  static counter = 0;
  //a static list of contacts that user added
  static list = [];
  //to use to delete a contact
  static clickedContact = -1;
  //a function to create and add a contact
  createContact() {
    //create the contact body and add "contact" to the class list
    let contactBody = document.createElement("li");
    contactBody.classList = "contact";
    //set a data- to counter number
    contactBody.setAttribute("data-contactNumber", Contact.counter);
    Contact.counter++;
    //complete the contact body
    contactBody.innerHTML = `
        <div class="justify-item-center info">
            <div class="profile">${this.name[0].toUpperCase()}</div>
            <div class="name">${this.name}</div>
        </div>
        <p class="description-text">${this.description}</p>`;
    //append the contact body to contacts list
    document.querySelector(".contacts-list").appendChild(contactBody);
    //add an event listener to contact body
    contactBody.addEventListener("click", this.getContactInfo);
  }

  //a function to check the value of name and phoneNumber
  checkValues(e) {
    let validatePhoneNumber =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        this.phoneNumber
      );
    let validateName = this.name.length > 0;
    //checking the conditions
    if (validatePhoneNumber && validateName) {
      if (e.target.textContent == "save") {
        //call createContact function
        this.createContact();
        //create a contact object
        let contact = {
          name: this.name,
          phone_number: this.phoneNumber,
          website: this.website,
          description: this.description,
        };
        //push the object to the end of the list array
        Contact.list.push(contact);
      } else if (e.target.textContent == "update") {
        let contact = {
          name: document.querySelector("#name").value,
          phone_number: document.querySelector("#phone").value,
          website: document.querySelector("#website").value,
          description: document.querySelector("#description").value,
        };
        document.querySelector(
          `[data-contactNumber='${Contact.clickedContact}'] .profile`
        ).textContent = contact.name[0].toUpperCase();
        document.querySelector(
          `[data-contactNumber='${Contact.clickedContact}'] .name`
        ).textContent = contact.name;
        document.querySelector(
          `[data-contactNumber='${Contact.clickedContact}'] .description-text`
        ).textContent = contact.description;
        //change users clicked contact
        Contact.list[Contact.clickedContact] = contact;
      }

      UI.addToLs();
      UI.closeForm();
      UI.resetForm();
    } else if (validateName && !validatePhoneNumber) {
      document.querySelector(".for-name").style.color = "black";
      document.querySelector(".for-phone").style.color = "red";
      alert("please enter a correct phone number!");
    } else if (!validateName && validatePhoneNumber) {
      document.querySelector(".for-phone").style.color = "black";
      document.querySelector(".for-name").style.color = "red";
      alert("please enter a name!");
    } else if (!validateName && !validatePhoneNumber) {
      document.querySelector(".for-phone").style.color = "red";
      document.querySelector(".for-name").style.color = "red";
      alert("please enter a name and correct phone number!");
    }
  }

  //a function to get users contact info
  getContactInfo(e) {
    Contact.clickedContact = Number(
      e.currentTarget.getAttribute("data-contactNumber")
    );
    console.log(Contact.clickedContact);
    document.querySelector("#name").value =
      Contact.list[Contact.clickedContact].name;
    document.querySelector("#phone").value =
      Contact.list[Contact.clickedContact].phone_number;
    document.querySelector("#website").value =
      Contact.list[Contact.clickedContact].website;
    document.querySelector("#description").value =
      Contact.list[Contact.clickedContact].description;
    UI.openForm("update");
    saveContactButton.textContent = "update";
    deleteContactButton.style.display = "block";
  }
}
