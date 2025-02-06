import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteCustomerById } from "../apiProject/customerService";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteComponent(props) {
	const handleClose = async () => {
		await props.closeModal();
	};

	const handleDelete = async () => {
		try {
			// Đảm bảo rằng student.id tồn tại trước khi gọi delete
			if (props.customer?.id) {
				await deleteCustomerById(props.customer.id);
				handleClose();
			} else {
				console.error("Không có ID của khách hàng");
			}
		} catch (error) {
			return [];
		}
		toast.error("Bạn đã xoá thành công", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			transition: Bounce,
		});
	};
	return (
		<>
			<Modal show={props.show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Bạn có muốn khách hàng{" "}
					<strong>
						{props.customer?.id} - {props.customer?.name}
					</strong>{" "}
					không?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default DeleteComponent;
