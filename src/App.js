import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Facilities from "./component/Facilities"; // Đường dẫn tới Facilities
import AddFacilities from "./component/AddFacilities";
import DetailFacilities from "./component/DetailFacilities";
import EditFacilities from "./component/EditFacilities";

function App() {
  return (
          <Routes>
            <Route path="/" element={<Facilities />} /> {/* Đổi route từ /services sang /facilities */}
            <Route path="/AddFacilities" element = {<AddFacilities />} />
            <Route path="/facilities/:id" element = {<DetailFacilities />} />
            <Route path="/facilities/:id/edit" element = {<EditFacilities />} />
          </Routes>
  );
}

export default App;
