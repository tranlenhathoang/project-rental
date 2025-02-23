import { Button, Modal } from "react-bootstrap"
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";





const CreateServices = (props) => {
    const [listCustomer, setListCustomer] = useState([]);
    const [listPremises, setListPremises] = useState([]);
    const [listServices, setListServices] = useState([]);


    useEffect(() => {
        fetchListCustomer();
        fetchListPremises();
        fetchListServices();
    }, []);


    useEffect(() => {
        if (listCustomer.length > 0) {
            formik.setFieldValue('customer', listCustomer[0]?.id || "");
        }
    }, [listCustomer]);

    const formik = useFormik({
        initialValues: {
            date: "",
            premises: "MB001",
            quantity: "",
            customer: listCustomer[0]?.id,
            service: ""
        },
        onSubmit: values => {
            handleSave(values);
        },
        validationSchema: Yup.object({
            date: Yup.date().required("Ngày tháng không được để trống"),
            premises: Yup.string().required("Mặt bằng không được để trống"),
            quantity: Yup.number().when('service', (service, schema) => {
                const selectedService = listServices.find(s => s.id === service);
                return selectedService?.isQuantity
                    ? schema.required("Số lượng không được để trống")
                    : schema.notRequired();
            }),
            service: Yup.string().required("Dịch vụ không được để trống")
        }),
    });





    const { isOpenModalCreate, setIsOpenModalCreate, getData } = props;

    const handleSave = (values) => {
        const selectedService = listServices.find(service => service.id === formik.values.service);
        if (!selectedService) {
            toast.error("Vui lòng chọn dịch vụ");
            return;
        }

        if (formik.values.date === "" || formik.values.premises === "" || formik.values.customer === "" || formik.values.service === "") {
            setIsOpenModalCreate(true);
        } else {
            setIsOpenModalCreate(false);

            const type = {
                name: selectedService.name,
                price: selectedService.price
            };

            // Tạo payload với tất cả các trường cần thiết
            const payload = {
                id: Math.random().toString(36).substr(2, 4), // Tạo ID ngẫu nhiên
                type: type,
                date: values.date,
                premises: values.premises,
                customer: values.customer,
                quantity: selectedService.isQuantity ? values.quantity || 1 : undefined
            };


            // Gửi dữ liệu lên server
            axios.post("http://localhost:3001/services", payload).then(res => {
                if (res.status === 201) {
                    toast.success("Tạo dịch vụ thành công");
                    getData();
                } else {
                    toast.error("Tạo dịch vụ thất bại");
                }
            }).catch(error => {
                console.error("Error creating service:", error);
                toast.error("Có lỗi xảy ra khi tạo dịch vụ");
            });
        }
    };

    const fetchListCustomer = async () => {
        const res = await axios.get(`http://localhost:3001/customers`)
        console.log(">>>check res", res);
        if (!res) {
            toast.error("error fetch data")
        }
        setListCustomer(res.data)
    }

    const fetchListPremises = async () => {
        const res = await axios.get(`http://localhost:3001/premises`);
        if (!res) {
            toast.error("error fetch data");
        }
        setListPremises(res.data);
    };

    const fetchListServices = async () => {
        const res = await axios.get(`http://localhost:3001/list_services`);
        if (!res) {
            toast.error("error fetch data");
        }
        setListServices(res.data);
    };




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
                        <form onSubmit={formik.handleSubmit}>
                            <div className="d-flex flex-column">
                                <label className="p-2">Dịch vụ</label>
                                {listServices.map((item) => (
                                    <div key={item.id}>
                                        <input
                                            type="radio"
                                            id={`service-${item.id}`}
                                            name="service"
                                            value={item.id}
                                            onChange={(e) => {
                                                formik.setFieldValue('service', e.target.value); // Cập nhật ID dịch vụ
                                                formik.setFieldValue('quantity', item.isQuantity ? 1 : ""); // Đặt số lượng mặc định nếu có
                                            }}
                                            onBlur={formik.handleBlur}
                                            checked={formik.values.service === item.id}
                                        />
                                        <label htmlFor={`service-${item.id}`}>{item.name} - {item.price} VND</label>
                                    </div>
                                ))}
                                {formik.touched.service && formik.errors.service ? (
                                    <span style={{ color: "red" }}>{formik.errors.service}</span>
                                ) : null}

                                {formik.values.service && listServices.find(service => service.id === formik.values.service)?.isQuantity && (
                                    <>
                                        <label className="p-2">Số lượng</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }}
                                            value={formik.values.quantity}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.touched.quantity && formik.errors.quantity ? (
                                            <span style={{ color: "red" }}>{formik.errors.quantity}</span>
                                        ) : null}
                                    </>
                                )}

                                <label className="p-2">Ngày tháng</label>
                                <input
                                    type="date"
                                    name="date"
                                    style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }}
                                    value={formik.values.date}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.date && formik.errors.date ? (
                                    <span style={{ color: "red" }}>{formik.errors.date}</span>
                                ) : null}

                                <label className="p-2">Mặt bằng</label>
                                <select
                                    name="premises"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.premises}
                                    style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }}
                                >
                                    {listPremises.map((item) => (
                                        <option key={item.id} value={item.premisesName}>{item.premisesName}</option>
                                    ))}
                                </select>

                                <label className="p-2">Khách hàng</label>
                                <select
                                    name="customer"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.customer}
                                    style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }}
                                >
                                    {listCustomer.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setIsOpenModalCreate(false)}>Hủy</Button>
                        <Button variant="primary" onClick={formik.handleSubmit}>Lưu</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    )
}

export default CreateServices




