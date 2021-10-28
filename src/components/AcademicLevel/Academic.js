import PropTypes from 'prop-types';
import AcademicService from '../../services/academic-level.service';
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

Academic.propTypes = {
    
};

function Academic(props) {
    const [academics, setAcademic] = useState([]);
   
    useEffect(() => {
        AcademicService.getAll().then(
          (response) => {
            setAcademic(response.data);
           
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
    return (
        <div class="container-lg">
        <div class="table-responsive">
            <div class="table-wrapper" style={{width: "100%"}}>
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-8"><h2><b>Employee Academic Level</b></h2></div>
                        <div class="col-sm-4">
                            <button type="button" class="btn btn-info add-new"><i class="fa fa-plus"></i> Add New</button>
                        </div>
                    </div>
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Specialized</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {academics.map((item,index) => (
                            <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.specialized}</td>
                            <td>
                                <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                                <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                            </td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
       
    </div>     
    );
}

export default Academic;