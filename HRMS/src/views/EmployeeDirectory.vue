<template>
  <div class="department">
    <div class="dept-wrapper">
      <div class="container-fluid p-0 mb-5">
        <div class="row">
          <div class="col-6 col-md-3 employee-dept-table">
            <div class="common-header d-flex justify-content-center align-items-center fs-5">
              FrontEnd
            </div>
            <div class="common-department-content" @drop="onDrop($event, 'FrontEnd')" @dragenter.prevent
              @dragover.prevent>
              <div class="users-list" v-for="employee in empData">
                <div class="user-card p-3 mx-4 mt-3 mb-3 d-flex flex-row align-items-center" draggable="true"
                  v-if="employee.department === 'FrontEnd'" @dragstart="startDrag($event, employee)">
                  <div class="profile-container d-flex align-items-center justify-content-center">
                    <div class="profile-image emp-initials d-flex align-items-center justify-content-center">
                      {{ empInitials(employee.fullName) }}
                    </div>
                  </div>
                  <div class="d-flex ps-2 flex-column justify-content-center emp-info-container">
                    <div class="emp-name">{{ employee.fullName }}</div>
                    <label class="emp-dept">FrontEnd</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3 employee-dept-table">
            <div class="common-header d-flex justify-content-center align-items-center fs-5">
              BackEnd
            </div>
            <div class="common-department-content" @drop="onDrop($event, 'BackEnd')" @dragenter.prevent @dragover.prevent>
              <div class="users-list" v-for="employee in empData">
                <div class="user-card p-3 mx-4 mt-3 mb-3 d-flex flex-row align-items-center" draggable="true"
                  v-if="employee.department === 'BackEnd'" @dragstart="startDrag($event, employee)">
                  <div class="profile-container d-flex align-items-center justify-content-center">
                    <div class="profile-image emp-initials d-flex align-items-center justify-content-center">
                      {{ empInitials(employee.fullName) }}
                    </div>
                  </div>
                  <div class="d-flex ps-2 flex-column justify-content-center emp-info-container">
                    <div class="emp-name">{{ employee.fullName }}</div>
                    <label class="emp-dept">BackEnd</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3 employee-dept-table">
            <div class="common-header d-flex justify-content-center align-items-center fs-5">
              UI/UX
            </div>
            <div class="common-department-content" @drop="onDrop($event, 'Ui/Ux')" @dragenter.prevent @dragover.prevent>
              <div class="users-list" v-for="employee in empData">
                <div class="user-card p-3 mx-4 mt-3 mb-3 d-flex flex-row align-items-center" draggable="true"
                  v-if="employee.department === 'Ui/Ux'" @dragstart="startDrag($event, employee)">
                  <div class="profile-container d-flex align-items-center justify-content-center">
                    <div class="profile-image emp-initials d-flex align-items-center justify-content-center">
                      {{ empInitials(employee.fullName) }}
                    </div>
                  </div>
                  <div class="d-flex ps-2 flex-column justify-content-center emp-info-container">
                    <div class="emp-name">{{ employee.fullName }}</div>
                    <label class="emp-dept">Ui/Ux</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3 employee-dept-table">
            <div class="common-header d-flex justify-content-center align-items-center fs-5">
              Devops
            </div>
            <div class="common-department-content" @drop="onDrop($event, 'DevOps')" @dragenter.prevent @dragover.prevent>
              <div class="users-list" v-for="employee in empData">
                <div class="user-card p-3 mx-4 mt-3 mb-3 d-flex flex-row align-items-center" draggable="true"
                  v-if="employee.department === 'DevOps'" @dragstart="startDrag($event, employee)">
                  <div class="profile-container d-flex align-items-center justify-content-center">
                    <div class="profile-image emp-initials d-flex align-items-center justify-content-center">
                      {{ empInitials(employee.fullName) }}
                    </div>
                  </div>
                  <div class="d-flex ps-2 flex-column justify-content-center emp-info-container">
                    <div class="emp-name">{{ employee.fullName }}</div>
                    <label class="emp-dept">DevOps</label>
                  </div>
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
import type Employee from "@/types/employee";
import { useFormatName } from "../composables/useFormatName";
import { onBeforeMount, ref } from "vue";
import { collection, onSnapshot, type DocumentData } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../includes/firebase";
import { useEmployeeStore } from '../stores/employees'
import { auth } from '@/includes/firebase';
import { useFormattedDate } from '../composables/useFormatedDate';
const { formattedDate } = useFormattedDate()
const employeeStore = useEmployeeStore();
const { empInitials } = useFormatName();

onBeforeMount(async () => {
  getEmpData();
  await employeeStore.getEmpDetails(auth.currentUser!.uid)
});
interface empObj extends Employee {
  docId: string;
}
const empData = ref(<empObj[]>[]);
async function getEmpData(): Promise<void> {
  onSnapshot(
    collection(db, "employees"),
    (querySnapshot) => {
      empData.value = [] as empObj[];
      querySnapshot.forEach((doc) => {
        const data: empObj = {
          ...doc.data() as Employee,
          docId: doc.id
        }
        empData.value.push(data);
      });
    }
  );
}

const startDrag = (event: DragEvent, item: empObj) => {
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.effectAllowed = "move";
  event.dataTransfer!.setData("itemID", item.uid);
};
const onDrop = async (event: DragEvent, department: string) => {
  const itemID = event.dataTransfer!.getData("itemID");
  const item = empData.value.filter((item) => item.uid == itemID);
  const docId = item[0].docId;
  const washingtonRef = doc(db, "employees", docId);
  await updateDoc(washingtonRef, {
    department: department,
  });
};
</script>

<style scoped>
.container-fluid {
  width: 85%;
}

.department {
  margin-top: 100px;
}

.common-header {
  height: 50px;
  background-color: #0d6efd;
  color: white;
  font-weight: bold;
  border-radius: 8px 8px 0px 0px;
}

.common-department-content {
  height: 75vh;
  background-color: #e2e2e2;
  overflow-y: scroll;
  box-shadow: 5px 10px 18px rgb(136, 136, 136, 0.5);
  border-radius: 0px 0px 8px 8px;
}

.common-department-content::-webkit-scrollbar {
  display: none;
}

.user-card {
  height: 90px;
  overflow: hidden;
  background-color: white;
  border-radius: 8px;
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
  border-radius: 8px;
  background-color: #e2e2e2;
  font-weight: bold;
}

.emp-initials {
  height: 60px;
  width: 60px;
}

.emp-name {
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: break-spaces;
}

.emp-dept {
  font-size: 15px;
}

@media (max-width: 1200px) {
  .container-fluid {
    width: 90%;
  }

  .user-card {
    height: 100px;
    flex-direction: column !important;
  }

  .emp-initials {
    height: 40px;
    width: 40px;
  }

  .emp-name {
    font-size: 15px;
  }

  .emp-info-container {
    width: 80%;
    align-items: center;
    padding: 0 !important;
  }
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
    font-size: 15px;
  }
}
</style>

<script setup lang="ts"></script>
