<template>
  <div class="schedule">
    <course-component v-for="c in mon" :key="c.id" :name="c.name" :type="c.type" :row="timeFromStart(c.start)" :col="1" :len="timeBetween(c.start, c.end)" />
    <course-component v-for="c in tue" :key="c.id" :name="c.name" :type="c.type" :row="timeFromStart(c.start)" :col="2" :len="timeBetween(c.start, c.end)" />
    <course-component v-for="c in wed" :key="c.id" :name="c.name" :type="c.type" :row="timeFromStart(c.start)" :col="3" :len="timeBetween(c.start, c.end)" />
    <course-component v-for="c in thu" :key="c.id" :name="c.name" :type="c.type" :row="timeFromStart(c.start)" :col="4" :len="timeBetween(c.start, c.end)" />
    <course-component v-for="c in fri" :key="c.id" :name="c.name" :type="c.type" :row="timeFromStart(c.start)" :col="5" :len="timeBetween(c.start, c.end)" />
    <div class="col">
      <div class="day-of-week">Term {{ term }}</div>
      <!-- <div class="day term">Term {{ term }}</div> !-->
      <div class="day" v-for="time in times" :key="time.id">{{ time }}</div>
    </div>
    <div class="col">
      <div class="day-of-week">MON</div>
      <div class="day" v-for="time in times" :key="time.id"></div>
    </div>
    <div class="col">
      <div class="day-of-week">TUE</div>
      <div class="day" v-for="time in times" :key="time.id"></div>
    </div>
    <div class="col">
      <div class="day-of-week">WED</div>
      <div class="day" v-for="time in times" :key="time.id"></div>
    </div>
    <div class="col">
      <div class="day-of-week">THU</div>
      <div class="day" v-for="time in times" :key="time.id"></div>
    </div>
    <div class="col">
      <div class="day-of-week">FRI</div>
      <div class="day" v-for="time in times" :key="time.id"></div>
    </div>
  </div>
</template>

<script>
import CourseComponent from './CourseComponent'
import moment from 'moment'

const TIMES = [
  '8 AM', '',
  '9 AM', '',
  '10 AM', '',
  '11 AM', '',
  '12 PM', '',
  '1 PM', '',
  '2 PM', '',
  '3 PM', '',
  '4 PM', '',
  '5 PM', '',
  '6 PM', '',
  '7 PM', '',
  '8 PM', '',
  '9 PM', ''
]

export default {
  name: 'schedule-component',
  props: ['term', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  data: function () {
    return {
      times: TIMES
    }
  },
  methods: {
    timeBetween: function (start, end) {
      const s = moment(start.toString(), 'HH:mm')
      const e = moment(end.toString(), 'HH:mm')
      const diff = e.diff(s, 'minutes') / 30
      return diff
    },
    timeFromStart: function (time) {
      return this.timeBetween('08:00', time) + 1
    }
  },
  components: {
    CourseComponent
  }
}
</script>

<style scoped>
.schedule {
  display: inline-flex;
  max-width: 560px;
  height: 100%;
  position: relative;
  margin-right: 4%;

  font-size: 12px;
}

.col {
  display: flex;
  flex-direction: column;
  min-width: 100px;
}

.day {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;

  min-height: 20px;
  color: #5F5F5F;
  background-color: transparentize(white, 0.30);
  box-shadow: -1px -1px #E2E1E1,
  inset -1px -1px 0 0 #E2E1E1;
}

.day-of-week {
  background: #EDEDED;
  color: #5F5F5F;
}

.term {
  background: #FFA500
}
</style>
