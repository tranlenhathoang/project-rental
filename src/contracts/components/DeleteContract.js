import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteContract(props) {
	return (
		<>
			<Modal show={props.show} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>XÓA HỢP ĐỒNG</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Bạn có muốn xóa hợp đồng <strong>{props.contracts?.id} </strong> không?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.handleClose}>
						Hủy
					</Button>
					<Button variant="danger" onClick={props.handleDelete}>
						Xóa
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default DeleteContract;
