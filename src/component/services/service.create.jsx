import { Button, Modal } from "react-bootstrap"


const CreateServices = (props) => {
    const { isOpenModalCreate, setIsOpenModalCreate } = props


    const handleSave = () => {
        setIsOpenModalCreate(false)
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
                        <div class="d-flex flex-column">
                            <div class="p-2">Tên dịch vụ</div>
                            <input type="text" style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }} />
                            <div class="p-2">Giá dịch vụ</div>
                            <input type="number" style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }} />
                            <div class="p-2">Ngày tháng</div>
                            <input type="date" style={{ padding: "3px 5px", borderRadius: "6px", outline: "none", border: "1px solid #ccc" }} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setIsOpenModalCreate(false)}>Close</Button>
                        <Button variant="primary" onClick={() => handleSave()}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    )
}

export default CreateServices




