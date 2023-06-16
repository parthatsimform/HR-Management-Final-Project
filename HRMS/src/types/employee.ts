export default interface Employee {
	fullName: string;
	email: string;
	password: string;
	cPassword?: string;
	department:
		| "Select Department"
		| "frontend"
		| "backend"
		| "devops"
		| "uiux";
	mobile: number;
	dob: Date;
	joiningDate: Date;
	isAdmin?: false;
	leaveBallance:number;
	uid:string;
}
