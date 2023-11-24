import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Table,
} from "reactstrap";
import { variables } from "../../Variables";
import axios from "axios";
import Validation from "./EmployeeValidation"


const EmployeeComponent =()=>{
  const [isEditMode, setIsEditMode] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  const [employeeId, setEmployeeId] = useState(0);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [epf, setEpf] = useState("");
  const [address, setAddress] = useState("");

  //validations
  const [errors, setErrors] = useState({
    Name: "",
    Epf: "",
    Email: "",
    Address: "",
    Mobile: "",
    isValiedName: true,
    isValiedEpf: true,
    isValiedMobile: true,
    isValiedAddress: true,
    isValiedEmail: true,
  });

   const employeeData = {
     id: employeeId,
     name: name,
     mobile: mobile,
     email: email,
     address: address,
     epf: epf,
   };


  const handleRegisterClick = async () => {
    //handle button submit
    const validationErrors = await Validation(employeeData);
    setErrors(validationErrors);

    // Remove the "id" field from the employeeData object
    const { id, ...employeeDataWithoutId } = employeeData;

    // Check if any validation error is false
    const hasError = Object.values(validationErrors).includes(false);
    if (hasError) {
      console.log("Validation errors. Cannot submit data.");
      return;
    }

    try {
      const response = await axios.post(
        variables.API_URL + "Employee",
        employeeDataWithoutId,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setEmployeeList((prevEmployeeList) =>
          prevEmployeeList.map((employee) =>
            employee.id === employeeId ? response.data : employee
          )
        );
        // toast.success("Employee Saved successfully");
      } else {
        // Handle unexpected status codes or error responses
        console.error("Error submitting data. Status:", response.status);
        console.error("Response Data:", response.data);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error submitting data:", error);
    }
  };
  
  const btnEditClick = (id) => {};

  const btnDeleteClick = (id) => {};

  const fetchEmployeeDataList = async () => {
    await axios
      .get(variables.API_URL + "Employee")
      .then((response) => {
        setEmployeeList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = "Employee Registration";

    fetchEmployeeDataList();
  }, []);

  return (
    <>
      <Container className="mb-3">
        <Row>
          <Col className="box">
            <p className="form-title">Employee registration</p>
            {isEditMode && (
              <Row className="mb-3">
                <Col>
                  <Button
                    id="btnCreateNew"
                    //   onClick={(e) => handleCreateNewClick(e)}
                    className="btn btn-success"
                  >
                    Create New Student
                  </Button>
                </Col>
              </Row>
            )}
            <Form className="box-inner">
              <Row>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Name</Label>
                    <Col sm={8}>
                      <Input
                        id="name"
                        placeholder="Enter Employee Name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        invalid={!errors.isValiedName}
                      />
                      {!errors.isValiedName && (
                        <FormFeedback>{errors.Name}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>EPF</Label>
                    <Col sm={8}>
                      <Input
                        id="epf"
                        placeholder="Enter Employee EPF"
                        type="text"
                        value={epf}
                        onChange={(e) => {
                          setEpf(e.target.value);
                        }}
                        invalid={!errors.isValiedEpf}
                      />
                      {!errors.isValiedEpf && (
                        <FormFeedback>{errors.Epf}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Mobile Number</Label>
                    <Col sm={8}>
                      <Input
                        id="mobile"
                        placeholder="Enter the Mobile Number"
                        type="number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        invalid={!errors.isValiedContactedNumber}
                      />
                      {!errors.isValiedMobile && (
                        <FormFeedback>{errors.Mobile}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Email Address</Label>
                    <Col sm={8}>
                      <Input
                        id="Email"
                        placeholder="Enter the Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        invalid={!errors.isValiedEmail}
                      />
                      {!errors.isValiedEmail && (
                        <FormFeedback>{errors.Email}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Address</Label>
                    <Col sm={8}>
                      <Input
                        id="address"
                        type="date"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        invalid={!errors.isValiedAddress}
                      />
                      {!errors.isValiedAddress && (
                        <FormFeedback>{errors.Address}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col col={6}>
                  {!isEditMode && (
                    <Button
                      id="btnRegister"
                      block
                      onClick={(e) => handleRegisterClick(e)}
                      className="btn btn-primary"
                    >
                      Register Student
                    </Button>
                  )}
                  {isEditMode && (
                    <Button
                      id="btnUpdate"
                      block
                    //   onClick={(e) => handleUpdateClick(e)}
                      className="btn btn-info "
                    >
                      Update Student
                    </Button>
                  )}
                </Col>
                <Col col={6}>
                  <Button
                    block
                    color="light"
                    // onClick={(e) => handleClearClick(e)}
                  >
                    Clear Form
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="box">
            <p className="form-title">Employee List</p>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>EPF</th>
                  <th>Mobile</th>
                  <th>Address</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {employeeList.map((data) => (
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.epf}</td>
                    <td>{data.mobile}</td>
                    <td>{data.address}</td>
                    <td>{data.emaiil}</td>
                    <td>
                      <Row>
                        <Col md={6}>
                          <Button
                            className="btn btn-primary"
                            onClick={(e) => btnEditClick(data.id)}
                          >
                            Edit
                          </Button>
                        </Col>
                        <Col md={6}>
                          <Button
                            className="btn btn-danger"
                            onClick={(e) => btnDeleteClick(data.id)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default EmployeeComponent;