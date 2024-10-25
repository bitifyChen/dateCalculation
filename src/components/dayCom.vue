<script setup>
import dayjs from 'dayjs'
import { computed } from 'vue'
const props = defineProps({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    required: true,
  },
  workDaysArray: {
    type: Array,
    default: () => [],
  },
  holidayInWorkDaysArray: {
    type: Array,
    default: () => [],
  },
  yearHolidayArray: {
    type: Array,
    default: () => [],
  },
})
const year = computed(() => props.year)
const month = computed(() => props.month)
const day = computed(() => props.day)
const thisDay = computed(() =>
  dayjs(`${year.value}-${month.value}-${day.value}`).format('YYYY-MM-DD')
)
const workDaysArray = computed(() => props.workDaysArray)
const isWorkDay = computed(() => workDaysArray.value.includes(thisDay.value))
const holidayInWorkDaysArray = computed(() => props.holidayInWorkDaysArray)
const isHolidayInWorkDay = computed(() =>
  holidayInWorkDaysArray.value.includes(thisDay.value)
)

//定義的假日
const yearHolidayArray = computed(() => props.yearHolidayArray)
const isHoliday = computed(() => yearHolidayArray.value.includes(thisDay.value))
</script>


<template>
  <div
    class="day"
    :class="{
      workDays: isWorkDay,
      holiday: isHoliday,
      holidayInWorkDays: isHolidayInWorkDay,
    }"
  >
    {{ day }}
  </div>
</template>



<style lang="scss" scoped>
.card .days .day {
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
</style>