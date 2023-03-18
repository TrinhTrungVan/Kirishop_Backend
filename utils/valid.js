const valid = (username, email, phone, password, cf_password) => {
    if (!username || !email || !password || !phone) return "Please add all fields.";
    if (!validateEmail(email)) return "Invalid email.";
    if (!validatePhone(phone)) return "Invalid phone.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== cf_password) return "Confirm password did not match.";
};

const validateEmail = (email) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

const validatePhone = (phone) => {
    const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return regex.test(phone);
};

export default valid;
