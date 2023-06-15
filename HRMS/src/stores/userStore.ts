
import { defineStore } from "pinia";
import { db, auth } from "../includes/firebase"
import type Employee from "@/types/employee";
import router from "@/router";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useUserStore = defineStore("user", {
	state: () => ({
		isLoggedIn: false,
        userId: null
	}),
    actions:{
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
