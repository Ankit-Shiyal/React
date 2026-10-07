
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import { Container } from "react-bootstrap";

import EmployeeSchema from "../validation/EmployeeValidation";
import { addEmployee } from "../API/EmployeeApi";

const AddEmployee = () => {
    const { Formik } = formik;

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Add Employee</h2>

            <Formik
                validationSchema={EmployeeSchema}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        console.log("Sending data:", values);

                        const data = await addEmployee(values);

                        console.log("Employee added:", data);

                        resetForm();
                    } catch (error) {
                        console.error("Error:", error);
                    }
                }}
                initialValues={{
                    name: "",
                    id: "",
                    email: "",
                    department: "",
                    salary: "",
                    phoneNumber: "",
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                }) => (

                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={touched.name && !!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4">
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Employee ID"
                                    name="id"
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
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={touched.email && !!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Department</Form.Label>
                                <Form.Select
                                    name="department"
                                    value={values.department}
                                    onChange={handleChange}
                                    isInvalid={touched.department && !!errors.department}
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
                                    placeholder="Enter Salary"
                                    name="salary"
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
                                    placeholder="Enter Phone Number"
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Button type="submit">Add Employee</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default AddEmployee;