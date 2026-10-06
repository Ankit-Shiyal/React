import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAllEmployee } from "../API/EmployeeApi";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllEmployee();

      console.log("Employee Data:", data);

      setEmployee(data);
    } catch (error) {
      console.log("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="container mt-5 text-center">
        <h3 className="text-danger">Something went wrong</h3>
        <p>{error}</p>

        <button
          className="btn btn-primary"
          onClick={loadData}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee List</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Emp ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Mobile</th>
          </tr>
        </thead>

        <tbody>
          {employee.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.department}</td>
              <td>₹{item.salary}</td>
              <td>{item.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Employee;