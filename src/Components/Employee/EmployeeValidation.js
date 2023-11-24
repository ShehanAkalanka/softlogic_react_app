export default async function Validation(employee) {
  const errors = {};

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const phoneRegex = /^\d{10}$/;

  if (employee.Name === "") {
    errors.Name = "Name is Required";
    errors.isValiedName = false;
  } else {
    errors.isValiedName = true;
  }
   if (employee.Address === "") {
     errors.Address = "Address is Required";
     errors.isValiedAddress = false;
   } else {
     errors.isValiedAddress = true;
   }
    if (employee.Epf === "") {
      errors.Epf = "Epf is Required";
      errors.isValiedEpf = false;
    } else {
      errors.isValiedEpf = true;
    }

  if (employee.Mobile === "") {
    errors.Mobile = "Mobile is Required";
    errors.isValiedMobile = false;
  } else if (!phoneRegex.test(employee.Mobile)) {
    errors.Mobile = "Mobile is Incorrect";
    errors.isValiedMobile = false;
  } else {
    errors.isValiedMobile = true;
  }

  if (employee.email === "") {
    errors.Email = "Email is Required";
    errors.isValiedEmail = false;
  } else if (!emailRegex.test(employee.email)) {
    errors.Email = "Email is Incorrect";
    errors.isValiedEmail = false;
  } else {
    errors.isValiedEmail = true;
  }

  return errors;
}
