<template>
    <div class="container mx-auto text-center mt-3" :class="{ 'animate-[slide_1s_ease-in-out]': sideBarOpen }">
            <div>
                <h1 @click="fakeData()" class="mb-4 text-xl">Редактор договора</h1>  
            </div>
            <div class="flex space-x-6 text-sm  ">
                <div class="p-4 ">
                <form action="" class="min-w-lg">
                    <div class="flex justify-center space-x-2 mt-2">
                        <button @click.prevent="prevStep()" class="rounded-md p-1 pl-2 pr-2 bg-sky-700 hover:bg-sky-800"><div class="flex space-x-2"><nuxt-icon name="IonChevronBackCircleOutline" filled /><span>Назад</span></div></button>
                        <button v-if="stepIndex == 6" class="rounded-md p-1 pl-2 pr-2 bg-green-700 hover:bg-green-800 text-center " @click="createDoc()">Скачать</button>
                        <span v-else class="p-1 bg-sky-900 rounded-md">{{ indicator }}</span>
                        <button @click.prevent="nextStep()" class="rounded-md p-1 pl-2 pr-2 bg-sky-700 hover:bg-sky-800"><div class="flex space-x-2"><span>Далее</span><nuxt-icon name="IonChevronForwardCircleOutline" filled /></div></button>
                    </div>
                    <div v-if="step_1" class="step ">
                        <div class="p-2">
                        <p class="mb-2 text-gray-400">Номер договора</p>
                        <input type="text" v-model="docNum" class="text-center">
                        </div>
                        <div class="p-2">
                        <p class="mb-2 text-gray-400">Дата договора</p>
                        <input v-model="docDate" type="text" class="text-center">
                        </div>
                        <div class="p-2">
                        <p class="mb-2 text-gray-400">Фирма Исполнитель</p>
                        <input v-model="ispolnitelFirmName" type="text" class="text-center">
                        </div>
                        <div class="p-2">
                        <p class="mb-2 text-gray-400">Директор Исполнитель</p>
                        <input v-model="ispolnitelDirName" type="text" class="text-center max-w-auto">
                        </div>
                        <div class="p-2">
                        <p class="mb-2 text-gray-400">Фирма Заказчик</p>
                        <input v-model="clientFirmName" type="text" class="text-center">
                        </div>
                        <div class="p-2">
                        <p class="mb-2 text-gray-400">Директор Заказчик</p>
                        <input v-model="clientDirName" type="text" class="text-center max-w-auto">
                        </div>
                    </div>
                    <div v-if="step_2">
                        <div class="p-2">
                        <p class="mb-2 text-gray-400">Характер груза</p>
                        <input v-model="cargoType" type="text" class="text-center max-w-auto">
                        </div>
                        <div class="p-2">
                        <p class="mb-2 text-gray-400">Адрес погрузки <span class="rounded-full pl-2 pr-2 bg-green-600 text-white">{{ allAdressFrom.length }}</span></p>
                            <div class="relative">
                                <span class="static">
                                <textarea v-model="adrFrom" type="text" class="inline-block text-sm text-center max-w-auto pr-7 pl-2"></textarea>
                                <button @click.prevent="addAdress('from', adrFrom)" class="absolute right-1 top-0.5  rounded-full hover:bg-gray-700"><nuxt-icon name="GalaAdd" filled /></button>
                                </span>
                            </div>
                        </div>
                        <div class="p-2">
                        <p class="mb-2 text-gray-400">Адрес разгрузки <span class="rounded-full pl-2 pr-2 bg-green-600 text-white">{{ allAdressTo.length }}</span></p>
                            <div class="relative">
                                <span class="static">
                                <textarea v-model="adrTo" type="text" class="text-center max-w-auto pr-7 pl-2"></textarea>
                                <button @click.prevent="addAdress('to',adrTo)" class="absolute right-1 top-0.5  rounded-full hover:bg-gray-700"><nuxt-icon name="GalaAdd" filled /></button>
                            </span>
                            </div>
                        </div>
                        <div class="p-2">
                        <p class="mb-2 text-gray-400">№ ОКВЭД Исполнителя</p>
                        <input v-model="ispOkvedNumber" type="text" class="text-center max-w-auto">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Расшифровка ОКВЭД Исполнителя</p>
                            <textarea v-model="ispOkvedText" type="text" class="text-center max-w-auto"></textarea>
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">№ ОКВЭД Клиента</p>
                            <input v-model="clientOkvedNumber" type="text" class="text-center max-w-auto">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Расшифровка ОКВЭД Клиента</p>
                            <textarea v-model="clientOkvedText" type="text" class="text-center max-w-auto"></textarea>
                        </div>
                    </div>
                    <div v-if="step_3">
                        <div class="p-2">
                        <p class="mb-2 text-gray-400">Госномер</p>
                        <input v-model="carGrz" type="text" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Марка Модель</p>
                            <input v-model="carModel" type="text" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Тип авто</p>
                            <input v-model="carType" type="text" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Масса без нагрузки</p>
                            <input v-model="carCargoMin" type="number" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Масса с полной загрузкой</p>
                            <input v-model="carCargoMax" type="number" class="text-center">
                        </div>
                    </div>
                    <div v-if="step_4">
                        <div class="p-2">
                        <p class="mb-2 text-gray-400">Действие договора с</p>
                        <input v-model="docDateFrom" type="date" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Действие договора по</p>
                            <input v-model="docDateTo" type="date" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Юр адрес Исполнитель</p>
                            <input v-model="ispolnitelUrAdress" type="text" class="text-center">
                        </div>
                    </div>
                    <div v-if="step_5">
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Юр адрес Исполнитель</p>
                            <input v-model="ispolnitelUrAdress" type="text" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">ИНН Исполнитель</p>
                            <input v-model="ispolnitelInn" type="number" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">КПП Исполнитель</p>
                            <input v-model="ispolnitelKpp" type="number" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">ОГРН Исполнитель</p>
                            <input v-model="ispolnitelOgrn" type="number" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">БИК Исполнитель</p>
                            <input v-model="ispolnitelBik" type="number" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Р/с Исполнитель</p>
                            <input v-model="ispolnitelRs" type="number" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Банк Исполнитель</p>
                            <input v-model="ispolnitelBank" type="text" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Директор(Ф и инициалы) Исполнитель</p>
                            <input v-model="ispolnitelDirShort" type="text" class="text-center">
                        </div>
                        
                    </div>
                    <div v-if="step_6">
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Юр адрес Клиент</p>
                            <input v-model="clientUrAdress" type="text" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">ИНН Клиент</p>
                            <input v-model="clientInn" type="number" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">КПП Клиент</p>
                            <input v-model="clientKpp" type="number" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">ОГРН Клиент</p>
                            <input v-model="clientOgrn" type="number" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">БИК Клиент</p>
                            <input v-model="clientBik" type="number" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Р/с Клиент</p>
                            <input v-model="clientRs" type="number" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Банк Клиент</p>
                            <input v-model="clientBank" type="text" class="text-center">
                        </div>
                        <div class="p-2">
                            <p class="mb-2 text-gray-400">Директор(Ф и инициалы) Клиент</p>
                            <input v-model="clientDirShort" type="text" class="text-center">
                        </div>
                    </div>
                    <div class="flex justify-center space-x-2 mt-2">
                        <button @click.prevent="prevStep()" class="rounded-md p-1 pl-2 pr-2 bg-sky-700 hover:bg-sky-800"><div class="flex space-x-2"><nuxt-icon name="IonChevronBackCircleOutline" filled /><span>Назад</span></div></button>
                        <button v-if="stepIndex == 6" class="rounded-md p-1 pl-2 pr-2 bg-green-700 hover:bg-green-800 text-center " @click="createDoc()">Скачать</button>
                        <span v-else class="p-1 bg-sky-900 rounded-md">{{ indicator }}</span>
                        <button @click.prevent="nextStep()" class="rounded-md p-1 pl-2 pr-2 bg-sky-700 hover:bg-sky-800"><div class="flex space-x-2"><span>Далее</span><nuxt-icon name="IonChevronForwardCircleOutline" filled /></div></button>
                    </div>
                    
                </form>
                </div>
                <div class="p-2 text-sm">
                    <div v-if="step_1" class="text-sm max-w-auto ">
                        <p class="text-center">Договор транспортной экспедиции</p>  
                        <strong class="text-yellow-300">№ {{docNum}}</strong> 
                        <div class="text-left text-sm max-w-2xl ">
                        г. Москва_________________________________________________________________________<strong class="text-yellow-300">{{ docDate }}</strong>
                        Общество с ограниченной ответственностью «<strong class="text-yellow-300">{{ ispolnitelFirmName }}</strong>» именуемое в дальнейшем
                        «Исполнитель», в лице <strong class="text-yellow-300">{{ ispolnitelDirName }}</strong>, действующего на основании Устава, с одной
                        стороны, и Общество с ограниченной ответственностью «<strong class="text-yellow-300">{{clientFirmName}}</strong>», именуемое в дальнейшем 
                        «Клиент», в лице Генерального директора <strong class="text-yellow-300">{{clientDirName}}</strong>, действующего на 
                        основании Устава, с другой стороны, совместно именуемые «Стороны», заключили настоящий
                        договор о нижеследующем:
                        </div>    
                    </div>
                    <div v-if="step_2" class="text-left text-sm max-w-2xl ">
                        <p class="text-center mt-2">2. Условия договора</p>
                        <p>2.3.2.  Характер груза: <strong class="text-yellow-300">{{cargoType}}</strong>;</p>         
                        <p>2.3.6.  адреса погрузки груза:</p>                
                        <div >
                            <span class="relative" v-for="adress in adressFrom" :key="adress.id">
                            <p class="text-yellow-300 static">{{ adress }} ;  <button @click.prevent="removeAdress('from', adress.id)" class="absolute -left-6 rounded-full hover:bg-gray-700"><nuxt-icon  name="GalaRemove" filled /></button></p>
                            </span>
                        </div>
                        <p class="pt-3">2.3.7.  адреса разгрузки груза:</p>
                        <span class="relative" v-for="adress in adressTo" :key="adress.id">
                            <p class="text-yellow-300">{{ adress }} ; <button @click.prevent="removeAdress('to', adress.id)" class="absolute -left-6 rounded-full  hover:bg-gray-700"><nuxt-icon name="GalaRemove" filled /></button></p>
                        </span>

                    <p>2.4. Вид деятельности Исполнителя - <strong class="text-yellow-300">{{ ispOkvedText }}</strong> (ОКВЭД <strong class="text-yellow-300">{{ ispOkvedNumber }}</strong>)</p>
                    <p>2.5. Вид деятельности Клиента - <strong class="text-yellow-300">{{ clientOkvedText }}</strong> (ОКВЭД <strong class="text-yellow-300">{{ clientOkvedNumber }}</strong>)</p>
                    </div>

                    <div v-if="step_3" class="text-left text-sm max-w-2xl ">
                        <table class="table-auto">
                            <thead>
                                <tr>
                                <th>Рег. номер</th>
                                <th>Марка, Модель ТС</th>
                                <th>Тип ТС</th>
                                <th>Грузоподъемность</th>
                                <th>Ежесуточное<br>кол-во</th>
                                <th>Ежемесячное<br>кол-во</th>
                                <th>Объем</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>{{ carGrz }}</td>
                                <td>{{ carModel }}</td>
                                <td>{{ carType }}</td>
                                <td>{{ carCargo }} кг</td>
                                <td>{{ carCargo80 }} кг</td>
                                <td>{{ carCargoMonth }} кг</td>
                                <td>{{ carCargoYear }} кг</td>
                                </tr>
                            </tbody>
                            </table>
                    </div>

                    <div v-if="step_4" class="text-left text-sm max-w-2xl ">
                        <p class="text-center">8. Сроки действия договора</p>
                    <p>8.1. Настоящий договор вступает в силу с момента его подписания и действует с <strong class="text-yellow-300">{{ docDateFrom }}</strong> года  до <strong class="text-yellow-300">{{ docDateTo }}</strong> года. При отсутствии возражений сторон по поводу продолжения действия договора, направленных за 30 дней до окончания срока действия договора, договор считается пролонгированным на следующий календарный год.</p>
                    </div>
                    <div v-if="stepIndex > 4" class="text-left text-sm max-w-2xl ">
                        <p class="text-center">9. Адреса и подписи сторон</p>
                        <table class="table-auto">
                            <thead>
                                <tr>
                                <th>Исполнитель</th>
                                <th>Клиент</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>ООО «{{ ispolnitelFirmName }}»</td>
                                <td>ООО  «{{ clientFirmName }}»</td>
                                </tr>
                                <tr>
                                <td>Юридический адрес:{{ ispolnitelUrAdress }}</td>
                                <td>Юридический адрес:{{ clientUrAdress }}</td>
                                </tr>
                                <tr>
                                <td>ИНН {{ ispolnitelInn }}</td>
                                <td>ИНН {{ clientInn }}</td>
                                </tr>
                                <tr>
                                <td>КПП {{ ispolnitelKpp }}</td>
                                <td>КПП {{ clientKpp }}</td>
                                </tr>
                                <tr>
                                <td>ОГРН {{ ispolnitelOgrn }}</td>
                                <td>ОГРН {{ clientOgrn }}</td>
                                </tr>
                                <tr>
                                <td>БИК {{ ispolnitelBik }}</td>
                                <td>БИК {{ clientBik }}</td>
                                </tr>
                                <tr>
                                <td>Р/с {{ ispolnitelRs }}</td>
                                <td>Р/с {{ clientRs }}</td>
                                </tr>
                                <tr>
                                <td>{{ ispolnitelBank }}</td>
                                <td>{{ clientBank }}</td>
                                </tr>
                                <tr>
                                <td>Ген.директор {{ ispolnitelDirShort }}</td>
                                <td>Ген.директор {{ clientDirShort }}</td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
                    
                    
                </div>
            </div>
        </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })
