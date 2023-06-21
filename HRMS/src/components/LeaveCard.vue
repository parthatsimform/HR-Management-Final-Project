<template>
    <div class="card-body w-100">
        <h5 class="card-title">{{ leave.startDate }} <span class=" fw-light fs-6">to</span> {{
            leave.endDate }}</h5>
        <h6 class="card-subtitle">{{ leave.type }}</h6>
        <p class="card-text w-100">{{ leave.reason }}</p>
        <div class="d-flex">
            <button class="btn btn-outline-primary bg-primary-subtle view-btn" type="button" data-bs-toggle="modal"
                data-bs-target="#exampleModal" @click="$emit('handleLeaveDisplay', leave.id)">
                View Request
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type Leave from '@/types/leaveObj'
interface leaveObj extends Leave {
    id: string
}

defineProps<{ leave: leaveObj }>()
</script>

<style scoped>
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
</style>