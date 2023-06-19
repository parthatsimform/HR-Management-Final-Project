<template>
    <Suspense>
        <section>
            <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
                <h1 class="text-center home-head">
                    <p class="p-0 m-0">Hey</p> <strong class="usr-name">
                        {{ auth.currentUser!.displayName ?displayName(auth.currentUser!.displayName) : ''  }} !
                    </strong>
                </h1>
                <h1 class="text-center home-head">
                    Welcome to <strong class="brand-name">HRMS!!</strong>
                </h1>
            </div>
        </section>
    </Suspense>
</template>

<script setup lang="ts">
import { auth } from '@/includes/firebase';
import { useFormatName } from '@/composables/useFormatName'

const { displayName } = useFormatName()
</script>

<style scoped>
.container-fluid {
    height: 100vh;
}

.home-head {
    font-size: 5rem;
}

h1 {
    font-weight: 1000;
}

.usr-name {
    font-size: 6rem;
    background: -webkit-linear-gradient(#09C6F9, #045DE9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

@media (max-width:800px) {
    .home-head {
        font-size: 4rem !important;
    }

    .usr-name {
        font-size: 5rem;
    }
}

@media (max-width:550px) {
    .home-head {
        font-size: 3rem !important;
    }

    .usr-name {
        font-size: 3.5rem;
    }
}

@media (max-width:350px) {
    .home-head {
        font-size: 2.5rem !important;
    }

    .usr-name {
        font-size: 3rem;
    }
}
</style>