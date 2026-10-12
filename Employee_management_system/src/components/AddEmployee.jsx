
import React, { useEffect, useState } from "react";
import * as formik from "formik";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import {
  addEmployee,
  getEmpById,
  UpdateEmployee,
} from "../API/EmployeeAxios";

import EmployeeSchema from "../validation/EmployeeValidation";

function EmployeeForm() {
  const { Formik } = formik;
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    id: "",
    email: "",
    department: "",
    salary: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchEmployeeDetail = async () => {
      try {
        setLoading(true);

        const emp = await getEmpById(id);

        setInitialValues({
          name: emp.name ?? "",
          id: emp.id ?? "",
          email: emp.email ?? "",
          department: emp.department ?? "",
          salary: emp.salary ?? "",
          phoneNumber: emp.phoneNumber ?? "",
        });
      } catch (error) {
        console.error("Fetch Employee Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetail();
  }, [id]);

  const handleFormSubmit = async (values) => {
    try {
      console.log("Form Data:", values);

      if (id) {
        await UpdateEmployee(id, values);
        alert("Employee updated successfully!");
      } else {
        await addEmployee(values);
        alert("Employee added successfully!");
      }

      navigate("/");
    } catch (error) {
      console.error("Submit Error:", error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">
        {id ? "Update Employee" : "Add Employee"}
      </h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={EmployeeSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                  type="number"
                  name="id"
                  placeholder="Enter Employee ID"
                  value={values.id}
                  onChange={handleChange}
                  isInvalid={touched.id && !!errors.id}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.id}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Department</Form.Label>
                <Form.Select
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  isInvalid={
                    touched.department && !!errors.department
                  }
                >
                  <option value="">Select Department</option>
                  <option value="fullstack">Full Stack</option>
                  <option value="graphic design">Graphic Design</option>
                  <option value="ui/ux design">UI/UX Design</option>
                  <option value="video editing">Video Editing</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.department}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="number"
                  name="salary"
                  placeholder="Enter Salary"
                  value={values.salary}
                  onChange={handleChange}
                  isInvalid={touched.salary && !!errors.salary}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.salary}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  isInvalid={
                    touched.phoneNumber && !!errors.phoneNumber
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : id
                  ? "Update Employee"
                  : "Add Employee"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default EmployeeForm;
