import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Employee from "@/types/employee";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";
import { db } from "../includes/firebase";

export const useEmployeeStore = defineStore("employee", {
	state: () => ({
		emp: { department: "Select Department" } as Employee,
		emp_data : []
	}),
	actions:{
		async getEmpData():Promise<void>{
			onSnapshot(collection(db,'employees'),(querySnapshot: { data: () => object; }[])=>{
				this.emp_data= []
				querySnapshot.forEach((doc: { data: () => object; })=>{
					this.emp_data.push(doc.data())
				})
			})
		}
	}
});
