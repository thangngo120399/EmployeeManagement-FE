import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dateFormat from "dateformat";
import "./style.css";
import { useParams } from "react-router-dom";
import UserService from "../../services/user.service";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Form from "react-validation/build/form";
import "react-datepicker/dist/react-datepicker.css";
function Create(props) {
  const genders = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "ANOTHER", label: "Another" },
  ];
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [genderOption, setGenderOption] = useState(getGender(genders, "MALE"));
  const [gender, setGender] = useState("MALE");

  function getGender(array, title) {
    return array.find((element) => {
      return element.value === title;
    });
  }
  const genderChange = (selectedOption) => {
    setGenderOption(selectedOption);
    setGender(selectedOption.value);
  };

  const handleCreate = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <section class="my-5">
        <div class="container">
          <div class="bg-white shadow rounded-lg d-block d-sm-flex">
            <div class="profile-tab-nav border-right">
              <div class="p-4">
                <div class="img-circle text-center mb-3">
                  <img src="" alt="Image" class="shadow" />
                </div>
                <h4 class="text-center"></h4>
                <h6 class="text-center">
                  <i>{user.age} ages</i>
                </h6>
              </div>
              <div
                class="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  class="nav-link active"
                  id="account-tab"
                  data-toggle="pill"
                  href="#account"
                  role="tab"
                  aria-controls="account"
                  aria-selected="true"
                >
                  <i class="fa fa-home text-center mr-1"></i>
                  Account
                </a>
              </div>
            </div>
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
                <h3 class="mb-4">Employee Profile</h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>First Name</label>
                      <input type="text" class="form-control" value="" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Gender</label>
                      <Select
                        options={genders}
                        onChange={(value) => genderChange(value)}
                        value={genderOption}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Date of Birth</label>
                      <DatePicker
                        className="form-control"
                        selected={dateOfBirth}
                        onChange={(date) => setDateOfBirth(date)}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        class="form-control"
                        value="kiranacharya287@gmail.com"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Phone number</label>
                      <input
                        type="text"
                        class="form-control"
                        value="+91 9876543215"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        class="form-control"
                        value="Kiran Workspace"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Designation</label>
                      <input
                        type="text"
                        class="form-control"
                        value="UI Developer"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button class="btn btn-primary">Update</button>
                  <button class="btn btn-light">Cancel</button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Create;
