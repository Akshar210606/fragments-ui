import { login, logout, getUser } from './auth.js';
import { showUser, showLoggedOut, updateList } from './ui.js';
import { listFragments, createFragment } from './fragments.js';

document.getElementById('login').onclick = login;
document.getElementById('logout').onclick = logout;

document.getElementById('create').onclick = async () => {
  const type = document.getElementById('type').value;
  const content = document.getElementById('content').value;
  await createFragment(type, content);
  alert('Fragment Created!');
};

document.getElementById('refresh').onclick = async () => {
  const data = await listFragments();
  updateList(data.fragments);
};

(async () => {
  const user = await getUser();
  if (user) showUser(user.username);
  else showLoggedOut();
})();
