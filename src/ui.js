export function showUser(name) {
  document.getElementById('user').textContent = `Hello ${name}!`;
  document.getElementById('login').style.display = 'none';
  document.getElementById('logout').style.display = 'block';
}

export function showLoggedOut() {
  document.getElementById('user').textContent = '';
  document.getElementById('login').style.display = 'block';
  document.getElementById('logout').style.display = 'none';
}

export function updateList(fragments) {
  const list = document.getElementById('list');
  list.innerHTML = '';
  fragments.forEach(f => {
    const li = document.createElement('li');
    li.textContent = `${f.id} (${f.type})`;
    list.appendChild(li);
  });
}
