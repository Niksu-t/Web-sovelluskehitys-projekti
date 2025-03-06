import { fetchData } from "./fetch.js";
const container = document.getElementsByClassName("card-area");

// Get all entries from the database
const getEntries = async () => {
  try {
    const token = localStorage.getItem("token");
    const url = "http://localhost:3000/api/entries";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // get data from the server
    const entries = await fetchData(url, options);

    // remove all child nodes from the container
    while (container[0].hasChildNodes()) {
      container[0].removeChild(container[0].firstChild);
    }
    // create a card for each entry
    entries.forEach((entry) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
          <div class="card-img">
            <img src="/src/imgs/jeff.png" alt="" />
          </div>
          <div class="card-diary">
          <div>Entry Id: <span>${entry.entry_id}</span></div>
          <div>User Id: <span>${entry.user_id}</span></div>
          <div>Mood: <span>${entry.mood}</span></div>
          <div>Weight: <span>${entry.weight}</span></div>
          <div>Sleep hours: <span>${entry.sleep_hours}</span></div>
          <div>Notes: <span>${entry.notes}</span></div>
          </div>`;
      // append the card to the container
      container[0].appendChild(card);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Get all entries from the database by user id
const getEntriesById = async () => {
  try {
    const target = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const url = `http://localhost:3000/api/entries/${target}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // Fetces data from the server
    const entries = await fetchData(url, options);
    // Removes all child nodes from the container
    while (container[0].hasChildNodes()) {
      container[0].removeChild(container[0].firstChild);
    }
    // creates a card for each entry
    entries.forEach((entry) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
            <div class="card-img">
              <img src="/src/imgs/jeff.png" alt="" />
            </div>
            <div class="card-diary">
            <div>Entry Id: <span>${entry.entry_id}</span></div>
            <div>User Id: <span>${entry.user_id}</span></div>
            <div>Mood: <span>${entry.mood}</span></div>
            <div>Weight: <span>${entry.weight}</span></div>
            <div>Sleep hours: <span>${entry.sleep_hours}</span></div>
            <div>Notes: <span>${entry.notes}</span></div>
            </div>`;
      // Append the card to the container
      container[0].appendChild(card);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Add entry to database for logged in user
const addEntry = async (event) => {
  event.preventDefault();
  try {
    // Get variables from form
    const date = document.querySelector("#Date").value.trim();
    const mood = document.querySelector("#mood").value;
    const weight = document.querySelector("#weigth").value.trim();
    const sleep_hours = document.querySelector("#sleephours").value.trim();
    const notes = document.querySelector("#notes").value;
    //console.log(date, mood, weight, sleep_hours, notes);
    // Send variables to server
    const token = localStorage.getItem("token");
    const url = "http://localhost:3000/api/entries";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        entry_date: date,
        mood: mood,
        weight: weight,
        sleep_hours: sleep_hours,
        notes: notes,
      }),
    };
    // wait for response
    const response = await fetchData(url, options);
    console.log(response);
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Update selected entry
const updateEntry = async (event) => {
  event.preventDefault();
  try {
    const entryId = document.querySelector("#entryId").value;
    const date = document.querySelector("#Updatedate").value.trim();
    const mood = document.querySelector("#Updatemood").value.trim();
    const weight = document.querySelector("#Updateweigth").value.trim();
    const sleep_hours = document.querySelector("#Updatesleephours").value.trim();
    const notes = document.querySelector("#Updatenotes").value.trim();

    // Sends data forward
    const token = localStorage.getItem("token");
    const url = `http://localhost:3000/api/entries/${entryId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        entry_date: date,
        mood: mood,
        weight: weight,
        sleep_hours: sleep_hours,
        notes: notes,
      }),
    };
    // wait for response
    const response = await fetchData(url, options);
    console.log(response);
  } catch (error) {
    console.log("Error", error);
  }
};

export { getEntries, getEntriesById, addEntry, updateEntry };
