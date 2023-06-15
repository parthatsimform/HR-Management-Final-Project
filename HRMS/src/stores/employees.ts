import { defineStore } from "pinia";
import type Employee from "@/types/employee";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../includes/firebase";

export const useEmployeeStore = defineStore("employee", {
	state: () => ({
		emp: { department: "Select Department" } as Employee,
		emp_data : [],
		emp_details:{}
	}),
	actions:{
		async getEmpData():Promise<void>{
			onSnapshot(collection(db,'employees'),(querySnapshot: { data: () => object; }[])=>{
				this.emp_data= []
				querySnapshot.forEach((doc: { data: () => object; })=>{
					let data = doc.data()
					data.docId = doc.id
					this.emp_data.push(data)
				})
			})
		},
		async getEmpDetails(id:string):Promise<void>{
			const q = query(collection(db, "employees"), where("uid", "==", id));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc: { data: () => object; }) => {
				this.emp_details =  doc.data();
				this.emp_details.docId = doc.id
				console.log(this.emp_details)
			});
		}
	}
});
