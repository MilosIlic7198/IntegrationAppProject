const error_Message = document.getElementById("errorMessage");

error_Message.style.display = "none";

error_Message.textContent = "";

const success_Message = document.getElementById("successMessage");

success_Message.style.display = "none";

success_Message.textContent = "";

document
  .getElementById("addIntegrationForm")
  .addEventListener("click", add_Integration_Form);

function add_Integration_Form(e) {
  e.preventDefault();

  const name = document.getElementById("addIntegrationName").value;

  console.log(name);

  const contact_name = document.getElementById(
    "addIntegrationContactPerson"
  ).value;

  console.log(contact_name);

  const contact_email = document.getElementById("addIntegrationEmail").value;

  console.log(contact_email);

  const contact_phone = document.getElementById(
    "addIntegrationPhoneNumber"
  ).value;

  console.log(contact_phone);

  const contact_skype = document.getElementById("addIntegrationSkype").value;

  console.log(contact_skype);

  const checked_Status = document.querySelectorAll(".status");

  let status;

  for (let i = 0; i < checked_Status.length; i++) {
    if (checked_Status[i].checked) {
      status = checked_Status[i].value;
    }
  }

  console.log(status);

  const salesman_id = document.getElementById("addIntegrationSalesman").value;

  console.log(salesman_id);

  const integrator_id = document.getElementById(
    "addIntegrationIntegrator"
  ).value;

  console.log(integrator_id);

  const checked_Products = document.querySelectorAll(".products");

  let product = [];

  for (let i = 0; i < checked_Products.length; i++) {
    if (checked_Products[i].checked) {
      product.push(checked_Products[i].value);
    }
  }

  console.log(product);

  axios

    .post(
      "http://localhost:4000/addIntegration",

      JSON.stringify({
        name,

        status,

        contact_name,

        contact_email,

        contact_phone,

        contact_skype,

        salesman_id,

        integrator_id,

        product,
      }),

      {
        headers: { "content-type": "application/json" },
      }
    )

    .then((response) => {
      console.log(response.data);

      res_Err_Messages_Add_Integration(response.data.message, name);
    })

    .catch((err) => {
      console.log(err);
    });
}

function res_Err_Messages_Add_Integration(message, name) {
  switch (message) {
    case "Not allowed! Only user with a role is allowed.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "Not allowed! Only user with salesman role is allowed.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The firm name must not be empty!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The firm name can only contain: [A-Za-z .]":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The firm name must be minimum 3+ characters long and maximum 25 characters long.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The exefeed id can only contain: [A-Z0-9 -]":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The exefeed id must be minimum 7 characters long with 4 digit numbers.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The contact name can only contain: [a-zA-Z]":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The contact name must be minimum 3+ characters long and maximum 20 characters long.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The contact email must not be empty!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "This is not a valid email!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The email must be minimum 12+ characters long and maximum 30 characters long.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "This is not a valid phone number!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The phone must be 10 numbers long.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The contact skype can only contain: [A-Za-z0-9 .:@]":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The skype must be minimum 6+ characters long and maximum 35 characters long.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The status must not be empty!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "You need to check one of the available options in status!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "You need to check one of the salesman!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "You need to check one of the integrator!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The product must not be empty!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "You need to check one or more available options in product!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case `This client with name: ${name} already exists!`:
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    default:
      error_Message.style.display = "none";

      error_Message.textContent = "";

      success_Message.style.display = "block";

      success_Message.textContent = message;
  }
}