// const url = 'http://127.0.0.1:8000/my_core/files/2/?format=json'
// const { data: file, pending, refresh, error } =  useFetch(url)
// const { data: documents, pending, refresh, error } = await useFetch(url, { pick: ['file', 'title'] })
// const { data: users, pending, refresh, error } = await useFetch(() => `1`, { baseURL: 'url' }
// );
// console.log('data ', file.value)

// docum.value = await documents.value

// console.log('pending ', pending)
// console.log('refresh ', refresh)
// console.log('error ', error)
// /media/%D0%9F%D0%95%D0%A0%D0%95%D0%92%D0%9E%D0%97%D0%9A%D0%90_%D0%BE%D1%82_09.11.2022__%D0%9D%D0%9E%D0%A7%D0%AC.docx

// const url2 = 'http://127.0.0.1:8000/my_core/docs/'
// const resp = await useFetch(url2, {
//     method: 'POST',
//     body: {
//         number:'DDADdsfsfF',
//         date:'2012.11.11',
//         date_from:'123132',
//         date_to: 'sgsgsdg',
//     }
// })
const sideBar = useSideBar()
const sideBarOpen = ref(sideBar);
let stepIndex


let step_1 = useStep1()
let step_2 = useStep2()
let step_3 = useStep3()
let step_4 = useStep4()
let step_5 = useStep5()
let step_6 = useStep6()
let indicator = ref('')

