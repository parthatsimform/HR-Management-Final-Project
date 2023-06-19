import {useToggleFormAlert} from './useToggleFormAlert'
export const useValidateIP = () => {
    const { displayAlert, removeAlert } = useToggleFormAlert()
    const isValidEmail = (id:string):boolean => {
        const inputEle = document.getElementById(id) as HTMLFormElement
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputEle.value)) {
            return displayAlert(inputEle, "Email is not valid*");
        } else return removeAlert(inputEle);
    }
    return {
        isValidEmail
    }
}