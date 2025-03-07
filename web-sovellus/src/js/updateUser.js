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

// Selects form of html
const updateform = document.querySelector(".updateform");

// updates user info
const updateUser = async (event) => {
  event.preventDefault();
  try {
    // variable assignment
    const token = localStorage.getItem("token");
    const userId = document.querySelector("#userId").value;
    const url = `http://localhost:3000/api/users/${userId}`;
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    const email = document.querySelector("#email").value.trim();
    // Options for message
    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    };
    const response = await fetchData(url, options);
    showDia(response.message);
    console.log(response);
  } catch (error) {
    showDia(error);
    console.log("Error", error);
  }
};

updateform.addEventListener("submit", updateUser);

