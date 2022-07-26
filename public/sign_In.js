document
  .getElementById("showPasswordSignin")
  .addEventListener("click", toggle_Password);

function toggle_Password() {
  const password = document.getElementById("passwordSignin");

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

const error_Message = document.getElementById("errorMessage");

error_Message.style.display = "none";

error_Message.textContent = "";

document.getElementById("signInForm").addEventListener("click", sign_In_Form);

function sign_In_Form(e) {
  e.preventDefault();

  const username = document.getElementById("usernameSignin").value;

  console.log(username);

  const password = document.getElementById("passwordSignin").value;

  console.log(password);

  axios

    .post(
      "http://localhost:4000/signin",

      JSON.stringify({ username, password }),

      {
        headers: { "content-type": "application/json" },
      }
    )

    .then((response) => {
      console.log(response.data);

      res_Err_Messages_Sign_In(response.data.message);
    })

    .catch((err) => {
      console.log(err);
    });
}

function res_Err_Messages_Sign_In(message) {
  switch (message) {
    case "The username must not be empty!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "Invalid username!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The username can only contain: [A-Za-z0-9 .]":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The username must be minimum 3+ characters long and maximum 15 characters long.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The password must not be empty!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "Incorrect password!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case `The password can only contain: [A-Za-z0-9 .,:;<>?!'"&$%#]`:
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The password must be minimum 6+ characters long and maximum 20 characters long.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    default:
      location.assign("/");
  }
}
