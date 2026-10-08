import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getAllEmployee() {

    try {
        
        const res = await axios(`${BASE_URL}/allEmployee`)

        return res.data.Employees

    } catch (error) {
        throw new Error(error.message);
    }

}


export async function addEmployee(EmpData) {
  try {
    const res = await axios.post(`${BASE_URL}/add`, EmpData);

    if (res.status !== 201) {
      throw new Error("Failed to add Employee data");
    }

    console.log("Add Employee Response:", res.data);

    return res.data.Employees;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteEmployee(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);

    if (res.status !== 200) {
      throw new Error("Failed to delete Employee data");
    }

    console.log("Delete Response:", res.data);

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}