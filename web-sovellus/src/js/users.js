import { fetchData } from "./fetch.js";


const dialog = document.querySelector(".info_dialog");
const closeButton = document.querySelector(".info_dialog button");
const tables = document.getElementsByClassName("styled-table");
const tableBody = tables[0].getElementsByTagName("tbody")[0];

closeButton.addEventListener("click", () => {
  dialog.close();
});

// Adds event listeners to the buttons in the table
const addEventListeners = () => {
  document.querySelectorAll(".check").forEach((button) => {
    // Adds event listener to the button that shows user info
    button.addEventListener("click", async (event) => {
      const userId = event.target.dataset.id;

      const user = await getUserDataById(userId);

      if (user) {
        dialog.querySelector("p").innerHTML = `
          <div>User ID: <span>${user.user_id}</span></div>
          <div>User Name: <span>${user.username}</span></div>
          <div>Email: <span>${user.email}</span></div>
          <div>Role: <span>${user.user_level}</span></div>`;
        dialog.showModal();
      }
    });
  });
  // Adds event listener to the button that selects user
  document.querySelectorAll(".select").forEach((button) => {
    button.addEventListener("click", (event) => {
      const userId = event.target.dataset.id;
      setUserId(userId);
    });
  });
  // Adds event listener to the button that deletes user
  document.querySelectorAll(".del").forEach((button) => {
    button.addEventListener("click", (event) => {
      const userId = event.target.dataset.id;
      deleteUser(userId);
    });
  });
};

// Gets users from the server
const getUsers = async () => {
  try {
    // Define the url, token and options for later use
    const url = "http://localhost:3000/api/users";
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };

    // Fetch the data from the server using the url and options
    const users = await fetchData(url, options);
    // Clear the table
    while (tableBody.hasChildNodes()) {
      tableBody.removeChild(tableBody.firstChild);
    }
    // Adds users to the table after clearing
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${user.username}</td>
              <td>${user.email}</td>
              <td><button class="check" data-id="${user.user_id}">Info</button></td>
              <td><button class="select" data-id="${user.user_id}">Select</button></td>
              <td><button class="del" data-id="${user.user_id}">Delete</button></td>
              <td>${user.user_id}</td>
            `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.log("Error", error);
  }
  addEventListeners();
};

// Deletes user by id
const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const url = `http://localhost:3000/api/users/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetchData(url, options);
    console.log(response);
  } catch (error) {
    console.log("Error", error);
  }
};

// Gets user data by id
const getUserDataById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    consolel.log("Error", error);
  }
};
// Sets user id to local storage for selecting user
const setUserId = (id) => {
  localStorage.setItem("userId", id);
};

export { getUsers };
