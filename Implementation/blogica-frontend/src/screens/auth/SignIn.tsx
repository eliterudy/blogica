import React, { useState, useEffect } from "react";
import {
  Input,
  Label,
  Form,
  FormGroup,
  FormFeedback,
  Button,
  Spinner,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { cssHover } from "../../components/generic/hoverProps";
import { useMediaQuery } from "react-responsive";
import apis from "../../config/api";
import FormValidators from "../../utils/FormValidators";
import { constants, icons } from "../../config/configuration";
import { loadUser } from "../../redux/actionReducers/userReducer";

const SignInComponent = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const [isErrorVisible, updateErrorVisible] = useState(false);
  const [formValues, updateFormValues] = useState({
    username: "",
    password: "",
  });
  const [formErrors, updateFormErrors] = useState({
    username: "",
    password: "",
  });
  const [isLoading, updateLoading] = useState(false);
  const [responseError, updateError] = useState("");
  const [isShowingPassword, updateShowingPassword] = useState(false);

  const state = useSelector((state: any) => {
    // eslint-disable-next-line no-labels, no-label-var
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;
  const signInButtonStyle = cssHover(
    {
      borderWidth: 1,
      borderColor: "#2b59a1",
      backgroundColor: "#2b59a1",
      color: "white",
    },
    {
      borderWidth: 1,
      borderColor: "#2b59a1",
      backgroundColor: "white",
      color: "#2b59a1",
    },
    {
      cursor: "pointer",
      width: "100%",
    }
  );

  const signUpButtonStyle = cssHover(
    {
      borderWidth: 1,
      borderColor: "#2b3c65",
      backgroundColor: "#2b3c65",
      color: "white",
    },
    {
      borderWidth: 1,
      borderColor: "#2b3c65",
      backgroundColor: "white",
      color: "#2b3c65",
    },
    {
      cursor: "pointer",
      width: "100%",
    }
  );
  useEffect(() => {
    document.title = `Sign In with ${constants.APP_NAME}`;
  }, []);

  const submitLoginDetailsToApi = () => {
    // alert('Either username or password is not entered');
    const { username, password } = formValues;
    const { textValidator, passwordValidator } = FormValidators;
    if (
      textValidator(username, 4, 20)[1] ||
      passwordValidator(password, 6, 20)[1]
    ) {
      updateFormErrors({
        ...formErrors,
        username: textValidator(username, 4, 20)[0],
        password: passwordValidator(password, 6, 20)[0],
      });
    } else {
      // api here
      updateLoading(true);
      apis
        .signin({
          username: formValues.username,
          password: formValues.password,
        })
        .then(({ data }) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            dispatch(loadUser(data.user));
            updateLoading(false);
            navigate("/");
          } else {
            updateLoading(false);
            updateErrorVisible(true);
          }
        })
        .catch(({ response, message }) => {
          updateLoading(false);
          if (message && message === "Network Error") {
            alert(constants.NO_INTERNET_ALERT_MESSAGE);
          } else {
            if (response && response.data) {
              if (
                response.data.message &&
                response.data.name === "IncorrectUsernameError"
              ) {
                updateError(constants.USER_NOT_FOUND);
              } else {
                updateError(constants.INCORRECT_USERNAME_PASSWORD);
              }

              updateErrorVisible(true);
            }
          }
        });
    }
  };

  const { textValidator, passwordValidator } = FormValidators;
  return (
    <div className=" noselect">
      <div className=" noselect     col-12 d-flex flex-row justify-content-center my-5  ">
        <div className=" noselect     col-12 col-sm-9 col-md-7 col-xl-5 m-2">
          <div
            className=" noselect col-12  p-5"
            style={isTabletOrMobile ? {} : { border: "1px solid #eee" }}
          >
            <div className=" noselect mx-5 d-flex flex-column align-items-center">
              <img
                className=" noselect     m-auto"
                src={icons.app_logo}
                width={100}
                alt={constants.APP_NAME}
              />
              <span className=" noselect     col-auto  mb-0 mt-2 align-middle h3 ">
                {`Sign in to ${constants.APP_NAME}`}
              </span>
            </div>
            <div className=" noselect col-12  mt-3  ">
              {isErrorVisible && (
                <div
                  className=" noselect col-12 py-2 px-3 mb-3 "
                  style={{
                    borderRadius: 5,
                    border: "1px solid #ff9f94",
                    backgroundColor: "#ffcdc7",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 14, color: "#c41400" }}>
                    {responseError}
                  </span>
                  <i
                    className=" noselect fa fa-close "
                    onClick={() => updateErrorVisible(false)}
                  ></i>
                </div>
              )}
              <Form>
                <FormGroup className=" noselect mb-4">
                  <Label for="password">Username</Label>
                  <Input
                    invalid={formErrors.username.length > 0}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="John"
                    value={formValues.username}
                    onChange={({ target }) => {
                      updateFormValues({
                        ...formValues,
                        username: target.value,
                      });
                      updateFormErrors({
                        ...formErrors,
                        username: textValidator(target.value, 4, 20)[0],
                      });
                    }}
                  />
                  <FormFeedback>{formErrors.username}</FormFeedback>
                </FormGroup>
                <FormGroup className=" noselect mb-4">
                  <Label for="password">Password</Label>
                  <div className="col-12 d-flex position-relative">
                    <div
                      className="col-12 d-flex flex-column  flex-1"
                      style={{ paddingRight: 38 }}
                    >
                      <Input
                        className=" rounded-0 rounded-start border-end-1 rounded-end-0"
                        style={{ marginRight: 30 }}
                        invalid={formErrors.password.length > 0}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="***"
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
                      />
                      <FormFeedback>{formErrors.password}</FormFeedback>
                    </div>
                    <Button
                      className="px-2  d-flex  bg-transparent  position-absolute rounded-0 rounded-end"
                      style={{
                        // border: "0px solid",
                        border: "1px solid #bbb ",
                        paddingTop: 6,
                        paddingBottom: 6,
                        top: 0,
                        right: 0,
                      }}
                      onClick={() => {
                        updateShowingPassword(!isShowingPassword);
                      }}
                    >
                      {isShowingPassword ? (
                        <i className=" fa fa-eye fa-lg text-secondary my-1" />
                      ) : (
                        <i className=" fa fa-eye-slash fa-lg text-secondary my-1" />
                      )}
                    </Button>
                  </div>
                </FormGroup>
                <Button
                  {...signInButtonStyle}
                  onClick={(e) => {
                    e.preventDefault();
                    submitLoginDetailsToApi();
                  }}
                >
                  {isLoading ? <Spinner size={"sm"} /> : <span>Sign In</span>}
                </Button>
              </Form>
            </div>
            <div className=" noselect d-flex flex-row align-items-center mt-4 mb-3">
              <div style={{ flex: 1 }} className=" noselect border-bottom" />
              <span className=" noselect mx-2">{` or `}</span>
              <div style={{ flex: 1 }} className=" noselect border-bottom" />
            </div>

            <div className=" noselect col-12   ">
              <p className=" noselect text-center">
                <span style={{ fontSize: 14 }}>
                  If you haven't signed up with us yet and wish to access
                  premium features, sign up today
                </span>
              </p>
              <Button
                {...signUpButtonStyle}
                onClick={() => {
                  navigate("/auth/signup");
                }}
              >
                Create an account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
