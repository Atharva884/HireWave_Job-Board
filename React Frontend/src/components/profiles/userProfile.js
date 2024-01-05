import React from "react";
import { useEffect, useState } from "react";
// import '../assects/User_Profile_details.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ip } from "../../constant";
import {
  faAnglesRight,
  faPlus,
  faPenToSquare,
  faTrash,
  faXmark,
  faBackward,
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
import Cookies from "universal-cookie";
// import AvtarImg from '../assects/images/avtar.jpg';

function UserProfile() {
  const [formState, setFromState] = useState(1);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCities, setSelectedCities] = useState("");
  const [skillMatch, setSkillMatch] = useState([]);

  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const LanguageOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Marathi", label: "Marathi" },
  ];

  const handleLanguageChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions);
  };
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const [error, setError] = useState();

  // Education
  const [education, setEducation] = useState([]);

  const [showEditEducation, setShowEditEducation] = useState({});

  const addNewEducation = () => {
    setError("");
    let newEducation = {
      school: "",
      degree: "",
      field: "",
      educationStartDate: "",
      educationEndDate: "",
    };
    setEducation([...education, newEducation]);
    setShowEditEducation({
      value: education,
      index: education.length,
      show: true,
    });
  };
  const removeEducation = (index) => {
    let data = [...education];
    data.splice(index, 1);
    setEducation(data);
  };

  const handleEducationFormChange = (index, event) => {
    let data = [...education];
    data[index][event.target.name] = event.target.value;

    setEducation(data);
    setError("");
  };
  const submitEducationhandler = () => {
    if (
      education[education.length - 1].school !== "" &&
      education[education.length - 1].degree !== "" &&
      education[education.length - 1].field !== "" &&
      education[education.length - 1].educationStartDate !== "" &&
      education[education.length - 1].educationEndDate !== ""
    ) {
      setError("");
      setShowEditEducation({});
    } else {
      setError("All the fields are required...");
    }
  };

  function EditEducation(index) {
    let input = education[index];
    setShowEditEducation({ value: input, index: index, show: true });
  }

  // projects
  const [projects, setProjects] = useState([]);

  const [showEditProjects, setshowEditProjects] = useState({});

  const addNewProjects = () => {
    setError("");
    let newProject = {
      projectName: "",
      projectDescription: "",
      associatedWith: "",
      projectStartDate: "",
      projectEndDate: "",
    };
    setProjects([...projects, newProject]);
    setshowEditProjects({
      value: projects,
      index: projects.length,
      show: true,
    });
  };
  const removeProjects = (index) => {
    let data = [...projects];
    data.splice(index, 1);
    setProjects(data);
  };

  const handleProjectsFormChange = (index, event) => {
    let data = [...projects];
    data[index][event.target.name] = event.target.value;
    setProjects(data);
    setError("");
  };

  const submitProjectshandler = () => {
    if (
      projects[projects.length - 1].title !== "" &&
      projects[projects.length - 1].description !== "" &&
      projects[projects.length - 1].associatedWith !== "" &&
      projects[projects.length - 1].projectStartDate !== "" &&
      projects[projects.length - 1].projectEndDate !== ""
    ) {
      setError("");
      setshowEditProjects({});
    } else {
      setError("All the fields are required...");
    }
  };
  function EditProjects(index) {
    let input = projects[index];
    setshowEditProjects({ value: input, index: index, show: true });
    console.log(projects);
  }

  // workExperience

  const WorkEndusrties = [
    { value: "Technology", label: "Technology" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Finance", label: "Finance" },
    { value: "Education", label: "Education" },
    { value: "Hospitality", label: "Hospitality" },
    { value: "Tourism", label: "Tourism" },
  ];

  const [workExperience, setWorkExperience] = useState([]);

  const [showEditWorkExperience, setshowEditWorkExperience] = useState({});

  const addNewWorkExperience = () => {
    let newExprience = {
      title: "",
      company: "",
      workIndustry: "",
      location: "",
      workCountry: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setWorkExperience([...workExperience, newExprience]);
    setshowEditWorkExperience({
      value: workExperience,
      index: workExperience.length,
      show: true,
    });
  };
  const removeWorkExperience = (index) => {
    let data = [...workExperience];
    data.splice(index, 1);
    setWorkExperience(data);
  };

  const handleWorkExperienceFormChange = (index, event) => {
    let data = [...workExperience];
    console.log(event.target.name);
    data[index][event.target.name] = event.target.value;
    setWorkExperience(data);
    setError("");
  };
  const submithandelWorkExperience = () => {
    if (
      workExperience[workExperience.length - 1].title !== "" &&
      workExperience[workExperience.length - 1].company !== "" &&
      workExperience[workExperience.length - 1].workExperience !== "" &&
      workExperience[workExperience.length - 1].location !== "" &&
      workExperience[workExperience.length - 1].workCountry !== "" &&
      workExperience[workExperience.length - 1].startDate !== "" &&
      workExperience[workExperience.length - 1].endDate !== "" &&
      workExperience[workExperience.length - 1].description !== ""
    ) {
      setshowEditWorkExperience({});
      setError("");
    } else {
      setError("All the fields are required...");
    }
  };
  function EditWorkExperience(index) {
    let input = workExperience[index];
    setshowEditWorkExperience({ value: input, index: index, show: true });
  }

  // certification
  const [certificate, setCertificate] = useState([]);

  const [showEditCertificate, setshowEditCertificate] = useState({});

  const addNewCertificate = () => {
    let newCertificate = {
      certificateName: "",
      certificateImage: "",
      certificateDescription: "",
    };
    setCertificate([...certificate, newCertificate]);
    setshowEditCertificate({
      value: certificate,
      index: certificate.length,
      show: true,
    });
  };
  const removeCertificate = (index) => {
    let data = [...certificate];
    data.splice(index, 1);
    setCertificate(data);
  };

  const handleCertificateFormChange = (index, event) => {
    let data = [...certificate];
    if (event.target.name === "certificateImage") {
      data[index][event.target.name] = URL.createObjectURL(
        event.target.files[0]
      );
      console.log(event.target.files[0]);
    } else {
      data[index][event.target.name] = event.target.value;
    }
    setCertificate(data);
    setError("");
  };

  const submitCertificateHandler = () => {
    if (
      certificate[certificate.length - 1].certificateName !== "" &&
      certificate[certificate.length - 1].certificateImage !== "" &&
      certificate[certificate.length - 1].certificateDescription !== ""
    ) {
      setshowEditCertificate({});
      setError("");
    } else {
      setError("All the fields are required...");
    }
  };

  function EditCertificate(index) {
    let input = certificate[index];
    setshowEditCertificate({ value: input, index: index, show: true });
  }

  useEffect(() => {
    console.log("Effect running...");
    const fetchCountries = async () => {
      const settings = {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY":
            "ZlZjVXIyNkExc2dkY0taU1ZIcW5DbmNqc0ZZR0k0ZWtyNlE3V25qNw==",
        },
      };

      try {
        const response = await fetch(
          "https://api.countrystatecity.in/v1/countries",
          settings
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (countries) fetchCountries();
  }, []);

  function countryChange(event) {
    const foundCountry = countries.find(
      (country) => country.name === event.target.value
    );
    setSelectedCountry(foundCountry.name);
    const fetchState = async () => {
      const settings = {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY":
            "ZlZjVXIyNkExc2dkY0taU1ZIcW5DbmNqc0ZZR0k0ZWtyNlE3V25qNw==",
        },
      };

      try {
        const response = await fetch(
          "https://api.countrystatecity.in/v1/countries/" +
            foundCountry.iso2 +
            "/states",
          settings
        );
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (states) fetchState();
  }

  function stateChange(event) {
    const foundCountry = countries.find(
      (country) => country.name === selectedCountry
    );
    const foundState = states.find(
      (state) => state.name === event.target.value
    );
    setSelectedState(foundState.name);
    const fetchCities = async () => {
      const settings = {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY":
            "ZlZjVXIyNkExc2dkY0taU1ZIcW5DbmNqc0ZZR0k0ZWtyNlE3V25qNw==",
        },
      };

      try {
        const response = await fetch(
          "https://api.countrystatecity.in/v1/countries/" +
            foundCountry.iso2 +
            "/states/" +
            foundState.iso2 +
            "/cities",
          settings
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (cities) fetchCities();
  }

  const [selectedCity, setSelectedCity] = useState();

  function cityChange(event) {
    const foundCity = cities.find((city) => city.name === event.target.value);
    setSelectedCity(foundCity.name);
  }

  const [Image, setImage] = useState(null);
  function changeImage(e) {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGender, setSelectedGender] = useState("male");
  const [professionalRole, setProfessionalRole] = useState();
  const [bio, setBio] = useState();
  const [address, setAddress] = useState();
  const [pinCode, setPincode] = useState();
  const [contactNumber, setContactNumber] = useState();

  // const updateProfile = () => {};

  //done by atharva and satyam
  const [skills, setSkills] = useState("");
  // const [skillMatch, setSkillMatch] = useState([]);
  // const [userSelectedLanguage, setUserSelectedLanguage] = useState([]);
  // const [selectedSkills, setSelectedSkills] = useState([]);
  let cookie = new Cookies();
  let name = cookie.get("name").split(" ");
  console.log(name);
  console.log(selectedDate);
  console.log(selectedGender);
  console.log(contactNumber);
  console.log(address);
  console.log(selectedCountry);
  console.log(selectedState);
  console.log(selectedCity);
  console.log(pinCode);
  console.log(selectedLanguages);
  // selectedLanguages.map((language) => {
  //   setUserSelectedLanguage(language.value);
  // });
  console.log(skills);
  // skills.map((skill) => {
  //   setSelectedSkills(skill.value);
  // });

  // Education - Multiple array logic pending ig
  // let schoolName;
  // let schoolField;
  // let schoolDegree;
  // let schoolStartDate;
  // let schoolEndDate;
  // let edd = education.map((ed) => {
  //   schoolName = ed.school;
  //   schoolField = ed.field;
  //   schoolDegree = ed.degree;
  //   schoolStartDate = ed.educationStartDate;
  //   schoolEndDate = ed.educationEndDate;
  // });
  // console.log(schoolName);
  // console.log(schoolField);
  // console.log(schoolDegree);
  // console.log(schoolStartDate);
  // console.log(schoolEndDate);
  workExperience.forEach((obj, index) => {
    Object.entries(obj).forEach(([key, value]) => {
      // formData.append(`${key}`, value);
      console.log(`${key}`, value);
    });
  });

  // Language, skill professional role bio
  console.log(professionalRole);
  console.log(bio);
  console.log(skills);
  console.log(selectedLanguages);

  // Projects
  console.log(projects);

  // Fetched from cookie
  let userFirstName = name[0];
  let userLastName = name[1];
  let userEmail = cookie.get("email");

  const handleSkillsChange = (selectedOption) => {
    // Handle selected skills here
    // console.log(selectedOption);
    setSkills(selectedOption);
  };

  const skillOptions = skillMatch.map((item, index) => ({
    label: item,
    value: item,
  }));
  const fetchSkills = async (inputValue) => {
    try {
      let response = await fetch(
        `https://api.apilayer.com/skills?q=${inputValue}`,
        {
          method: "GET",
          headers: {
            apikey: "8wAx4IBLQdHOGhl7rccfP4HIiBdrj9k2",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch skills: ${response.statusText}`);
      }

      let skillData = await response.json();
      console.log(skillData);
      setSkillMatch(skillData);

      // Return an empty array here to clear the dropdown if there are no results
      return [];
    } catch (error) {
      console.error("Error fetching skills:", error);

      // Return an empty array in case of an error
      return [];
    }
  };

  const submitForm = async () => {
    let formData = new FormData();
    formData.append("userFirstName", userFirstName);
    formData.append("userLastName", userLastName);
    formData.append("dateOfBirth", selectedDate);
    formData.append("userEmail", userEmail);
    formData.append("gender", selectedGender);
    formData.append("contactNumber", contactNumber);
    formData.append("profileImage", Image);
    formData.append("address", address);
    formData.append("country", selectedCountry);
    formData.append("state", selectedState);
    formData.append("city", selectedCity);
    education.forEach((obj, index) => {
      Object.entries(obj).forEach(([key, value]) => {
        formData.append(`${key}`, value);
      });
    });

    formData.append("languages", selectedLanguages);
    // formData.append("skills", skills);
    formData.append("professionalRole", professionalRole);
    formData.append("bio", bio);

    projects.forEach((obj, index) => {
      Object.entries(obj).forEach(([key, value]) => {
        formData.append(`${key}`, value);
      });
    });

    // Work Experience industry not working
    workExperience.forEach((obj, index) => {
      Object.entries(obj).forEach(([key, value]) => {
        formData.append(`${key}`, value);
      });
    });

    // Doubt regarding image
    certificate.forEach((obj, index) => {
      Object.entries(obj).forEach(([key, value]) => {
        formData.append(`${key}`, value);
      });
    });

    // formData.append(
    //   "certificateName",
    //   showEditCertificate.value.certificateName
    // );
    // formData.append(
    //   "certificateImage",
    //   showEditCertificate.value.certificateImage
    // );
    // formData.append(
    //   "certificateDescription",
    //   showEditCertificate.value.certificateDescription
    // );

    console.log("FORMMMMMMMDAAAATAAAA");
    console.log(formData);

    // let data = await fetch(`${ip}/user/setUpProfile`, {
    //   method: "POST",
    //   body: formData,
    // });

    // console.log("FORMDATA");
    // console.log(formData);

    // if (data.ok) {
    //   let result = await data.json();

    //   console.log("RESULT");
    //   console.log(result);
    // }
  };

  return (
    <section className="position-relative vh-100  vw-100">
      <form
        onSubmit={submitForm}
        className="position-absolute top-50 start-50 translate-middle  w-75 px-5 py-5 border border-secondary rounded"
      >
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
            &nbsp;&nbsp;Step {formState} / 6
          </p>
        </strong>
        {formState === 1 && (
          <>
            <div className="d-flex position-relative">
              <fieldset className="col-9">
                <legend>General Information: </legend>
                <FormGroup className="w-100 d-flex mb-3">
                  <FormLabel className="w-100 mx-2">
                    First Name:
                    <FormControl
                      type="text"
                      name="Fname"
                      defaultValue={userFirstName}
                      readOnly
                      placeholder="First Name"
                      className=""
                    ></FormControl>
                  </FormLabel>
                  <FormLabel className="w-100 mx-2">
                    Last Name:
                    <FormControl
                      type="text"
                      name="Lname"
                      placeholder="Last Name"
                      readOnly
                      defaultValue={userLastName}
                    ></FormControl>
                  </FormLabel>
                </FormGroup>

                <FormGroup className="w-100 d-flex mb-3">
                  <FormLabel className="w-100 mx-2">
                    Date Of Birth:
                    <FormControl
                      type="date"
                      name="DOB"
                      id="DOb"
                      className=""
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    ></FormControl>
                  </FormLabel>
                  <FormLabel className="w-100 mx-2">
                    Your Gender
                    <Select
                      name="Gender"
                      options={genderOptions}
                      onChange={(selectedOption) =>
                        setSelectedGender(selectedOption.value)
                      }
                      value={genderOptions.find(
                        (option) => option.value === selectedGender
                      )}
                    />
                  </FormLabel>
                </FormGroup>

                <FormGroup className="w-100 d-flex mb-3">
                  <FormLabel className="w-100 mx-2">
                    Email Id:
                    <FormControl
                      type="Email"
                      name="Email"
                      id="Email"
                      placeholder="example@gmail.com"
                      className=""
                      defaultValue={userEmail}
                      readOnly
                    ></FormControl>
                  </FormLabel>
                  <FormLabel className="w-100 mx-2">
                    Contact Number:
                    <FormControl
                      type="tel"
                      name="Tel"
                      id="Tel"
                      placeholder="9820010254"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      className=""
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
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
                    name="profileImage"
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

            <fieldset className="mb-3">
              <legend className="mt-3">Address :</legend>

              <FormLabel className="w-100 mx-2">
                Address:
                <FormControl
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your home address"
                  className=""
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                ></FormControl>
              </FormLabel>

              <FormGroup className="w-100 d-flex mb-3">
                <FormLabel className="w-100 mx-1">
                  Country:
                  <select
                    className="form-select"
                    type="text"
                    name="Country"
                    id="Country"
                    onChange={countryChange}
                  >
                    <option defaultValue>Select Country</option>
                    {countries.map((country) => (
                      <option value={country.name}>{country.name}</option>
                    ))}
                  </select>
                </FormLabel>
                <FormLabel className="w-100 mx-1">
                  State:
                  <select
                    className="form-select"
                    type="text"
                    name="State"
                    id="State"
                    onChange={stateChange}
                  >
                    <option defaultValue>Select State</option>
                    {states &&
                      states.map((state) => (
                        <option value={state.name}>{state.name}</option>
                      ))}
                  </select>
                </FormLabel>
                <FormLabel className="w-100 mx-1">
                  City:
                  <select
                    className="form-select"
                    type="text"
                    name="City"
                    id="City"
                    onChange={cityChange}
                  >
                    <option defaultValue>Select State</option>
                    {states &&
                      cities.map((city) => (
                        <option value={city.name}>{city.name}</option>
                      ))}
                  </select>
                </FormLabel>
                <FormLabel className="w-100 mx-1">
                  PinCode:
                  <FormControl
                    type="number"
                    name="ZipCode"
                    id="ZipCode"
                    placeholder="400072"
                    className=""
                    value={pinCode}
                    onChange={(e) => setPincode(e.target.value)}
                  ></FormControl>
                </FormLabel>
              </FormGroup>
            </fieldset>
          </>
        )}
        {formState === 2 && (
          <>
            <fieldset className="mb-5">
              <div className="d-flex">
                <legend>Education Details:</legend>

                {education.length > 0 && (
                  <Button
                    style={{ width: 130 }}
                    onClick={addNewEducation}
                    className=" d-flex justify-content-around align-items-center "
                  >
                    Add More <FontAwesomeIcon icon={faPlus} />
                  </Button>
                )}
              </div>

              {education.map((input, index) => {
                return (
                  <div className=" border px-2 py-2 my-3 d-flex justify-content-around align-items-center">
                    <div className="col-11">
                      <h3>{input.school}</h3>
                      <h6>
                        {input.degree},{input.field}
                      </h6>
                      <p>
                        {input.educationStartDate}-{input.educationEndDate}
                      </p>
                      {/* <p>
                        <strong>Grade :{input.grade}</strong>
                      </p> */}
                    </div>
                    <div className="d-flex">
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        className="col-12"
                        icon={faPenToSquare}
                        onClick={() => EditEducation(index)}
                      />
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        className="col-12"
                        onClick={() => removeEducation(index)}
                        icon={faTrash}
                      />
                    </div>
                  </div>
                );
              })}
              {education.length == 0 && (
                <div
                  style={{ width: "200px", height: "150px", cursor: "pointer" }}
                  className="d-flex flex-column border rounded border-primary justify-content-center align-items-center"
                  onClick={addNewEducation}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <p>Add Education</p>
                </div>
              )}

              {showEditEducation.show === true && (
                <Modal show={showEditEducation.show}>
                  <FormGroup className="px-4 pt-5 mb-2">
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="position-absolute "
                      style={{ cursor: "pointer", top: "10px", right: "10px" }}
                      onClick={() => {
                        setShowEditEducation({});
                        removeEducation(education.length - 1);
                      }}
                    />
                    <FormLabel className="w-100   my-2 ">
                      School :
                      <FormControl
                        type="text"
                        name="school"
                        placeholder="Vidyalankar Polytechnic"
                        className=""
                        value={showEditEducation.value.school}
                        onChange={(event) =>
                          handleEducationFormChange(
                            showEditEducation.index,
                            event
                          )
                        }
                        required
                      ></FormControl>
                    </FormLabel>
                    <FormLabel className="w-100 my-2">
                      Degree :
                      <FormControl
                        type="text"
                        name="degree"
                        placeholder="B.Tech"
                        className=""
                        value={showEditEducation.value.degree}
                        onChange={(event) =>
                          handleEducationFormChange(
                            showEditEducation.index,
                            event
                          )
                        }
                        required
                      ></FormControl>
                    </FormLabel>
                    <FormLabel className="w-100  my-2">
                      Field :
                      <FormControl
                        type="text"
                        name="field"
                        placeholder="AI & DS"
                        className=""
                        value={showEditEducation.value.field}
                        onChange={(event) =>
                          handleEducationFormChange(
                            showEditEducation.index,
                            event
                          )
                        }
                        required
                      ></FormControl>
                    </FormLabel>

                    <div className="d-flex  my-2">
                      <FormLabel className="w-100 mx-1 my-2">
                        Start Date :
                        <FormControl
                          type="date"
                          name="educationStartDate"
                          className=""
                          value={showEditEducation.value.educationStartDate}
                          onChange={(event) =>
                            handleEducationFormChange(
                              showEditEducation.index,
                              event
                            )
                          }
                          required
                        ></FormControl>
                      </FormLabel>
                      <FormLabel className="w-100 mx-1 my-2">
                        End Date :
                        <FormControl
                          type="date"
                          name="educationEndDate"
                          className=""
                          value={showEditEducation.value.educationEndDate}
                          onChange={(event) =>
                            handleEducationFormChange(
                              showEditEducation.index,
                              event
                            )
                          }
                          required
                        ></FormControl>
                      </FormLabel>
                    </div>
                    <div className="text-center pt-2">
                      <Button type="submit" onClick={submitEducationhandler}>
                        Submit
                      </Button>
                    </div>
                    {error && <p className="text-danger ms-3 mt-3">{error}</p>}
                  </FormGroup>
                </Modal>
              )}
            </fieldset>
          </>
        )}
        {formState === 3 && (
          <>
            <fieldset>
              <legend>Other Details :</legend>
              <FormGroup className="px-3 py-5">
                <FormLabel className="w-100 my-2 ">
                  Language :
                  <div>
                    <Select
                      isMulti
                      name="languages"
                      options={LanguageOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={selectedLanguages}
                      onChange={handleLanguageChange}
                    />
                  </div>
                </FormLabel>
                <FormLabel className="w-100 my-2">
                  Skills:
                  <div>
                    <Select
                      isMulti
                      name="skills"
                      options={skillOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={skills}
                      onChange={handleSkillsChange}
                      onInputChange={(inputValue, { action }) => {
                        if (action === "input-change") {
                          fetchSkills(inputValue, (options) => {
                            // Update the dropdown options
                            return options;
                          });
                        }
                      }}
                    />
                  </div>
                </FormLabel>
                <FormLabel className="w-100 my-2">
                  Professional Role :
                  <FormControl
                    type="text"
                    name="professionalRole"
                    placeholder="your role"
                    onChange={(e) => setProfessionalRole(e.target.value)}
                    value={professionalRole}
                  ></FormControl>
                </FormLabel>
                <FormLabel className="w-100  my-2">
                  Bio :
                  <textarea
                    type="text"
                    name="Bio"
                    placeholder="Your Bio here..."
                    className="form-control"
                    required
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                  ></textarea>
                </FormLabel>
              </FormGroup>
            </fieldset>
          </>
        )}
        {formState === 4 && (
          <>
            <fieldset className="mb-5">
              <div className="d-flex">
                <legend>Projects Details:</legend>
                {projects.length > 0 && (
                  <Button
                    style={{ width: 130 }}
                    onClick={addNewProjects}
                    className=" d-flex justify-content-around align-items-center "
                  >
                    Add More <FontAwesomeIcon icon={faPlus} />
                  </Button>
                )}
              </div>

              {projects.map((input, index) => {
                return (
                  <div className=" border px-2 py-2 my-3 d-flex justify-content-around align-items-center">
                    <div className="col-11">
                      <h3> Title :{input.projectName}</h3>
                      <h6> Description :{input.projectDescription}</h6>
                      <p>
                        {input.projectStartDate}-{input.projectEndDate}
                      </p>
                      <p>
                        <strong>associated :{input.associatedWith}</strong>
                      </p>
                    </div>
                    <div className="d-flex">
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        className="col-12"
                        icon={faPenToSquare}
                        onClick={() => EditProjects(index)}
                      />
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        className="col-12"
                        onClick={() => removeProjects(index)}
                        icon={faTrash}
                      />
                    </div>
                  </div>
                );
              })}
              {projects.length == 0 && (
                <div
                  style={{ width: "200px", height: "150px " }}
                  className="d-flex flex-column border rounded border-primary justify-content-center align-items-center"
                  onClick={addNewProjects}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <p>Add Projects</p>
                </div>
              )}

              {showEditProjects.show === true && (
                <Modal show={showEditProjects.show}>
                  <FormGroup className="px-4 pt-5 mb-4">
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="position-absolute "
                      style={{ cursor: "pointer", top: "10px", right: "10px" }}
                      onClick={() => {
                        setshowEditProjects({});
                        removeProjects(projects.length - 1);
                      }}
                    />
                    <FormLabel className="w-100 my-2 ">
                      Project Title :
                      <FormControl
                        type="text"
                        name="projectName"
                        placeholder="that Guys"
                        className=""
                        value={showEditProjects.value.projectName}
                        onChange={(event) =>
                          handleProjectsFormChange(
                            showEditProjects.index,
                            event
                          )
                        }
                        required
                      ></FormControl>
                    </FormLabel>
                    <FormLabel className="w-100  my-2">
                      Description :
                      <textarea
                        type="text"
                        name="projectDescription"
                        placeholder="very goood"
                        className="form-control"
                        value={showEditProjects.value.projectDescription}
                        onChange={(event) =>
                          handleProjectsFormChange(
                            showEditProjects.index,
                            event
                          )
                        }
                        required
                      ></textarea>
                    </FormLabel>
                    <FormLabel className="w-100 my-2">
                      Asssociated With :
                      <FormControl
                        type="text"
                        name="associatedWith"
                        placeholder="AI & DS"
                        className=""
                        value={showEditProjects.value.associatedWith}
                        onChange={(event) =>
                          handleProjectsFormChange(
                            showEditProjects.index,
                            event
                          )
                        }
                        required
                      ></FormControl>
                    </FormLabel>

                    <div className="d-flex my-2">
                      <FormLabel className="w-100 mx-1 my-2">
                        Start Date :
                        <FormControl
                          type="date"
                          name="projectStartDate"
                          className=""
                          value={showEditProjects.value.projectStartDate}
                          onChange={(event) =>
                            handleProjectsFormChange(
                              showEditProjects.index,
                              event
                            )
                          }
                          required
                        ></FormControl>
                      </FormLabel>
                      <FormLabel className="w-100 mx-1 my-2">
                        End Date :
                        <FormControl
                          type="date"
                          name="projectEndDate"
                          className=""
                          value={showEditProjects.value.projectEndDate}
                          onChange={(event) =>
                            handleProjectsFormChange(
                              showEditProjects.index,
                              event
                            )
                          }
                          required
                        ></FormControl>
                      </FormLabel>
                    </div>
                    <div className="text-center pt-3">
                      <Button type="submit" onClick={submitProjectshandler}>
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
        {formState === 5 && (
          <>
            <fieldset className="mb-5">
              <div className="d-flex">
                <legend>Work Experience:</legend>
                {workExperience.length > 0 && (
                  <Button
                    style={{ width: 130 }}
                    onClick={addNewWorkExperience}
                    className=" d-flex justify-content-around align-items-center "
                  >
                    Add More <FontAwesomeIcon icon={faPlus} />
                  </Button>
                )}
              </div>

              {workExperience.map((input, index) => {
                return (
                  <div className=" border px-2 py-2 my-3 d-flex justify-content-around align-items-center">
                    <div className="col-11">
                      <h3>{input.title}</h3>
                      <h6>
                        {input.company},{input.location}
                      </h6>
                      <p>{input.workCountry}</p>
                      <p>{input.workIndustry}</p>
                      <p>
                        {input.startDate} - {input.endDate}
                      </p>
                      <p>{input.description}</p>
                    </div>
                    <div className="d-flex">
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        className="col-12"
                        icon={faPenToSquare}
                        onClick={() => EditWorkExperience(index)}
                      />
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        className="col-12"
                        onClick={() => removeWorkExperience(index)}
                        icon={faTrash}
                      />
                    </div>
                  </div>
                );
              })}
              {workExperience.length == 0 && (
                <div
                  style={{ width: "200px", height: "150px " }}
                  className="d-flex flex-column border rounded border-primary justify-content-center align-items-center"
                  onClick={addNewWorkExperience}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <p>Add Work Experience</p>
                </div>
              )}

              {showEditWorkExperience.show === true && (
                <Modal show={showEditWorkExperience.show}>
                  <FormGroup className="px-4 pt-5 pb-3">
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="position-absolute "
                      style={{ cursor: "pointer", top: "10px", right: "10px" }}
                      onClick={() => {
                        setshowEditWorkExperience({});
                        removeWorkExperience(workExperience.length - 1);
                      }}
                    />
                    <FormLabel className="w-100 my-2 ">
                      Title :
                      <FormControl
                        type="text"
                        name="title"
                        placeholder="Vidyalankar Polytechnic"
                        className=""
                        value={showEditWorkExperience.value.title}
                        onChange={(event) =>
                          handleWorkExperienceFormChange(
                            showEditWorkExperience.index,
                            event
                          )
                        }
                        required
                      ></FormControl>
                    </FormLabel>

                    <FormLabel className="w-100 my-2">
                      Company :
                      <FormControl
                        type="text"
                        name="company"
                        placeholder="TCS"
                        className=""
                        value={showEditWorkExperience.value.company}
                        onChange={(event) =>
                          handleWorkExperienceFormChange(
                            showEditWorkExperience.index,
                            event
                          )
                        }
                        required
                      ></FormControl>
                    </FormLabel>
                    <FormLabel className="w-100 my-2">
                      Work Indusrty :
                      <select
                        className="form-select"
                        name="workIndustry"
                        onChange={(event) =>
                          handleWorkExperienceFormChange(
                            showEditWorkExperience.index,
                            event
                          )
                        }
                      >
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                      </select>
                    </FormLabel>
                    <FormLabel className="w-100 my-2">
                      Location :
                      <FormControl
                        type="text"
                        name="location"
                        placeholder="Mumbai"
                        className=""
                        value={showEditWorkExperience.value.location}
                        onChange={(event) =>
                          handleWorkExperienceFormChange(
                            showEditWorkExperience.index,
                            event
                          )
                        }
                        required
                      ></FormControl>
                    </FormLabel>
                    <FormLabel className="w-100 my-2">
                      Country :
                      <select
                        className="form-select"
                        name="workCountry"
                        onChange={(event) =>
                          handleWorkExperienceFormChange(
                            showEditWorkExperience.index,
                            event
                          )
                        }
                      >
                        <option
                          defaultValue
                          value={showEditWorkExperience.value.workCountry}
                        >
                          {showEditWorkExperience.value.workCountry}
                        </option>
                        {countries.map((country) => (
                          <option value={country.name}>{country.name}</option>
                        ))}
                      </select>
                    </FormLabel>
                    <FormLabel className="w-100 ">
                      Description :
                      <textarea
                        name="description"
                        className="form-control"
                        value={showEditWorkExperience.value.description}
                        onChange={(event) =>
                          handleWorkExperienceFormChange(
                            showEditWorkExperience.index,
                            event
                          )
                        }
                        required
                      ></textarea>
                    </FormLabel>
                    <div className="d-flex my-2">
                      <FormLabel className="w-100 mx-1 my-2">
                        Start Date :
                        <FormControl
                          type="date"
                          name="startDate"
                          className=""
                          value={showEditWorkExperience.value.startDate}
                          onChange={(event) =>
                            handleWorkExperienceFormChange(
                              showEditWorkExperience.index,
                              event
                            )
                          }
                          required
                        ></FormControl>
                      </FormLabel>
                      <FormLabel className="w-100 mx-1 my-2">
                        End Date :
                        <FormControl
                          type="date"
                          name="endDate"
                          className=""
                          value={showEditWorkExperience.value.endDate}
                          onChange={(event) =>
                            handleWorkExperienceFormChange(
                              showEditWorkExperience.index,
                              event
                            )
                          }
                          required
                        ></FormControl>
                      </FormLabel>
                    </div>
                    <div className="text-center pt-3">
                      <Button
                        type="submit"
                        onClick={submithandelWorkExperience}
                      >
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
        {formState === 6 && (
          <>
            <fieldset className="my-5">
              <div className="d-flex">
                <legend>Certificate Details:</legend>

                {certificate.length > 0 && (
                  <Button
                    style={{ width: 130 }}
                    onClick={addNewCertificate}
                    className=" d-flex justify-content-around align-items-center "
                  >
                    Add More <FontAwesomeIcon icon={faPlus} />
                  </Button>
                )}
              </div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                {certificate.map((input, index) => {
                  return (
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        style={{ height: "200px" }}
                        className="card-img-top"
                        src={input.certificateImage}
                        alt={input.certificateName}
                      />

                      <div className="card-body ">
                        <h5 className="card-title">{input.certificateName}</h5>
                        <p className="card-text">
                          {input.certificateDescription}
                        </p>
                        <div className="d--flex">
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            className="col-6"
                            icon={faPenToSquare}
                            onClick={() => EditCertificate(index)}
                          />
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            className="col-6"
                            onClick={() => removeCertificate(index)}
                            icon={faTrash}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {certificate.length == 0 && (
                  <div
                    style={{ width: "200px", height: "150px " }}
                    className="d-flex flex-column border rounded border-primary justify-content-center align-items-center"
                    onClick={addNewCertificate}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    <p>Add Certificates</p>
                  </div>
                )}
              </div>
              {showEditCertificate.show && (
                <Modal show={showEditCertificate.show}>
                  <FormGroup className="px-4 pt-5 pb-3">
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="position-absolute "
                      style={{ cursor: "pointer", top: "10px", right: "10px" }}
                      onClick={() => {
                        setshowEditCertificate({});
                        removeCertificate(certificate.length - 1);
                      }}
                    />
                    <FormLabel className="w-100 my-2 ">
                      Certificate Name :
                      <div>
                        <FormControl
                          type="text"
                          name="certificateName"
                          className=""
                          value={showEditCertificate.value.certificateName}
                          onChange={(event) =>
                            handleCertificateFormChange(
                              showEditCertificate.index,
                              event
                            )
                          }
                        />
                      </div>
                    </FormLabel>
                    <FormLabel className="w-100  my-2">
                      Images :
                      <FormControl
                        type="file"
                        name="certificateImage"
                        className=""
                        required
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(event) =>
                          handleCertificateFormChange(
                            showEditCertificate.index,
                            event
                          )
                        }
                      ></FormControl>
                    </FormLabel>

                    <FormLabel className="w-100  my-2">
                      Description :
                      <textarea
                        type="text"
                        name="certificateDescription"
                        placeholder="....."
                        className="form-control"
                        required
                        value={showEditCertificate.value.certificateDescription}
                        onChange={(event) =>
                          handleCertificateFormChange(
                            showEditCertificate.index,
                            event
                          )
                        }
                      ></textarea>
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
          {formState < 6 && (
            <Button
              className="bg-success col-1 d-flex justify-content-center align-items-center  "
              onClick={() => setFromState(formState + 1)}
            >
              <strong>Next</strong> &nbsp;&nbsp;
              <FontAwesomeIcon icon={faAnglesRight} />
            </Button>
          )}
        </div>
        {formState == 6 && (
          <div className="w-100 d-flex justify-content-end">
            <Button
              type="submit"
              className="bg-success col-3 d-flex justify-content-center align-items-center "
            >
              <strong>Create Profile</strong>
              {/* onClick={updateProfile} */}
            </Button>
          </div>
        )}
      </form>
    </section>
  );
}
export default UserProfile;
