import { auth, 
    api_address, 
    role, 
    get_panels, 
    get_dist, 
    get_content, 
    changePass, 
    post_file,
    delete_file, 
    update_file, 
    change_panels,
    delete_panels
    } from "../api/api_path"

// аутентификация
export async function getToken(username, password) {
    const formData = new FormData();

    formData.append("grant_type", "password");
    formData.append("username", username);
    formData.append("password", password);

    const token = await fetch(api_address + auth, {
        method: "POST",
        headers: {"Accept": "application/json"},
        body: formData
        }); 

    const data = await token.json(); 
   
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("username", data.username);

    if (token.ok === true) {
        localStorage.setItem("password", password);
        return true
    }
    else {
        return false;
    }
}

// получаем роль пользователя
export async function getRole(username, password) {
    /*
     *   1 - глобальный администратор
     *   2 - пользователь плеера
     *   3 - администратор вокзала
     *   4 - пользователь расписания вокзала
    */
    
    const token = localStorage.getItem("token");
    const response = await fetch(api_address + role + "?username=" + username + "&password=" + password , {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token  
        }
    });

    const data = await response.json();
    localStorage.removeItem("role");
    localStorage.setItem("role", data.role);
    localStorage.setItem("UserId", data.id);
    localStorage.setItem("UserFolder", data.working_folder);
 
    switch (data.role) {
        case "1": localStorage.setItem("RoleName", "Администратор"); break;
        case "2": localStorage.setItem("RoleName", "Пользователь"); break;
        case "3": localStorage.setItem("RoleName", "Администратор вокзала"); break;
        case "4": localStorage.setItem("RoleName", "Пользователь расписания"); break;
    }
}

// получаем список панеле пользователя по id
export async function getListPanels() {
    const UserId = localStorage.getItem("UserId")
    const response = await fetch(api_address + get_panels + "?UserId=" + UserId, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")  
            }
        });
    return response;
}

