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

function Create(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [fullName, setFullName] = useState("");
  const [education, setEducation] = useState("");
  const [graduationRank, setGraduationRank] = useState("");
  const [dob, setDob] = useState(new Date());
  const [graduationDate, setGraduationDate] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [idCandidate, setIdCandidate] = useState("");

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
  const onChangeGraduationRank = (e) => {
    const graduationRank = e.target.value;
    setGraduationRank(graduationRank);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      CandidateService.createFresher(
        fullName,
        format(dob, "yyyy-MM-dd"),
        phone,
        email,
        education,
        format(graduationDate, "yyyy-MM-dd"),
        graduationRank
      ).then(
        (response) => {
          toast.success("Add Successfully");
          setIdCandidate(response.data);
          setSuccess(true);
        },
        (error) => {
          const message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          toast.error(message);
        }
      );
    }
  };

  const handleCancel = () => {
    history.push("/recruitment");
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
                onSubmit={handleCreate}
                ref={form}
              >
                <div
                  class="tab-pane fade show active"
                  id="account"
                  role="tabpanel"
                  aria-labelledby="account-tab"
                >
                  <h3 class="mb-4">Fresher Profile</h3>
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
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Graduation Date</label>
                        <DatePicker
                          className="form-control"
                          selected={graduationDate}
                          onChange={(date) => setGraduationDate(date)}
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Graduation Rank</label>
                        <Input
                          type="text"
                          class="form-control"
                          value={graduationRank}
                          onChange={onChangeGraduationRank}
                          validations={[required]}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button class="btn btn-primary" type="submit">
                      Add
                    </button>
                    <button
                      class="btn btn-secondary"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </div>
              </Form>
            </div>
          </div>
        </section>
      ) : (
        <CertificateCreate
          candidateName={fullName}
          idCandidate={idCandidate}
        ></CertificateCreate>
      )}
    </div>
  );
}

export default Create;
