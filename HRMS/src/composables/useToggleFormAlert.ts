export const useToggleFormAlert = () => {
    const displayAlert = (el:HTMLFormElement, msg:string):boolean => {
        el.style = "border : 1px solid red !important";
        const alertElClass : string = `${el.id}Err`;
        const errEl = document.querySelector(`.${alertElClass}`) as HTMLElement
        errEl!.style = "color : red"
        errEl!.textContent = `${msg}`;
        return false;
    };

    const removeAlert = (el:HTMLFormElement) => {
        el.style.border = "1px solid #c5c5c5";
        const alertElClass : string = `${el.id}Err`;
        document.querySelector(`.${alertElClass}`)!.textContent = "";
        return true;
    };

	return { displayAlert, removeAlert };
};
