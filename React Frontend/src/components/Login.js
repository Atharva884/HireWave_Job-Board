import React, { useState, useEffect } from "react";
import "../assects/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import loginimg from "../assects/IMG/loginImg.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ip } from "../constant";
import { LoginSchema } from "../schemas/formSchema";
import Cookies from "universal-cookie";
import { setCookies } from "../helpers/helper";
import { useNavigate } from "react-router-dom";

function Login() {
  const cookie = new Cookies();
  let navigate = useNavigate();
  const [error, setError] = useState({
    isError: false,
    message: null,
  });

  // let role = cookie.get("role");

  // useEffect(() => {
  //   if (role !== undefined) {
  //     navigate("/login");
  //   }
  // });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isLoading, errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const submitHandler = async (data) => {
    console.log("calleddd");

    const formData = new FormData();
    formData.append("accountEmail", data.accountEmail);
    formData.append("accountPassword", data.accountPassword);

    const response = await fetch(`${ip}/account/loginAccount`, {
      method: "POST",
      body: formData,
    });

    console.log(response);

    if (response.ok) {
      const resData = await response.json();
      if (resData.data.role === "user") {
        // Push to user dashboard
        console.log("user");

        // // Fetch the user
        // let accountEmail = resData.data.accountEmail;
        // let user = await fetch(`${ip}/user/getUserByEmail`, {
        //   method: "POST",
        //   body: JSON.stringify({
        //     accountEmail,
        //   }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });

        // if (user.ok) {
        //   let userProfile = await user.json();

        //   if (userProfile.data.professionalRole == null) {
        //   } else {
        //     navigate("/candidateDashboard");
        //   }
        // } else {
        //   console.error("Error:", user.status, user.statusText);
        //   // You can also log the response body for more information
        //   let errorResponse = await user.text();
        //   console.error("Error Response:", errorResponse);
        // }
        navigate("/candidateDashboard");
      } else {
        navigate("/recruiterDashboard");
        // Push to recruiter dashboard
        console.log("recruiter");
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

  useEffect(() => {
    // Set a timeout to clear the error after 3000 milliseconds (3 seconds)
    const timeoutId = setTimeout(() => {
      setError({
        isError: false,
        message: null,
      }); // Set the error state to null to remove the error
    }, 3000);

    // Cleanup the timeout when the component unmounts or when the error changes
    return () => clearTimeout(timeoutId);
  }, [error]);

  return (
    <div className="gradient_background vh-100">
      <div className="form_container p-5 rounded">
        <h3 className="text-center">Sign-In</h3>
        {error.isError && <span className="text-danger">{error.message}</span>}
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-2">
            <label htmlFor="email">Enter Email</label>
            <input
              placeholder="example@gmail.com"
              type="text"
              className="form-control"
              {...register("accountEmail")}
            />
            {errors.accountEmail && (
              <span className="text-danger mt-1">
                {errors.accountEmail.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password">Enter Password</label>
            <input
              placeholder="*******"
              type="password"
              className="form-control"
              {...register("accountPassword")}
            />
            {errors.accountPassword && (
              <span className="text-danger mt-1">
                {errors.accountPassword.message}
              </span>
            )}
          </div>

          <div className="mb-2">
            {/* <button
              className="btn btn-secondary"
              type="button"
              onClick={() => reset()}
            >
              Reset
            </button> */}
            <button className="btn btn-primary" type="submit">
              Sign in
            </button>
          </div>
          <p className="text-right">
            Create An Account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>

      <div className="image_container">
        <img src={loginimg} alt="" width={550}></img>
      </div>
    </div>
  );
}
export default Login;
