import React from "react";
import { useEffect, useState } from "react";
// import "../assects/User_Profile_details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faPlus,
  faPenToSquare,
  faTrash,
  faXmark,
  faBackward,
  faAsterisk,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Modal,
} from "react-bootstrap";
import Select from "react-select";
import logoImg from "../assects/IMG/logo.jpeg";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function RecruterDetails() {
  const [formState, setFromState] = useState(1);
  const [error, setError] = useState();
  let cookie = new Cookies();
  let navigate = useNavigate();
  let role = cookie.get("role");
  let isLoggedIn = cookie.get("_id");
  console.log(isLoggedIn);

  useEffect(() => {
    if (role === "user") {
      navigate("/candidateDashboard");
    } else if (role === "recruiter") {
      navigate("/recruiterDashboard");
    } else {
      navigate("/login");
    }
  });

  const NoOfEmployees = [
    { value: "1-14", label: "1 - 14" },
    { value: "15-49", label: "15 - 49" },
    { value: "101-200", label: "101 - 200" },
    { value: "101-200", label: "101 - 200" },
    { value: "201-500", label: "201 - 500" },
    { value: "501 and above", label: "501 and above" },
  ];

  const WorkEndusrties = [
    { value: "Technology", label: "Technology" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Finance", label: "Finance" },
    { value: "Education", label: "Education" },
    { value: "Hospitality", label: "Hospitality" },
    { value: "Tourism", label: "Tourism" },
  ];

  // SocialLinks
  const [socialLinks, setSocialLinks] = useState([
    {
      name: "google",
      link: "www.google.com",
    },
  ]);

  const [showEditSocialLinks, setEditSocialLinks] = useState({});

  const addNewSocialLinks = () => {
    let newSocialLinks = {
      name: "",
      link: "",
    };
    setSocialLinks([...socialLinks, newSocialLinks]);
    setEditSocialLinks({
      value: socialLinks,
      index: socialLinks.length,
      show: true,
      type: "new",
    });
  };
  const removeSocialLinks = (index) => {
    if (showEditSocialLinks.type === "new" || !showEditSocialLinks.type) {
      let data = [...socialLinks];
      data.splice(index, 1);
      setSocialLinks(data);
      setEditSocialLinks({});
    } else {
      setEditSocialLinks({});
    }
  };

  const handleSocialLinksFormChange = (index, event) => {
    let data = [...socialLinks];
    data[index][event.target.name] = event.target.value;
    setSocialLinks(data);
    setError("");
  };

  const submitCertificateHandler = () => {
    if (
      socialLinks[socialLinks.length - 1].name !== "" &&
      socialLinks[socialLinks.length - 1].link !== ""
    ) {
      setEditSocialLinks({});
      setError("");
    } else {
      setError("All the fields are required...");
    }
  };

  function EditSocialLinks(index) {
    let input = socialLinks[index];
    setEditSocialLinks({
      value: input,
      index: index,
      show: true,
      type: "edit",
    });
  }

  const [Image, setImage] = useState(logoImg);
  function changeImage(e) {
    console.log(e.target.files);
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImage(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
    console.log(Image);
    // setImage(URL.createObjectURL(e.target.files[0]));
  }

  const updateProfile = () => {};

  return (
    <section className="">
      <Form className="w-100 px-5 py-5 border border-secondary rounded">
        <strong>
          <p className="text-success">
            {formState > 1 && (
              <FontAwesomeIcon
                onClick={() => setFromState(formState - 1)}
                style={{ cursor: "pointer" }}
                className="text-xl text-secondary "
                icon={faBackward}
              />
            )}
            &nbsp;&nbsp;Step {formState} / 2
          </p>
        </strong>
        {formState === 1 && (
          <>
            <div className=" d-flex position-relative">
              <fieldset className="col-9">
                <legend>General Information :</legend>
                <FormGroup className="w-100 d-flex mb-3">
                  <FormLabel className="w-100 mx-2">
                    Company Name :{" "}
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="mb-2 text-danger"
                      style={{ fontSize: "8px" }}
                    />
                    <FormControl
                      type="text"
                      name="companyName"
                      placeholder="company name"
                      className=""
                    ></FormControl>
                  </FormLabel>
                </FormGroup>

                <FormGroup className="w-100 d-flex mb-3 mt-2">
                  <FormLabel className="w-100 mx-2">
                    Company Email :{" "}
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="mb-2 text-danger"
                      style={{ fontSize: "8px" }}
                    />
                    <FormControl
                      type="text"
                      name="companyEmail"
                      placeholder="example@gmail.com"
                      className=""
                    ></FormControl>
                  </FormLabel>

                  <FormLabel className="w-100 mx-2">
                    Company Contact :{" "}
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="mb-2 text-danger"
                      style={{ fontSize: "8px" }}
                    />
                    <FormControl
                      type="text"
                      name="companyNo"
                      placeholder="9810020254"
                      className=""
                    ></FormControl>
                  </FormLabel>
                </FormGroup>
                <FormGroup className="w-90 mx-2 d-flex">
                  <FormLabel className="w-100 mx-1">
                    Work Endusrty :{" "}
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="mb-2 text-danger"
                      style={{ fontSize: "8px" }}
                    />
                    <Select
                      name="companyIndustry"
                      options={WorkEndusrties}
                    ></Select>
                  </FormLabel>
                  <FormLabel className="w-100 mx-1">
                    No. of Employees :{" "}
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="mb-2 text-danger"
                      style={{ fontSize: "8px" }}
                    />
                    <Select
                      name="companyIndustry"
                      options={NoOfEmployees}
                    ></Select>
                  </FormLabel>
                </FormGroup>
                <FormGroup className="w-100 mt-3 px-2">
                  <FormLabel className="w-100 ">
                    Website : (option)
                    <FormControl
                      type="text"
                      name="website"
                      placeholder="www.localhost.com"
                      className=""
                    ></FormControl>
                  </FormLabel>
                </FormGroup>
              </fieldset>
              <fieldset className="col-3 ">
                <FormLabel
                  style={{ cursor: "pointer" }}
                  className="w-100  mb-3 d-flex justify-content-around align-items-center "
                >
                  <FormControl
                    type="file"
                    name="Image"
                    id="Image"
                    className="d-none"
                    onChange={changeImage}
                  ></FormControl>
                  <img
                    style={{ height: 300, width: 300 }}
                    className="col-9 rounded-circle img-thumbnail mx-auto d-block "
                    src={Image}
                    accept="image/png, image/gif, image/jpeg"
                  />
                </FormLabel>
              </fieldset>
            </div>

            <fieldset mb-3>
              <legend className="mt-3">Address :</legend>
              <FormGroup className="w-100 d-flex mb-3">
                <FormLabel className="w-100 mx-2">
                  Address:{" "}
                  <FontAwesomeIcon
                    icon={faAsterisk}
                    className="mb-2 text-danger"
                    style={{ fontSize: "8px" }}
                  />
                  <FormControl
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter your home address"
                    className=""
                  ></FormControl>
                </FormLabel>
              </FormGroup>
            </fieldset>
            <fieldset mb-3>
              <legend className="mt-3">Recruiter Info :</legend>
              <FormGroup className="w-100 d-flex mb-3">
                <FormLabel className="w-100 mx-2">
                  Designaion :
                  <FormControl
                    type="text"
                    name="recruiterPost"
                    placeholder="designation"
                    className=""
                  ></FormControl>
                </FormLabel>
              </FormGroup>
            </fieldset>
          </>
        )}
        {formState === 2 && (
          <>
            <fieldset className="my-5">
              <div className="d-flex">
                <legend>SocialLinks :</legend>

                {socialLinks.length > 0 && (
                  <Button
                    style={{ width: 130 }}
                    onClick={addNewSocialLinks}
                    className=" d-flex justify-content-around align-items-center "
                  >
                    Add More <FontAwesomeIcon icon={faPlus} />
                  </Button>
                )}
              </div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                {socialLinks.map((input, index) => {
                  return (
                    <div className="position-relative border rounded">
                      <FontAwesomeIcon
                        className="position-absolute end-0 mx-2 my-2 text-danger "
                        style={{ cursor: "pointer" }}
                        onClick={() => removeSocialLinks(index)}
                        icon={faXmark}
                      />

                      <a
                        href={input.link}
                        rel="noopener"
                        target="_blank"
                        className="link-success"
                      >
                        <div
                          className="border rounded  text-cente"
                          style={{ width: "10rem" }}
                        >
                          <div className="w-100 text-center my-5">
                            <h5 className="card-title">{input.name}</h5>
                          </div>
                        </div>
                      </a>
                      <FontAwesomeIcon
                        className="link-dark w-100  py-1"
                        style={{ cursor: "pointer" }}
                        icon={faPenToSquare}
                        onClick={() => EditSocialLinks(index)}
                      />
                    </div>
                  );
                })}
                {socialLinks.length === 0 && (
                  <div
                    style={{
                      width: "200px",
                      height: "150px",
                      cursor: "pointer",
                    }}
                    className="d-flex flex-column border rounded border-primary justify-content-center align-items-center"
                    onClick={addNewSocialLinks}
                  >
                    <FontAwesomeIcon icon={faLink} />
                    <p>Add Social Media </p>
                  </div>
                )}
              </div>
              {showEditSocialLinks.show && (
                <Modal show={showEditSocialLinks.show}>
                  <FormGroup className="px-4 pt-5 pb-3">
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="position-absolute "
                      style={{ cursor: "pointer", top: "10px", right: "10px" }}
                      onClick={() => {
                        removeSocialLinks(socialLinks.length - 1);
                      }}
                    />
                    <FormLabel className="w-100 my-2 ">
                      Name :
                      <div>
                        <FormControl
                          type="text"
                          name="name"
                          className=""
                          value={showEditSocialLinks.value.name}
                          onChange={(event) =>
                            handleSocialLinksFormChange(
                              showEditSocialLinks.index,
                              event
                            )
                          }
                        />
                      </div>
                    </FormLabel>

                    <FormLabel className="w-100  my-2">
                      Link :
                      <FormControl
                        type="text"
                        name="link"
                        placeholder="....."
                        className="form-control"
                        required
                        value={showEditSocialLinks.value.link}
                        onChange={(event) =>
                          handleSocialLinksFormChange(
                            showEditSocialLinks.index,
                            event
                          )
                        }
                      ></FormControl>
                    </FormLabel>
                    <div className="text-center pt-3">
                      <Button type="submit" onClick={submitCertificateHandler}>
                        Submit
                      </Button>
                    </div>
                  </FormGroup>
                  {error && <p className="text-danger ms-3 mt-3">{error}</p>}
                </Modal>
              )}
            </fieldset>
          </>
        )}
        <div className="w-100 d-flex justify-content-end">
          {formState < 2 && (
            <Button
              className="bg-success col-1 d-flex justify-content-center align-items-center  "
              onClick={() => setFromState(formState + 1)}
            >
              <strong>Next</strong> &nbsp;&nbsp;
              <FontAwesomeIcon icon={faAnglesRight} />
            </Button>
          )}
        </div>
        {formState === 2 && (
          <div className="w-100 d-flex justify-content-center">
            <Button
              className="bg-success col-2 d-flex justify-content-center align-items-center "
              onClick={updateProfile}
            >
              <strong>Update</strong>
            </Button>
          </div>
        )}
      </Form>
    </section>
  );
}
export default RecruterDetails;
