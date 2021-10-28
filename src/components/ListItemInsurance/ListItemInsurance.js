import React from 'react';
import PropTypes from 'prop-types';
import InsuranceCard from './InsuranceCard/InsuranceCard'
import { Button } from 'bootstrap';

ListItemInsurance.propTypes = {

};

function ListItemInsurance(props) {
    const { items } = props;

    return (
        <div>
            <div class="row">
                {items.map((item, index) => (
                    <InsuranceCard key={index} item={item} />
                ))}
            </div>
        </div>
    );
}

export default ListItemInsurance;