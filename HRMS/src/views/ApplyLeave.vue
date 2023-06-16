<template>
    <section>
        <div class="container-fluid d-flex justify-content-center align-items-center w-75">
            <div class="apply-leave-container d-flex w-100 pt-5 pb-5 pe-3 ps-3 mt-5">
                <div class="leave-form-container d-flex justify-content-center w-50 pe-3">
                    <form class="leave-form" @submit.prevent="applyLeave">
                        <h1 class="text-center fw-bold mb-5">Apply for Leave</h1>
                        <div class="form-fields">
                            <select id="leaveType" v-model="store.leave.type" @change="handleLeaveType">
                                <option disabled>Leave Type</option>
                                <option value="planned">Planned</option>
                                <option value="unPlanned">Un-Planned</option>
                            </select>
                            <p class="vAlert leaveTypeErr"></p>
                        </div>
                        <div class="leave-dates d-flex justify-content-between w-100">
                            <div class="form-fields dates d-flex flex-column">
                                <label for="startDate">Leave From:</label>
                                <input type="date" id="startDate"
                                    :disabled="store.leave.type === 'Leave Type' ? true : false"
                                    v-model="store.leave.startDate" :min="today" :max="store.leave.endDate"
                                    @input="handleDateChange" />
                                <p class="vAlert startDateErr" :class="{ 'txt-black': store.leave.type === 'Leave Type' }">
                                    {{ handleNoticeTxt() }}
                                </p>
                            </div>
                            <div class="form-fields dates d-flex flex-column">
                                <label for="endDate">Leave To:</label>
                                <input type="date" id="endDate" :disabled="store.leave.type === 'Leave Type' ? true : false"
                                    v-model="store.leave.endDate" @input="handleDateChange"
                                    :min="store.leave.startDate ? store.leave.startDate : today" />
                                <p class="vAlert endDateErr" id='endDateErr'></p>
                            </div>
                        </div>
                        <div class="form-fields">
                            <textarea id="reason" placeholder="Enter reason for Leave" v-model="store.leave.reason"
                                @input="checkReasonLength"></textarea>
                            <p class="vAlert reasonErr"></p>
                        </div>
                        <div class="form-fields">
                            <input id="Email" placeholder="Requesting From (Email)" v-model="store.leave.toEmail"
                                @change="isValidEmail" />
                            <p class="vAlert EmailErr"></p>
                        </div>
                        <p class="vAlert"></p>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary py-2 fw-bold" type="submit">
                                Add Request
                            </button>
                        </div>
                    </form>
                </div>
                <div class="leave-display-container d-flex flex-column justify-content-center align-items-center w-50 ps-3">
                    <h1 class="text-center fw-bold mb-5">Your Leaves</h1>
                    <div class="leave-display h-100 p-3 overflow-y-scroll">
                        <div class="card flex-row overflow-hidden mb-2" v-for="leave in leaves" :key="leave.id">
                            <div class="card-body w-100">
                                <h5 class="card-title">{{ leave.startDate }} <span class=" fw-light fs-6">to</span> {{
                                    leave.endDate }}</h5>
                                <h6 class="card-subtitle">{{ leave.type }}</h6>
                                <p class="card-text w-100">{{ leave.reason }}</p>
                                <div class="d-flex">
                                    <button class="btn btn-outline-primary bg-primary-subtle view-btn" type="button"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        @click="handleLeaveDisplay(leave.id)">
                                        View Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModal" @click="modelLeave = {}" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title d-flex justify-content-center align-items-center w-100"
                            id="exampleModalLabel">Leave</h5>
                        <button type="button" @click="modelLeave = {}" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-5">
                        <div class="leave-detail-container mb-1">
                            <label class=" fw-light">Duration :</label>
                            <p class="leave-detail-content fs-4 w-100">{{ modelLeave.startDate }} <span
                                    class=" fw-light fs-6">to</span> {{
                                        modelLeave.endDate }}</p>
                        </div>
                        <div class="leave-detail-container mb-1">
                            <label class="fw-light">Type :</label>
                            <p class="leave-detail-content fs-4 w-100">{{ modelLeave.type }}</p>
                        </div>
                        <div class="leave-detail-container mb-1">
                            <label class="fw-light">Reason :</label>
                            <p class="leave-detail-content w-100">{{ modelLeave.reason }}</p>
                        </div>
                        <div class="leave-detail-container mb-1">
                            <label class="fw-light">Requested From :</label>
                            <p class="leave-detail-content fs-4 w-100">{{ modelLeave.fromEmail }}</p>
                        </div>
                        <div class="leave-detail-container mb-1">
                            <label class="fw-light">Status :</label>
                            <p class="leave-detail-content fs-4 w-100 text-b" :class="{
                                'text-success': modelLeave.status === 'Approved',
                                'text-danger': modelLeave.status === 'Rejected',
                                'text-normal': modelLeave.status === 'Pending'
                            }">{{ modelLeave.status }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type Leave from '../types/leaveObj'
