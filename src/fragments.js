// src/fragments.js
import { apiRequest } from "./api.js";

export async function updateList() {
  try {
    const res = await apiRequest("/v1/fragments?expand=1");
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    if (!data.fragments || data.fragments.length === 0) {
      list.innerHTML = "<li>No fragments found</li>";
      return;
    }

    data.fragments.forEach((frag) => {
      const li = document.createElement("li");
      li.textContent = `${frag.id} (${frag.type}, ${frag.size} bytes)`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading fragments:", err);
  }
}

export async function createFragment(type, content) {
  try {
    const res = await apiRequest("/v1/fragments", {
      method: "POST",
      headers: { "Content-Type": type },
      body: content,
    });

    if (res.ok) {
      alert("✅ Fragment created successfully!");
      await updateList();
    } else {
      const errorText = await res.text();
      alert(`❌ Error creating fragment: ${errorText}`);
    }
  } catch (err) {
    console.error("Error creating fragment:", err);
  }
}
