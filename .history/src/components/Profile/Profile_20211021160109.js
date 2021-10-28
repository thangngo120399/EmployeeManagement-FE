import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import UserService from "../../services/user.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Form from "react-validation/build/form";
import { Redirect } from "react-router-dom";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import ConfirmBox from "react-dialog-confirm";
import "../../../node_modules/react-dialog-confirm/build/index.css"; // required

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
function Profile(props) {
  // const item = props.location.state.user || {};

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
  const [gender, setGender] = useState("MALE");
  const [department, setDepartment] = useState(0);
  const [age, setAge] = useState(10);
  const [avatar, setAvatar] = useState("");

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
  let { id } = useParams();

  const handleCancelForm = () => {
    history.push({
      pathname: `/profile/${id}`,
    });
  };
  const initEmployee = (employee) => {
    setDateOfBirth(new Date(employee.dateOfBirth));
    setFullName(employee.fullName);
    setPhone(employee.phone);
    setEmail(employee.email);
    setAddress(employee.address);

    setGenderOption(getElementByValue(genders, employee.gender));
    setGender(employee.gender);
    setPositionOption(getElementByValue(genders, employee.position));
    setPosition(employee.position);
    setAcademicLevelOption(getElementByValue(genders, employee.academicLevel));
    setAcademicLevel(employee.academicLevel);
    setAge(employee.age);
    setAvatar(employee.avatar);
  };
  useEffect(() => {
    UserService.getUser(id).then(
      (response) => {
        const employee = response.data;
        initEmployee(employee);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }, []);
  const handleUpdate = (e) => {
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
          dateOfBirth
      );
      UserService.updateEmployee(
        id,
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
          setIsEdit(false);
        },
        (error) => {
          const message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          toast.error(message);
          setIsEdit(true);
        }
      );
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  const handleAfterDelete = () => {
    props.history.push("/home");
  };

  const handleYes = (id) => {
    UserService.deleteEmployee(id).then(
      (response) => {
        toast.success("Delete Successfully");
        handleAfterDelete();
      },
      (error) => {
        const message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    );
    handleClose();
  };
  const handleCancel = () => {
    toast.warning("You click Cancel");
    handleClose();
  };

  const [isEdit, setIsEdit] = useState(false);
  const setShowEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div>
      <section class="my-5">
        <div class="container">
          <div class="bg-white shadow rounded-lg d-block d-sm-flex">
            <div class="profile-tab-nav border-right">
              <div class="p-4">
                <div class="img-circle text-center mb-3">
                  <img src={avatar} alt="Image" class="shadow" />
                </div>
                <h4 class="text-center">{fullName}</h4>
                <h6 class="text-center">
                  <i>{age} ages</i>
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
                {/* <a class="nav-link" id="password-tab" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
									<i class="fa fa-key text-center mr-1"></i>
							Password
						</a>
								<a class="nav-link" id="security-tab" data-toggle="pill" href="#security" role="tab" aria-controls="security" aria-selected="false">
									<i class="fa fa-user text-center mr-1"></i>
							Security
						</a>
								<a class="nav-link" id="application-tab" data-toggle="pill" href="#application" role="tab" aria-controls="application" aria-selected="false">
									<i class="fa fa-tv text-center mr-1"></i>
							Application
						</a>
								<a class="nav-link" id="notification-tab" data-toggle="pill" href="#notification" role="tab" aria-controls="notification" aria-selected="false">
									<i class="fa fa-bell text-center mr-1"></i>
							Notification
						</a> */}
              </div>
            </div>
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
                        disabled={!isEdit}
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
                        isDisabled={!isEdit}
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
                        selected={dateOfBirth}
                        onChange={(date) => setDateOfBirth(date)}
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
                      <label>Address</label>
                      <Input
                        type="text"
                        class="form-control"
                        value={address}
                        onChange={onChangeAddress}
                        validations={[required]}
                        disabled={!isEdit}
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Department</label>
                      <Select
                        isDisabled={!isEdit}
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
                        isDisabled={!isEdit}
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
                        isDisabled={!isEdit}
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
                      onClick={setShowEdit}
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
          onConfirm={() => handleYes(id)}
          onCancel={handleCancel}
        />
      </section>
    </div>
  );
}

export default Profile;
