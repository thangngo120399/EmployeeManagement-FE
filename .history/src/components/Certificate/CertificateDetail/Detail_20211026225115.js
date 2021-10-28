import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import CertificateService from "../../../services/certificated.service";

import DatePicker from "react-datepicker";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "react-datepicker/dist/react-datepicker.css";
import CheckButton from "react-validation/build/button";

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

function Detail(props) {
  const { item, idCandidate, setIsList } = props;
  const form = useRef();
  const checkBtn = useRef();

  const [arrCertificate, setArrCertificate] = useState([]);

  const [fullName, setFullName] = useState(item.name);
  const [certificateRank, setCertificateRank] = useState(item.rank);
  const [certifiCateDate, setCertifiCateDate] = useState(new Date(item.date));
  const [id, setId] = useState(item.id);

  const [loading, setLoading] = useState(false);

  const onChangeFullName = (e) => {
    const fullName = e.target.value;
    setFullName(fullName);
  };

  const onChangeCertificateRank = (e) => {
    const certificateRank = e.target.value;
    setCertificateRank(certificateRank);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      CertificateService.updateCertificated(
        fullName,
        certificateRank,
        format(certifiCateDate, "yyyy-MM-dd"),
        item.id
      ).then((response) => {
            toast.success("Update Successfully");
           setIsList(true);
      },(error) => {
            const message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            toast.error(message);
      }
      // CandidateService.addEmployee(fullName).then(
      //   (response) => {
      //     toast.success("Add Successfully");
      //     history.push({
      //       pathname: `/candidate/add`,
      //     });
      //   },
      //   (error) => {
      //     const message =
      //       (error.response && error.response.data) ||
      //       error.message ||
      //       error.toString();
      //     toast.error(message);
      //   }
      // );
    }
  };
  // const deleteItem = (id) => {
  //   arrCertificate.remove(getElementByValue(arrCertificate, id));
  // };

  const handleCancel = () => {
    setIsList(true);
  };

  return (
    <div>
      <section class="my-5">
        <div class="container">
          <div class="bg-white shadow rounded-lg d-block d-sm-flex">
            <Form
              class="tab-content p-4 p-md-5"
              id="v-pills-tabContent"
              onSubmit={handleUpdate}
              ref={form}
            >
              <div
                class="tab-pane fade show active"
                id="account"
                role="tabpanel"
                aria-labelledby="account-tab"
              >
                <h3 class="mb-4">Certificate Detail</h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Name</label>
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
                      <label>Certificate Rank</label>
                      <Input
                        type="text"
                        class="form-control"
                        value={certificateRank}
                        onChange={onChangeCertificateRank}
                        validations={[required]}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Certificate Date</label>
                      <DatePicker
                        className="form-control"
                        selected={certifiCateDate}
                        onChange={(date) => setCertifiCateDate(date)}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button class="btn btn-primary" type="submit">
                    Save
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

export default Detail;
