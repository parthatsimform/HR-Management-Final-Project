import { defineStore } from "pinia";
import type Leave from "@/types/leaveObj";

export const useLeaveStore = defineStore("leave", {
	state: () => ({
		leave: { type: "Leave Type*" } as Leave,
	}), 
});