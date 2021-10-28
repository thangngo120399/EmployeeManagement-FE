import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import "react-datepicker/dist/react-datepicker.css";

import { isEmail } from "validator";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FresherCreate from "../Freshers/Create/Create";
import InternCreate from "../Interns/Create/Create";
import ExperienceCreate from "../Experiences/Create/Create";
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
  return (
    <section class="py-5 my-5">
      <div class="container">
        <div class="bg-white shadow rounded-lg d-block d-sm-flex">
          <div class="profile-tab-nav border-right">
            <div class="p-4">
              <div class="img-circle text-center mb-3">
                <img src="../_image/new-icon.jpg" alt="Image" class="shadow" />
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
                Experiences
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
                Freshers
              </a>
              <a
                class="nav-link"
                id="intern-tab"
                data-toggle="pill"
                href="#intern"
                role="tab"
                aria-controls="intern"
                aria-selected="false"
              >
                <i class="fa fa-user text-center mr-1"></i>
                Interns
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
              <ExperienceCreate></ExperienceCreate>
            </div>
            <div
              class="tab-pane fade"
              id="fresher"
              role="tabpanel"
              aria-labelledby="fresher-tab"
            >
              <FresherCreate></FresherCreate>
            </div>
            <div
              class="tab-pane fade"
              id="intern"
              role="tabpanel"
              aria-labelledby="intern-tab"
            >
              <InternCreate></InternCreate>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Create;
