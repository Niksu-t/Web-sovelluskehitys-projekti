import { getEntries, getEntriesById, addEntry, updateEntry} from "./entries.js";
import { getUsers } from "./users.js";
// adds event listeners to the buttons

const button1 = document.getElementsByClassName("get_users");
button1[0].addEventListener("click", getUsers);

const button2 = document.getElementsByClassName("get_entries");
button2[0].addEventListener("click", getEntries);
button2[1].addEventListener("click", getEntriesById);

const entryForm = document.querySelector(".entryform");
entryForm.addEventListener("submit", addEntry);

const updateForm = document.querySelector(".updateform");
updateForm.addEventListener("submit", updateEntry)