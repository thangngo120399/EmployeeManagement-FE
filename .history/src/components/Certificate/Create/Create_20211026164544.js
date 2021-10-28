import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import CandidateService from "../../../services/candidate.service";

import DatePicker from "react-datepicker";
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

function Create(props) {
  const { candidateName } = props;
  const form = useRef();
  const checkBtn = useRef();

  const [arrCertificate, setArrCertificate] = useState([]);

  const [fullName, setFullName] = useState("");
  const [certificateRank, setCertificateRank] = useState("");
  const [certifiCateDate, setCertifiCateDate] = useState(new Date());
  const [id, setId] = useState(0);

  const [loading, setLoading] = useState(false);

  const onChangeFullName = (e) => {
    const fullName = e.target.value;
    setFullName(fullName);
  };

  const onChangeCertificateRank = (e) => {
    const certificateRank = e.target.value;
    setCertificateRank(certificateRank);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      setId(id + 1);
      arrCertificate.push({
        id: id,
        name: fullName,

        rank: certificateRank,
        date: format(certifiCateDate, "yyyy-MM-dd"),
      });
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

  const handleCancel = () => {
    history.push("/recruitment");
  };

  return (
    <div>
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
                <h3 class="mb-4">Certificate Of {candidateName}</h3>
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
          <div className="bg-white shadow rounded-lg d-block d-sm-flex">
            {arrCertificate.length > 0 && (
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Rank</th>
                    <th scope="col">Date</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {arrCertificate.map((item, index) => (
                    <tr>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.rank}</td>
                      <td>{item.date}</td>
                      <td>
                        <a
                          href="javascript: void(0)"
                          class="text-danger"
                          style={{ background: "none" }}
                          onClick={() => deleteItem(item.id)}
                        >
                          <i class="fa fa-trash"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Create;
