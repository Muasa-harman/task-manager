const API_BASE = "http://localhost:5000/api";

export async function getTasks() {
  const res = await fetch(`${API_BASE}/tasks`);
  return res.json();
}

export async function createTask(task) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}
