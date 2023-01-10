<template>
    <div class="p-5">
        <h1 class="text-center">Все договора</h1>
        <div class=" mt-4 grid grid-cols-5 gap-5">
            <div  v-for="doc in allDocs" :key="doc.id">
                <NuxtLink class="text-center p-1 bg-gray-700 rounded-md" :to="`/docs/${doc.id}/`">
                {{ doc.carGrz }} {{ doc.number }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const url = 'http://127.0.0.1:8000/my_core/docs/'
const {data: allDocs} = useFetch(url)

</script>

<style  scoped>

</style>