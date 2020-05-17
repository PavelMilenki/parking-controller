import React from "react";
import {Option} from "./Option";
import s from '../App.module.css'

export const Select = ({title, getSelectorsValues, selected, onChange}) => {

    const options = getSelectorsValues.map(s => {
        return (
            <Option option={s}
                    value={s}
                    key={s + Math.random()}/>
        )
    });

    return (
        <>
            <label>{title}</label>
            <select onChange={onChange} className={s.select} value={selected}>
                {options}
            </select>
        </>
    )
};
