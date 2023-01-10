<template>
    <div>
    <div>
    <NuxtLink to="/docs/">Назад</NuxtLink>
    </div>
        <h1 class="text-center">Договор № {{ docData.number }}
        <button class="rounded-md p-1 pl-2 pr-2 bg-green-700 hover:bg-green-800 text-center " @click="downloadItem()">Скачать</button>
        </h1>
        <div class="">
            {{ docData.carGrz }}
            {{ docData.carModel }}
            {{ docData.carType }}
            <p>Груз - {{ docData.cargoType }}</p>
            <p>Адреса погрузки</p>
            <div v-for="data in docData.allAdressFrom">
            <p>{{ data }}</p>
            </div>
            <p>Адреса разгрузки</p>
            <div v-for="data in docData.allAdressTo">
            <p>{{ data }}</p>
            </div>
            <table class="table-auto text-left">
                <thead>
                    <tr>
                    <th>Исполнитель</th>
                    <th>Клиент</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>ООО «{{ docData.ispolnitelFirmName }}»</td>
                    <td>ООО  «{{ docData.clientFirmName }}»</td>
                    </tr>
                    <tr>
                    <td>Юридический адрес:{{ docData.ispolnitelUrAdress }}</td>
                    <td>Юридический адрес:{{ docData.clientUrAdress }}</td>
                    </tr>
                    <tr>
                    <td>ИНН {{ docData.ispolnitelInn }}</td>
                    <td>ИНН {{ docData.clientInn }}</td>
                    </tr>
                    <tr>
                    <td>КПП {{ docData.ispolnitelKpp }}</td>
                    <td>КПП {{ docData.clientKpp }}</td>
                    </tr>
                    <tr>
                    <td>ОГРН {{ docData.ispolnitelOgrn }}</td>
                    <td>ОГРН {{ docData.clientOgrn }}</td>
                    </tr>
                    <tr>
                    <td>БИК {{ docData.ispolnitelBik }}</td>
                    <td>БИК {{ docData.clientBik }}</td>
                    </tr>
                    <tr>
                    <td>Р/с {{ docData.ispolnitelRs }}</td>
                    <td>Р/с {{ docData.clientRs }}</td>
                    </tr>
                    <tr>
                    <td>{{ docData.ispolnitelBank }}</td>
                    <td>{{ docData.clientBank }}</td>
                    </tr>
                    <tr>
                    <td>Ген.директор {{ docData.ispolnitelDirShort }}</td>
                    <td>Ген.директор {{ docData.clientDirShort }}</td>
                    </tr>
                </tbody>
            </table>
    
        </div>
    </div>
</template>

<script setup>
const route = useRoute();
useHead({
    title: `HLPLOG - ${route.params.id}`
})

const fullname = computed(() => {
    return `Договор №${route.params.id}`;
});
const url = `http://127.0.0.1:8000/my_core/docs/${route.params.id}/`
const {data: docData} = await useFetch(url)
console.log('docData', docData)


async function  downloadItem() {
      const baseUrl = `http://127.0.0.1:8000/my_core/download/66`
      const downloadUrl =` ${baseUrl}/`
      const response = await useFetch(downloadUrl, { responseType: "blob" });
      console.log('response', response)
      console.log('response.data', response.data)
      const blob = new Blob([response.data.value], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = newUrl[4];
      link.click();
      URL.revokeObjectURL(link.href);
    }
</script>

<style  scoped>

</style>