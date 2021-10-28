import React from "react";
import PropTypes from "prop-types";
import InforCard from "./InforCard/InforCard";
import candidateService from "../../../../services/candidate.service";
function ListItem(props) {
  const { items } = props;

  return (
    <div>
      <div class="row">
        {items.map((item, index) => (
          <InforCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ListItem;
