import { fetchData } from "./fetch.js";


// Add user
const addUser = async (event) => {
  // stops the form from reloading page
  event.preventDefault();
  try {
    const url = "http://localhost:3000/api/users";
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    const email = document.querySelector("#email").value.trim();
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    };
    const response = await fetchData(url, options);
    console.log(response);
  } catch (error) {
    console.log("Error", error);
  }
};

const addForm = document.querySelector(".addform");
addForm.addEventListener("submit", addUser);
