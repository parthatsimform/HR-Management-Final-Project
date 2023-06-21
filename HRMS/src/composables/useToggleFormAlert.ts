export const useToggleFormAlert = () => {
	const displayAlert = (el: HTMLFormElement, msg: string): boolean => {
		el.style.setProperty("border", "1px solid red", "important");
		const alertElClass: string = `${el.id}Err`;
		const errEl = document.querySelector(`.${alertElClass}`) as HTMLElement;
		errEl.style.setProperty("color", "red");
		errEl!.textContent = `${msg}`;
		return false;
	};

	const removeAlert = (el: HTMLFormElement) => {
		el.style.removeProperty("border");
		const alertElClass: string = `${el.id}Err`;
		const errEl = document.querySelector(`.${alertElClass}`) as HTMLElement;
		errEl.textContent = "";
		errEl.style.removeProperty("color");
		return true;
	};

	return { displayAlert, removeAlert };
};
