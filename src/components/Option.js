import React from "react";

export const Option = ({option, value, selected}) => {
    return <option selected={selected} value={value}>{option}</option>
};
