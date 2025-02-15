import { Button, Modal } from "react-bootstrap"
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


const listPremises = [
    {
        id: 1,
        name: "MB001",
    },
    {
        id: 2,
        name: "MB002",
    },
    {
        id: 3,
        name: "MB003",
    }
];


const CreateServices = (props) => {
    const [listCustomer, setListCustomer] = useState([]);


    useEffect(() => {
        fetchListCustomer();
    }, []);


    useEffect(() => {
        if (listCustomer.length > 0) {
            formik.setFieldValue('customer', listCustomer[0]?.id);
        }
    }, [listCustomer]);

    const formik = useFormik({
        initialValues: {
            name: "",
            consume: "",
            date: "",
            premises: "MB001",
            quantity: "",
            customer: listCustomer[0]?.id
        },
        onSubmit: values => {
            console.log(values);
            axios.post("http://localhost:3001/services", values).then(res => {
                console.log(">>>check res", res);
                if (res.status === 201) {
                    toast.success("Tạo dịch vụ thành công")
                    getData();
                } else {
                    toast.error("Tạo dịch vụ thất bại")
                }
            })
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Tên dịch vụ không được để trống"),
            consume: Yup.number().required("Giá dịch vụ không được để trống"),
            date: Yup.date().required("Ngày tháng không được để trống"),
            premises: Yup.string().required("Mặt bằng không được để trống"),
            quantity: Yup.number().required("Số lượng không được để trống")
        }),
    })
    console.log(">>>check formik", formik);

    const { isOpenModalCreate, setIsOpenModalCreate, getData } = props;

    const handleSave = (values) => {
        // setIsOpenModalCreate(false)
        if (formik.values.name === "" || formik.values.consume === "" || formik.values.date === "") {
            setIsOpenModalCreate(true)
        } else {
            setIsOpenModalCreate(false);
            formik.handleSubmit();
        }
        console.log(values);
    }

    const fetchListCustomer = async () => {
        const res = await axios.get(`http://localhost:3001/customers`)
        console.log(">>>check res", res);
        if (!res) {
            toast.error("error fetch data")
        }
        setListCustomer(res.data)
    }

    return (
        <>
            <div
                className="modal show"
                style={{ display: 'block', position: 'top', }}
            >
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Tạo dịch vụ </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={formik.handleSubmit}  >
                            <div className="d-flex flex-column">
                                <label className="p-2">Tên dịch vụ</label>

                                <input type="text" name="name" value={formik.values.name} style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                                {formik.touched.name && formik.errors.name ? <span style={{ color: "red" }}>{formik.errors.name}</span> : null}

                                <label className="p-2">Số lượng</label>
                                <input type="number" name="quantity" style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }} value={formik.values.quantity} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                {formik.touched.quantity && formik.errors.consume ? <span style={{ color: "red" }}>{formik.errors.quantity}</span> : null}

                                <label className="p-2">Giá dịch vụ</label>
                                <input type="number" name="consume" style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }} value={formik.values.consume} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                {formik.touched.consume && formik.errors.consume ? <span style={{ color: "red" }}>{formik.errors.consume}</span> : null}


                                <label className="p-2">Ngày tháng</label>
                                <input type="date" name="date" style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }} value={formik.values.date} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                                {formik.touched.date && formik.errors.date ? <span style={{ color: "red" }}>{formik.errors.date}</span> : null}

                                <label className="p-2">Mặt bằng</label>
                                <select onBlur={formik.handleBlur} onChange={formik.handleChange} name="premises" style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }}>
                                    {
                                        listPremises.map((item) => {
                                            return (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>

                                <label className="p-2">Khách hàng</label>
                                <select onBlur={formik.handleBlur} onChange={formik.handleChange} name="customer" style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }}>
                                    {
                                        listCustomer.map((item) => {
                                            return (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setIsOpenModalCreate(false)}>Close</Button>
                        <Button variant="primary" onClick={(values) => handleSave(values)}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    )
}

export default CreateServices




