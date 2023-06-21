<template>
    <section>
        <div class="container-fluid d-flex justify-content-center align-items-center w-75">
            <div class="apply-leave-container d-flex w-100 pt-4 pb-4 pe-3 ps-3 mt-5 mb-5">
                <div class="leave-form-container d-flex justify-content-center w-50 pe-3">
                    <form class="leave-form" @submit.prevent="applyLeave">
                        <h2 class="text-center fw-bold mb-5">Apply for Leave</h2>
                        <div class="form-fields">
                            <select id="leaveType" v-model="store.leave.type" @change="handleLeaveType">
                                <option disabled>Leave Type*</option>
                                <option value="planned">Planned</option>
                                <option value="unPlanned">Un-Planned</option>
                            </select>
                            <p class="vAlert leaveTypeErr"></p>
                        </div>
                        <div class="leave-dates d-flex justify-content-between w-100">
                            <div class="form-fields dates d-flex flex-column">
                                <label for="startDate">Leave Start Date*:</label>
                                <input type="date" id="startDate"
                                    :disabled="store.leave.type === 'Leave Type*' ? true : false"
                                    v-model="store.leave.startDate" :min="today"
                                    :max="store.leave.type === 'unPlanned' && !store.leave.endDate ? getDayAfterTomorrowDate() : store.leave.endDate as string"
                                    @change="removeAlert($event.target as HTMLFormElement), handleLeaveType" />
                                <p class="vAlert startDateErr" :class="{ 'txt-black': store.leave.type === 'Leave Type*' }">
                                    {{ store.leave.type === 'Leave Type*' ? 'Please select leave type*' : '' }}
                                </p>
                            </div>
                            <div class="form-fields dates d-flex flex-column">
                                <label for="endDate">Leave End Date*:</label>
                                <input type="date" id="endDate"
                                    :disabled="store.leave.type === 'Leave Type*' ? true : false"
                                    v-model="store.leave.endDate"
                                    @change="removeAlert($event.target as HTMLFormElement), handleLeaveType"
                                    :min="store.leave.startDate ? (store.leave.startDate as string) : today" />
                                <p class="vAlert endDateErr" id='endDateErr'></p>
                            </div>
                        </div>
                        <div class="form-fields">
                            <textarea id="Reason" placeholder="Enter reason for Leave*" v-model="store.leave.reason"
                                @input="checkReasonLength('Reason')"></textarea>
                            <p class="vAlert ReasonErr"></p>
                        </div>
                        <div class="form-fields">
                            <input id="email" placeholder="Requesting To (Email)*" v-model="store.leave.toEmail"
                                @change="isValidEmail('email')" />
                            <p class="vAlert emailErr"></p>
                        </div>
                        <div class="d-flex justify-content-between leave-btn-content">
                            <p class="my-auto" :class="{ 'text-danger': userDoc!.leaveBallance === 0 }">Your Leave Balance:
                                {{
                                    userDoc!.leaveBallance }}</p>
                            <button class="btn btn-primary py-2 fw-medium" type="submit"
                                :disabled="userDoc!.leaveBallance === 0">
                                Add Request
                            </button>
                        </div>
                    </form>
                </div>
                <div class="leave-display-container d-flex flex-column justify-content-center align-items-center w-50 ps-3">
                    <h2 class="text-center fw-bold mb-5">Your Leaves</h2>
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
        <div class="modal fade" id="exampleModal" @click.stop tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered d-flex justify-content-center align-items-center">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title d-flex justify-content-center align-items-center w-100"
                            id="exampleModalLabel">Leave</h5>
                        <button type="button" @click.stop class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4" @click.stop>
                        <div class="leave-detail-container mb-1">
                            <label class=" fw-light">Duration :</label>
                            <p class="leave-detail-content fs-5 w-100">{{ modelLeave.startDate }} <span
                                    class=" fw-light fs-6">to</span> {{ modelLeave.endDate }}</p>
                        </div>
                        <div class="leave-detail-container mb-1">
                            <label class="fw-light">Type :</label>
                            <p class="leave-detail-content fs-5 w-100">{{ modelLeave.type }}</p>
                        </div>
                        <div class="leave-detail-container mb-1">
                            <label class="fw-light">Reason :</label>
                            <p class="leave-detail-content w-100">{{ modelLeave.reason }}</p>
                        </div>
                        <div class="leave-detail-container mb-1">
                            <label class="fw-light">Requested From :</label>
                            <p class="leave-detail-content fs-5 w-100">{{ modelLeave.fromEmail }}</p>
                        </div>
                        <div class="leave-detail-container mb-1">
                            <label class="fw-light">Status :</label>
                            <p class="leave-detail-content fs-5 w-100 text-b" :class="{
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
import type Leave from '@/types/leaveObj'
import type Employee from "@/types/employee"
import type empDoc from "@/types/empDoc"
import { useLeaveStore } from '@/stores/leaveStore'
import { auth, db } from '@/includes/firebase'
import { collection, addDoc, getDoc, doc, updateDoc, onSnapshot, query, where, type DocumentData, Query, DocumentReference, DocumentSnapshot } from "firebase/firestore"
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useToggleFormAlert } from '@/composables/useToggleFormAlert'
import { useValidateIP } from '@/composables/useValidateIP'
import { useFormattedDate } from '@/composables/useFormatedDate'
import Swal from 'sweetalert2'

