export async function login(username, password) {
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
        };

    try {
        const response = await fetch("https://fd34-181-209-89-34.ngrok-free.app/usuarios/login/", requestOptions)
        if (!response.ok) {
            throw new Error()
        }
        console.log("Anda login!!! :)")
        // return await response.json()
        return true

    } catch (error) {
        console.log("No anda login!!! :(")
        throw new Error()
    }
}

export async function register(username, name, lastName, sex, dateBirth, email, password) {
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("first_name", name);
    formdata.append("last_name", lastName);
    formdata.append("gender", sex);
    console.log("fecha front: ", dateBirth)
    formdata.append("dateBirth", dateBirth);
    formdata.append("email", email);
    formdata.append("password", password);

    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
        };

    try {
        const response = await fetch("https://fd34-181-209-89-34.ngrok-free.app/usuarios/register/", requestOptions)
        if (!response.ok) {
            throw new Error()
        }
        console.log("Se registró el usuario!!! :)")
        // return await response.json()
        return true

    } catch (error) {
        console.log("No se registró el usuario!!! :(")
        console.log(error)
        throw new Error()
    }
}