/* package inports */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";

import { constants, icons } from "../../../config/configuration";
import apis from "../../../config/api";

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["clean"], // remove formatting button
];

interface ArticleFormValues {
  title: string;
  image?: null | File;
  description: string;
}

interface PassedProps {
  formData: ArticleFormValues;
  is_published: boolean;
  _id: string;
}

const NewArticle = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSplit = location.pathname.split("/");
  const isNew = pathSplit[pathSplit.length - 1] == "new";
  // const [draftTooltipStatus, updateDraftTooltipStatus] = useState(false);
  // const [publishTooltipStatus, updatePublishTooltipStatus] = useState(false);
  // const [updateTooltipStatus, updateUpdateTooltipStatus] = useState(false);
  const [isModalOpen, updateModalOpen] = useState(false);
  const [saveDraftLoading, updateSaveDraftLoading] = useState(false);
  const [publishDraftLoading, updatePublishDraftLoading] = useState(false);
  const [updateDraftLoading, updateUpdateDraftLoading] = useState(false);

  useEffect(() => {
    if (!isNew && location.state == null) {
      navigate("/");
    } else {
      document.title = isNew ? "New Article" : "Editting Article";
    }
  }, []);

  const [formValues, updateFormValues] = useState<ArticleFormValues>(
    isNew
      ? {
          title: "",
          image: null,
          description: "",
        }
      : location.state
      ? (location.state as PassedProps).formData
      : {
          title: "",
          description: "",
        }
  );

  const [formErrors, updateFormErrors] = useState({
    title: "",
    image: "",
    description: "",
  });

  const state = useSelector((state: any) => {
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;

  // const toggleDraftTooltip = () =>
  //   updateDraftTooltipStatus(!draftTooltipStatus);
  // const togglePublishTooltip = () =>
  //   updatePublishTooltipStatus(!publishTooltipStatus);
  // const toggleUpdateTooltip = () =>
  //   updateUpdateTooltipStatus(!updateTooltipStatus);
  const toggleModal = () => updateModalOpen(!isModalOpen);

  const isFormIncomplete =
    formValues.description == "" ||
    formValues.description == "<p><br></p>" ||
    formValues.title == "";

  const renderDiscardButton = () => {
    return (
      <Button
        className={" bg-danger my-1 px-3 border-0 mx-sm-1 col-12 col-sm-auto "}
        onClick={() => {
          toggleModal();
        }}
      >
        <span>
          <b>Discard Changes</b>
        </span>
      </Button>
    );
  };

  const renderDraftButton = (isNew: boolean) => {
    var isIncomplete = isNew
      ? isFormIncomplete || formValues.image == null
      : isFormIncomplete;
    return (
      <Button
        disabled={isIncomplete}
        className={` ${
          isIncomplete ? "bd-secondary" : "bg-primary"
        } my-1 px-3 border-0 mx-sm-1   col-12 col-sm-auto `}
        // id="draftButton"
        onClick={() => {
          updateUpdateDraftLoading(true);
          isNew
            ? apis
                .postArticle({ ...formValues, is_published: false })
                .then(({ data }) => {
                  updateUpdateDraftLoading(false);
                  navigate(-1);
                })
                .catch(({ response, message }) => {
                  if (message && message === "Network Error") {
                    alert(
                      "This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again"
                    );
                  } else {
                    if (response && response.data && response.data.error) {
                      alert(response.data.error);
                    } else {
                      alert(constants.OOPS_MESSAGE);
                    }
                  }

                  updateUpdateDraftLoading(false);
                })
            : location.state &&
              apis
                .putArticle((location.state as PassedProps)._id, {
                  ...formValues,
                  is_published: false,
                })
                .then(({ data }) => {
                  updateUpdateDraftLoading(false);
                  navigate(-1);
                })
                .catch(({ message, response }) => {
                  if (message && message === "Network Error") {
                    alert(
                      "This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again"
                    );
                  } else {
                    if (response && response.data && response.data.error) {
                      alert(response.data.error);
                    } else {
                      alert(constants.OOPS_MESSAGE);
                    }
                  }
                  updateUpdateDraftLoading(false);
                });
        }}
      >
        {updateDraftLoading ? (
          <div className=" noselect d-flex flex-row align-items-center">
            <Spinner color="light" size={"sm"} />{" "}
            <span className=" noselect ms-2">
              <b>Uploading Draft</b>
            </span>{" "}
          </div>
        ) : (
          <span>
            <b>{isNew ? "Save as Draft" : "Save Updated Draft"}</b>
          </span>
        )}
      </Button>
    );
  };

  const renderPublishButton = (isNew: boolean) => {
    var isIncomplete = isNew
      ? isFormIncomplete || formValues.image == null
      : isFormIncomplete;
    return (
      <Button
        disabled={isIncomplete}
        className={` ${
          isIncomplete ? "bd-secondary" : "bg-success"
        } my-1 px-3 border-0 mx-sm-1 col-12 col-sm-auto  `}
        onClick={() => {
          updatePublishDraftLoading(true);
          isNew
            ? apis
                .postArticle({ ...formValues, is_published: true })
                .then(({ data }) => {
                  updatePublishDraftLoading(false);
                  navigate(-1);
                })
                .catch(({ message, response }) => {
                  if (message && message === "Network Error") {
                    alert(
                      "This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again"
                    );
                  } else {
                    if (response && response.data && response.data.error) {
                      alert(response.data.error);
                    } else {
                      alert(constants.OOPS_MESSAGE);
                    }
                  }
                  updatePublishDraftLoading(false);
                })
            : location.state &&
              apis
                .putArticle((location.state as PassedProps)._id, {
                  ...formValues,
                  is_published: true,
                })
                .then(({ data }) => {
                  updateUpdateDraftLoading(false);
                  navigate(-1);
                })
                .catch(({ response, message }) => {
                  if (message && message === "Network Error") {
                    alert(
                      "This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again"
                    );
                  } else {
                    if (response && response.data && response.data.error) {
                      alert(response.data.error);
                    } else {
                      alert(constants.OOPS_MESSAGE);
                    }
                  }
                  updateUpdateDraftLoading(false);
                });
        }}
      >
        {publishDraftLoading ? (
          <div className=" noselect d-flex flex-row align-items-center">
            <Spinner color="light" size={"sm"} />{" "}
            <span className=" noselect ms-2">
              <b>Publishing Article</b>
            </span>{" "}
          </div>
        ) : (
          <span>
            <b>
              {location.state &&
              (location.state as PassedProps).is_published === true
                ? "Update Published Article"
                : isNew
                ? "Publish Article"
                : "Publish Saved Draft"}
            </b>
          </span>
        )}
      </Button>
    );
  };

  var titleMessage = "";
  if (isNew) {
    titleMessage = "Write A New Article";
  } else if (
    !isNew &&
    location.state &&
    (location.state as PassedProps).is_published == false
  ) {
    titleMessage = "Edit Article Draft";
  } else if (
    !isNew &&
    location.state &&
    (location.state as PassedProps).is_published == true
  ) {
    titleMessage = "Edit Published Article";
  }

  return (
    <div className=" noselect col-12 d-flex flex-column flex-grow-1 p-4 container-fluid new-article">
      <div className=" noselect col-12 d-flex justify-content-between align-items-center">
        <div className=" noselect flex-1 ">
          <h1
            className=" noselect text-center text-md-center mb-0 "
            style={{ fontSize: 36, color: "#666" }}
          >
            {titleMessage}
          </h1>
        </div>
        <Button
          className=" noselect rounded-pill bg-danger "
          onClick={() => toggleModal()}
        >
          <b>X</b>
        </Button>
      </div>
      <Input
        className=" noselect my-4"
        style={{
          backgroundColor: "#eee",
          border: "0px",
          borderRadius: 5,
          fontSize: 26,
        }}
        placeholder={"Title"}
        value={formValues.title}
        onChange={(e) =>
          updateFormValues({ ...formValues, title: e.target.value })
        }
      />
      {isNew && (
        <div className=" noselect mb-4 d-flex flex-column ">
          <FileUploader
            image={formValues.image}
            handleFile={(callback: any) => {
              updateFormValues({ ...formValues, image: callback });
            }}
          />
          <p
            className=" noselect subMessages mb-0 "
            style={{ fontSize: 14, marginLeft: 2 }}
          >
            {constants.UPLOAD_ARTICLE_POSTER_WARNING}
          </p>
        </div>
      )}

      <ReactQuill
        className=" noselect mb-4 col-12"
        style={{ flex: 1, backgroundColor: "#eee" }}
        theme="bubble"
        value={formValues.description}
        onChange={(e) => {
          updateFormValues({ ...formValues, description: e });
        }}
        modules={{ toolbar: toolbarOptions }}
        placeholder={"Write what is on your mind"}
      />

      {/* HEre */}
      {isNew && (
        <div className=" noselect col col-12 d-flex justify-content-center flex-wrap ">
          {renderDraftButton(isNew)}
          {renderPublishButton(isNew)}
          {renderDiscardButton()}
        </div>
      )}

      {!isNew &&
      location.state &&
      (location.state as PassedProps).is_published == false ? (
        <div className=" noselect col col-12 d-flex justify-content-center flex-wrap ">
          {renderDraftButton(isNew)}
          {renderPublishButton(isNew)}
          {renderDiscardButton()}
        </div>
      ) : null}

      {!isNew &&
      location.state &&
      (location.state as PassedProps).is_published == true ? (
        <div className=" noselect col col-12 d-flex justify-content-center flex-wrap ">
          {renderPublishButton(isNew)}
          {renderDiscardButton()}
        </div>
      ) : null}

      <Modal
        style={{
          paddingTop: 50,
        }}
        isOpen={isModalOpen}
      >
        <ModalHeader
          className=" noselect    "
          charCode="Y"
          toggle={() => {
            navigate(-1);
            toggleModal();
          }}
        >
          Discard Changes
        </ModalHeader>
        <ModalBody className=" noselect    ">
          You are about to lose all the changes you made to this{" "}
          {isNew ? "draft" : "article"}. Are you sure you want to proceed?
        </ModalBody>
        <ModalFooter>
          <Button
            className=" noselect bg-danger"
            onClick={() => {
              navigate(-1);
              toggleModal();
            }}
          >
            <b>Yes, I'm sure</b>
          </Button>
          <Button onClick={() => toggleModal()}>
            <span>Cancel</span>
          </Button>
        </ModalFooter>
      </Modal>
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
    if (event.target.files.length > 0) {
      const fileUploaded = event.target.files[0];
      props.handleFile(fileUploaded);
    }
  };
  return (
    <div className=" noselect d-flex flex-grow-1">
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
