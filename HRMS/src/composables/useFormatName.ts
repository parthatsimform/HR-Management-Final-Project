export const useFormatName = () => {
	const empInitials = (empName: string): string => {
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

	const displayName = (empName: string): string => {
		if (empName.includes(" ")) {
			let fname: string = empName!.split(" ")[0];
			let lname: string = empName!.split(" ")[1];
			fname = fname!.charAt(0).toUpperCase() + fname.slice(1);
			lname = lname.charAt(0).toUpperCase() + lname.slice(1);
			empName = `${fname} ${lname}`;
		} else {
			empName = empName.charAt(0).toUpperCase() + empName.slice(1);
		}
		return empName;
	};
	return { empInitials, displayName };
};
