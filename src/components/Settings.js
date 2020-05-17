import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Select} from "./Select";
import {ALL, CAR_NUMBER, CAR_TENANT} from "./Parking";
import {AddNewCar} from "./AddNewCar";
import {setTotalCount} from "../redux/carsReducer";
import s from '../App.module.css'

const open = 'Добавить авто';
const close = 'Свернуть';

export const Settings = ({selected, cars, onChangedValue, setShowCars, setSearchTerm, searchTerm, carsOnTerritory}) => {

    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(open);

    const getSelectorsValues = (propertyName) => {
        let propertiesValues = cars.map(s => s[propertyName]);
        propertiesValues = [...new Set(propertiesValues)];
        propertiesValues = propertiesValues.sort((a, b) => {
            return a.localeCompare(b)
        });
        return [ALL, ...propertiesValues];
    };

    const activeEditMode = () => {
        if (editMode) {
            setEditMode(false);
            setTitle(open)
        } else {
            setEditMode(true);
            setTitle(close)
        }
    };

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className={s.selects}>
            <div className={s.selectTenant}>
                <Select title={'Арендатор'}
                        onChange={(e) => {
                            onChangedValue(CAR_TENANT, e)
                        }}
                        selected={selected}
                        getSelectorsValues={getSelectorsValues(CAR_TENANT)}/>
            </div>
            <div>
                <Select title={'Гос.номер'}
                        onChange={(e) => {
                            onChangedValue(CAR_NUMBER, e)
                        }}
                        selected={selected}
                        getSelectorsValues={getSelectorsValues(CAR_NUMBER)}/>
            </div>
            <div className={s.search}>
                <input
                    type="text"
                    placeholder="Поиск по гос. номеру"
                    value={searchTerm}
                    onChange={handleChange}/>
                <button onClick={() => {
                    setSearchTerm('')
                }}>X
                </button>
            </div>
            <div className={s.settingBtnAll}>
                <button className={s.btnAll}
                        onClick={() => {
                            setShowCars(false);
                            dispatch(setTotalCount(cars.length));
                        }}>
                    Показать все авто
                </button>
            </div>
            <div className={s.settingBtnInTerritory}>
                <button className={s.btnAll}
                        onClick={() => {
                            setShowCars(true);
                            dispatch(setTotalCount(carsOnTerritory.length));
                        }}>
                    Показать авто на территории
                </button>
            </div>
            <div className={s.settingAddCar}>
                {editMode ? <AddNewCar/> : ''}
                <button className={title=== 'Свернуть' ? '' : s.btnAll}
                    onClick={() => {
                        activeEditMode()
                    }}>
                    {title}
                </button>
            </div>

        </div>
    )
};
