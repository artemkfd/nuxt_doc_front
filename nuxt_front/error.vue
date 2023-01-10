<template>
    <div class="mt-7 max-w-sm mx-auto text-center card">
        <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
        <p class="mt-7 text-6xl">Упс</p>
        <p class="mt-7">{{ error.message }}</p>
        <button class="mt-7 p-2 rounded-full text-white bg-sky-700 hover:bg-sky-600">Назад</button>
    </div>
</template>

<script setup>
const props = defineProps({error})
  const handleError = () => clearError({ redirect: '/' })
    console.log(error)
</script>