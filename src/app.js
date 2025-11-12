import { login, logout, getUser } from "./auth.js";
import { updateList, createFragment } from "./fragments.js";

document.getElementById("login").onclick = login;
document.getElementById("logout").onclick = logout;
document.getElementById("refresh").onclick = updateList;
document.getElementById("create").onclick = async () => {
  const type = document.getElementById("type").value;
  const content = document.getElementById("content").value;
  await createFragment(type, content);
};

const user = getUser();
const userDisplay = document.getElementById("user");

if (user) {
  userDisplay.textContent = `Logged in as ${user.email}`;
  document.getElementById("login").style.display = "none";
  document.getElementById("logout").style.display = "inline";
  updateList();
} else {
  userDisplay.textContent = "Not logged in";
  document.getElementById("login").style.display = "inline";
  document.getElementById("logout").style.display = "none";
}
