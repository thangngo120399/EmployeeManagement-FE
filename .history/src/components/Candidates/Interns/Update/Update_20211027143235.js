import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import CandidateService from "../../../../services/candidate.service";

import DatePicker from "react-datepicker";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "react-datepicker/dist/react-datepicker.css";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../../../../helpers/history.js";
import { format } from "date-fns";
import CertificateCreate from "../../../Certificate/Create/Create";

import ConfirmBox from "react-dialog-confirm";
import "../../../../../node_modules/react-dialog-confirm/build/index.css"; // required
toast.configure();

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const validPhone = (value) => {
  if (typeof value !== "undefined") {
    var pattern = new RegExp(/^[0-9\b]+$/);

    if (!pattern.test(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Please enter only number.
        </div>
      );
    } else if (value.length != 10) {
      return (
        <div className="alert alert-danger" role="alert">
          Please enter valid phone number
        </div>
      );
    }
  }
};
const styles = {
  btn: {
    marginRight: "20px",
  },
};
function Update(props) {
  const form = useRef();
  const checkBtn = useRef();
  const { item } = props;

  const [fullName, setFullName] = useState(item.fullName);
  const [education, setEducation] = useState(item.education);
  const [major, setMajor] = useState(item.major);
  const [semester, setSemester] = useState(item.semester);
  const [dob, setDob] = useState(new Date(item.dob));
  const [phone, setPhone] = useState(item.phone);
  const [email, setEmail] = useState(item.email);
  const [idCandidate, setIdCandidate] = useState(item.id);
  const [success, setSuccess] = useState(false);

  const onChangeFullName = (e) => {
    const fullName = e.target.value;
    setFullName(fullName);
  };

  const onChangeEducation = (e) => {
    const education = e.target.value;
    setEducation(education);
  };
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangeMajor = (e) => {
    const major = e.target.value;
    setMajor(major);
  };
  const onChangeSemester = (e) => {
    const semester = e.target.value;
    setSemester(semester);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      CandidateService.createIntern(
        fullName,
        format(dob, "yyyy-MM-dd"),
        phone,
        email,
        education,
        major,
        semester
      ).then(
        (response) => {
          toast.success("Update Successfully");
          setIdCandidate(response.data);
        },
        (error) => {
          const message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          toast.error(message);

          setSuccess(true);
        }
      );
    }
  };

  const handleCancelForm = () => {
    history.push("/recruitment");
  };

  const [isEdit, setIsEdit] = useState(false);
  const setShowEdit = () => {
    setIsEdit(!isEdit);
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  const handleAfterDelete = () => {
    props.history.push("/home");
  };

  const handleYes = (id) => {
    handleClose();
  };
  const handleCancel = () => {
    toast.warning("You click Cancel");
    handleClose();
  };

  return (
    <div>
      {!success ? (
        <section class="my-5">
          <div class="container">
            <div class="bg-white shadow rounded-lg d-block d-sm-flex">
              <Form
                class="tab-content p-4 p-md-5"
                id="v-pills-tabContent"
                ref={form}
              >
                <div
                  class="tab-pane fade show active"
                  id="account"
                  role="tabpanel"
                  aria-labelledby="account-tab"
                >
                  <h3 class="mb-4">Intern Profile</h3>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Full Name</label>
                        <Input
                          type="text"
                          class="form-control"
                          value={fullName}
                          onChange={onChangeFullName}
                          validations={[required]}
                          disabled={!isEdit}
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Email</label>
                        <Input
                          type="text"
                          class="form-control"
                          value={email}
                          onChange={onChangeEmail}
                          validations={[required, validEmail]}
                          disabled={!isEdit}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Date of Birth</label>
                        <DatePicker
                          className="form-control"
                          selected={dob}
                          onChange={(date) => setDob(date)}
                          dateFormat="dd/MM/yyyy"
                          disabled={!isEdit}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Phone number</label>
                        <Input
                          type="text"
                          class="form-control"
                          value={phone}
                          onChange={onChangePhone}
                          validations={[required, validPhone]}
                          disabled={!isEdit}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Education</label>
                        <Input
                          type="text"
                          class="form-control"
                          value={education}
                          onChange={onChangeEducation}
                          validations={[required]}
                          disabled={!isEdit}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Major</label>
                        <Input
                          type="text"
                          class="form-control"
                          value={major}
                          onChange={onChangeMajor}
                          validations={[required]}
                          disabled={!isEdit}
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Semester</label>
                        <Input
                          type="number"
                          class="form-control"
                          value={semester}
                          onChange={onChangeSemester}
                          validations={[required]}
                          disabled={!isEdit}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    {isEdit ? (
                      <button
                        class="btn btn-primary"
                        style={styles.btn}
                        type="button"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        class="btn btn-primary"
                        style={styles.btn}
                        type="button"
                        onClick={setShowEdit}
                      >
                        Edit
                      </button>
                    )}
                    {isEdit && (
                      <button
                        class="btn btn-secondary"
                        style={styles.btn}
                        type="button"
                        onClick={handleCancelForm}
                      >
                        Cancel
                      </button>
                    )}

                    <button
                      style={styles.btn}
                      class="btn btn-danger"
                      onClick={handleClose}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </div>
              </Form>
            </div>
          </div>
          <ConfirmBox // Note : in this example all props are required
            options={{
              icon: "https://img.icons8.com/clouds/100/000000/vector.png",
              text: "Are you sure you want to delete this element?",
              confirm: "yes",
              cancel: "no",
              btn: true,
            }}
            isOpen={isOpen}
            onClose={handleClose}
            onConfirm={() => handleYes()}
            onCancel={handleCancel}
          />
        </section>
      ) : (
        <CertificateCreate
          candidateName={fullName}
          idCandidate={1}
        ></CertificateCreate>
      )}
    </div>
  );
}

export default Update;
