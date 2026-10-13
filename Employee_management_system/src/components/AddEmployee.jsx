import { useEffect, useState } from "react";
import * as formik from "formik";
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";

import {
  addEmployee,
  getEmpById,
  UpdateEmployee,
} from "../API/EmployeeAxios";

import EmployeeSchema from "../validation/EmployeeValidation";
import Loading from "../Ui/Loading";
import { useToast } from "../Ui/ToastContext";
import { DEPARTMENT_OPTIONS, formatDepartmentName } from "../Ui/departmentUtils";

const EMPTY_VALUES = {
  name: "",
  id: "",
  email: "",
  department: "",
  salary: "",
  phoneNumber: "",
};

function EmployeeForm() {
  const { Formik } = formik;
  const navigate = useNavigate();
  const { id } = useParams(); // MongoDB _id when editing
  const { showToast } = useToast();

  const isEditMode = Boolean(id);

  const [fetchedId, setFetchedId] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [empDetails, setEmpDetails] = useState(EMPTY_VALUES);

  const loading = isEditMode && fetchedId !== id && !fetchError;

  useEffect(() => {
    if (!id || fetchedId === id) return;

    let isMounted = true;

    getEmpById(id)
      .then((emp) => {
        if (!isMounted) return;
        if (!emp) {
          throw new Error("Employee record could not be found.");
        }
        setEmpDetails({
          name: emp.name ?? "",
          id: emp.id ?? "",
          email: emp.email ?? "",
          department: emp.department ?? "",
          salary: emp.salary ?? "",
          phoneNumber: emp.phoneNumber ?? "",
        });
        setFetchError(null);
        setFetchedId(id);
      })
      .catch((error) => {
        if (!isMounted) return;
        console.error("Fetch Employee Error:", error);
        setFetchError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load employee details for editing."
        );
        setFetchedId(id);
      });

    return () => {
      isMounted = false;
    };
  }, [id, fetchedId]);

  const handleRetryFetch = () => {
    setFetchError(null);
    setFetchedId(null);
  };

  const initialValues = isEditMode ? empDetails : EMPTY_VALUES;

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitError(null);

      const payload = {
        name: String(values.name).trim(),
        id: Number(values.id),
        email: String(values.email).trim(),
        department: values.department,
        salary: Number(values.salary),
        phoneNumber: String(values.phoneNumber).trim(),
      };

      console.log("Submitting Employee Payload:", payload);

      if (isEditMode) {
        await UpdateEmployee(id, payload);
        showToast(
          `${payload.name}'s profile has been updated successfully.`,
          "success",
          "Employee Updated"
        );
      } else {
        await addEmployee(payload);
        showToast(
          `${payload.name} has been added to the employee directory.`,
          "success",
          "Employee Added"
        );
      }

      navigate("/employees");
    } catch (error) {
      console.error("Submit Error:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while saving the employee record.";

      setSubmitError(message);
      showToast(message, "danger", isEditMode ? "Update Failed" : "Registration Failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (isEditMode && loading) {
    return (
      <Loading
        message="Loading Employee Profile..."
        subtext="Fetching existing employee details for editing"
      />
    );
  }

  if (isEditMode && fetchError) {
    return (
      <div className="enterprise-card p-5 my-4 text-center">
        <div
          className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            fontSize: "1.6rem",
          }}
        >
          <i className="bi bi-exclamation-triangle-fill" />
        </div>
        <h4 className="fw-bold text-dark mb-2">Unable to Load Employee Record</h4>
        <p className="text-muted mb-4" style={{ maxWidth: "460px", margin: "0 auto" }}>
          {fetchError}
        </p>
        <div className="d-flex justify-content-center gap-2">
          <button
            type="button"
            className="btn btn-primary-enterprise"
            onClick={handleRetryFetch}
          >
            <i className="bi bi-arrow-clockwise" />
            Retry
          </button>
          <Link
            to="/employees"
            className="btn btn-light border fw-medium"
            style={{ borderRadius: "8px" }}
          >
            Back to Employees
          </Link>
        </div>
      </div>
    );
  }

  // Ensure any custom department already on the employee record is selectable
  const hasCustomDept =
    initialValues.department &&
    !DEPARTMENT_OPTIONS.some(
      (opt) =>
        opt.value.toLowerCase() ===
        String(initialValues.department).trim().toLowerCase()
    );

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            {isEditMode ? "Update Employee" : "Add New Employee"}
          </h2>
          <p className="page-subtitle">
            {isEditMode
              ? "Modify the employee's profile, department assignment, or compensation details."
              : "Register a new employee in the organization's HR management directory."}
          </p>
        </div>

        <div>
          <Link
            to="/employees"
            className="btn btn-light border d-inline-flex align-items-center gap-2 fw-medium text-decoration-none"
            style={{ fontSize: "0.85rem", borderRadius: "8px", padding: "0.5rem 0.95rem" }}
          >
            <i className="bi bi-arrow-left" />
            <span>Back to Employees</span>
          </Link>
        </div>
      </div>

      <Row className="justify-content-center">
        <Col xs={12} xl={10}>
          <div className="enterprise-card p-4 p-md-5">
            {/* Card Subheader */}
            <div className="d-flex align-items-center gap-3 pb-3 mb-4 border-bottom">
              <div
                className="stat-icon-box stat-icon-blue"
                style={{ width: "44px", height: "44px" }}
              >
                <i
                  className={`bi ${
                    isEditMode ? "bi-person-gear" : "bi-person-plus-fill"
                  }`}
                />
              </div>
              <div>
                <h5 className="fw-bold text-dark mb-0" style={{ fontSize: "1.05rem" }}>
                  {isEditMode ? "Employee Record Information" : "Employee Registration Form"}
                </h5>
                <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
                  All fields marked with <span className="text-danger">*</span> are required.
                </p>
              </div>
            </div>

            {submitError && (
              <Alert
                variant="danger"
                dismissible
                onClose={() => setSubmitError(null)}
                className="d-flex align-items-center gap-2 rounded-3 mb-4"
              >
                <i className="bi bi-exclamation-triangle-fill fs-5" />
                <div style={{ fontSize: "0.875rem" }}>{submitError}</div>
              </Alert>
            )}

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={EmployeeSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                errors,
                isSubmitting,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="g-4 mb-4">
                    {/* Employee Name */}
                    <Form.Group as={Col} xs={12} md={6} controlId="empName">
                      <Form.Label className="form-label-enterprise">
                        Employee Name <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text className="bg-light text-muted border-end-0">
                          <i className="bi bi-person" />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="name"
                          className="form-control-enterprise"
                          placeholder="e.g. Ankit Shiyal"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    {/* Employee ID */}
                    <Form.Group as={Col} xs={12} md={6} controlId="empId">
                      <Form.Label className="form-label-enterprise">
                        Employee ID <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text className="bg-light text-muted border-end-0">
                          <i className="bi bi-hash" />
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="id"
                          className="form-control-enterprise"
                          placeholder="e.g. 101"
                          value={values.id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.id && !!errors.id}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.id}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group as={Col} xs={12} md={6} controlId="empEmail">
                      <Form.Label className="form-label-enterprise">
                        Email Address <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text className="bg-light text-muted border-end-0">
                          <i className="bi bi-envelope" />
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          name="email"
                          className="form-control-enterprise"
                          placeholder="e.g. employee@company.com"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    {/* Phone Number */}
                    <Form.Group as={Col} xs={12} md={6} controlId="empPhone">
                      <Form.Label className="form-label-enterprise">
                        Phone Number <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text className="bg-light text-muted border-end-0">
                          <i className="bi bi-telephone" />
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          name="phoneNumber"
                          maxLength={10}
                          className="form-control-enterprise"
                          placeholder="10-digit mobile number (e.g. 9876543210)"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phoneNumber}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    {/* Department */}
                    <Form.Group as={Col} xs={12} md={6} controlId="empDepartment">
                      <Form.Label className="form-label-enterprise">
                        Department <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text className="bg-light text-muted border-end-0">
                          <i className="bi bi-building" />
                        </InputGroup.Text>
                        <Form.Select
                          name="department"
                          className="form-select-enterprise"
                          value={values.department}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.department && !!errors.department}
                        >
                          <option value="">Select Department</option>
                          {DEPARTMENT_OPTIONS.map((dept) => (
                            <option key={dept.value} value={dept.value}>
                              {dept.label}
                            </option>
                          ))}
                          {hasCustomDept && (
                            <option value={initialValues.department}>
                              {formatDepartmentName(initialValues.department)}
                            </option>
                          )}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.department}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    {/* Monthly Salary */}
                    <Form.Group as={Col} xs={12} md={6} controlId="empSalary">
                      <Form.Label className="form-label-enterprise">
                        Monthly Salary (INR) <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text className="bg-light text-muted border-end-0 fw-semibold">
                          ₹
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="salary"
                          className="form-control-enterprise"
                          placeholder="e.g. 30000"
                          value={values.salary}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.salary && !!errors.salary}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.salary}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>

                  {/* Form Actions Footer */}
                  <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 pt-3 border-top">
                    <Button
                      variant="light"
                      type="button"
                      className="border fw-medium px-4"
                      style={{ borderRadius: "8px", padding: "0.55rem 1.1rem" }}
                      onClick={() => navigate("/employees")}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      className="btn-primary-enterprise px-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          />
                          <span>
                            {isEditMode ? "Updating Employee..." : "Adding Employee..."}
                          </span>
                        </>
                      ) : (
                        <>
                          <i
                            className={`bi ${
                              isEditMode ? "bi-check2-circle" : "bi-plus-circle"
                            }`}
                          />
                          <span>
                            {isEditMode ? "Update Employee" : "Add Employee"}
                          </span>
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default EmployeeForm;
