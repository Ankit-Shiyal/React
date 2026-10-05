const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getAllEmployee() {
  try {
    const res = await fetch(`${BASE_URL}/allEmployee`);

    if (!res.ok) {
      throw new Error("Failed to fetch Employee data");
    }

    const data = await res.json();

    console.log("Employee data:", data);

    return data.Employees;
  } catch (error) {
    throw new Error(error.message);
  }
}