import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { isEmail } from "validator";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { history } from "../../../../helpers/history";
import "react-toastify/dist/ReactToastify.css";
import updateIcon from "../../_image/update-icon.png";
import { useLocation } from "react-router-dom";
import ExperienceUpdate from "../../Experiences/Update/Update";
import ListCertificate from "../../../Certificate/ListCertificate/ListCertificate";
import CertificateService from "../../../../services/certificated.service";
toast.configure();

function Update(props) {
  const location = useLocation();
  const [item, setItem] = useState(location.state.experience);
  const [listCertificate, setListCertificate] = useState([]);

  useEffect(() => {
    console.log(item.id);
    CertificateService.getCertificatedByCandidate(item.id).then(
      (response) => {
        console.log(response.data);
        // toast.error("ok");
        setListCertificate(response.data);
      },
      (error) => {
        const message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    );
  }, []);
  return (
    <section class="py-1 my-5">
      <div class="container">
        <button
          class="btn btn-secondary btn-icon-split"
          onClick={() => {
            return history.goBack();
          }}
        >
          <span class="icon text-white-50">
            <i class="fa fa-arrow-left"></i>
          </span>
          <span class="text"> Go back</span>
        </button>
        <div class="bg-white shadow rounded-lg d-block d-sm-flex">
          <div class="profile-tab-nav border-right">
            <div class="p-4">
              <div class="img-circle text-center mb-3">
                <img src={updateIcon} alt="Image" class="shadow" />
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
              <ExperienceUpdate item={item}></ExperienceUpdate>
            </div>
            <div
              class="tab-pane fade"
              id="fresher"
              role="tabpanel"
              aria-labelledby="fresher-tab"
            >
              <ListCertificate
                listCertificate={listCertificate}
                idCandidate={item.id}
                candidateName={item.fullName}
                setListCertificate={setListCertificate}
              ></ListCertificate>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Update;
