import React from "react";
import {addCarOnTerritory, removeCarOnTerritory} from "../redux/carsReducer";
import moment from "moment";
import s from '../App.module.css'

const timeNow = moment().format('hh:mm:ss');
const dateNow = moment().format('DD.MM.YYYY');

export const TableBody = ({tenants, number, brand, model, time, days, flag, id}) => {


    return (
        <tbody>
        <tr>
            <td>{tenants}</td>
            <td>{brand}</td>
            <td>{model}</td>
            <td>{number}</td>
            <td>{days} {time}</td>
            <td>

                <button disabled={!flag}
                        className={s.btnTable}
                        onClick={removeCarOnTerritory(timeNow, true, id)}>
                    Выезд
                </button>
            </td>
            <td>
                <button disabled={flag}
                        className={s.btnTable}
                        onClick={addCarOnTerritory(timeNow, dateNow, false, id)}>
                    Заезд
                </button>
            </td>
        </tr>
        </tbody>
    )
};
