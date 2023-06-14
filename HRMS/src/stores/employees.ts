import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Employee from "@/types/employee";

export const useEmployeeStore = defineStore("employee", {
	state: () => ({
		emp: { department: "Select Department" } as Employee,
	}),
});
