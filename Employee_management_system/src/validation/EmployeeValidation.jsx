import * as yup from "yup";

const EmployeeSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Employee name is required")
    .min(3, "Name must be at least 3 characters"),

  id: yup
    .number()
    .typeError("Employee ID must be a valid number")
    .positive("Employee ID must be greater than 0")
    .integer("Employee ID must be a whole number")
    .required("Employee ID is required"),

  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),

  department: yup
    .string()
    .required("Department is required"),

  salary: yup
    .number()
    .typeError("Salary must be a valid number")
    .positive("Salary must be greater than 0")
    .required("Monthly salary is required"),

  phoneNumber: yup
    .string()
    .trim()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});

export default EmployeeSchema;