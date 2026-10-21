import * as yup from "yup";

const EmployeeSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),

  id: yup
    .number()
    .typeError("ID must be a number")
    .required("ID is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  department: yup
    .string()
    .required("Department is required"),

  salary: yup
    .number()
    .typeError("Salary must be a number")
    .positive("Salary must be greater than 0")
    .required("Salary is required"),

  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

export default EmployeeSchema;