onMounted(() => {
    console.log("On mounted called")
    stepIndex = useStep()
    step_1 = useStep1()
    step_2 = useStep2()
    step_3 = useStep3()
    step_4 = useStep4()
    step_5 = useStep5()
    step_6 = useStep6()
    indicator.value = `${stepIndex.value}/6`
    console.log("state Loaded")
})
const docNum = ref('');
const date = useDocDate()
const docDate = ref(date);

const ispolnitelFirmName = ref('');
const ispolnitelDirName = ref('');
const clientFirmName = ref('');
const clientDirName = ref('');
const cargoType = ref('');
const allAdressFrom = useAdrressFrom()
const allAdressTo = useAdrressTo()
const ispOkvedNumber = ref('')
const ispOkvedText = ref('')
const clientOkvedNumber = ref('')
const clientOkvedText = ref('')

const carGrz = ref('')
const carModel = ref('')
const carType = ref('')
const carCargoMin = ref(0)
const carCargoMax = ref(0)
let carCargo = ref('0')
let carCargo80 = ref('0')
let carCargoMonth = ref('0')
let carCargoYear = ref('0')

const DateFrom = useDateFrom()
const DateTo = useDateTo()
const docDateFrom = ref(DateFrom);
const docDateTo = ref(DateTo);

const ispolnitelUrAdress = ref('')
const ispolnitelInn = ref('')
const ispolnitelKpp = ref('')
const ispolnitelOgrn = ref('')
const ispolnitelBik = ref('')
const ispolnitelRs = ref('')
const ispolnitelBank = ref('')
const ispolnitelDirShort = ref('')

