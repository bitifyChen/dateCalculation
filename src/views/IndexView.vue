<script setup>
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import Month from '../components/monthCom.vue'
import twHoliday from '../assets/twHoliday.json'
import cnHoliday from '../assets/cnHoliday.json'
//輸入年
const year = computed(() =>
  startDate.value ? dayjs(startDate.value).year() : new Date().getFullYear()
)
//開始日
const startDate = ref(null)
const workDays = ref(0)
//Holiday
const isSatHoliday = ref(false)
const isSunHoliday = ref(true)
const isTwHoliday = ref(true)
const isCnHoliday = ref(false)

const yearHolidayArray = computed(() => {
  const arr = []
  const _daysThisYear =
    (year.value % 4 == 0 && year.value % 100 != 0) || year.value % 400 == 0
      ? 366
      : 365
  for (let i = 0; i < _daysThisYear; i++) {
    const _date = dayjs(`${year.value}-01-01`).add(i, 'day')
    if (isSatHoliday.value && _date.day() === 6) {
      arr.push(_date.format('YYYY-MM-DD'))
    }
    if (isSunHoliday.value && _date.day() === 0) {
      arr.push(_date.format('YYYY-MM-DD'))
    }
    //如過要避開台灣假日
    if (isTwHoliday.value) {
      const _year = twHoliday[year.value] ?? null
      if (_year && Object.keys(_year).includes(_date.format('YYYY-MM-DD'))) {
        arr.push(_date.format('YYYY-MM-DD'))
      }
    }
    //如過要避開中國假日
    if (isCnHoliday.value) {
      const _year = cnHoliday[year.value] ?? null
      if (_year && Object.keys(_year).includes(_date.format('YYYY-MM-DD'))) {
        arr.push(_date.format('YYYY-MM-DD'))
      }
    }
  }
  return arr
})
</script>

<template>
  <div class="container">
    <div class="left">
      <div class="year">{{ year }}</div>
      <main>
        <Month
          v-for="month in 12"
          :key="month"
          :year="year"
          :month="month"
          :startDate="startDate"
          :workDays="workDays"
          :yearHolidayArray="yearHolidayArray"
        />
      </main>
    </div>
    <div class="right">
      <div class="form">
        <div class="cell">
          <label>開始日期</label>
          <input v-model="startDate" type="date" />
        </div>
        <div class="cell">
          <label>工作日</label>
          <input v-model="workDays" type="number" />
        </div>
        <div class="cell">
          <label>避開周末</label>
          <div style="display: flex; justify-content: space-between">
            <span>星期六 <input v-model="isSatHoliday" type="checkbox" /></span>
            <span>星期日 <input v-model="isSunHoliday" type="checkbox" /></span>
          </div>
        </div>
        <div class="cell">
          <label>避開節慶</label>
          <div style="display: flex; justify-content: space-between">
            <span>台灣 <input v-model="isTwHoliday" type="checkbox" /></span>
            <span
              >中國(未完成)
              <input v-model="isCnHoliday" type="checkbox" disabled
            /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  align-items: start;
  position: relative;
  .left {
    width: 600px;
    .year {
      font-size: 24px;
      font-weight: 900;
      text-align: center;
    }
    main {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(4, 1fr);
      grid-column-gap: 10px;
      grid-row-gap: 5px;
      width: 100%;
    }
  }
  .right {
    margin-left: 20px;
    display: flex;
    justify-content: center;
    margin: 40px 0px;
    flex: 1 1 auto;
  }
}
.form {
  min-width: 200px;
  position: sticky;
  top: 20px;
  .cell {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
    > * {
      width: 100%;
    }
  }
}
</style>
