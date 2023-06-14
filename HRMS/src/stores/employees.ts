import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Employee from "@/types/employee";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../includes/firebase";

export const useEmployeeStore = defineStore("employee", {
	state: () => ({
		emp: { department: "Select Department" } as Employee,
		emp_data : []
	}),
	actions:{
		async getEmpData(){
			try {
				let userData: object[] = []
				const querySnapshot = await getDocs(collection(db, "employees"));
				querySnapshot.forEach((doc: { data: () => object; }) => {
					userData.push(doc.data())
				});
				this.emp_data = userData
			} catch (error) {
				console.error("Error getting documents: ", error);
			}
		}
	}
});
