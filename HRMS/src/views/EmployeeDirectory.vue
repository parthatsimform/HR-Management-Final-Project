<template>
    <div class="department">
        <div class="dept-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-6 col-md-3">
                        <div class="common-header d-flex justify-content-center align-items-center fs-5 ">
                            FrontEnd
                        </div>
                        <div class="common-department-content" @drop="onDrop($event, 'FrontEnd')" @dragenter.prevent
                            @dragover.prevent>
                            <div class="users-list" v-for="employee in emp_data">
                                <div class="user-card mx-4 mt-3 mb-3 d-flex flex-column align-items-center" draggable="true"
                                    v-if="employee.department === 'FrontEnd'" @dragstart="startDrag($event, employee)">
                                    <div
                                        class="profile-image emp-initials mt-2 d-flex align-items-center justify-content-center">
                                        {{ empInitials(employee.fullName) }}
                                    </div>
                                    <div class="emp-name">{{ employee.fullName }}</div>
                                    <p class="emp-dept">FrontEnd</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="common-header d-flex justify-content-center align-items-center fs-5 ">
                            BackEnd
                        </div>
                        <div class="common-department-content" @drop="onDrop($event, 'BackEnd')" @dragenter.prevent
                            @dragover.prevent>
                            <div class="users-list" v-for="employee in emp_data">
                                <div class="user-card mx-4 mt-3 mb-3 d-flex flex-column align-items-center" draggable="true"
                                    v-if="employee.department === 'BackEnd'" @dragstart="startDrag($event, employee)">
                                    <div
                                        class="profile-image emp-initials mt-2 d-flex align-items-center justify-content-center">
                                        {{ empInitials(employee.fullName) }}
                                    </div>
                                    <div class="emp-name">{{ employee.fullName }}</div>
                                    <p class="emp-dept">Backend</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="common-header d-flex justify-content-center align-items-center fs-5 ">
                            UI/UX
                        </div>
                        <div class="common-department-content" @drop="onDrop($event, 'Ui/Ux')" @dragenter.prevent
                            @dragover.prevent>
                            <div class="users-list" v-for="employee in emp_data">
                                <div class="user-card mx-4 mt-3 mb-3 d-flex flex-column align-items-center" draggable="true"
                                    v-if="employee.department === 'Ui/Ux'" @dragstart="startDrag($event, employee)">
                                    <div
                                        class="profile-image emp-initials mt-2 d-flex align-items-center justify-content-center">
                                        {{ empInitials(employee.fullName) }}
                                    </div>
                                    <div class="emp-name">{{ employee.fullName }}</div>
                                    <p class="emp-dept">UI/UX</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="common-header d-flex justify-content-center align-items-center fs-5 ">
                            Devops
                        </div>
                        <div class="common-department-content" @drop="onDrop($event, 'DevOps')" @dragenter.prevent
                            @dragover.prevent>
                            <div class="users-list" v-for="employee in emp_data">
                                <div class="user-card mx-4 mt-3 mb-3 d-flex flex-column align-items-center" draggable="true"
                                    v-if="employee.department === 'DevOps'" @dragstart="startDrag($event, employee)">
                                    <div
                                        class="profile-image emp-initials mt-2 d-flex align-items-center justify-content-center">
                                        {{ empInitials(employee.fullName) }}
                                    </div>
                                    <div class="emp-name">{{ employee.fullName }}</div>
                                    <p class="emp-dept">DevOps</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFormatName } from '../composables/useFormatName'
import { onBeforeMount, ref } from 'vue'
import { collection, onSnapshot } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../includes/firebase'
const { empInitials } = useFormatName()

onBeforeMount(() => {
    getEmpData()
})

const emp_data = ref([])
async function getEmpData(): Promise<void> {
    onSnapshot(collection(db, 'employees'), (querySnapshot: { data: () => object; }[]) => {
        emp_data.value = []
        querySnapshot.forEach((doc: { data: () => object; }) => {
            let data = doc.data()
            data.docId = doc.id
            emp_data.value.push(data)
        })
    })
}

const startDrag = (event, item) => {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('itemID', item.uid)
}
const onDrop = async (event, department) => {
    const itemID = event.dataTransfer.getData('itemID')
    const item = emp_data.value.filter(item => item.uid == itemID)
    const docId = item[0].docId
    const washingtonRef = doc(db, "employees", docId);
    await updateDoc(washingtonRef, {
        department: department
    });
}
</script >

<style scoped>
.department {
    margin-top: 100px;
}

.common-header {
    height: 50px;
    background-color: #0d6efd;
    color: white;
    font-weight: bold;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.common-department-content {
    height: 600px;
    background-color: #e2e2e2;
    overflow-y: scroll;
    box-shadow: 5px 10px 18px rgb(136, 136, 136, 0.5);
}

.user-card {
    height: 120px;
    background-color: white;
    border-radius: 10px;
    cursor: pointer;
}

.common-department-content :hover {
    transform: scale(1.02);
    transition: 0.25s;
}

.emp-dept {
    color: #0d6efd;
}


.profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #E2E2E2;
    font-weight: bold;
}

.emp-initials {
    height: 50px;
    width: 50px;
}

.emp-name {
    font-size: 20px;
    font-weight: bold;
}

.emp-dept {
    font-size: 15px;
}

@media (max-width: 991px) {
    .emp-name {
        font-size: 15px;
    }

    .emp-dept {
        font-size: 12px;
    }
}

@media (max-width: 767px) {
    .common-department-content {
        height: 350px;
    }

    .common-header {
        margin-top: 20px;
    }
}

@media (max-width: 569px) {
    .user-card {
        height: 100px;
    }

    .profile-image {
        width: 40px;
        height: 40px;
        font-size: 15px;
    }
}
</style>

<script setup lang="ts"></script>
