export default interface Employee {
	fullName: string;
	email: string;
	password: string;
	cPassword?: string;
	department:
		| "Select Department*"
		| "FrontEnd"
		| "BackEnd"
		| "DevOps"
		| "Ui/Ux";
	mobile: number;
	dob: Date;
	joiningDate: Date;
	isAdmin?: false;
	leaveBallance: number;
	uid: string;
}
