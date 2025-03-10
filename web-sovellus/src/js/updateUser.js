import { fetchData } from "./fetch.js";

const dialog = document.querySelector(".info_dialog");
const closeButton = document.querySelector(".info_dialog button");
const checkID = document.getElementsByClassName("authenticatedReq");

// For simple diagolog messages
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

// Gets users info
const authenticatedReq = async () => {
  const url = "http://localhost:3000/api/auth/me";
  const token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
  const user = await fetchData(url, options);
  if (!user.error) {
    dialog.querySelector("p").innerHTML = `
      <div>User ID: <span>${user.user_id}</span></div>
      <div>User Name: <span>${user.username}</span></div>
      <div>Email: <span>${user.email}</span></div>
      <div>Role: <span>${user.user_level}</span></div>`;
    dialog.showModal();
  } else {
    showDia("Something went wrong");
  }
}catch (error) {
  console.log("Error ", error)
}
};

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
    if (response.error) {
      showDia(response.error)
    } else {
      showDia(response.message);
    }
    console.log(response);
  } catch (error) {
    showDia(error);
    console.log("Error", error);
  }
};

updateform.addEventListener("submit", updateUser);
checkID[0].addEventListener("click", authenticatedReq);
