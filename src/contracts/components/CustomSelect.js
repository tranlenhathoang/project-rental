import React, { useEffect, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";

function CustomSelect({ options, onSelect, placeholder = "Nhập để tìm", value }) {
	const [searchTerm, setSearchTerm] = useState(""); // Dùng để lưu giá trị tìm kiếm
	const [filteredOptions, setFilteredOptions] = useState(options); // Dữ liệu được lọc
	const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái mở/đóng của dropdown

	useEffect(() => {
		setSearchTerm(value ? value.label : ""); // Nếu không có giá trị thì để trống
	}, [value]);

	const handleSearchChange = (e) => {
		const value = e.target.value.toLowerCase();
		setSearchTerm(value);

		// Lọc danh sách dựa trên từ khóa tìm kiếm
		setFilteredOptions(options.filter((option) => option.label.toLowerCase().includes(value)));
	};

	const handleOptionSelect = (option) => {
		onSelect(option); // Gửi giá trị đã chọn lên component cha
		setSearchTerm(option.label); // Hiển thị giá trị đã chọn trong input
		setIsDropdownOpen(false); // Đóng dropdown
	};

	return (
		<Dropdown show={isDropdownOpen} onToggle={setIsDropdownOpen}>
			<Dropdown.Toggle
				as={FormControl}
				type="text"
				value={searchTerm}
				onChange={handleSearchChange}
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				placeholder={placeholder}
			/>

			<Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
				{filteredOptions.length > 0 ? (
					filteredOptions.map((option) => (
						<Dropdown.Item key={option.value} onClick={() => handleOptionSelect(option)}>
							{option.label}
						</Dropdown.Item>
					))
				) : (
					<Dropdown.Item disabled>Không có kết quả</Dropdown.Item>
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default CustomSelect;
