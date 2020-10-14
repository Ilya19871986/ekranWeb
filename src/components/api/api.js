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
    delete_panels,
    get_users,
    save_user,
    create_user,
    delete_user,
    get_content_type,
    getMyGroup,
    createGroup,
    deleteGroup,
    chanegNameCommentGroup,
    getPanelsInGroup,
    getPanelsNoGroup,
    setGroup, 
    post_file_group,
    getFileGroup
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
    localStorage.setItem("surname", data.surname);
    localStorage.setItem("name", data.name);
 
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

export async function getListUsers() {
    const UserId = localStorage.getItem("UserId")
    const response = await fetch(api_address + get_users + "?adminId=" + UserId, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")  
            }
        });
    return response;
}

export async function updateUser(tmp) {
    const response = await fetch(api_address + save_user, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": "Bearer " + localStorage.getItem("token")   
        },
        body: JSON.stringify(tmp)
    }) 
    return response;
}


export async function CreateUser(username, password, surname, name, description, adminId, organization,  phone, email, town,
        role) {
    
    let formData = new FormData();

    formData.append("userName", username);
    formData.append("password", password);
    formData.append("surname", surname);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("adminId", adminId);
    formData.append("organization", organization)
    formData.append("phone", phone)
    formData.append("email", email)
    formData.append("town", town)
    formData.append("role", role);
    

    const result = await fetch(api_address + create_user, {
        method: "POST",
        headers: {"Accept": "application/json", 
                  "Authorization": "Bearer " + localStorage.getItem("token") },
        body: formData
        });     

    return result
}

export async function DeleteUser(username) {
    
    let formData = new FormData();

    formData.append("userName", username);

    const result = await fetch(api_address + delete_user, {
        method: "POST",
        headers: {"Accept": "application/json", 
                  "Authorization": "Bearer " + localStorage.getItem("token") },
        body: formData
        });     

    return result
}

export async function deletePanel(PanelId) {
   
    const response = await fetch(api_address + delete_panels + "?PanelId=" + PanelId , {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    return response
}

// получить весь контент панели по panel_id
export async function getContent(panel_id) {
        
    const response = await fetch(api_address + get_content + "?PanelId=" + panel_id, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    return response;
}

// получить весь контент панели по panel_id и типу контента
export async function getContentType(panel_id, type) {
    const response = await fetch(api_address + get_content_type + "?PanelId=" + panel_id + "&type=" + type, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    return response;
}

// отправка файла на сервер
export async function postFile(file, path, panel_id, type) {
    const formData = new FormData();
    
    formData.append('uploadedFile', file)
    formData.append('path', path)
    formData.append('panel_id', panel_id)
    formData.append('user_id', localStorage.getItem("UserId"))
    formData.append('type_content', type)
   
    await fetch (api_address + post_file,
        {
            method: "POST",
            headers: {"Accept": "multipart/form-data", 
                      "Authorization": "Bearer " + localStorage.getItem("token")},
            body: formData
    }).then(
        res => {return res.statusText}
    )
} 

export async function UpdateFile(file_id, end_date) {

    const formData = new FormData();

    formData.append('id', file_id)
    formData.append('newDate', end_date)

    await fetch (api_address + update_file, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") 
        },
        body: formData
    }).then(res => {console.log(res.statusText)});
}

// удалить файл
export async function delFile(file_id) {
    
    const formData = new FormData();

    formData.append('id', file_id)

    await fetch (api_address + delete_file, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") 
        },
        body: formData
    }).then(res => {console.log(res.statusText)});
}

// изменить настройки панели
export async function changePanel(id, run_text, time_vip, address, newName, OnlyVip) {

    const formData = new FormData();

    formData.append("id", id)
    formData.append("run_text", run_text)
    formData.append("time_vip", time_vip)
    formData.append("address", address)
    formData.append("newName", newName)
    formData.append("OnlyVip", OnlyVip)

    await fetch (api_address + change_panels, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: formData
    }).then(res => { return res.statusText})
}

// сменить пароль
export async function changePassword(user_id, newPassword) {
    const response = await fetch(api_address + changePass + "?id=" + user_id + "&newpassword=" + newPassword, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    return response;
}

// получить список групп пользователя
export async function getListGroupAsync(user_id) {
        
    const response = await fetch(api_address + getMyGroup + "?user_id=" + user_id, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    return response;
}

// создать группу
export async function createGroupPanesAsync(user_id, group_name, comment) {
    
    const response = await fetch(api_address + createGroup + "?GroupName=" + group_name + "&comment=" + comment + "&user_id=" + user_id, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    return response;
}

// удалить группу
export async function deleteGroupAsync(id) {
    
    const response = await fetch(api_address + deleteGroup + "?id=" + id, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    return response;
}

// изменить название и комментарий группы
export async function changeNameGroupAsync(id, name, comment) {
    
    const response = await fetch(api_address + chanegNameCommentGroup + "?id=" + id + "&name=" + name + "&comment=" + comment, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    return response;
}

// получить список панелей в группе
export async function getListPanelInGroupAsync(user_id, group_id) {
        
    const response = await fetch(api_address + getPanelsInGroup + "?user_id=" + user_id + "&group_id=" + group_id, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    return response;
}

// получить список панелей без группы
export async function getListPanelNoGroupAsync(user_id) {
        
    const response = await fetch(api_address + getPanelsNoGroup + "?user_id=" + user_id , {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    return response;
}

// изменить название и комментарий группы
export async function setGroupAsync(panel_id, group_id) {
    
    const response = await fetch(api_address + setGroup + "?panel_id=" + panel_id + "&group_id=" + group_id, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    return response;
}

// отправка файла на сервер
export async function postFileGroup(file, group_id, type) {
    
    const formData = new FormData();
    
    formData.append('uploadedFile', file)
    formData.append('path', localStorage.getItem("UserFolder"))
    formData.append('group_id', group_id)
    formData.append('user_id', localStorage.getItem("UserId"))
    formData.append('type_content', type)
   
    await fetch (api_address + post_file_group,
        {
            method: "POST",
            headers: {"Accept": "multipart/form-data", 
                      "Authorization": "Bearer " + localStorage.getItem("token")},
            body: formData
    }).then(
        res => {return res.statusText}
    )
} 

// получить список групп пользователя
export async function getListContentInGroupAsync(GroupId) {
        
    const response = await fetch(api_address + getFileGroup + "?GroupId=" + GroupId, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    return response;
}