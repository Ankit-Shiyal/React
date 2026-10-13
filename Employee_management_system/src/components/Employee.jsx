import { useEffect, useState, useMemo } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { getAllEmployee, deleteEmployee } from "../API/EmployeeApi";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../Ui/Loading";
import { useToast } from "../Ui/ToastContext";
import {
  DEPARTMENT_OPTIONS,
  formatDepartmentName,
  getDepartmentBadgeClass,
  getInitials,
  getAvatarPalette,
  formatCurrencyINR,
} from "../Ui/departmentUtils";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Delete confirmation modal state
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Inline feedback banner state
  const [feedbackBanner, setFeedbackBanner] = useState(null);

  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true;

    getAllEmployee()
      .then((data) => {
        if (!isMounted) return;
        console.log("Employee Data:", data);
        setEmployee(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error:", err);
        setError(err.message || "Failed to load employee records");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllEmployee();
      console.log("Employee Data:", data);

      setEmployee(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to load employee records");
    } finally {
      setLoading(false);
    }
  };

  // Build department options dynamically from standard options + any existing employee departments
  const departmentFilterOptions = useMemo(() => {
    const map = new Map();
    DEPARTMENT_OPTIONS.forEach((opt) => {
      map.set(opt.value.toLowerCase(), opt.label);
    });
    employee.forEach((emp) => {
      if (emp.department) {
        const key = String(emp.department).trim().toLowerCase();
        if (key && !map.has(key)) {
          map.set(key, formatDepartmentName(emp.department));
        }
      }
    });
    return Array.from(map.entries()).map(([value, label]) => ({
      value,
      label,
    }));
  }, [employee]);

  // Filter employees by name, employee ID, or email + department
  const filteredEmployees = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return employee.filter((item) => {
      const matchesDept =
        selectedDepartment === "all" ||
        String(item.department || "").trim().toLowerCase() === selectedDepartment;

      if (!matchesDept) return false;
      if (!query) return true;

      const nameMatch = String(item.name || "")
        .toLowerCase()
        .includes(query);
      const idMatch = String(item.id ?? "")
        .toLowerCase()
        .includes(query);
      const emailMatch = String(item.email || "")
        .toLowerCase()
        .includes(query);

      return nameMatch || idMatch || emailMatch;
    });
  }, [employee, searchQuery, selectedDepartment]);

  const openDeleteModal = (emp) => {
    setEmployeeToDelete(emp);
  };

  const closeDeleteModal = () => {
    if (deleting) return;
    setEmployeeToDelete(null);
  };

  const confirmDeleteEmployee = async () => {
    if (!employeeToDelete) return;

    try {
      setDeleting(true);
      await deleteEmployee(employeeToDelete._id);

      const deletedName = employeeToDelete.name;
      setEmployeeToDelete(null);

      showToast(
        `${deletedName} has been removed from the employee directory.`,
        "success",
        "Employee Deleted"
      );
      setFeedbackBanner({
        variant: "success",
        message: `Employee "${deletedName}" was deleted successfully.`,
      });

      await loadData();
    } catch (err) {
      console.error("Delete Error:", err);
      const errMsg = err.message || "Failed to delete employee";
      showToast(errMsg, "danger", "Delete Failed");
      setFeedbackBanner({
        variant: "danger",
        message: errMsg,
      });
      setEmployeeToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("all");
  };

  if (loading) {
    return (
      <Loading
        message="Loading Employees..."
        subtext="Retrieving employee directory from the server"
      />
    );
  }

  if (error) {
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
        <h4 className="fw-bold text-dark mb-2">Something went wrong</h4>
        <p className="text-muted mb-4" style={{ maxWidth: "460px", margin: "0 auto" }}>
          {error}
        </p>
        <button
          type="button"
          className="btn btn-primary-enterprise"
          onClick={loadData}
        >
          <i className="bi bi-arrow-clockwise" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Employees</h2>
          <p className="page-subtitle">
            Manage your organization&apos;s workforce, view department assignments, and update employee records.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-light border d-inline-flex align-items-center gap-2 fw-medium"
            style={{ fontSize: "0.85rem", borderRadius: "8px", padding: "0.5rem 0.9rem" }}
            onClick={loadData}
            title="Refresh employee list"
          >
            <i className="bi bi-arrow-clockwise" />
            <span className="d-none d-sm-inline">Refresh</span>
          </button>
          <Link to="/add" className="btn btn-primary-enterprise text-decoration-none">
            <i className="bi bi-person-plus-fill" />
            <span>Add Employee</span>
          </Link>
        </div>
      </div>

      {/* Dismissible Feedback Alert Banner */}
      {feedbackBanner && (
        <Alert
          variant={feedbackBanner.variant}
          dismissible
          onClose={() => setFeedbackBanner(null)}
          className="d-flex align-items-center gap-2 rounded-3 shadow-sm border-0 mb-4"
        >
          <i
            className={`bi ${
              feedbackBanner.variant === "success"
                ? "bi-check-circle-fill text-success"
                : "bi-exclamation-circle-fill text-danger"
            } fs-5`}
          />
          <div className="fw-medium" style={{ fontSize: "0.875rem" }}>
            {feedbackBanner.message}
          </div>
        </Alert>
      )}

      {/* Search & Filter Toolbar */}
      <div className="enterprise-card p-3 mb-4">
        <Row className="g-3 align-items-center">
          <Col xs={12} md={6} lg={5}>
            <div className="search-input-wrapper">
              <i className="bi bi-search search-icon" />
              <Form.Control
                type="text"
                className="form-control-enterprise"
                placeholder="Search by name, employee ID, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search employees by name, employee ID, or email"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <i className="bi bi-x-circle-fill" />
                </button>
              )}
            </div>
          </Col>

          <Col xs={12} sm={6} md={4} lg={3}>
            <Form.Select
              className="form-select-enterprise"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              aria-label="Filter by department"
            >
              <option value="all">All Departments</option>
              {departmentFilterOptions.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col
            xs={12}
            sm={6}
            md={2}
            lg={4}
            className="d-flex align-items-center justify-content-sm-end gap-2"
          >
            {(searchQuery || selectedDepartment !== "all") && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1"
                style={{ borderRadius: "7px", padding: "0.4rem 0.75rem" }}
                onClick={handleResetFilters}
              >
                <i className="bi bi-x-lg" />
                <span>Clear Filters</span>
              </button>
            )}
            <span
              className="badge bg-light text-secondary border px-3 py-2 fw-semibold"
              style={{ fontSize: "0.78rem", borderRadius: "8px" }}
            >
              Showing {filteredEmployees.length} of {employee.length}
            </span>
          </Col>
        </Row>
      </div>

      {/* Employee Records Table or Empty State */}
      {employee.length === 0 ? (
        <div className="enterprise-card empty-state-box">
          <div className="empty-state-icon">
            <i className="bi bi-person-workspace" />
          </div>
          <h5 className="fw-bold text-dark mb-2">No Employees Registered Yet</h5>
          <p
            className="text-muted mb-4"
            style={{ maxWidth: "420px", margin: "0 auto" }}
          >
            Get started by adding your first team member to the Employee Management System.
          </p>
          <Link to="/add" className="btn btn-primary-enterprise text-decoration-none">
            <i className="bi bi-person-plus-fill" />
            Add First Employee
          </Link>
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="enterprise-card empty-state-box">
          <div className="empty-state-icon">
            <i className="bi bi-funnel" />
          </div>
          <h5 className="fw-bold text-dark mb-2">No Matching Employees Found</h5>
          <p
            className="text-muted mb-4"
            style={{ maxWidth: "420px", margin: "0 auto" }}
          >
            No employee records matched your current search or department filter criteria.
          </p>
          <button
            type="button"
            className="btn btn-outline-primary fw-semibold"
            style={{ borderRadius: "8px" }}
            onClick={handleResetFilters}
          >
            <i className="bi bi-arrow-counterclockwise me-1" />
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="enterprise-card overflow-hidden">
          <div className="enterprise-table-wrapper">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th style={{ width: "68px" }}>Sr. No</th>
                  <th>Employee Name</th>
                  <th>Emp ID</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Phone Number</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((item, index) => {
                  const palette = getAvatarPalette(item.name);
                  return (
                    <tr key={item._id}>
                      <td className="text-muted fw-medium">{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="emp-avatar"
                            style={{
                              backgroundColor: palette.bg,
                              color: palette.color,
                            }}
                          >
                            {getInitials(item.name)}
                          </div>
                          <span className="fw-semibold text-dark">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="emp-id-tag">#{item.id}</span>
                      </td>
                      <td>
                        <span className="d-inline-flex align-items-center gap-1 text-secondary">
                          <i className="bi bi-envelope text-muted" style={{ fontSize: "0.8rem" }} />
                          {item.email}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`dept-badge ${getDepartmentBadgeClass(
                            item.department
                          )}`}
                        >
                          <span className="dept-dot" />
                          {formatDepartmentName(item.department)}
                        </span>
                      </td>
                      <td className="fw-semibold text-dark">
                        {formatCurrencyINR(item.salary)}
                      </td>
                      <td>
                        <span className="d-inline-flex align-items-center gap-1 text-secondary">
                          <i className="bi bi-telephone text-muted" style={{ fontSize: "0.8rem" }} />
                          {item.phoneNumber}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex align-items-center gap-2">
                          <button
                            type="button"
                            className="btn-action-edit"
                            onClick={() => navigate(`/update/${item._id}`)}
                            title={`Update ${item.name}`}
                          >
                            <i className="bi bi-pencil-square" />
                            <span>Update</span>
                          </button>
                          <button
                            type="button"
                            className="btn-action-delete"
                            onClick={() => openDeleteModal(item)}
                            title={`Delete ${item.name}`}
                          >
                            <i className="bi bi-trash3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        show={!!employeeToDelete}
        onHide={closeDeleteModal}
        centered
        backdrop={deleting ? "static" : true}
        keyboard={!deleting}
      >
        <Modal.Header closeButton={!deleting} className="border-bottom-0 pb-0">
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#fef2f2",
                color: "#dc2626",
              }}
            >
              <i className="bi bi-trash3-fill fs-5" />
            </div>
            <Modal.Title className="fs-5 fw-bold text-dark">
              Confirm Employee Deletion
            </Modal.Title>
          </div>
        </Modal.Header>

        <Modal.Body className="pt-3">
          <p className="text-secondary mb-3" style={{ fontSize: "0.925rem" }}>
            Are you sure you want to permanently delete this employee record? This action cannot be undone.
          </p>
          {employeeToDelete && (
            <div
              className="p-3 rounded-3 border"
              style={{ backgroundColor: "#f8fafc" }}
            >
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="fw-bold text-dark">{employeeToDelete.name}</span>
                <span className="emp-id-tag">#{employeeToDelete.id}</span>
              </div>
              <div className="text-muted small d-flex flex-wrap gap-3">
                <span>
                  <i className="bi bi-envelope me-1" />
                  {employeeToDelete.email}
                </span>
                <span>
                  <i className="bi bi-building me-1" />
                  {formatDepartmentName(employeeToDelete.department)}
                </span>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="border-top-0 pt-1">
          <Button
            variant="light"
            className="border fw-medium"
            onClick={closeDeleteModal}
            disabled={deleting}
            style={{ borderRadius: "8px" }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="fw-semibold d-inline-flex align-items-center gap-2"
            onClick={confirmDeleteEmployee}
            disabled={deleting}
            style={{ borderRadius: "8px" }}
          >
            {deleting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <i className="bi bi-trash3" />
                <span>Delete Employee</span>
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Employee;