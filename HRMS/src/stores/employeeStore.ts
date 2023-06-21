import { defineStore } from "pinia";
import type Employee from "@/types/employee";
import type empDoc from "@/types/empDoc";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "@/includes/firebase";

export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    emp: { department: "Select Department*" } as Employee,
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    emp_details: {} as empDoc,
  }),
  actions: {
    async getEmpDetails(): Promise<void> {
      const qry = query(
        collection(db, "employees"),
        where("uid", "==", auth.currentUser!.uid)
      );
      onSnapshot(qry, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.emp_details = {
            ...(doc.data() as Employee),
            docId: doc.id as string,
          };
        });
      });
    },
  },
});
