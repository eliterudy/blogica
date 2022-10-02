/* package inports */

import React, { useState, useRef, useEffect, LegacyRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FormGroup, Input, Label, Button, Alert } from "reactstrap";

import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";

import { icons } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import ReactDOM from "react-dom";

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["clean"], // remove formatting button
];

interface ArticleForm {
  title: string;
  image: null | File;
  description: string;
}

const NewArticle = (props: any) => {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(false);
  const [formValues, updateFormValues] = useState<ArticleForm>({
    title: "",
    image: null,
    description: "",
  });
  const [formErrors, updateFormErrors] = useState({
    title: "",
    image: "",
    description: "",
  });

  const state = useSelector((state: any) => {
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;

  console.log(formValues.description);

  return (
    <div className="col-12 d-flex flex-column flex-grow-1 p-4 container-fluid">
      <div className="col-12 row mb-5 ms-1">
        <div className="col-12 col-md-8 ps-1">
          <h1
            className=" text-center text-md-start mb-0 "
            style={{ fontSize: 60, color: "#666" }}
          >
            Write a new article
          </h1>
        </div>
        <div className="col-12 col-md-4 d-flex justify-content-end align-items-end">
          <Button
            disabled={
              formValues.description == "" ||
              formValues.description == "<p><br></p>" ||
              formValues.image == null ||
              formValues.title == ""
            }
            className={" bg-success px-4 "}
            style={{ borderRadius: 40, height: 40 }}
            onClick={() => {}}
          >
            <span>Publish Article</span>
          </Button>
        </div>
      </div>
      <Input
        className="mb-4"
        style={{
          backgroundColor: "#eee",
          border: "0px",
          borderRadius: 5,
          fontSize: 32,
          fontWeight: "bold",
        }}
        placeholder={"Title"}
        value={formValues.title}
        onChange={(e) =>
          updateFormValues({ ...formValues, title: e.target.value })
        }
      />
      <div className="mb-4 d-flex ">
        <FileUploader
          image={formValues.image}
          handleFile={(callback: any) => {
            console.log(callback);
            updateFormValues({ ...formValues, image: callback });
          }}
        />
      </div>

      <ReactQuill
        className="mb-5 col-12"
        style={{ flex: 1, backgroundColor: "#eee" }}
        theme="bubble"
        value={formValues.description}
        onChange={(e) => updateFormValues({ ...formValues, description: e })}
        modules={{ toolbar: toolbarOptions }}
        placeholder={"Write what is on your mind"}
      />

      {/* <div className="d-flex flex-row justify-content-center align-items-center">
        <Button
          className={" bg-primary px-4 "}
          style={{ borderRadius: 40, height: 40 }}
          onClick={() => {}}
        >
          <span>Scroll to top</span>
        </Button>
      </div> */}
    </div>
  );
};

const FileUploader = (props: any) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef() as React.MutableRefObject<
    HTMLInputElement
  >;

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event: any) => {
    if (hiddenFileInput && hiddenFileInput.current /* + other conditions */) {
      hiddenFileInput.current.click();
    }
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event: any) => {
    console.log(event.target.files);
    if (event.target.files.length > 0) {
      console.log("here,");
      const fileUploaded = event.target.files[0];
      props.handleFile(fileUploaded);
    }
  };
  return (
    <div className="d-flex flex-grow-1">
      <Button
        className={`d-flex flex-grow-1 ${
          props.image ? "bg-success" : "bg-primary"
        }`}
        onClick={handleClick}
      >
        <span>
          <i
            className={`fa ${
              props.image ? "fa-upload" : "fa-upload"
            } fa-md me-2`}
          />
          {props.image ? "Re-Upload article poster " : "Upload article poster "}
        </span>
      </Button>
      <input
        ref={hiddenFileInput}
        type="file"
        name="article-poster"
        id="article-poster"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default NewArticle;
