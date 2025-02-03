import { Button, Modal } from "react-bootstrap"
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { toast } from "react-toastify";
import { useEffect } from "react";


const EditServices = (props) => {
    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            consume: "",
            date: "",
            premises: "",
            quantity: ""
        },
        onSubmit: values => {
            console.log("check values", values);
            axios.patch(`http://localhost:3001/services/${dataUpdate.id}`, values).then(res => {
                console.log(">>>check res", res);
                if (res.status === 200) {
                    toast.success("Sửa dịch vụ thành công!")
                    getData();
                } else {
                    toast.error("Sửa dịch vụ thất bại")
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

    const { getData, dataUpdate, setIsOpenModalEdit, isOpenModalEdit, setDataUpdate } = props;
    console.log(">>>> check dataUpdate", dataUpdate);

    useEffect(() => {
        if (dataUpdate) {
            formik.setValues({
                // id: dataUpdate.id,
                name: dataUpdate.name,
                consume: dataUpdate.consume,
                date: dataUpdate.date,
                premises: dataUpdate.premises,
                quantity: dataUpdate.quantity
            });
        }
    }, [dataUpdate]);


    const handleSave = (values) => {
        if (formik.values.name === "" || formik.values.consume === "" || formik.values.date === "") {
            setIsOpenModalEdit(true)
        } else {
            setIsOpenModalEdit(false);
            formik.handleSubmit();
        }
        console.log(values);

    }
    return (
        <>
            <div
                className="modal show"
                style={{ display: 'block', position: 'top', }}
            >
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Sửa dịch vụ </Modal.Title>
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


                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            setIsOpenModalEdit(false)
                        }}>Close</Button>
                        <Button variant="primary" onClick={(values) => handleSave(values)}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    )
}

export default EditServices




