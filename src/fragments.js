import { getUserToken } from './auth.js';
const API_URL = import.meta.env.API_URL;

export async function listFragments() {
  const res = await fetch(`${API_URL}/v1/fragments?expand=1`, {
    headers: { Authorization: `Bearer ${await getUserToken()}` }
  });
  return res.json();
}

export async function createFragment(type, content) {
  const res = await fetch(`${API_URL}/v1/fragments`, {
    method: 'POST',
    headers: { 
      Authorization: `Bearer ${await getUserToken()}`,
      'Content-Type': type
    },
    body: content
  });
  return res.json();
}
