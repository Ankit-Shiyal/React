import React, { useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        id: "",
        email: "",
        phoneNumber: "",
        department: "",
        salary: "",
    });

    const handleChange = (field, e) => {
        setEmployee((prev) => {
            return {
                ...prev,
                [field]: e.target.value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Employee Data:", employee);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Add Employee</h2>

            <Form onSubmit={handleSubmit}>

                <FloatingLabel
                    controlId="floatingName"
                    label="Employee Name"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="Employee Name"
                        value={employee.name}
                        onChange={(e) => handleChange("name", e)}
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingId"
                    label="Employee ID"
                    className="mb-3"
                >
                    <Form.Control
                        type="number"
                        placeholder="Employee ID"
                        value={employee.id}
                        onChange={(e) => handleChange("id", e)}
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingEmail"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        value={employee.email}
                        onChange={(e) => handleChange("email", e)}
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingPhone"
                    label="Phone Number"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        value={employee.phoneNumber}
                        onChange={(e) => handleChange("phoneNumber", e)}
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingDepartment"
                    label="Department"
                    className="mb-3"
                >
                    <Form.Select
                        value={employee.department}
                        onChange={(e) => handleChange("department", e)}
                    >
                        <option value="">Select Department</option>
                        <option value="fullstack">Fullstack</option>
                        <option value="graphic design">Graphic Design</option>
                        <option value="ui/ux design">UI/UX Design</option>
                        <option value="video editing">Video Editing</option>
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingSalary"
                    label="Salary"
                    className="mb-3"
                >
                    <Form.Control
                        type="number"
                        placeholder="Salary"
                        value={employee.salary}
                        onChange={(e) => handleChange("salary", e)}
                    />
                </FloatingLabel>

                <Button variant="primary" type="submit">
                    Add Employee
                </Button>

            </Form>
        </div>
    );
};

export default AddEmployee;