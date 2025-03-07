import { fetchData } from "./fetch.js";

const dialog = document.querySelector(".info_dialog");
const closeButton = document.querySelector(".info_dialog button");

const showDia = (message) => {
  dialog.querySelector("p").innerHTML = `
          <div><span>${message}</span></div>`;
  dialog.showModal();
};

closeButton.addEventListener("click", () => {
  dialog.close();
});

// Login user
const loginUser = async (event) => {
  // stops the form from reloading page
  event.preventDefault();
  // Remove token from local storage if it exists
  if (localStorage.getItem("token") !== null) {
    localStorage.removeItem("token");
  }
  // Get the form element
  const loginForm = document.querySelector(".loginForm");
  // Get the values from the form
  const username = loginForm.querySelector(".username").value.trim();
  const password = loginForm.querySelector(".password").value.trim();

  // Make body data that will be sent to server
  const bodyData = {
    username: username,
    password: password,
  };
  //Define the url for later use
  const url = "http://localhost:3000/api/auth/login";

  // Define the options for the fetch request
  const options = {
    body: JSON.stringify(bodyData),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };
  const response = await fetchData(url, options);

  // If there is an error, display it using a dialog box
  if (response.error) {
    showDia(response.error);
    return;
  }
  if (response.message) {
    showDia("Login successful");
  }

  localStorage.setItem("token", response.token);
  loginForm.reset();
};

const loginForm = document.querySelector(".loginForm");
loginForm.addEventListener("submit", loginUser);
