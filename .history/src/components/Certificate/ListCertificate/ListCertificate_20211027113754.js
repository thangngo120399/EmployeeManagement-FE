import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import CertificateService from "../../../services/certificated.service";

import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../../../helpers/history";
import { format } from "date-fns";
import CertificateDetail from "../CertificateDetail/Detail";
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

function ListCertificate(props) {
  const { listCertificate, idCandidate } = props;
  const form = useRef();
  const checkBtn = useRef();

  const [arrCertificate, setArrCertificate] = useState(listCertificate);

  const [fullName, setFullName] = useState("");
  const [certificateRank, setCertificateRank] = useState("");
  const [certifiCateDate, setCertifiCateDate] = useState(new Date());
  const [id, setId] = useState(0);
  const [item, setItem] = useState();
  const [isList, setIsList] = useState(true);

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
  // const deleteItem = (id) => {
  //   arrCertificate.remove(getElementByValue(arrCertificate, id));
  // };
  function deleteItem(id) {
    setArrCertificate(arrCertificate.filter((item) => item.id !== id));
  }

  const handleCancel = () => {
    history.push("/recruitment");
  };
  const editItem = (item) => {
    setItem(item);
    setIsList(false);
  };
  const addCertificate = (item) => {
    CertificateService.createCertificated(
      item.name,
      item.certificateRank,
      item.date,
      idCandidate
    ).then(
      (response) => {},
      (error) => {
        const message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    );
  };
  const handleAddCertificate = () => {
    if (arrCertificate.length > 0) {
      arrCertificate.map((item, index) => addCertificate(item));
    }
  };
  return (
    <div>
      <section class="my-5">
        <div class="container">
          {arrCertificate.length > 0 && (
            <div className="bg-white shadow rounded-lg d-block d-sm-flex">
              {isList ? (
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
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.rank}</td>
                        <td>{item.date}</td>
                        <td>
                          <a
                            href="javascript: void(0)"
                            class="text-primary"
                            style={{ background: "none" }}
                            onClick={() => editItem(item)}
                          >
                            <i class="fa fa-edit"></i>
                          </a>
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
              ) : (
                <CertificateDetail
                  item={item}
                  idCandidate={idCandidate}
                  setIsList={setIsList}
                ></CertificateDetail>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ListCertificate;
