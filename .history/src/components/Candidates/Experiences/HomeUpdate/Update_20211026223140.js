import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { isEmail } from "validator";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ExperienceUpdate from "../Experiences/Update/Update";
import ListCertificate from "../Certificate/ListCertificate/ListCertificate";

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

function Update(props) {
  const [listCertificate, setListCertificate] = useState([
    { id: 1, name: "hihi", rank: 3.5, date: format(new Date(), "yyyy-MM-dd") },
  ]);
  let { id } = useParams();
  return (
    <section class="py-5 my-5">
      <div class="container">
        <div class="bg-white shadow rounded-lg d-block d-sm-flex">
          <div class="profile-tab-nav border-right">
            <div class="p-4">
              <div class="img-circle text-center mb-3">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/symbol-color-users-1/32/user_2-edit-512.png"
                  alt="Image"
                  class="shadow"
                />
              </div>
            </div>
            <div
              class="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                class="nav-link active"
                id="experience-tab"
                data-toggle="pill"
                href="#experience"
                role="tab"
                aria-controls="experience"
                aria-selected="true"
              >
                <i class="fa fa-user text-center mr-1"></i>
                Profile
              </a>
              <a
                class="nav-link"
                id="fresher-tab"
                data-toggle="pill"
                href="#fresher"
                role="tab"
                aria-controls="fresher"
                aria-selected="false"
              >
                <i class="fa fa-user text-center mr-1"></i>
                Certificate
              </a>
            </div>
          </div>
          <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="experience"
              role="tabpanel"
              aria-labelledby="experience-tab"
            >
              <ExperienceUpdate></ExperienceUpdate>
            </div>
            <div
              class="tab-pane fade"
              id="fresher"
              role="tabpanel"
              aria-labelledby="fresher-tab"
            >
              <ListCertificate
                listCertificate={listCertificate}
                idCandidate={id}
              ></ListCertificate>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Update;
