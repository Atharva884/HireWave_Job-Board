import React from "react";
import "../assects/Sign_up.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, FormCheck, FormControl, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ip } from "../constant";
import { passwordRegex, schema } from "../schemas/formSchema";
import Cookies from "universal-cookie";
import { setCookies } from "../helpers/helper";
import { useNavigate } from "react-router-dom";

function Sign_up() {
  let cookie = new Cookies();
  let navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("user");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [visible, setVisible] = useState("password");
  const [error, setError] = useState({
    isError: false,
    message: null,
  });

  const valueChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const handleChange = (event) => {
    if (event.target.checked) setVisible("text");
    else setVisible("password");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleReEnterPasswordChange = (e) => {
    setReEnterPassword(e.target.value);
  };

  const passwordsMatch = reEnterPassword && password === reEnterPassword;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isLoading, errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  //   console.log("Form State:", errors, isSubmitting, isLoading);

  const submitHandler = async (data) => {
    console.log("calleddd");

    const formData = new FormData();
    formData.append("accountFirstName", data.accountFirstName);
    formData.append("accountLastName", data.accountLastName);
    formData.append("accountEmail", data.accountEmail);
    formData.append("accountContactNo", data.accountContactNo);
    formData.append("accountPassword", password);
    formData.append("role", selectedRole);

    const response = await fetch(`${ip}/account/registerAccount`, {
      method: "POST",
      body: formData,
    });

    console.log(response);

    if (response.ok) {
      const resData = await response.json();
      if (resData.data.role === "user") {
        // Push to user dashboard
        console.log("user");
        // First, We need to complete the user's profile
        navigate("/candidateDashboard");
      } else {
        // Push to recruiter dashboard
        console.log("recruiter");
        // First, We need to complete the company profile
        navigate("/recruiterDashboard");
      }
      setCookies(resData, cookie);
    } else {
      const resData = await response.json();
      setError({
        isError: true,
        message: resData.message,
      });
    }
  };
  const onInvalid = (errors) => console.error(errors);

  return (
    <form
      onSubmit={handleSubmit(submitHandler, onInvalid)}
      style={{ maxWidth: 650 }}
      className="Sign_up w-100 px-4 py-4 rounded-4 position-absolute top-50 start-50 translate-middle border border-secondary"
    >
      <h1 className="text-center mt-2 pb-2 text-success font-weight-bold font-italic">
        <strong>Account Creation</strong>
      </h1>
      {error.isError && <span className="text-danger">{error.message}</span>}
      <div className="my-3 d-flex col-12 gap-4">
        <div className="flex-grow-1">
          <InputGroup className="w-full">
            <FormControl
              className="px-2 py-1 w-full"
              placeholder="First Name"
              type="text"
              {...register("accountFirstName")}
            />
          </InputGroup>
          {errors.accountFirstName && (
            <div className="text-danger mt-1">
              {errors.accountFirstName.message}
            </div>
          )}
        </div>

        <div className="flex-grow-1">
          <InputGroup className="w-full">
            <FormControl
              className="px-2 py-1 w-full"
              placeholder="Last Name"
              type="text"
              {...register("accountLastName")}
            />
          </InputGroup>
          {errors.accountLastName && (
            <div className="text-danger mt-1">
              {errors.accountLastName.message}
            </div>
          )}
        </div>
      </div>

      <div className="my-3">
        {/* <label>Your email</label> */}
        <FormControl
          className="col-12 px-2 py-1"
          placeholder="example@gmail.com"
          type="text"
          {...register("accountEmail")}
        />
        {errors.accountEmail && (
          <span className="text-danger mt-1">
            {errors.accountEmail.message}
          </span>
        )}
      </div>
      <div className="my-3">
        {/* <label>Contact</label> */}
        <FormControl
          className="col-12 px-2 py-1"
          placeholder="+91-9820020354"
          type="number"
          {...register("accountContactNo")}
        />
        {errors.accountContactNo && (
          <span className="text-danger mt-1">
            {errors.accountContactNo.message}
          </span>
        )}
      </div>
      <div className="my-3 d-flex col-12 gap-4">
        <div className="flex-grow-1">
          <InputGroup className="w-full">
            <FormControl
              className="px-2 py-1 w-full"
              placeholder="Password"
              type={visible}
              value={password}
              onChange={handlePasswordChange}
            />
          </InputGroup>
          {password && !passwordRegex.test(password) && (
            <div className="text-danger mt-1">Provide a strong password</div>
          )}
        </div>

        <div className="flex-grow-1">
          <InputGroup className="w-full">
            <FormControl
              className="px-2 py-1 w-full"
              placeholder="Re-enter Password"
              type={visible}
              value={reEnterPassword}
              onChange={handleReEnterPasswordChange}
            />
          </InputGroup>
          {reEnterPassword && !passwordsMatch && (
            <div className="text-danger mt-1">Passwords do not match</div>
          )}
        </div>
      </div>
      <div className="d-flex gap-2">
        <FormCheck type="checkbox" onChange={handleChange} />
        <label>Show password</label>
      </div>

      <div className="my-3 border border-secondary rounded px-2 py-2">
        <h4 className="text-center text-success font-weight-bold font-italic">
          Join as
        </h4>
        <div className="d-flex justify-content-center text-center">
          <div className="col-6">
            <FormControl
              type="radio"
              name="Role"
              id="recruiter"
              className="d-none Role "
              onChange={valueChange}
              value="recruiter"
            />
            <label
              htmlFor="recruiter"
              className="Role col-8 border rounded px-4 py-2 me-3 overflow-hidden"
            >
              <FontAwesomeIcon className="w-100" icon={faBuilding} />
              <span>Client, hiring for a project</span>
            </label>
          </div>

          <div className="col-6">
            <FormControl
              type="radio"
              name="Role"
              id="user"
              className="d-none Role"
              onChange={valueChange}
              value="user"
              defaultChecked
            />
            <label
              htmlFor="user"
              className="Role col-8 border rounded px-4 py-2 overflow-hidden"
            >
              <FontAwesomeIcon className="w-100" icon={faUser} />
              <span>Freelancer, looking for work</span>
            </label>
          </div>
        </div>
      </div>

      <div className="my-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn border customBtn"
        >
          Create Account for{" "}
          {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
        </Button>
      </div>

      <div>
        <p>
          Already have an account ? <a href="/login">Sign in</a>
        </p>
      </div>
    </form>
  );
}
export default Sign_up;
