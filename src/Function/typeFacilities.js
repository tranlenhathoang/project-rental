import axios from "axios";
let url = `http://localhost:8080/facilities`

// tìm tất cả facilities với query
export async function GetAllfacilities(query) {
    try {
        // Sử dụng params để thêm query vào URL, trong đó query có thể bao gồm các tham số phân trang như page và limit
        const response = await axios.get(`${url}`, { params: query });
        return response.data;
    } catch (e) {
        console.log("không lấy dữ liệu", e);
        return [];
    }
};

// tìm 1 facilities dựa trên id truyền qua url
export async function GetfacilitiesById(id){
    try {
        const response = await axios.get(`${url}/`+id);
        console.log(response);
        return response.data;
    } catch(e){
        console.log("loi",e);
        return null
    }
};

// thêm mới facilities
export async function AddNewfacilities(values) {
    try{
        const response = await axios.post(url,values);
        console.log('---them moi ne ----')
    } catch (e){
        console.log('loi loi lol',e);
    }
};

// xóa 1 facilities
export async function deleteFacilitiesById(id) {
    try {    
        console.log("ID to del :", id)
        const response = await axios.delete(`${url}/`+id);
        console.log('--xoa mat roi---')
    }catch (e){
        console.log('loi roi: ',e)
    }
}

// update facilities
export async function Updatefacilities(id,facilities) {
    try{
        const response = await axios.put(`${url}/`+id,facilities);
        console.log('---Update ben function duoc roi nhe ----')
    } catch (e){
        console.log('loi ben function',e);
    }
};
