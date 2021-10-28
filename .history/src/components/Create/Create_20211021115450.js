import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import UserService from "../../services/user.service";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "react-datepicker/dist/react-datepicker.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function Create(props) {
  const genders = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "ANOTHER", label: "Another" },
  ];
  const academicLevels = [
    { value: 0, label: "Male" },
    { value: 1, label: "Female" },
    { value: 2, label: "Another" },
  ];
  const positions = [
    { value: 0, label: "Dev1" },
    { value: 1, label: "Dev2" },
    { value: 2, label: "Project Manager" },
  ];
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [position, setPosition] = useState(0);
  const [academicLevel, setAcademicLevel] = useState(0);
  const [gender, setGender] = useState("MALE");

  const [genderOption, setGenderOption] = useState(
    getElementByValue(genders, "MALE")
  );
  const [positionOption, setPositionOption] = useState(
    getElementByValue(positions, 0)
  );
  const [academicLevelOption, setAcademicLevelOption] = useState(
    getElementByValue(academicLevels, 0)
  );
  const form = useRef();

  function getElementByValue(array, title) {
    return array.find((element) => {
      return element.value === title;
    });
  }
  const genderChange = (selectedOption) => {
    setGenderOption(selectedOption);
    setGender(selectedOption.value);
  };
  const positionChange = (selectedOption) => {
    setPositionOption(selectedOption);
    setPosition(selectedOption.value);
  };
  const academicLevelChange = (selectedOption) => {
    setAcademicLevelOption(selectedOption);
    setAcademicLevel(selectedOption.value);
  };

  const onChangeFullName = (e) => {
    const fullName = e.target.value;
    setFullName(fullName);
  };

  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setFullName(phone);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    form.current.validateAll();

    console.log();
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
                  <i> ages</i>
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
                      <Input
                        type="text"
                        class="form-control"
                        value=""
                        onChange={onChangeFullName}
                        validations={[required]}
                      />
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
                      <label>Phone number</label>
                      <Input
                        type="text"
                        class="form-control"
                        value="+91 9876543215"
                        onChange={onChangePhone}
                        validations={[required]}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Address</label>
                      <Input
                        type="text"
                        class="form-control"
                        value="Kiran Workspace"
                        onChange={onChangeAddress}
                        validations={[required]}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Position</label>
                      <Select
                        options={positions}
                        onChange={(value) => positionChange(value)}
                        value={positionOption}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Academic Level</label>
                      <Select
                        options={academicLevels}
                        onChange={(value) => academicLevelChange(value)}
                        value={academicLevelOption}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button class="btn btn-primary">Add</button>
                  <button class="btn btn-light">Cancel</button>
                </div>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </div>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Create;