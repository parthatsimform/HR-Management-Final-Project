import { defineStore } from "pinia";
import type Employee from "@/types/employee";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import router from "@/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../includes/firebase"
import { collection, addDoc } from "firebase/firestore";

export const useEmployeeStore = defineStore("employee", {
	state: () => ({
		emp: { department: "Select Department*" } as Employee,
		isLoggedIn: false,
        userId: null,
		emp_data : [],
		emp_details:{},
		emp_role: "TRAINEE"
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
			});
		},
		async registerUser(newUser:Employee):Promise<void>{
            try {
                const { user }: { [key: string]: any } = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
                if (user) {
                    newUser.uid = user.uid
                    const empRef = await addDoc(collection(db, "employees"), newUser)
                    if (empRef) {
                        this.userId = newUser.uid
                        this.isLoggedIn = true
                        router.push("/")
                    } else {
                        alert("Error creating user")
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
	}
});