const clientUrAdress = ref('')
const clientInn = ref('')
const clientKpp = ref('')
const clientOgrn = ref('')
const clientBik = ref('')
const clientRs = ref('')
const clientBank = ref('')
const clientDirShort = ref('')

const adressFrom = ref(allAdressFrom);
const adressTo = ref(allAdressTo);

let showFakeData = false;
function fakeData(){
    showFakeData = !showFakeData
    if (showFakeData){
        docNum.value = 'Д19-03-2';

        ispolnitelFirmName.value = 'ПРОСТОР М'
        ispolnitelDirName.value = 'Базеева Рамиля Рясимовича'
        clientFirmName.value = 'МАРС ГРУПП'
        clientDirName.value = 'Рощупкиной Виктории Игоревны'
        cargoType.value = 'бытовая химия'
        allAdressFrom.value = ['1 адрес', '2 adress', '3 adress']
        allAdressTo.value = ['1 адрес', '2 adress', '3 adress']
        ispOkvedNumber.value = '49.41'
        ispOkvedText.value = 'Деятельность автомобильного грузового транспорта'
        clientOkvedNumber.value ='46.75'
        clientOkvedText.value = 'торговля оптовая химическими продуктами'

        carGrz.value = 'А123АА777'
        carModel.value = 'MAN TGA 12345'
        carType.value = 'Самосвал'
        carCargoMin.value = 2000
        carCargoMax.value = 4000
        carCargo.value = 2000
        carCargo80.value = 1600
        carCargoMonth.value = 5600
        carCargoYear.value = 160000

        docDateFrom.value = '12.12.2022';
        docDateTo.value = '11.12.2023';

        ispolnitelUrAdress.value = '123456, Коминтерна 26 к 2А'
        ispolnitelInn.value = '781234561345'
        ispolnitelKpp.value = '888234596'
        ispolnitelOgrn.value ='1234567891023'
        ispolnitelBik.value ='555555555'
        ispolnitelRs.value = '7777ispolnitelRs'
        ispolnitelBank.value = 'ПАО СБЕРБАНКИНГ филиал 777'
        ispolnitelDirShort.value = 'Базеева Р.Р.'

        clientUrAdress.value = '123456, Коминтерна 26 к 2А'
        clientInn.value = '954234561345'
        clientKpp.value = '444234596'
        clientOgrn.value = '3534567891023'
        clientBik.value = '555555555'
        clientRs.value = '7777ispolnitelRs'
        clientBank.value = 'ПАО ВТБ филиал 777'
        clientDirShort.value = 'Рощупкина В.И.'
        } else {
        docNum.value = '';
        ispolnitelFirmName.value = ''
        ispolnitelDirName.value = ''
        clientFirmName.value = ''
        clientDirName.value = ''
        cargoType.value = ''
        allAdressFrom.value = ['']
        allAdressTo.value = ['']
        ispOkvedNumber.value = ''
        ispOkvedText.value = ''
        clientOkvedNumber.value =''
        clientOkvedText.value = ''

        carGrz.value = ''
        carModel.value = ''
        carType.value = ''
        carCargoMin.value = 0
        carCargoMax.value = 0
        carCargo.value = 0
        carCargo80.value = 0
        carCargoMonth.value = 0
        carCargoYear.value = 0

        docDateFrom.value = '';
        docDateTo.value = '';

        ispolnitelUrAdress.value = ''
        ispolnitelInn.value = ''
        ispolnitelKpp.value = ''
        ispolnitelOgrn.value =''
        ispolnitelBik.value =''
        ispolnitelRs.value = ''
        ispolnitelBank.value = ''
        ispolnitelDirShort.value = ''

        clientUrAdress.value = ''
        clientInn.value = ''
        clientKpp.value = ''
        clientOgrn.value = ''
        clientBik.value = ''
        clientRs.value = ''
        clientBank.value = ''
        clientDirShort.value = ''
        }
}

