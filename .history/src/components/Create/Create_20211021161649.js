import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import UserService from "../../services/user.service";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "react-datepicker/dist/react-datepicker.css";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../../helpers/history";
import { format } from "date-fns";

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

  const genders = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "ANOTHER", label: "Another" },
  ];
  const departments = [
    { value: 0, label: "DEVELOPER" },
    { value: 1, label: "ACCOUNTING" },
    { value: 2, label: "SALE" },
    { value: 3, label: "DESIGN" },
  ];
  const academicLevels = [
    { value: 0, label: "DOCTOR" },
    { value: 1, label: "MASTER" },
    { value: 2, label: "UNIVERSITY" },
    { value: 3, label: "COLLEGE" },
    { value: 4, label: "ANOTHER" },
  ];
  const positions = [
    { value: 0, label: "DEV1" },
    { value: 1, label: "DEV2" },
    { value: 2, label: "PROJECT MANAGER" },
    { value: 2, label: "TESTER" },
  ];

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(true);
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [position, setPosition] = useState(0);
  const [academicLevel, setAcademicLevel] = useState(0);
  const [department, setDepartment] = useState(0);
  const [gender, setGender] = useState("MALE");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  const [genderOption, setGenderOption] = useState(
    getElementByValue(genders, "MALE")
  );
  const [departmentOption, setDepartmentOption] = useState(
    getElementByValue(departments, 0)
  );
  const [positionOption, setPositionOption] = useState(
    getElementByValue(positions, 0)
  );
  const [academicLevelOption, setAcademicLevelOption] = useState(
    getElementByValue(academicLevels, 0)
  );

  function getElementByValue(array, title) {
    return array.find((element) => {
      return element.value === title;
    });
  }
  const genderChange = (selectedOption) => {
    setGenderOption(selectedOption);
    setGender(selectedOption.value);
  };
  const departmentChange = (selectedOption) => {
    setDepartmentOption(selectedOption);
    setDepartment(selectedOption.value);
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
    setPhone(phone);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      console.log(
        fullName +
          gender +
          phone +
          address +
          position +
          academicLevel +
          format(dateOfBirth, "dd/MM/yyyy") +
          department
      );
      UserService.addEmployee(
        fullName,
        gender,
        phone,
        address,
        position,
        academicLevel,
        dateOfBirth,
        department,
        status
      ).then(
        (response) => {
          toast.success("Add Successfully");
          history.push({
            pathname: `/profile/${response.data}`,
          });
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
    props.history.push("/home");
  };
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "darwin");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dihifeicm/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setAvatar(file.secure_url);
    setLoading(false);
  };
  return (
    <div>
      <section class="my-5">
        <div class="container">
          <div class="bg-white shadow rounded-lg d-block d-sm-flex">
            <div class="profile-tab-nav border-right">
              <div class="p-4">
                <div class="img-circle text-center mb-3">
                  <h3>Avatar</h3>
                  <input
                    type="file"
                    placeholder="Choose an avatar"
                    name="avatar"
                    onChange={uploadImage}
                  />
                </div>

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
                        value={fullName}
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
                        value={phone}
                        onChange={onChangePhone}
                        validations={[required, validPhone]}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Address</label>
                      <Input
                        type="text"
                        class="form-control"
                        value={address}
                        onChange={onChangeAddress}
                        validations={[required]}
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Department</label>
                      <Select
                        options={departments}
                        onChange={(value) => departmentChange(value)}
                        value={departmentOption}
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Position</label>
                      <Select
                        options={positions}
                        onChange={(value) => positionChange(value)}
                        value={positionOption}
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
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
    </div>
  );
}

export default Create;
