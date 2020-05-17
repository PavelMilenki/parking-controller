import React from "react";
import {CAR_BRAND, CAR_MODEL, CAR_NUMBER, CAR_TENANT} from "./Parking";
import s from '../App.module.css'
import SortAscendingOutlined from "@ant-design/icons/lib/icons/SortAscendingOutlined";
import SortDescendingOutlined from "@ant-design/icons/lib/icons/SortDescendingOutlined";


export const Table = ({sortByUP, sortByDown, tableElementsAllCars, tableElementsOnTerritoryCars, showCars}) => {
    return (
        <table className={s.carsTable}>
            <thead>
            <tr>
                <th>
                    Арендатор <br/>
                    <SortAscendingOutlined className={s.icon} onClick={() => (sortByUP(CAR_TENANT))}/>
                    <SortDescendingOutlined className={s.icon} onClick={() => (sortByDown(CAR_TENANT))}/>

                </th>
                <th>
                    Марка <br/>
                    <SortAscendingOutlined className={s.icon} onClick={() => (sortByUP(CAR_BRAND))}/>
                    <SortDescendingOutlined className={s.icon} onClick={() => (sortByDown(CAR_BRAND))}/>
                </th>
                <th>
                    Модель <br/>
                    <SortAscendingOutlined className={s.icon} onClick={() => (sortByUP(CAR_MODEL))}/>
                    <SortDescendingOutlined className={s.icon} onClick={() => (sortByDown(CAR_MODEL))}/>
                </th>
                <th>
                    Гос. номер <br/>
                    <SortAscendingOutlined className={s.icon} onClick={() => (sortByUP(CAR_NUMBER))}/>
                    <SortDescendingOutlined className={s.icon} onClick={() => (sortByDown(CAR_NUMBER))}/>
                </th>
                <th>
                    Дата и время заезда
                </th>
                <th>
                    Выезд
                </th>
                <th>
                    Заезд
                </th>
            </tr>
            </thead>
            {!showCars ? tableElementsAllCars : tableElementsOnTerritoryCars}
        </table>
    )
};
