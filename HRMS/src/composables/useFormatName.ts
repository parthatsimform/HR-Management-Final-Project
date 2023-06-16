import { auth } from "@/includes/firebase";
export const useFormatName = () => {
	const empInitials = (empName: string) => {
		if (empName.includes(" ")) {
			const firstLetter: string = empName.charAt(0).toUpperCase();
			const index: number = empName.indexOf(" ");
			const secondLetter: string = empName
				.charAt(index + 1)
				.toUpperCase();
			return firstLetter + secondLetter;
		} else {
			return empName.charAt(0).toUpperCase();
		}
	};

	const displayName = () => {
		let name = auth.currentUser!.displayName;
		if (name.includes(" ")) {
			let fname = name?.split(" ")[0];
			let lname = name?.split(" ")[1];
			fname = fname?.charAt(0).toUpperCase() + fname?.slice(1);
			lname = lname?.charAt(0).toUpperCase() + lname?.slice(1);
			name = `${fname} ${lname}`;
		} else {
			name = name?.charAt(0).toUpperCase() + name?.slice(1);
		}
		return name;
	};
	return { empInitials, displayName };
};