function calcTable(minMass, maxMass, month=12){
    carCargo = parseInt(maxMass) - parseInt(minMass)
    carCargo80 = (carCargo / 100) * 80
    carCargoMonth = carCargo80 * 4
    carCargoYear = carCargoMonth * month
    
}
let adrFrom = ""
let adrTo = ""
function addAdress(type, adress){
    if(type == 'from' && adress !=''){
        allAdressFrom.value.push(adress)
        adrFrom = ""
    }else if(type == 'to' && adress !=''){
        allAdressTo.value.push(adress)
        adrTo = ""
    }
}
async function createDoc() {
    console.log('createDoc')
    calcTable(carCargoMin.value, carCargoMax.value)
    console.log('carCargo', carCargo)
    console.log('carCargo80', carCargo80)
    console.log('carCargoMonth', carCargoMonth)
    console.log('carCargoYear', carCargoYear)
    console.log('carCargoMin', carCargoMin)
    console.log('carCargoMax', carCargoMax)
    const url2 = 'http://127.0.0.1:8000/my_core/docs/'
    const resp = await useFetch(url2, {
    method: 'POST',
    body: {
        number:docNum,
        date: docDate,
        ispolnitelFirmName: ispolnitelFirmName,
        ispolnitelDirName: ispolnitelDirName,
        clientFirmName: clientFirmName,
        clientDirName: clientDirName,
        cargoType: cargoType,
        allAdressFrom: allAdressFrom,
        allAdressTo: allAdressTo,
        ispOkvedNumber: ispOkvedNumber,
        ispOkvedText: ispOkvedText,
        clientOkvedNumber: clientOkvedNumber,
        clientOkvedText: clientOkvedText,

        carGrz: carGrz,
        carModel: carModel,
        carType: carType,
        carCargoMin: carCargoMin,
        carCargoMax: carCargoMax,
        carCargo: carCargo,
        carCargo80: carCargo80,
        carCargoMonth: carCargoMonth,
        carCargoYear: carCargoYear,

        date_from: DateFrom,
        date_to: DateTo,

        ispolnitelUrAdress: ispolnitelUrAdress,
        ispolnitelInn: ispolnitelInn,
        ispolnitelKpp: ispolnitelKpp,
        ispolnitelOgrn: ispolnitelOgrn,
        ispolnitelBik: ispolnitelBik,
        ispolnitelRs: ispolnitelRs,
        ispolnitelBank: ispolnitelBank,
        ispolnitelDirShort: ispolnitelDirShort,

        clientUrAdress: clientUrAdress,
        clientInn: clientInn,
        clientKpp: clientKpp,
        clientOgrn: clientOgrn,
        clientBik: clientBik,
        clientRs: clientRs,
        clientBank: clientBank,
        clientDirShort: clientDirShort,
    }
    })
    console.log('resp_answer --', resp.data.value.id)
    const doc_id = resp.data.value.id
    const create_url = `http://127.0.0.1:8000/my_core/create_document/${doc_id}/`
    const response = await useFetch(create_url, { 
        responseType: "blob" 
    });
    console.log('response---', response.data.value)
    const blob = new Blob([response.data.value], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `document_${doc_id}/`;
    link.click();
    URL.revokeObjectURL(link.href);
}
async function  downloadItem(url) {
      console.log('url', url)
      const newUrl = url.split('/')
      const baseUrl = 'http://127.0.0.1:8000/my_core/download'
      const downloadUrl =` ${baseUrl}/${newUrl[3]}/${newUrl[4]}`
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

function  download(url){
    console.log('url', url)
    const newUrl = url.split('/')
    console.log('newUrl', newUrl)
    console.log('newUrl[3]', newUrl[3])
    console.log('newUrl[4]', newUrl[4])
    const baseUrl = 'http://127.0.0.1:8000/my_core/download'
    const downloadUrl =` ${baseUrl}/${newUrl[3]}/${newUrl[4]}`
    console.log('downloadUrl', downloadUrl)
   // downloadItem(downloadUrl)
    href.value = downloadUrl
    const resp = useFetch(downloadUrl)
    console.log('resp_d', resp.value)
}
function removeAdress(type, id){
    if(type=='from'){
        allAdressFrom.value.pop(id)
    }else {
        allAdressTo.value.pop(id)
    }
}

function nextStep(){
    console.log(stepIndex.value)
    if(stepIndex.value < 6){
        stepIndex.value++
        indicator.value = `${stepIndex.value}/6`
    }
    if(stepIndex.value == 1){
       step_1.value = true
       step_2.value = false
       step_3.value = false
       step_4.value = false
    } else if(stepIndex.value == 2){
        step_1.value = false
        step_2.value = true
        step_3.value = false
        step_4.value = false
    } else if(stepIndex.value == 3){
        step_1.value = false
        step_2.value = false
        step_3.value = true
        step_4.value = false
    } else if(stepIndex.value == 4){
        step_1.value = false
        step_2.value = false
        step_3.value = false
        step_4.value = true
        step_5.value = false
        step_6.value = false
    } else if(stepIndex.value == 5){
        step_1.value = false
        step_2.value = false
        step_3.value = false
        step_4.value = false
        step_5.value = true
        step_6.value = false
    } else if(stepIndex.value == 6){
        step_1.value = false
        step_2.value = false
        step_3.value = false
        step_4.value = false
        step_5.value = false
        step_6.value = true
    }
    console.log('stepIndex', stepIndex.value)
}

function prevStep(){
    console.log('first')
    if(stepIndex.value != 1){
        stepIndex.value--
        indicator.value = `${stepIndex.value}/6`
    }
    if(stepIndex.value == 1){
       step_1.value = true
       step_2.value = false
       step_3.value= false
       step_4.value = false
       step_5.value = false
       step_6.value = false
    } else if(stepIndex.value == 2){
        step_1.value = false
        step_2.value = true
        step_3.value = false
        step_4.value = false
        step_5.value = false
        step_6.value = false
    } else if(stepIndex.value == 3){
        step_1.value = false
        step_2.value = false
        step_3.value = true
        step_4.value = false
        step_5.value = false
        step_6.value = false
    } else if(stepIndex.value == 4){
        step_1.value = false
        step_2.value = false
        step_3.value = false
        step_4.value = true
        step_5.value = false
        step_6.value = false
    } else if(stepIndex.value == 5){
        step_1.value = false
        step_2.value = false
        step_3.value = false
        step_4.value = false
        step_5.value = true
        step_6.value = false
    } else if(stepIndex.value == 6){
        step_1.value = false
        step_2.value = false
        step_3.value = false
        step_4.value = false
        step_5.value = false
        step_6.value = true
    }
}
</script>

<style scoped>

th {
    padding: 5px;
    border: 1px solid rgb(161, 161, 161);
}
td {
    padding: 5px;
    border: 1px solid rgb(161, 161, 161);
}

.v-enter-active{
  transition: transform 0.3s ease;
}
.v-leave-active {
  transition: transform 0.5s ease;
}

.v-enter-from{
  transform: translateX(-99vw);
}
.v-enter-to{
  transform: translateX(0px);
}
.v-leave-from {
  transform: translateX(0px);
}
.v-leave-to {
  transform: translateX(-99vw);
}
</style>
