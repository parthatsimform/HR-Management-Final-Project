export const useToggleFormAlert = () => {
    const displayAlert = (el, msg) => {
        el.style = "border : 1px solid red !important";
        const alertElClass = `${el.id}Err`;
        const errEl = document.querySelector(`.${alertElClass}`)
        errEl.style = "color : red !important"
        errEl.textContent = `${msg}`;
        return false;
    };

    const removeAlert = (el) => {
        el.style.border = "1px solid #c5c5c5";
        const alertElClass = `${el.id}Err`;
        document.querySelector(`.${alertElClass}`).textContent = "";
        return true;
    };

    return { displayAlert, removeAlert };
};