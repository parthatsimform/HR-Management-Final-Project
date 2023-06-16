<template>
    <Suspense>
        <section>
            <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
                <h1 class="text-center home-head" v-if="userData.name">
                    Hey <strong class="usr-name">
                        {{ returnDisplayName() }}
                    </strong>!
                </h1>
                <h1 class="text-center home-head">
                    Welcome to <strong class="brand-name">HRMS</strong>!!
                </h1>
            </div>
        </section>
    </Suspense>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { auth, db } from '@/includes/firebase';
import { collection, onSnapshot, query, where } from "firebase/firestore";
let userData = ref<{ [key: string]: string }>({})
console.log(auth.currentUser?.uid);

onMounted(async () => {
    const q = query(collection(db, "employees"), where("uid", "==", auth.currentUser!.uid));
    onSnapshot(q, (querySnapshot) => {
        const fbUser: { [key: string]: string }[] = []
        querySnapshot.forEach((doc: { [x: string]: any }) => {
            const docObj = doc.data()
            const user = {
                email: <string>docObj.email,
                name: <string>docObj.fullName,
                id: <string>doc.id
            }
            fbUser.push(user)
        });
        userData.value = fbUser[0]
    })
})

const returnDisplayName = () => {
    const { name } = userData.value
    return name.charAt(0).toUpperCase() + name.slice(1)
}
</script>

<style scoped>
.container-fluid {
    height: 100vh;
}

.home-head {
    font-size: 100px;
}

h1 {
    font-weight: 1000;
}

.usr-name {
    background: -webkit-linear-gradient(#09C6F9, #045DE9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

@media (max-width:700px) {
    .home-head {
        font-size: 80px !important;
    }
}

@media (max-width:550px) {
    .home-head {
        font-size: 60px !important;
    }
}

@media (max-width:350px) {
    .home-head {
        font-size: 50px !important;
    }
}
</style>