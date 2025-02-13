import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./slider.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const Slider = () => {
    const [listPremises, setListPremises] = useState([]);
    const fetchListPremises = async () => {
        const res = await axios.get(`http://localhost:3001/premises`);
        // console.log(">>>check res", res);
        if (!res) {
            toast.error("error fetch data");
        }
        setListPremises(res.data);
    };

    useEffect(() => {
        fetchListPremises();
    }, [])

    return (
        <div >
            <Carousel data-bs-theme="dark" >
                {listPremises.length > 0 && listPremises.map((item) => {
                    return (
                        <Carousel.Item key={item.id}>
                            <img
                                className="d-block"
                                src={item?.src}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h5>{item?.title}</h5>
                                <p>{item?.desc}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })}

            </Carousel>
        </div>
    );
};

export default Slider;