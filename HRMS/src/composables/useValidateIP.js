import {useToggleFormAlert} from './useToggleFormAlert'
export const useValidateIP = () => {
    const { displayAlert, removeAlert } = useToggleFormAlert()
    const isValidEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email.value)) {
            return displayAlert(Email, "Email is not valid*");
        } else return removeAlert(Email);
    }
    const isValidPassword = () => {
        const check_length = /.{8,12}/;
        const check_upperCase = /(?=.*[A-Z])/;
        const check_lowerCase = /(?=.*[a-z])/;
        const check_special_char = /(?=.*[!@#$%^&*])/;
        const check_numeric = /(?=.*\d)/;

        if (!check_length.test(Password.value)) {
            return displayAlert(Password, "Password must be 8-12 characters long*");
        } else if (!check_upperCase.test(Password.value)) {
            return displayAlert(
                Password,
                "Password must contain at least one Uppercase letter*"
            );
        } else if (!check_lowerCase.test(Password.value)) {
            return displayAlert(
                Password,
                "Password must contain at least one Lowercase letter*"
            );
        } else if (!check_upperCase.test(Password.value)) {
            return displayAlert(
                Password,
                "Password must contain at least one Uppercase letter*"
            );
        } else if (!check_special_char.test(Password.value)) {
            return displayAlert(
                Password,
                "Password must contain at least one special character*"
            );
        } else if (!check_numeric.test(Password.value)) {
            return displayAlert(
                Password,
                "Password must contain at least one numeric digit*"
            );
        } else return removeAlert(Password);
    }

    const validateForm = (formElements) => {
        let isValid = true
        for (let i = 0; i < formElements.length - 1; i++) {
            if (formElements[i].type === 'select-one') {
                if (formElements[i].value === 'Leave Type') {
                    displayAlert(formElements[i], "Please select leave type*")
                    isValid = false
                }
            } else if (!formElements[i].value) {
                console.log(formElements[i].id);
                if (formElements[i].type === 'date') {
                    if(formElements[i].id === 'startDate'){
                        displayAlert(formElements[i], "Please select start date*")
                        isValid = false
                    } else {
                        displayAlert(formElements[i], "Please select end date*")
                        isValid = false
                    }
                } else{
                    displayAlert(formElements[i], ` is required*`)
                    isValid = false
                }
            }
        }
        return isValid
    }

    return {
        isValidEmail,
        isValidPassword,
        validateForm
    }
}