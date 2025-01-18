// viết các hàm trả về action {type: , payload}

export function login(account){
    return {
        type: "LOGIN",
        payload: account
    }
}

export function logout(account){
    return {
        type: "LOGOUT",
        payload: null
    }
}