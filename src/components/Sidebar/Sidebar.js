import React from 'react';
import PropTypes from 'prop-types';
import './SidebarCss.css';
import ScriptTag from 'react-script-tag';

Sidebar.propTypes = {

};

function Sidebar(props) {
    return (
        <div>
            <div className="border-end bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom jumbotron">DEPARTMENT</div>
                <div className="list-group list-group-flush">
                    <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">All employee</a>
                    <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Developer</a>
                    <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Accounting</a>
                    <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Sales</a>
                    <div className="list-group-item list-group-item-action list-group-item-light p-3" >
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="#!">Action</a>
                                        <a class="dropdown-item" href="#!">Another action</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#!">Something else here</a>
                                    </div>
                    </div>
                </div>
            </div>
            <ScriptTag isHydrating={true} type="text/javascript" src= "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" />
        </div>
        
    );
}

export default Sidebar;