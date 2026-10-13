import { useEffect, useState, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllEmployee } from "../API/EmployeeApi";
import Loading from "../Ui/Loading";
import {
  formatDepartmentName,
  getDepartmentBadgeClass,
  getDepartmentColor,
  getInitials,
  getAvatarPalette,
  formatCurrencyINR,
} from "../Ui/departmentUtils";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    getAllEmployee()
      .then((data) => {
        if (!isMounted) return;
        setEmployees(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Failed to load dashboard statistics");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllEmployee();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError(err.message || "Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  // Dynamically compute all metrics from real API records
  const stats = useMemo(() => {
    const totalEmployees = employees.length;

    const totalMonthlySalary = employees.reduce(
      (sum, emp) => sum + (Number(emp.salary) || 0),
      0
    );

    const avgMonthlySalary =
      totalEmployees > 0 ? Math.round(totalMonthlySalary / totalEmployees) : 0;

    // Group by normalized department
    const deptMap = new Map();
    employees.forEach((emp) => {
      const rawDept = String(emp.department || "Unassigned").trim();
      const key = rawDept.toLowerCase() || "unassigned";
      const existing = deptMap.get(key) || {
        key,
        name: formatDepartmentName(rawDept),
        raw: rawDept,
        count: 0,
        totalSalary: 0,
        color: getDepartmentColor(rawDept),
        badgeClass: getDepartmentBadgeClass(rawDept),
      };
      existing.count += 1;
      existing.totalSalary += Number(emp.salary) || 0;
      deptMap.set(key, existing);
    });

    const departmentBreakdown = Array.from(deptMap.values())
      .map((dept) => ({
        ...dept,
        percentage:
          totalEmployees > 0
            ? Math.round((dept.count / totalEmployees) * 100)
            : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Recently added employees (last 5 from API list, newest first)
    const recentEmployees = [...employees].reverse().slice(0, 5);
    const latestEmployee = recentEmployees[0] || null;

    return {
      totalEmployees,
      totalDepartments: departmentBreakdown.length,
      totalMonthlySalary,
      avgMonthlySalary,
      departmentBreakdown,
      recentEmployees,
      latestEmployee,
    };
  }, [employees]);

  // Build SVG Donut segments for department distribution
  const donutSegments = useMemo(() => {
    if (stats.totalEmployees === 0) return [];
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    let accumulatedRatio = 0;

    return stats.departmentBreakdown.map((dept) => {
      const ratio = dept.count / stats.totalEmployees;
      const strokeDasharray = `${ratio * circumference} ${circumference}`;
      const strokeDashoffset = -accumulatedRatio * circumference;
      accumulatedRatio += ratio;
      return {
        ...dept,
        strokeDasharray,
        strokeDashoffset,
        radius,
      };
    });
  }, [stats]);

  if (loading) {
    return (
      <Loading
        message="Loading HR Dashboard..."
        subtext="Calculating live workforce and payroll metrics"
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
        <h5 className="fw-bold text-dark mb-2">Unable to Load Dashboard Data</h5>
        <p className="text-muted mb-4" style={{ maxWidth: "440px", margin: "0 auto" }}>
          {error}
        </p>
        <button
          type="button"
          className="btn btn-primary-enterprise"
          onClick={handleRefresh}
        >
          <i className="bi bi-arrow-clockwise" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Page Heading */}
      <div className="page-header">
        <div>
          <h2 className="page-title">HR Executive Dashboard</h2>
          <p className="page-subtitle">
            Real-time overview of workforce distribution, department headcount, and monthly payroll.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-light border d-inline-flex align-items-center gap-2 fw-medium"
            style={{ fontSize: "0.85rem", borderRadius: "8px", padding: "0.5rem 0.9rem" }}
            onClick={handleRefresh}
            title="Refresh metrics"
          >
            <i className="bi bi-arrow-clockwise" />
            <span>Refresh</span>
          </button>
          <Link to="/add" className="btn btn-primary-enterprise text-decoration-none">
            <i className="bi bi-person-plus-fill" />
            <span>Add Employee</span>
          </Link>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} xl={3}>
          <div className="stat-card">
            <div className="d-flex align-items-start justify-content-between mb-2">
              <div>
                <div className="stat-label">Total Employees</div>
                <div className="stat-value">{stats.totalEmployees}</div>
              </div>
              <div className="stat-icon-box stat-icon-blue">
                <i className="bi bi-people-fill" />
              </div>
            </div>
            <p className="stat-meta">
              <i className="bi bi-check-circle-fill text-success" />
              <span>Active organization members</span>
            </p>
          </div>
        </Col>

        <Col xs={12} sm={6} xl={3}>
          <div className="stat-card">
            <div className="d-flex align-items-start justify-content-between mb-2">
              <div>
                <div className="stat-label">Total Departments</div>
                <div className="stat-value">{stats.totalDepartments}</div>
              </div>
              <div className="stat-icon-box stat-icon-indigo">
                <i className="bi bi-diagram-3-fill" />
              </div>
            </div>
            <p className="stat-meta">
              <i className="bi bi-layers-fill text-primary" />
              <span>
                {stats.departmentBreakdown[0]
                  ? `Largest: ${stats.departmentBreakdown[0].name} (${stats.departmentBreakdown[0].count})`
                  : "No active departments"}
              </span>
            </p>
          </div>
        </Col>

        <Col xs={12} sm={6} xl={3}>
          <div className="stat-card">
            <div className="d-flex align-items-start justify-content-between mb-2">
              <div>
                <div className="stat-label">Total Monthly Salary</div>
                <div className="stat-value">
                  {formatCurrencyINR(stats.totalMonthlySalary)}
                </div>
              </div>
              <div className="stat-icon-box stat-icon-emerald">
                <i className="bi bi-currency-rupee" />
              </div>
            </div>
            <p className="stat-meta">
              <i className="bi bi-graph-up-arrow text-success" />
              <span>
                Avg. {formatCurrencyINR(stats.avgMonthlySalary)} / employee
              </span>
            </p>
          </div>
        </Col>

        <Col xs={12} sm={6} xl={3}>
          <div className="stat-card">
            <div className="d-flex align-items-start justify-content-between mb-2">
              <div className="overflow-hidden pe-2">
                <div className="stat-label">Recently Added Employees</div>
                <div className="stat-value">{stats.recentEmployees.length}</div>
              </div>
              <div className="stat-icon-box stat-icon-amber">
                <i className="bi bi-person-check-fill" />
              </div>
            </div>
            <p className="stat-meta text-truncate">
              <i className="bi bi-clock-history text-warning" />
              <span className="text-truncate">
                {stats.latestEmployee
                  ? `Latest: ${stats.latestEmployee.name} (#${stats.latestEmployee.id})`
                  : "No employees added yet"}
              </span>
            </p>
          </div>
        </Col>
      </Row>

      {/* Empty State if no employees exist */}
      {employees.length === 0 ? (
        <div className="enterprise-card empty-state-box">
          <div className="empty-state-icon">
            <i className="bi bi-people" />
          </div>
          <h5 className="fw-bold text-dark mb-2">No Employee Records Found</h5>
          <p className="text-muted mb-4" style={{ maxWidth: "420px", margin: "0 auto" }}>
            Your employee directory is currently empty. Add your first employee to unlock department analytics and payroll insights.
          </p>
          <Link to="/add" className="btn btn-primary-enterprise text-decoration-none">
            <i className="bi bi-person-plus-fill" />
            Add First Employee
          </Link>
        </div>
      ) : (
        <Row className="g-4">
          {/* Department Distribution Chart & Breakdown */}
          <Col xs={12} lg={5}>
            <div className="enterprise-card p-4 h-100 d-flex flex-column">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <h6 className="fw-bold text-dark mb-1">Department Distribution</h6>
                  <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
                    Headcount & payroll allocation by team
                  </p>
                </div>
                <span className="badge bg-light text-secondary border fw-semibold">
                  {stats.totalDepartments} Teams
                </span>
              </div>

              {/* SVG Donut Chart */}
              <div className="d-flex align-items-center justify-content-center my-3">
                <div className="position-relative d-inline-flex align-items-center justify-content-center">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="58"
                      fill="transparent"
                      stroke="#f1f5f9"
                      strokeWidth="20"
                    />
                    {donutSegments.map((seg) => (
                      <circle
                        key={seg.key}
                        cx="80"
                        cy="80"
                        r={seg.radius}
                        fill="transparent"
                        stroke={seg.color}
                        strokeWidth="20"
                        strokeDasharray={seg.strokeDasharray}
                        strokeDashoffset={seg.strokeDashoffset}
                        transform="rotate(-90 80 80)"
                        style={{ transition: "stroke-dasharray 0.4s ease" }}
                      >
                        <title>
                          {seg.name}: {seg.count} employees ({seg.percentage}%)
                        </title>
                      </circle>
                    ))}
                  </svg>
                  <div className="position-absolute text-center">
                    <div className="fw-bold text-dark" style={{ fontSize: "1.4rem", lineHeight: 1.1 }}>
                      {stats.totalEmployees}
                    </div>
                    <div className="text-muted" style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase" }}>
                      Staff
                    </div>
                  </div>
                </div>
              </div>

              {/* Department List Breakdown */}
              <div className="mt-2 d-flex flex-column gap-3">
                {stats.departmentBreakdown.map((dept) => (
                  <div key={dept.key}>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="rounded-circle d-inline-block"
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: dept.color,
                          }}
                        />
                        <span className="fw-semibold text-dark" style={{ fontSize: "0.85rem" }}>
                          {dept.name}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted" style={{ fontSize: "0.78rem" }}>
                          {formatCurrencyINR(dept.totalSalary)}/mo
                        </span>
                        <span
                          className="badge rounded-pill bg-light text-dark border"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {dept.count} ({dept.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div
                      className="progress"
                      style={{ height: "7px", backgroundColor: "#f1f5f9", borderRadius: "999px" }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${dept.percentage}%`,
                          backgroundColor: dept.color,
                          borderRadius: "999px",
                        }}
                        aria-valuenow={dept.percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Recently Added Employees Card */}
          <Col xs={12} lg={7}>
            <div className="enterprise-card h-100 d-flex flex-column overflow-hidden">
              <div className="p-4 border-bottom d-flex flex-wrap align-items-center justify-content-between gap-2">
                <div>
                  <h6 className="fw-bold text-dark mb-1">Recently Added Employees</h6>
                  <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
                    Latest team members onboarded to the organization
                  </p>
                </div>
                <Link
                  to="/employees"
                  className="btn btn-sm btn-outline-primary fw-semibold d-inline-flex align-items-center gap-1"
                  style={{ borderRadius: "7px", fontSize: "0.8rem" }}
                >
                  <span>View All ({stats.totalEmployees})</span>
                  <i className="bi bi-arrow-right" />
                </Link>
              </div>

              <div className="enterprise-table-wrapper flex-grow-1">
                <table className="enterprise-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Emp ID</th>
                      <th>Department</th>
                      <th>Salary</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentEmployees.map((emp) => {
                      const palette = getAvatarPalette(emp.name);
                      return (
                        <tr key={emp._id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="emp-avatar"
                                style={{
                                  backgroundColor: palette.bg,
                                  color: palette.color,
                                }}
                              >
                                {getInitials(emp.name)}
                              </div>
                              <div>
                                <div className="fw-semibold text-dark">
                                  {emp.name}
                                </div>
                                <div
                                  className="text-muted"
                                  style={{ fontSize: "0.775rem" }}
                                >
                                  {emp.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="emp-id-tag">#{emp.id}</span>
                          </td>
                          <td>
                            <span
                              className={`dept-badge ${getDepartmentBadgeClass(
                                emp.department
                              )}`}
                            >
                              <span className="dept-dot" />
                              {formatDepartmentName(emp.department)}
                            </span>
                          </td>
                          <td className="fw-semibold text-dark">
                            {formatCurrencyINR(emp.salary)}
                          </td>
                          <td className="text-end">
                            <button
                              type="button"
                              className="btn-action-edit"
                              onClick={() => navigate(`/update/${emp._id}`)}
                              title={`Edit ${emp.name}`}
                            >
                              <i className="bi bi-pencil-square" />
                              <span>Edit</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Dashboard;
