<template>
    <section>
        <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
            <h1 class="text-center home-head">
                Hey <strong class="usr-name">Uday</strong>!
            </h1>
            <h1 class="text-center home-head">
                Welcome to <strong class="brand-name">HRMS</strong>!!
            </h1>
        </div>
    </section>
</template>

<script lang="ts">
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