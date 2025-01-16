
import axios from "axios";

export async function checkLogin(username, password){
    try{
        const response = await axios.get("http://localhost:3001/users");
        const users = response.data.users;
        const user = users.find(user => user.name === username && user.password === password);
        return user || null;
    }catch(e){
        return null;
    }
}