let userDoc = ref({} as empDoc)
const { formattedDate } = useFormattedDate()

const today: string = getTodayDate()
const { displayAlert, removeAlert } = useToggleFormAlert()
const { isValidEmail } = useValidateIP()

interface leaveObj extends Leave {
    id: string
}

function getTodayDate(): string {
    const today: Date = new Date()
    const formatted: string = formattedDate(today)
    return formatted;
}

onMounted(() => {
    fetchCurUser()
    fetchCurUserLeave()
})

const fetchCurUser = () => {
    const q: Query<DocumentData> = query(collection(db, "employees"), where("uid", "==", auth.currentUser!.uid));
    onSnapshot(q, (querySnapshot) => {
        const fbUser: empDoc[] = []
        querySnapshot.forEach((doc) => {
            const user: empDoc = {
                ...doc.data() as Employee,
                docId: doc.id as string
            }
            fbUser.push(user)
        });
        userDoc.value = fbUser[0]
    })
}

let leaves = ref<leaveObj[]>([])
const fetchCurUserLeave = () => {
    const q: Query<DocumentData> = query(collection(db, "leaves"), where("uid", "==", auth.currentUser!.uid));
    onSnapshot(q, (querySnapshot) => {
        const FbLeaves: leaveObj[] = []
        querySnapshot.forEach((doc) => {
            const leave: leaveObj = {
                ...doc.data() as Leave,
                id: doc.id as string
            }
            FbLeaves.push(leave)
        });
        leaves.value = FbLeaves
        leaves.value.sort((a, b) => {
            const dateA = new Date(a.startDate).getTime();
            const dateB = new Date(b.startDate).getTime();
            return dateB - dateA;
        })
    })
}

const validateForm = (): boolean => {
    const formElements = document.forms[0].elements as HTMLFormControlsCollection
    let isValid = true

    for (let i = 0; i < formElements.length - 1; i++) {
        const formElement = formElements[i] as HTMLFormElement
        const { type, value, id } = formElement

        if (type === 'select-one' && value === 'Leave Type*') {
            displayAlert(formElement, "Please select leave type*")
            isValid = false
        } else if (!value) {
            switch (type) {
                case 'date':
                    const message = id === 'startDate'
                        ? 'Please select start date*'
                        : 'Please select end date*'
                    displayAlert(formElement, message)
                    break
                default:
                    displayAlert(formElement, `${id} is required*`)
                    break
            }
            isValid = false
        } else {
            removeAlert(formElement)
        }
    }
    return isValid
}

const getDateDifference = (date1: Date | string, date2: Date | string): number => {
    const diffInTime: number = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
    return Math.ceil(diffInTime / (24 * 60 * 60 * 1000) + 1);
}

