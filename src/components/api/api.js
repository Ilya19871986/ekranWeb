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