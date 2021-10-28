import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import CertificateService from "../../../services/certificated.service";

import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../../../helpers/history";
import { format } from "date-fns";
import CertificateDetail from "../CertificateDetail/Detail";
import CertificateCreate from "../../Certificate/Create/Create";

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
  const { listCertificate, idCandidate, candidateName, setListCertificate } =
    props;

  const [idCertificateUpdate, setIdCertifiCateUpdate] = useState("");
  const [nameCertificateUpdate, setNameCertifiCateUpdate] = useState("");
  const [rankCertificateUpdate, setRankCertifiCateUpdate] = useState("");
  const [dateCertificateUpdate, setDateCertifiCateUpdate] = useState(
    new Date()
  );
  const [isEditRow, setIsEditRow] = useState(false);
  const form = useRef();
  const checkBtn = useRef();

  const [item, setItem] = useState();
  const [isList, setIsList] = useState(true);

  function deleteItem(id) {
    CertificateService.deleteCertificated(id).then(
      (response) => {
        toast.success("Delete Successfully");
      },
      (error) => {
        const message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    );
    setListCertificate(listCertificate.filter((item) => item.id !== id));
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

  return (
    <div>
      <section class="my-5">
        <div class="container">
          {listCertificate.length > 0 && (
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
                    {listCertificate.map((item, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{isEditRow ? ():({item.name})}</td>
                        <td>{item.certiRank}</td>
                        <td>
                          {format(new Date(item.certiDate), "yyyy-MM-dd")}
                        </td>
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
        <div
          style={{
            paddingTop: "5px",
            marginTop: "5px",
            borderTop: "1px solid #dee2e6!important",
          }}
        >
          <CertificateCreate
            candidateName={candidateName}
            idCandidate={idCandidate}
            setListCertificate={setListCertificate}
            listCertificate={listCertificate}
            issUpdate={true}
          ></CertificateCreate>
        </div>
      </section>
    </div>
  );
}

export default ListCertificate;
