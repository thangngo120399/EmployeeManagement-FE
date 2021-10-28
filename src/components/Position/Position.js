import PropTypes from 'prop-types';
import ScriptTag from 'react-script-tag';
import './style.css'
import React, { useEffect, useState, useRef } from "react";
import PositionService from "../../services/position.service";
import { toast } from "react-toastify";

Position.propTypes = {
};

function Position(props) {
    const [positions, setPositions] = useState([]);
   
    useEffect(() => {
        PositionService.getAll().then(
          (response) => {
            setPositions(response.data);
           
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
                    <div class="col-sm-8"><h2><b>Employee Position</b></h2></div>
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {positions.map((item,index) => (
                        <tr>
                        <td>{item.id}</td>
                        <td>{item.namePosition}</td>
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
    {/* <ScriptTag isHydrating={true} type="text/javascript" src= "https://code.jquery.com/jquery-3.5.1.min.js" />
    <ScriptTag isHydrating={true} type="text/javascript" src= "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" />
    <ScriptTag isHydrating={true} type="text/javascript" src= "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" /> */}

</div>     
    );
}

export default Position;

