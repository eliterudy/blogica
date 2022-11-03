import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Navbar,
  InputGroup,
  Input,
  Label,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Button,
  Spinner,
} from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { cssHover } from "../../components/generic/hoverProps";
import { useMediaQuery } from "react-responsive";
import FormValidators from "../../utils/FormValidators";

import apis from "../../config/api";
import { icons, constants } from "../../config/configuration";
import Generic from "../../components/generic/GenericComponents";

interface SignupFormValues {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  image: null | File;
  password: string;
  confirmPassword: string;
  bio: string;
}
const SignUpComponent = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const signUpButtonStyle = cssHover(
    {
      backgroundColor: "#2b59a1",
      color: "white",
    },
    {
      backgroundColor: "white",
      color: "#2b59a1",
    },
    {
      cursor: "pointer",
      width: "100%",
      borderWidth: 1,
      borderColor: "#2b59a1",
    }
  );
  const state = useSelector((state: any) => {
    return { userState: state.userActionReducer };
  });

  const [imagePreview, updateImagePreview] = useState<undefined | string>(
    undefined
  );
  const [formValues, updateFormValues] = useState<SignupFormValues>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    image: null,
    password: "",
    confirmPassword: "",
    bio: "",
  });
  const [formErrors, updateFormErrors] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });

  const [usernameAvailableMessage, updateUsernameAvailableMessage] = useState(
    ""
  );

  const [usernameAvailableStatus, updateUsernameAvailableStatus] = useState(
    false
  );

  const [isLoading, updateLoading] = useState(false);

  useEffect(() => {
    document.title = `Sign Up with ${constants.APP_NAME}`;
  }, []);

  useEffect(() => {
    if (!formValues.image) {
      updateImagePreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(formValues.image);
    updateImagePreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [formValues.image]);

  useEffect(() => {
    if (!textValidator(formValues.username, 5, 20)[1]) {
      updateUsernameAvailableMessage("");
      apis
        .usernameCheck({
          username: formValues.username,
        })
        .then(({ data }) => {
          if (data.status === "failed") {
            updateUsernameAvailableStatus(false);
            updateUsernameAvailableMessage(data.message);
          } else {
            if (data.status === "success") {
              updateUsernameAvailableStatus(true);

              updateUsernameAvailableMessage(data.message);
            }
          }
        })
        .catch((err) => {
          if (err && err.message && err.message === "Network Error") {
            alert(
              "This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again"
            );
          } else {
            updateUsernameAvailableMessage("data.message");
          }
        });
    }
  }, [formValues.username]);
  const {
    textValidator,
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
  } = FormValidators;
  return (
    <div className="p-3">
      <div className="noselect col-12 d-flex flex-row justify-content-center my-5  ">
        <div
          className="noselect col-12 col-sm-10 col-md-10 col-lg-8 col-xl-8 m-2 row"
          style={isTabletOrMobile ? {} : { border: "1px solid #eee" }}
        >
          <div className="col-12 col-md-7">
            <div className="col-12  p-2 ">
              <div className=" mx-5 mt-3 d-flex flex-column align-items-center">
                <img
                  className="noselect m-auto"
                  src={icons.app_logo}
                  width={100}
                  alt={constants.APP_NAME}
                />

                <span className="noselect col-auto  mb-0 mt-2 align-middle h3 ">
                  {`Sign Up to ${constants.APP_NAME}`}
                </span>
              </div>
              {isTabletOrMobile && (
                <div className="d-flex flex-row justify-content-center mt-4">
                  {imagePreview ? (
                    <Generic.Avatar
                      image_url={imagePreview}
                      fullname={
                        formValues.firstname + " " + formValues.lastname
                      }
                      size={140}
                    />
                  ) : (
                    <div
                      className="bg-secondary d-flex flex-row justify-content-center align-items-center"
                      style={{ width: 140, height: 140, borderRadius: 140 }}
                    >
                      <i
                        className=" img-fluid fa fa-user fa-lg "
                        style={{ fontSize: 120, color: "white" }}
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="col-12  mt-3  p-3 ">
                <Form>
                  {/* Username */}
                  <FormGroup className="mb-4">
                    <Label for="username">
                      Username<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      invalid={formErrors.username.length > 0}
                      type="text"
                      name="username"
                      id="username"
                      placeholder="johndoe321"
                      value={formValues.username}
                      onChange={async ({ target }) => {
                        updateFormValues({
                          ...formValues,
                          username: target.value,
                        });
                        await updateFormErrors({
                          ...formErrors,
                          username: textValidator(target.value, 5, 20)[0],
                        });
                      }}
                      onBlur={({ target }) => {
                        updateFormErrors({
                          ...formErrors,
                          username: textValidator(target.value, 5, 20)[0],
                        });
                      }}
                    />
                    <FormText>
                      {usernameAvailableMessage.length > 0 &&
                        formErrors.username.length === 0 && (
                          <em
                            className={`text-${
                              usernameAvailableStatus ? "success" : "danger"
                            }`}
                          >
                            <i
                              className={`fa  ${
                                usernameAvailableStatus
                                  ? "fa-check-circle-o"
                                  : "fa-ban"
                              }`}
                            />

                            <span> {usernameAvailableMessage}</span>
                          </em>
                        )}
                    </FormText>
                    <FormFeedback>{formErrors.username}</FormFeedback>
                  </FormGroup>

                  {/* Firstname */}
                  <FormGroup className="mb-4">
                    <Label for="firstname">
                      First name<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      invalid={formErrors.firstname.length > 0}
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="John"
                      value={formValues.firstname}
                      onChange={({ target }) => {
                        updateFormValues({
                          ...formValues,
                          firstname: target.value,
                        });
                        updateFormErrors({
                          ...formErrors,
                          firstname: textValidator(target.value, 2, 20)[0],
                        });
                      }}
                      onBlur={({ target }) => {
                        updateFormErrors({
                          ...formErrors,
                          firstname: textValidator(target.value, 2, 20)[0],
                        });
                      }}
                    />
                    <FormFeedback>{formErrors.firstname}</FormFeedback>
                  </FormGroup>

                  {/* Lastname */}
                  <FormGroup className="mb-4">
                    <Label for="lastname">
                      Last name<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      invalid={formErrors.lastname.length > 0}
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Doe"
                      value={formValues.lastname}
                      onChange={({ target }) => {
                        updateFormValues({
                          ...formValues,
                          lastname: target.value,
                        });
                        updateFormErrors({
                          ...formErrors,
                          lastname: textValidator(target.value, 2, 20)[0],
                        });
                      }}
                      onBlur={({ target }) => {
                        updateFormErrors({
                          ...formErrors,
                          lastname: textValidator(target.value, 2, 20)[0],
                        });
                      }}
                    />
                    <FormFeedback>{formErrors.lastname}</FormFeedback>
                  </FormGroup>

                  {/* Profile Picture */}
                  <FormGroup className="mb-4">
                    <Label for="profile-picture">
                      Profile picture
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      invalid={formErrors.image.length > 0}
                      type="file"
                      name="profile-picture"
                      id="profile-picture"
                      accept="image/*"
                      onChange={(e) => {
                        var file = e.target.files;

                        if (file && file.length > 0) {
                          updateFormValues({
                            ...formValues,
                            image: file[0],
                          });
                          updateFormErrors({
                            ...formErrors,
                            image: "",
                          });
                        } else {
                          updateFormValues({
                            ...formValues,
                            image: null,
                          });
                          updateFormErrors({
                            ...formErrors,
                            image: "Please upload profile picture",
                          });
                        }
                      }}
                    />
                    <FormFeedback>{formErrors.image}</FormFeedback>
                  </FormGroup>

                  {/* Bio */}
                  <FormGroup className="mb-4">
                    <Label for="bio">
                      About me<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      invalid={formErrors.bio.length > 0}
                      type="textarea"
                      name="bio"
                      id="bio"
                      placeholder="John"
                      value={formValues.bio}
                      onChange={({ target }) => {
                        updateFormValues({
                          ...formValues,
                          bio: target.value,
                        });
                        updateFormErrors({
                          ...formErrors,
                          bio: textValidator(target.value, 10, 1000)[0],
                        });
                      }}
                      onBlur={({ target }) => {
                        updateFormErrors({
                          ...formErrors,
                          bio: textValidator(target.value, 10, 200)[0],
                        });
                      }}
                    />
                    <FormText>{`${formValues.bio.length} / 200`}</FormText>
                    <FormFeedback>{formErrors.bio}</FormFeedback>
                  </FormGroup>

                  {/* Email */}
                  <FormGroup className="mb-4">
                    <Label for="email">
                      Email<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      invalid={formErrors.email.length > 0}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="johndoe123@gmail.com"
                      value={formValues.email}
                      onChange={({ target }) => {
                        updateFormValues({
                          ...formValues,
                          email: target.value,
                        });
                        updateFormErrors({
                          ...formErrors,
                          email: emailValidator(target.value)[0],
                        });
                      }}
                      onBlur={({ target }) => {
                        updateFormErrors({
                          ...formErrors,
                          email: emailValidator(target.value)[0],
                        });
                      }}
                    />
                    {/* <FormText>Example: johndoe123@gmail.com</FormText> */}
                    <FormFeedback>{formErrors.email}</FormFeedback>
                  </FormGroup>

                  {/* Password */}
                  <FormGroup className="mb-4">
                    <Label for="password">
                      Password<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      invalid={formErrors.password.length > 0}
                      type="password"
                      name="password"
                      id="password"
                      placeholder=""
                      value={formValues.password}
                      onChange={({ target }) => {
                        updateFormValues({
                          ...formValues,
                          password: target.value,
                        });
                        updateFormErrors({
                          ...formErrors,
                          password: passwordValidator(target.value, 6, 20)[0],
                        });
                      }}
                      onBlur={({ target }) => {
                        updateFormErrors({
                          ...formErrors,
                          password: passwordValidator(target.value, 6, 20)[0],
                        });
                      }}
                    />
                    <FormFeedback>{formErrors.password}</FormFeedback>
                  </FormGroup>

                  {/* Confirm Password */}
                  <FormGroup className="mb-4">
                    <Label for="confirmpassword">
                      Confirm Password<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      invalid={formErrors.confirmPassword.length > 0}
                      type="password"
                      name="confirmpassword"
                      id="confirmpassword"
                      placeholder=""
                      value={formValues.confirmPassword}
                      onChange={({ target }) => {
                        updateFormValues({
                          ...formValues,
                          confirmPassword: target.value,
                        });
                        updateFormErrors({
                          ...formErrors,
                          confirmPassword: confirmPasswordValidator(
                            target.value,
                            6,
                            20,
                            formValues.password
                          )[0],
                        });
                      }}
                      onBlur={({ target }) => {
                        updateFormErrors({
                          ...formErrors,
                          confirmPassword: confirmPasswordValidator(
                            target.value,
                            6,
                            20,
                            formValues.password
                          )[0],
                        });
                      }}
                    />
                    <FormFeedback>{formErrors.confirmPassword}</FormFeedback>
                  </FormGroup>

                  {/* Signup button */}
                  <Button
                    {...signUpButtonStyle}
                    onClick={(e) => {
                      e.preventDefault();
                      const {
                        username,
                        firstname,
                        lastname,
                        email,
                        password,
                        confirmPassword,
                        image,
                        bio,
                      } = formValues;
                      const {
                        textValidator,
                        emailValidator,
                        passwordValidator,
                        confirmPasswordValidator,
                      } = FormValidators;

                      if (
                        textValidator(username, 5, 20)[1] ||
                        textValidator(firstname, 2, 20)[1] ||
                        textValidator(lastname, 2, 20)[1] ||
                        image == null ||
                        textValidator(bio, 10, 1000)[0] ||
                        emailValidator(email)[1] ||
                        passwordValidator(password, 6, 20)[1] ||
                        confirmPasswordValidator(
                          confirmPassword,
                          6,
                          20,
                          password
                        )[1]
                      ) {
                        updateFormErrors({
                          ...formErrors,
                          username: textValidator(username, 5, 20)[0],
                          firstname: textValidator(firstname, 2, 20)[0],
                          lastname: textValidator(lastname, 2, 20)[0],
                          email: emailValidator(email)[0],
                          image: image ? "" : "Please upload profile picture",
                          password: passwordValidator(password, 6, 20)[0],
                          confirmPassword: confirmPasswordValidator(
                            confirmPassword,
                            6,
                            20,
                            password
                          )[0],
                          bio: textValidator(bio, 10, 1000)[0],
                        });
                      } else {
                        var tempSubmit: any = {
                          ...formValues,
                        };
                        delete tempSubmit["confirmPassword"];
                        // add api call here to signup user
                        updateLoading(true);
                        apis
                          .signup(formValues)
                          .then(({ data }) => {
                            alert(
                              "Account sucessfully created! Redirecting to Login"
                            );
                            updateLoading(false);

                            navigate("/auth/signin");
                          })
                          .catch((err) => {
                            if (
                              err &&
                              err.message &&
                              err.message === "Network Error"
                            ) {
                              alert(constants.NO_INTERNET_ALERT_MESSAGE);
                            } else {
                            }
                            updateLoading(false);
                            alert(err.message);
                          });
                      }
                    }}
                  >
                    {isLoading ? <Spinner size={"sm"} /> : <span>Sign Up</span>}
                  </Button>
                </Form>
              </div>
              <div className="col-12  p-3 ">
                <p className="text-center">
                  <span style={{ fontSize: 14 }}>
                    Already have an account.{" "}
                    <Link to="/auth/signin">Sign In</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
          {!isTabletOrMobile && (
            <div className="col-12 col-sm-5 d-flex justify-content-center align-items-center">
              <div className="col-12 d-flex flex-column align-items-center">
                {imagePreview ? (
                  <Generic.Avatar
                    image_url={imagePreview}
                    fullname={formValues.firstname + " " + formValues.lastname}
                    size={200}
                  />
                ) : (
                  <div
                    className="bg-secondary d-flex flex-row justify-content-center align-items-center"
                    style={{ width: 200, height: 200, borderRadius: 200 }}
                  >
                    <i
                      className=" img-fluid fa fa-user fa-lg "
                      style={{ fontSize: 140, color: "white" }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
