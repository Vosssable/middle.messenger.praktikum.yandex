function validateEmail(inputValue: string): boolean {
    const regex = /^[a-zA-Z0-9-_]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    return regex.test(inputValue);
}

function validatePhone(inputValue: string): boolean {
    const regex = /^\+?[0-9\s()-]{10,20}$/;
    return regex.test(inputValue);
}

function validateName(inputValue: string): boolean {
    const regex = /^[A-ZА-ЯЁ][a-zа-яA-ZА-ЯёЁ-]*$/;
    return regex.test(inputValue);
}

function validateLogin(inputValue: string): boolean {
    const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,20}$/;
    return regex.test(inputValue);
}

function validatePassword(inputValue: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,40}$/
    return regex.test(inputValue);
}

function validateMessage(inputValue: string): boolean {
    return inputValue.length > 0;
}

export default function inputsValidation(key: string, value: string) {
    switch (key) {
        case 'login':
            return validateLogin(value)
        case 'old_password':
        case 'new_password':
        case 'new_password_confirm':
        case 'second_password':
        case 'password':
            return validatePassword(value)
        case 'email':
            return validateEmail(value)
        case 'phone':
            return validatePhone(value)
        case 'first_name':
        case 'second_name':
            return validateName(value)
        case 'display_name':
        case 'message':
            return validateMessage(value)
    }

}