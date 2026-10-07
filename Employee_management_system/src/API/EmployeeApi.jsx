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
export async function addEmployee(EmpData) {
  try {
    const res = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(EmpData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Backend error:", data);
      throw new Error(data.message || "Failed to add Employee data");
    }

    console.log("Employee added:", data);

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}