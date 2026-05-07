<script setup lang="ts">
import { ref, watch } from 'vue';

const prop = defineProps<{ count: number }>();
const emit = defineEmits(['filter']);

const isUpdating = ref(false);

watch(() => prop.count, (newCount, oldCount) => {
    if (newCount === oldCount) return;

    isUpdating.value = true;

    setTimeout(() => {
        isUpdating.value = false;
    }, 300);
});

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('filter', target.value);
}
</script>

<template>
    <div class="search-container">
        <span class="results-count" :class="{ 'animate-pop': isUpdating }">{{ count }}</span>
        <input type="text" placeholder="Filter podcasts..." @input="handleInput" />
    </div>
</template>

<style lang="scss" scoped>
.search-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    margin-bottom: 20px;

    .results-count {
        background-color: #3c74a9;
        color: white;
        font-weight: bold;
        font-size: 1.2rem;
        padding: 4px 10px;
        border-radius: 8px;
        min-width: 30px;
        text-align: center;
        transition: transform 0.3s ease-out, 0.3s ease;
        transform-origin: center;

        &.animate-pop {
            transform: scale(1.2);
        }
    }

    input {
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
        width: 100%;
        max-width: 250px;
        transition: border-color 0.2s ease-in-out;

        &::placeholder {
            color: #aaa;
            font-style: italic;
        }

        &:focus {
            outline: none;
            border-color: #3c74a9;
            box-shadow: 0 0 4px rgba(60, 116, 169, 0.2);
        }
    }
}
</style>