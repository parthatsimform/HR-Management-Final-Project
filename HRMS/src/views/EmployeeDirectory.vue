<template>
  <div class="department">
    <div class="dept-wrapper">
      <div class="container-fluid p-0 mb-5 ">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6  employee-dept-table">
            <div class="common-header d-flex justify-content-center align-items-center fs-5 fw-bold">
              FrontEnd
            </div>
            <div class="common-department-content" @drop="onDrop($event, 'FrontEnd')" @dragenter.prevent
              @dragover.prevent>
              <transition-group name="content-card" tag="div" @before-enter="beforeEnter" @enter="enter"
                @before-leave="beforeLeave" @leave="leave" appear>
                <div class="users-list" v-for="employee in empData" :key="employee.uid">
                  <div class="user-card p-3 mx-4 mt-3 mb-3 d-flex flex-row align-items-center"
                    :draggable="employeeStore.emp_details.isAdmin" v-if="employee.department === 'FrontEnd'"
                    @dragstart="startDrag($event, employee)">
                    <div class="profile-container d-flex align-items-center justify-content-center">
                      <div class="profile-image emp-initials d-flex align-items-center justify-content-center fw-bold">
                        {{ empInitials(employee.fullName) }}
                      </div>
                    </div>
                    <div class="d-flex ps-2 flex-column justify-content-center emp-info-container">
                      <div class="emp-name fw-bold">{{ employee.fullName }}</div>
                      <label class="emp-email fw-medium">{{ employee.email }}</label>
                      <label class="emp-dept fw-medium">FrontEnd</label>
                    </div>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6  employee-dept-table">
            <div class="common-header d-flex justify-content-center align-items-center fs-5 fw-bold">
              BackEnd
            </div>
            <div class="common-department-content" @drop="onDrop($event, 'BackEnd')" @dragenter.prevent @dragover.prevent>
              <transition-group name="content-card" tag="div" @before-enter="beforeEnter" @enter="enter"
                @before-leave="beforeLeave" @leave="leave" appear>
                <div class="users-list" v-for="employee in empData" :key="employee.uid">
                  <div class="user-card p-3 mx-4 mt-3 mb-3 d-flex flex-row align-items-center"
                    :draggable="employeeStore.emp_details.isAdmin" v-if="employee.department === 'BackEnd'"
                    @dragstart="startDrag($event, employee)">
                    <div class="profile-container d-flex align-items-center justify-content-center">
                      <div class="profile-image emp-initials d-flex align-items-center justify-content-center fw-bold">
                        {{ empInitials(employee.fullName) }}
                      </div>
                    </div>
                    <div class="d-flex ps-2 flex-column justify-content-center emp-info-container">
                      <div class="emp-name fw-bold">{{ employee.fullName }}</div>
                      <label class="emp-email fw-medium">{{ employee.email }}</label>
                      <label class="emp-dept fw-medium">BackEnd</label>
                    </div>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6  employee-dept-table">
            <div class="common-header d-flex justify-content-center align-items-center fs-5 fw-bold">
              UI/UX
            </div>
            <div class="common-department-content" @drop="onDrop($event, 'Ui/Ux')" @dragenter.prevent @dragover.prevent>
              <transition-group name="content-card" tag="div" @before-enter="beforeEnter" @enter="enter"
                @before-leave="beforeLeave" @leave="leave" appear>
                <div class="users-list" v-for="employee in empData" :key="employee.uid">
                  <div class="user-card p-3 mx-4 mt-3 mb-3 d-flex flex-row align-items-center"
                    :draggable="employeeStore.emp_details.isAdmin" v-if="employee.department === 'Ui/Ux'"
                    @dragstart="startDrag($event, employee)">
                    <div class="profile-container d-flex align-items-center justify-content-center">
                      <div class="profile-image emp-initials d-flex align-items-center justify-content-center fw-bold">
                        {{ empInitials(employee.fullName) }}
                      </div>
                    </div>
                    <div class="d-flex ps-2 flex-column justify-content-center emp-info-container">
                      <div class="emp-name fw-bold">{{ employee.fullName }}</div>
                      <label class="emp-email fw-medium">{{ employee.email }}</label>
                      <label class="emp-dept fw-medium">Ui/Ux</label>
                    </div>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6  employee-dept-table">
            <div class="common-header d-flex justify-content-center align-items-center fs-5 fw-bold">
              Devops
            </div>
            <div class="common-department-content" @drop="onDrop($event, 'DevOps')" @dragenter.prevent @dragover.prevent>
              <transition-group name="content-card" tag="div" @before-enter="beforeEnter" @enter="enter"
                @before-leave="beforeLeave" @leave="leave" appear>
                <div class="users-list" v-for="employee in empData" :key="employee.uid">
                  <div class="user-card p-3 mx-4 mt-3 mb-3 d-flex flex-row align-items-center"
                    :draggable="employeeStore.emp_details.isAdmin" v-if="employee.department === 'DevOps'"
                    @dragstart="startDrag($event, employee)">
                    <div class="profile-container d-flex align-items-center justify-content-center">
                      <div class="profile-image emp-initials d-flex align-items-center justify-content-center fw-bold">
                        {{ empInitials(employee.fullName) }}
                      </div>
                    </div>
                    <div class="d-flex ps-2 pe-2 flex-column justify-content-center emp-info-container">
                      <div class="emp-name fw-bold">{{ employee.fullName }}</div>
                      <label class="emp-email fw-medium">{{ employee.email }}</label>
                      <label class="emp-dept fw-medium">DevOps</label>
                    </div>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useFormatName } from "@/composables/useFormatName";
