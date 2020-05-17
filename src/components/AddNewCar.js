import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBrands, getModels, getTenants, setNewCar} from "../redux/carsReducer";
import {Option} from "./Option";
import s from '../App.module.css'


export const AddNewCar = () => {

    const {tenants, brands, models} = useSelector((state) => state.carsPage);
    const dispatch = useDispatch();
    const [disabledSelectModel, setDisabledSelectModel] = useState(true);
    const [modelId, setModelId] = useState('');
    const [number, setNumber] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [tenant, setTenant] = useState('');


    useEffect(() => {
        dispatch(getTenants());
        dispatch(getBrands());
        if (modelId !== '') {
            dispatch(getModels(modelId));
        }
    }, [dispatch, modelId]);

    const setData = () => {
        dispatch(setNewCar(number, Number.parseInt(brand), Number.parseInt(model), Number.parseInt(tenant)));
        setTenant('');
        setModel('');
        setBrand('');
        setNumber('')
    };

    const optionTenants = tenants.map(s => {
        return (
            <Option option={s.name}
                    value={s.id}
                    key={s.id}/>
        )
    });

    const optionBrands = brands.map(s => {
        return (
            <Option option={s.name}
                    value={s.id}
                    key={s.id}/>
        )
    });

    const optionModels = models.map(s => {
        return (
            <Option option={s.name}
                    value={s.id}
                    key={s.id}/>
        )
    });

    return (
        <div className={s.addCar}>
            <select className={s.addCarSelect}
                    onChange={e => setTenant(e.currentTarget.value)}
                    value={tenant}>
                <option value="" disabled>Выбор арендатора</option>
                {optionTenants}
            </select>

            <select className={s.addCarSelect}
                    onChange={e => setBrand(e.currentTarget.value)}
                    value={brand}
                    onClick={() => {
                        setModelId(brand);
                        setDisabledSelectModel(false)
                    }}>
                <option value="" disabled>Выбор марки</option>
                {optionBrands}
            </select>

            <select className={s.addCarSelect}
                    onChange={e => setModel(e.currentTarget.value)}
                    value={model}
                    disabled={disabledSelectModel}>
                <option value="" disabled>Выбор модели</option>
                {optionModels}
            </select>

            <input className={s.addCarInput}
                   type="text"
                   onChange={e => setNumber(e.currentTarget.value)}
                   value={number}
                   maxLength={9}
                   placeholder={'Гос. номер'}/>
            <button className={s.addCarBtn}
                    onClick={setData}>
                Добавить авто
            </button>
        </div>
    )
};
