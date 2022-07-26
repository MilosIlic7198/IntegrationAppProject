document
  .getElementById("showPasswordSignup")
  .addEventListener("click", toggle_Password);

function toggle_Password() {
  const password = document.getElementById("passwordSignup");

  const repeat_Password = document.getElementById("passwordRepeatSignup");

  if (password.type && repeat_Password.type === "password") {
    password.type = "text";

    repeat_Password.type = "text";
  } else {
    password.type = "password";

    repeat_Password.type = "password";
  }
}

const error_Message = document.getElementById("errorMessage");

error_Message.style.display = "none";

error_Message.textContent = "";

document.getElementById("signUpForm").addEventListener("click", sign_Up_Form);

function sign_Up_Form(e) {
  e.preventDefault();

  const name = document.getElementById("nameSignup").value;

  console.log(name);

  const position = document.getElementById("positionSignup").value;

  console.log(position);

  const username = document.getElementById("usernameSignup").value;

  console.log(username);

  const password = document.getElementById("passwordSignup").value;

  console.log(password);

  const repeat_Password = document.getElementById("passwordRepeatSignup").value;

  console.log(repeat_Password);

  axios

    .post(
      "http://localhost:4000/signup",

      JSON.stringify({ name, position, username, password, repeat_Password }),

      {
        headers: { "content-type": "application/json" },
      }
    )

    .then((response) => {
      console.log(response.data);

      res_Err_Messages_Sign_Up(response.data.message);
    })

    .catch((err) => {
      console.log(err);
    });
}

function res_Err_Messages_Sign_Up(message) {
  switch (message) {
    case "The name must not be empty!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The name can only contain: [a-zA-Z]":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The name must be minimum 3+ characters long and maximum 20 characters long.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The position must not be empty!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The position can only contain: [a-zA-Z]":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The position must be minimum 6+ characters long and maximum 30 characters long.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The username must not be empty!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The username is already in use!":
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

    case `The password can only contain: [A-Za-z0-9 .,:;<>?!'"&$%#]`:
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The password must be minimum 6+ characters long and maximum 20 characters long.":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "The repeat password must not be empty!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    case "Both repeat password and password must match!":
      error_Message.style.display = "block";

      error_Message.textContent = message;

      break;

    default:
      location.assign("/signin");
  }
}