import { collection, onSnapshot, doc, updateDoc, type DocumentData, DocumentReference } from "firebase/firestore";
import { db, auth } from "@/includes/firebase";
import { useEmployeeStore } from '@/stores/employeeStore'
import { useFormattedDate } from '@/composables/useFormatedDate';
import gsap from 'gsap'
import type Employee from '@/types/employee'
import type empDoc from '@/types/empDoc'
import type techStackTimeLine from "@/types/techStackTimeLine";

const { formattedDate } = useFormattedDate()
const employeeStore = useEmployeeStore();
const { empInitials } = useFormatName();

onBeforeMount(async () => {
  getEmpData();
  await employeeStore.getEmpDetails()
});

const empData = ref(<empDoc[]>[]);
async function getEmpData(): Promise<void> {
  onSnapshot(
    collection(db, "employees"),
    (querySnapshot) => {
      empData.value = [] as empDoc[];
      querySnapshot.forEach((doc) => {
        const data: empDoc = {
          ...doc.data() as Employee,
          docId: doc.id
        }
        empData.value.push(data);
      });
    }
  );
}
const startDrag = (event: DragEvent, item: empDoc) => {
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.effectAllowed = "move";
  event.dataTransfer!.setData("itemID", item.uid);
};

const onDrop = async (event: DragEvent, department: string): Promise<void> => {
  const itemID: string = event.dataTransfer!.getData("itemID");
  const emp: empDoc[] = empData.value.filter((item: { uid: string; }) => item.uid == itemID);

  if (emp[0].department !== department) {
    const docId: string = emp[0].docId;
    if (employeeStore.emp_details.isAdmin) {
      const techStackTimeLine: techStackTimeLine[] = [...emp[0].techStackTimeLine];

      const today: Date = new Date();
      const date: string = formattedDate(today.toISOString());
      const stackData: techStackTimeLine = {
        techStack: department,
        date: date
      };
      techStackTimeLine.push(stackData)
      const empRef: DocumentReference<DocumentData> = doc(db, "employees", docId);
      await updateDoc(empRef, {
        department: department,
        techStackTimeLine: techStackTimeLine
      });
    }
  }
};

function beforeEnter(el: { style: { opacity: number; transform: string; }; } | Element) {
  const element = el as HTMLElement
  element.style.opacity = "0";
  element.style.transform = 'translateY(100px)'
}
function enter(el: { dataset: { index: number; }; } | Element, done: () => void) {
  const element = el as HTMLElement
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    onComplete: done
  })
}
function beforeLeave(el: { style: { opacity: number; }; } | Element) {
  const element = el as HTMLElement
  element.style.opacity = "1"
}
function leave(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 0,
    x: -250,
    scaleY: 0.01,
    duration: 0.3,
    onComplete: done
  })
}
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
  height: 110px;
  overflow: hidden;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
}

.common-department-content :hover {
  transform: scale(1.02);
  transition: 0.25s;
}

.emp-email {
  color: #4e4e4e;
  font-size: 12px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.emp-dept {
  color: #0d6efd;
}

.profile-image {
  border-radius: 8px;
  background-color: #e2e2e2;
}

.emp-initials {
  height: 70px;
  width: 70px;
}

.emp-name {
  font-size: 20px;
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

.content-card-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.content-card-move {
  transition: all 0.5s ease;
}

.emp-info-container {
  width: 100%;
  overflow: hidden;
}

@media (max-width: 1520px) {
  .user-card {
    height: 90px;
  }

  .emp-email {
    font-size: 12px;
  }

  .emp-dept {
    font-size: 13px;
  }

  .emp-name {
    font-size: 18px;
  }

  .emp-initials {
    height: 60px;
    width: 60px;
  }

}

@media (max-width: 1200px) {
  .container-fluid {
    width: 90%;
  }

  .user-card {
    height: 115px;
    flex-direction: column !important;
    padding: 10px !important;
  }

  .emp-initials {
    height: 40px;
    width: 40px;
  }

  .emp-name {
    font-size: 15px;
  }

  .emp-email {
    text-align: center;
  }

  .emp-info-container {
    width: 80%;
    align-items: center;
    padding: 0 !important;
    overflow: visible
  }
}

@media (max-width: 991px) {
  .container-fluid {
    display: flex;
    justify-content: center;
  }

  .emp-name {
    font-size: 15px;
  }

  .emp-dept {
    font-size: 12px;
  }

  .row {
    width: 80% !important;
  }

  .employee-dept-table {
    width: 50% !important;
  }

}

@media (max-width: 767px) {
  .common-department-content {
    height: 350px;
  }

  .common-header {
    margin-top: 20px;
  }

  .row {
    width: 90% !important;
  }

  .employee-dept-table {
    width: 50% !important;
  }
}

@media (max-width: 575px) {


  .profile-image {
    font-size: 15px;
  }

  .row {
    display: flex !important;
    justify-content: center !important;
  }

  .employee-dept-table {
    width: 90% !important;
  }
}

@media (max-width: 425px) {
  .employee-dept-table {
    width: 100% !important;
  }
}
</style>