import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteContract(props) {
	return (
		<>
			<Modal show={props.show} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Xóa hợp đồng </Modal.Title>
				</Modal.Header>
				<Modal.Body>Bạn có chắc muốn xóa hợp đồng</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.handleClose}>
						Hủy
					</Button>
					<Button variant="primary" onClick={props.handleDelete}>
						Xóa
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default DeleteContract;
