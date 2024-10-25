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
        <div class="checkbox">
          <span>星期六 <input v-model="isSatHoliday" type="checkbox" /></span>
          <span>星期日 <input v-model="isSunHoliday" type="checkbox" /></span>
        </div>
      </div>
      <div class="cell">
        <label>避開節慶</label>
        <div class="checkbox">
          <span>台灣 <input v-model="isTwHoliday" type="checkbox" /></span>
          <span
            >中國(未完成) <input v-model="isCnHoliday" type="checkbox" disabled
          /></span>
        </div>
      </div>
      <div class="note">
        <div class="title">備註</div>
        <div class="day"><span class="holiday">16</span>：代表假日</div>
        <div class="day"><span class="workDays">16</span>：代表工作日</div>
        <div class="day">
          <span class="holidayInWorkDays">16</span>：代表夾在工作日間的假日
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  padding: 40px 0;
  margin: auto;
  display: flex;
  align-items: start;
  position: relative;
  .left {
    width: 700px;
    .year {
      font-size: 24px;
      font-weight: 900;
      text-align: center;
      color: #fff;
    }
    main {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(4, 1fr);
      grid-column-gap: 10px;
      grid-row-gap: 5px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.7); // 半透明白色背景
      backdrop-filter: blur(10px); // 毛玻璃模糊效果
      -webkit-backdrop-filter: blur(10px); // 兼容Safari浏览器
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // 轻微阴影，增强视觉层次感
    }
  }
}
.form {
  min-width: 400px;
  position: sticky;
  top: 20px;
  margin-left: 20px;
  color: #70757a;
  font-size: 14px;
  font-weight: 700;
  .cell {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px; // 加大每项的间距
    label {
      font-weight: 600;
      color: #333;
      margin-bottom: 5px; // 与输入框分隔开一点
      font-size: 0.9rem;
    }
    input[type='date'],
    input[type='number'],
    input[type='checkbox'] {
      padding: 8px 10px;
      border: 1px solid #70757a; // 淡灰色边框
      color: #70757a;
      border-radius: 4px; // 轻微圆角
      font-size: 0.9rem;
      outline: none;
      background-color: transparent;
      transition: border-color 0.2s; // 添加边框变化动画
      &:focus {
        border-color: #101921; // 聚焦时边框变蓝
      }
    }
    .checkbox {
      display: flex;
      align-items: center;
      span {
        margin-right: 10px;
      }
    }
  }
  // 自定义checkbox样式
  input[type='checkbox'] {
    accent-color: rgb(57, 82, 224); // 蓝色勾选样式
    width: 12px;
    height: 12px;
  }
  .note {
    background-color: rgba(255, 255, 255, 0.4); // 半透明白色背景
    backdrop-filter: blur(10px); // 毛玻璃模糊效果
    -webkit-backdrop-filter: blur(10px); // 兼容Safari浏览器
    padding: 10px;
    color: #70757a;
    .title {
      color: #333;
      text-align: center;
    }
    .day {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        font-size: 12px;
        font-weight: 700;
        color: #70757a;
        &.holiday {
          color: rgb(245, 133, 133);
        }
        &.workDays {
          background-color: rgb(57, 82, 224);
          color: white;
        }
        &.holidayInWorkDays {
          background-color: rgb(245, 133, 133);
          color: white;
        }
      }
    }
  }
}
</style>
