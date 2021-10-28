import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import EmployeeService from "../../../services/employee.service";
import DepartmentService from "../../../services/department.service";
import PositionService from "../../../services/position.service";
import AcademicLevelService from "../../../services/academic-level.service";

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
import { history } from "../../../helpers/history";
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
const requiredSelect = (value) => {
  if (value.value === "") {
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

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [academicLevels, setAcademicLevels] = useState([]);

  useEffect(() => {
    PositionService.getAll().then(
      (response) => {
        response.data.map((item, index) =>
          positions.push({ value: item.id, label: item.namePosition })
        );
      },

      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        toast.error(_content);
      }
    );
    DepartmentService.getAll().then(
      (response) => {
        response.data.map((item, index) =>
          departments.push({
            value: item.id,
            label: item.address + " - " + item.nameDepartment,
          })
        );
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        toast.error(_content);
      }
    );
    AcademicLevelService.getAll().then(
      (response) => {
        response.data.map((item, index) =>
          academicLevels.push({
            value: item.id,
            label: item.specialized + " - " + item.name,
          })
        );
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        toast.error(_content);
      }
    );
  }, []);
  const genders = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "ANOTHER", label: "Another" },
  ];

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(true);
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(new Date());
  const [position, setPosition] = useState(0);
  const [academicLevel, setAcademicLevel] = useState(0);
  const [department, setDepartment] = useState(0);
  const [gender, setGender] = useState("MALE");
  const [avatar, setAvatar] = useState(
    "https://www.thecastofcheers.com/images/9-best-online-avatars-and-how-to-make-your-own-[2020]-4.png"
  );
  const [loading, setLoading] = useState(false);

  const [genderOption, setGenderOption] = useState(
    getElementByValue(genders, "MALE")
  );
  const [departmentOption, setDepartmentOption] = useState(
    getElementByValue(departments, 1)
  );
  const [positionOption, setPositionOption] = useState(
    getElementByValue(positions, 1)
  );
  const [academicLevelOption, setAcademicLevelOption] = useState(
    getElementByValue(academicLevels, 1)
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
          true +
          address +
          format(dob, "yyyy-MM-dd") +
          phone +
          status +
          department +
          academicLevel +
          email
      );
      EmployeeService.addEmployee(
        fullName,
        gender,
        address,
        format(dob, "yyyy-MM-dd"),
        phone,
        status,
        department,
        academicLevel,
        email,
        position
      ).then(
        (response) => {
          toast.success("Add Successfully");
          const id = response.data;
          history.push({
            pathname: `/employees/profile/${id}`,
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
  const [showAvatar, setShowAvatar] = useState(avatar !== "");
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "darwin");
    setLoading(true);
    // const res = await fetch(
    //   "	https://api.cloudinary.com/v1_1/dihifeicm/image/upload",
    //   {
    //     method: "POST",
    //     body: data,
    //   }
    // );
    // const file = await res.json();

    // setAvatar(file.secure_url);
    setShowAvatar(true);
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
                  {loading ? (
                    <h3>Loading...</h3>
                  ) : (
                    showAvatar && <img src={avatar} />
                  )}
                  <br />
                  <input
                    type="file"
                    placeholder="Choose an avatar"
                    name="file"
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
                        required
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
                        required
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
