
const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;


export const validatePassword = (password) => {
    if(password){
    return password.length > 8 && format.test(password)
    }
    return false;
}

export const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

