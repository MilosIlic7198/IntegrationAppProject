const edit_Error_Message = document.getElementById("editErrorMessage");

edit_Error_Message.style.display = "none";

edit_Error_Message.textContent = "";

document
  .getElementById("editIntegrationForm")
  .addEventListener("click", edit_Integration_Form);

function edit_Integration_Form(e) {
  e.preventDefault();

  const integration_id = parseInt(this.dataset.id);

  console.log(integration_id);

  const name = document.getElementById("editIntegrationName").value;

  console.log(name);

  const company_id = document.getElementById("editIntegrationCompanyId").value;

  console.log(company_id);

  const contact_name = document.getElementById(
    "editIntegrationContactPerson"
  ).value;

  console.log(contact_name);

  const contact_email = document.getElementById("editIntegrationEmail").value;

  console.log(contact_email);

  const contact_phone = document.getElementById(
    "editIntegrationPhoneNumber"
  ).value;

  console.log(contact_phone);

  const contact_skype = document.getElementById("editIntegrationSkype").value;

  console.log(contact_skype);

  const checked_Status = document.querySelectorAll(".editStatus");

  let status;

  for (let i = 0; i < checked_Status.length; i++) {
    if (checked_Status[i].checked) {
      status = checked_Status[i].value;
    }
  }

  console.log(status);

  const salesman_id = document.getElementById("editIntegrationSalesman").value;

  console.log(salesman_id);

  const integrator_id = document.getElementById(
    "editIntegrationIntegrator"
  ).value;

  console.log(integrator_id);

  const checked_Products = document.querySelectorAll(".editProducts");

  let product = [];

  for (let i = 0; i < checked_Products.length; i++) {
    if (checked_Products[i].checked) {
      product.push(checked_Products[i].value);
    }
  }

  console.log(product);

  axios

    .patch(
      `http://localhost:4000/integrationList/editIntegration/${integration_id}`,

      JSON.stringify({
        name,

        company_id,

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
      console.log(response);

      res_Err_Messages_Edit_Integration(
        response.data.message,

        integration_id
      );
    })

    .catch((err) => {
      console.log(err);
    });
}

function res_Err_Messages_Edit_Integration(message, integration_id) {
  switch (message) {
    case "Content cannot be empty! fill out: name, status, contact email, and product":
      edit_Error_Message.style.display = "block";

      edit_Error_Message.textContent = message;

      break;

    default:
      location.assign("/integrationList");
  }
}
