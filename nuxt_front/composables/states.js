export const useAdrressFrom = () => useState(() => []);
export const useAdrressTo = () => useState(() => []);

const todayDate = new Date();
const dd = String(todayDate.getDate()).padStart(2, '0');
const mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = todayDate.getFullYear();
const today = dd + '.' + mm + '.' + yyyy;
const plus365 = String(todayDate.getDate()-1).padStart(2, '0');
const year365 = todayDate.getFullYear() + 1
const futereDate = plus365 + '.' + mm + '.' + yyyy;
console.log('plus365', plus365)
console.log('year365', year365)
const month = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
const monthIndex = todayDate.getMonth()
const stoday = `«${dd}» ${month[monthIndex]} ${yyyy} г.`

export const useDocDate = () => useState(() => stoday);

export const useDateFrom = () => useState(() => today);
export const useDateTo = () => useState(() => futereDate);

export const useStep = () => useState(() => 1);
export const useStep1 = () => useState(() => true);
export const useStep2 = () => useState(() => false);
export const useStep3 = () => useState(() => false);
export const useStep4 = () => useState(() => false);
export const useStep5 = () => useState(() => false);
export const useStep6 = () => useState(() => false);


export const useSideBar = () => useState(() => false);



const now = new Date();
const ruDate = new Intl.DateTimeFormat("ru").format(now);
console.log('ruDate --- ', ruDate);