import type Employee from "@/types/employee";
import { useLeaveStore } from '../stores/leaveStore'
import { auth, db } from '@/includes/firebase';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, onSnapshot, query, where, type DocumentData } from "firebase/firestore";
import { ref, reactive, onMounted } from 'vue';
import { useToggleFormAlert } from '../composables/useToggleFormAlert.js'
import { useValidateIP } from '../composables/useValidateIP'

let userDoc = ref('')

function getTodayDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

const today = getTodayDate()
const { displayAlert, removeAlert } = useToggleFormAlert()
const { isValidEmail } = useValidateIP()
let leaves = ref<{ [key: string]: any }[]>([])
const modelLeave = ref<DocumentData>({})
onMounted(async () => {
    const q = query(collection(db, "leaves"), where("uid", "==", auth.currentUser!.uid));
    onSnapshot(q, (querySnapshot) => {
        const FbLeaves: Leave[] = []
        querySnapshot.forEach((doc: { [x: string]: any }) => {
            const leave = {
                ...doc.data(),
                id: doc.id
            }
            FbLeaves.push(leave)
        });
        leaves.value = FbLeaves
    })
})


onMounted(async () => {
    const q = query(collection(db, "employees"), where("uid", "==", auth.currentUser!.uid));
    onSnapshot(q, (querySnapshot) => {
        const fbUser: Employee[] = []
        querySnapshot.forEach((doc: { [x: string]: any }) => {
            const user = {
                ...doc.data(),
                id: doc.id
            }
            fbUser.push(user)
        });
        userDoc.value = fbUser[0].id
    })
})


const validateForm = () => {
    const formElements = document.forms[0].elements as HTMLFormControlsCollection
    let isValid: boolean = true
    for (let i = 0; i < formElements.length - 1; i++) {
        const formElement = formElements[i] as HTMLFormElement
        if (formElement.type === 'select-one' && formElement.value === 'Leave Type') {
            displayAlert(formElement, "Please select leave type*")
            isValid = false
        } else if (!formElement.value) {
            switch (formElement.type) {
                case 'date':
                    if (formElement.id === 'startDate') {
                        displayAlert(formElement, "Please select start date*")
                    } else {
                        displayAlert(formElement, "Please select end date*")
                    }
                    break
                default:
                    displayAlert(formElement, `${formElement.id} is required*`)
                    break
            }
            isValid = false
        }
        else {
            removeAlert(formElement)
        }
    }
    return isValid
}

const getDateDifference = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;

    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    const diffInTime = Math.abs(secondDate.getTime() - firstDate.getTime());
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays + 1;
}

const store = useLeaveStore()
const applyLeave = async (e: Event): Promise<void> => {
    e.preventDefault();
    const userDocRef = doc(db, "employees", userDoc.value);
    const userDocSnap = await getDoc(userDocRef);
    const user = userDocSnap.data();
    const totalLeave = user?.leaveBallance ?? 0;
    if (
        validateForm() &&
        checkReasonLength() &&
        isValidEmail() &&
        auth.currentUser &&
        totalLeave > 0 &&
        getDateDifference(store.leave.startDate, store.leave.endDate) <= totalLeave
    ) {
        const leave: Leave = {
            fromEmail: auth.currentUser.email ?? "",
            toEmail: store.leave.toEmail,
            type: store.leave.type,
            startDate: store.leave.startDate,
            endDate: store.leave.endDate,
            reason: store.leave.reason,
            uid: auth.currentUser.uid ?? "",
            status: "Pending",
        };
        try {
            await updateDoc(userDocRef, {
                leaveBallance: totalLeave - getDateDifference(store.leave.startDate, store.leave.endDate),
            });
            const res = await addDoc(collection(db, "leaves"), leave);
            if (res) {
                alert("Leave applied successfully");
                store.$reset();
            } else {
                alert("Error while applying !!!");
                store.$reset();
            }
        } catch (err) {
            console.log(err);
        }
    } else if (totalLeave === 0) {
        alert("Insufficient Leave Ballance!!");
        store.$reset();
    }
};

const handleLeaveDisplay = async (id: string): Promise<void> => {
    const docRef = doc(db, "leaves", id);
    const docSnap = await getDoc(docRef)
    const displayLeave = docSnap.data()
    if (displayLeave) {
        modelLeave.value = displayLeave
    }
}

