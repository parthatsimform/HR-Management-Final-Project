import { defineStore } from "pinia";
import type Employee from "@/types/employee";
import type empDoc from "@/types/empDoc"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../includes/firebase";

export const useEmployeeStore = defineStore("employee", {
	state: () => ({
		emp: { department: "Select Department*" } as Employee,
		isLoggedIn: localStorage.getItem("isLoggedIn"),
		emp_details: {} as empDoc,
	}),
	actions: {
		async getEmpDetails(id: string): Promise<void> {
			const q = query(
				collection(db, "employees"),
				where("uid", "==", id)
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				this.emp_details = {
					...doc.data() as Employee,
					docId: doc.id as string
				}
			});
		},
	},
});
