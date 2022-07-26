const error_Message_Note = document.querySelectorAll(".errorMessageNote");

for (let i = 0; i < error_Message_Note.length; i++) {
  error_Message_Note[i].style.display = "none";

  error_Message_Note[i].textContent = "";
}

let save_Note_Buttons = document.querySelectorAll(".setNote");

for (let i = 0; i < save_Note_Buttons.length; i++) {
  save_Note_Buttons[i].addEventListener("click", set_Note);
}

function set_Note(e) {
  e.preventDefault();

  const elem = this;

  console.log(elem);

  const today = new Date();

  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const date_time = date + " " + time;

  console.log(date_time);

  const public = elem.parentElement.querySelector(".publicPrivateNote").value;

  console.log(public);

  const note = elem.parentElement.querySelector(".writeNote").value;

  console.log(note);

  const client_id = parseInt(this.dataset.id);

  console.log(client_id);

  axios

    .post(
      "/integrationList/setNote",

      JSON.stringify({
        client_id,

        date_time,

        note,

        public,
      }),

      {
        headers: { "content-type": "application/json" },
      }
    )

    .then((response) => {
      console.log(response);

      res_Err_Messages_Set_Note(response.data.message, elem);
    })

    .catch((err) => {
      console.log(err);
    });
}

function res_Err_Messages_Set_Note(message, elem) {
  switch (message) {
    case "Something went wrong while creating note.":
      elem.parentElement.parentElement.querySelector(
        ".errorMessageNote"
      ).style.display = "block";

      elem.parentElement.parentElement.querySelector(
        ".errorMessageNote"
      ).textContent = message;

      break;

    default:
      window.location.reload();
  }
}

let delete_Note_Buttons = document.querySelectorAll(".deleteNote");

for (let i = 0; i < delete_Note_Buttons.length; i++) {
  delete_Note_Buttons[i].addEventListener("click", delete_Note);
}

function delete_Note(e) {
  e.preventDefault();

  const note_id = parseInt(this.dataset.id);

  console.log(note_id);

  const elem = this;

  console.log(elem);

  axios

    .delete(`http://localhost:4000/integrationList/deleteNote/${note_id}`)

    .then((response) => {
      console.log(response);

      res_Err_Messages_Delete_Note(response.data.message, note_id, elem);
    })

    .catch((err) => {
      console.log(err);
    });
}

function res_Err_Messages_Delete_Note(message, note_id, elem) {
  switch (message) {
    case `Something went wrong while deleting note with id: ${note_id}`:
      elem.parentElement.parentElement.querySelector(
        ".errorMessageNote"
      ).style.display = "block";

      elem.parentElement.parentElement.querySelector(
        ".errorMessageNote"
      ).textContent = message;

      break;

    default:
      window.location.reload();
  }
}