const handleNoticeTxt = () => {
    if (store.leave.type === 'Leave Type') {
        return "Please select Leave type first**"
    } else if (endDateErr.textContent === '') {
        return ''
    }
}

const handleDateChange = (e: Event) => {
    removeAlert(e.target)
}

const handleLeaveType = () => {
    const leaveSelect = document.getElementById('leaveType') as HTMLElement
    removeAlert(leaveSelect)
    if (store.leave.type === 'planned') {
        store.leave.startDate = getDayAfterTomorrowDate()
        startDate.min = store.leave.startDate
        store.leave.endDate = ''
    }
    if (store.leave.type === 'unPlanned') {
        store.leave.startDate = today
        startDate.min = today
        store.leave.endDate = getDayAfterTomorrowDate()
        endDate.min = today
        endDate.max = store.leave.endDate
    }
}
function getDayAfterTomorrowDate() {
    const today = new Date();

    const currentDate = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const remainingDays = daysInMonth - currentDate;

    let dayAfterTomorrowDate;

    if (remainingDays >= 2) {
        today.setDate(currentDate + 2);
        dayAfterTomorrowDate = today;
    } else {
        const nextMonth = (currentMonth + 1) % 12;
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        const daysToNextMonth = 2 - remainingDays;
        dayAfterTomorrowDate = new Date(nextYear, nextMonth, daysToNextMonth);
    }

    const year = dayAfterTomorrowDate.getFullYear();
    const month = String(dayAfterTomorrowDate.getMonth() + 1).padStart(2, '0');
    const day = String(dayAfterTomorrowDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}
const checkReasonLength = () => {
    const len = reason.value.length;
    let message = "";
    let isValid = true;
    if (reason.value.trim() === '') {
        message = " reason is required*";
        isValid = false;
    } else if (len < 10) {
        message = ` must be at least 10 characters, you are only using ${len} characters*`;
        isValid = false;
    }
    return isValid ? removeAlert(reason) : displayAlert(reason, message);
}

</script>

<style scoped>
.container-fluid {
    margin-top: 60px;
}

.apply-leave-container {
    border-radius: 20px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0px 7px 50px 0px rgba(0, 0, 0, 0.1);
}

.leave-form-container {
    border-right: 2px solid #e2e2e2;
}

.form-fields {
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
}

.form-fields input,
.form-fields textarea,
.form-fields select {
    border: 1px solid #e4e4e4 !important;
    background-color: #fff !important;
    height: 50px;
    border-radius: 8px;
    padding: 5px;
}

.form-fields textarea {
    height: 100px;
}

.form-fields input:focus,
.form-fields textarea:focus,
.form-fields select:focus {
    outline: 1px solid #6792ff;
}

.form-fields p {
    height: 15px;
    margin-bottom: 10px;
    color: #ff0000;
}

.form-fields .txt-black {
    color: #000000;
}

.dates {
    width: 48%;
}

.leave-display-container {
    height: 550px;
}

.leave-form,
.leave-display {
    width: 90%;
}

.leave-display {
    border: 1px solid #e4e4e4;
    border-radius: 8px;
}

.card-subtitle {
    font-size: 12px;
    color: #747474;
}

.card-body .card-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.view-btn {
    color: #005ae2;
    font-size: small;
    width: 120px !important;
}

.view-btn:hover {
    background-color: #72aaff96 !important;
}

.btn {
    width: 200px;
}

.leave-detail-content {
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;
}

.text-success {
    color: #009c00;
}

.text-danger {
    color: #db0000;
}

.text-normal {
    color: #005ae2;
}

@media (max-width: 1200px) {
    .container-fluid {
        width: 90% !important;
    }
}

@media (max-width: 950px) {
    .container-fluid {
        width: 80% !important;
    }

    .apply-leave-container {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .leave-form-container {
        width: 90% !important;
        border-right: none;
        border-bottom: 2px solid #e2e2e2;
        padding-bottom: 20px;
        margin-bottom: 20px;
        padding-right: 0px !important;
    }

    .leave-display-container {
        width: 90% !important;
        padding-left: 0px !important;
        height: 500px;
    }
}

@media (max-width: 500px) {
    .container-fluid {
        width: 95% !important;
    }

    .leave-form-container {
        width: 95% !important;
    }

    .leave-dates {
        flex-direction: column;
    }

    .dates {
        width: 100%;
    }

    .leave-display-container {
        width: 95% !important;
    }

    .leave-display {
        width: 100%;
    }
}

@media (max-width: 350px) {
    .container-fluid {
        width: 98% !important;
    }

    .leave-form-container {
        width: 98% !important;
    }
}
</style>