const store = useLeaveStore()
const applyLeave = async (e: Event): Promise<void> => {
    e.preventDefault();
    const totalLeave = userDoc.value!.leaveBallance;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: { container: 'mt-5' }
    });

    const leave: Leave = {
        fromEmail: auth.currentUser?.email ?? '',
        toEmail: store.leave.toEmail,
        type: store.leave.type,
        startDate: store.leave.startDate,
        endDate: store.leave.endDate,
        reason: store.leave.reason,
        uid: auth.currentUser?.uid ?? '',
        status: 'Pending',
    };

    if (
        validateForm() &&
        checkReasonLength('Reason') &&
        isValidEmail('email') &&
        auth.currentUser &&
        totalLeave > 0 &&
        getDateDifference(store.leave.startDate, store.leave.endDate) <= totalLeave
    ) {
        try {
            const userDocRef = doc(db, 'employees', userDoc.value!.docId as string);
            await updateDoc(userDocRef, {
                leaveBallance: totalLeave - getDateDifference(store.leave.startDate, store.leave.endDate),
            });
            const res = await addDoc(collection(db, 'leaves'), leave);
            const actionTitle = res ? 'Leave applied successfully' : 'Error while applying !!!';
            Toast.fire({
                icon: res ? 'success' : 'error',
                title: actionTitle,
            });
            store.leave = { type: 'Leave Type*' } as Leave;
            handleUnPlanedLeave();
        } catch (err) {
            Toast.fire({
                icon: 'error',
                title: 'Error while applying !!!',
            });
            store.leave = { type: 'Leave Type*' } as Leave;
            handleUnPlanedLeave();
        }
    } else if (getDateDifference(store.leave.startDate, store.leave.endDate) > totalLeave) {
        Toast.fire({
            icon: 'warning',
            title: 'Insufficient Leave Ballance!!',
        });
        store.leave = { type: 'Leave Type*' } as Leave;
        handleUnPlanedLeave();
    }
};

const modelLeave = ref({} as Leave)
const handleLeaveDisplay = async (id: string): Promise<void> => {
    const docRef: DocumentReference<DocumentData> = doc(db, "leaves", id);
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef)
    const displayLeave = docSnap.data() as Leave
    if (displayLeave) {
        modelLeave.value = displayLeave
    }
}

const handleLeaveType = (): void => {
    const leaveSelect = document.getElementById("leaveType") as HTMLFormElement
    const startDateEl = document.getElementById("startDate") as HTMLFormElement
    const endDateEl = document.getElementById("endDate") as HTMLFormElement
    removeAlert(leaveSelect)

    switch (store.leave.type) {
        case 'planned':
            removeAlert(startDateEl)
            store.leave.startDate = getDayAfterTomorrowDate()
            startDateEl.min = store.leave.startDate
            endDateEl.removeAttribute('max')
            break
        case 'unPlanned':
            removeAlert(startDateEl)
            store.leave.startDate = today
            store.leave.endDate = ''
            startDateEl.min = today
            endDateEl.min = today
            endDateEl.max = getDayAfterTomorrowDate()
            break
        default:
            break
    }
}

const handleUnPlanedLeave = (): void => {
    const endDateEl = document.getElementById("endDate") as HTMLFormElement
    endDateEl.removeAttribute('max')
}

function getDayAfterTomorrowDate(): string {
    const today: Date = new Date();
    const daysInMonth: number = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
    ).getDate();
    const remainingDays: number = daysInMonth - today.getDate();

    let dayAfterTomorrowDate: Date;
    if (remainingDays >= 2) {
        today.setDate(today.getDate() + 2)
        dayAfterTomorrowDate = today
    } else {
        const nextMonth: number = (today.getMonth() + 1) % 12;
        const nextYear: number = today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();
        const daysToNextMonth: number = 2 - remainingDays;
        dayAfterTomorrowDate = new Date(nextYear, nextMonth, daysToNextMonth);
    }

    return formattedDate(dayAfterTomorrowDate);
}
const checkReasonLength = (id: string): boolean => {
    const reasonEl = document.getElementById(id) as HTMLFormElement
    const len: number = reasonEl.value.trim().length;
    let message: string = "";
    let isValid: boolean = true;
    if (reasonEl.value.trim() === '') {
        message = " Reason is required*";
        isValid = false;
    } else if (len < 10) {
        message = ` must be at least 10 characters, you are only using ${len} characters*`;
        isValid = false;
    }
    return isValid ? removeAlert(reasonEl) : displayAlert(reasonEl, message);
}

onBeforeUnmount(() => {
    store.leave = { type: "Leave Type*" } as Leave
})

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
    height: 40px;
    border-radius: 8px;
    padding: 5px 10px;
}

.form-fields textarea {
    height: 100px;
}

.form-fields input:focus,
.form-fields textarea:focus,
.form-fields select:focus {
    outline: 1px solid #6792ff;
}

.form-fields input::placeholder,
.form-fields select::placeholder,
.form-fields textarea::placeholder {
    font-weight: 600;
    font-size: 15px;
}

.form-fields p {
    font-size: 12px;
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
    height: 70vh;
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

.modal-content {
    width: 400px;
}

.leave-detail-content {
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;
    pointer-events: none;
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

@media(max-width:700px) {
    .leave-btn-content {
        flex-direction: column !important;
        align-items: center;
    }

    .leave-btn-content p {
        margin-bottom: 10px !important;
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
}</style>