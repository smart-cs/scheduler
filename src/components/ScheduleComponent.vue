<template>
<div class="schedule">
  <course-component v-for="c in mon" :key="c.id" :name="c.name" :type="c.type" :row="timeFromStart(c.start)" :col="1" :len="timeBetween(c.start, c.end)"/>
  <course-component v-for="c in tue" :key="c.id" :name="c.name" :type="c.type" :row="timeFromStart(c.start)" :col="2" :len="timeBetween(c.start, c.end)"/>
  <course-component v-for="c in wed" :key="c.id" :name="c.name" :type="c.type" :row="timeFromStart(c.start)" :col="3" :len="timeBetween(c.start, c.end)"/>
  <course-component v-for="c in thu" :key="c.id" :name="c.name" :type="c.type" :row="timeFromStart(c.start)" :col="4" :len="timeBetween(c.start, c.end)"/>
  <course-component v-for="c in fri" :key="c.id" :name="c.name" :type="c.type" :row="timeFromStart(c.start)" :col="5" :len="timeBetween(c.start, c.end)"/>
  <div class="col">
    <div class="day term">Term {{ term }}</div>
    <div class="day" v-for="time in times" :key="time.id">{{ time }}</div>
  </div>
  <div class="col">
    <div class="day">MON</div>
    <div class="day" v-for="time in times" :key="time.id"></div>
  </div>
  <div class="col">
    <div class="day">TUE</div>
    <div class="day" v-for="time in times" :key="time.id"></div>
  </div>
  <div class="col">
    <div class="day">WED</div>
    <div class="day" v-for="time in times" :key="time.id"></div>
  </div>
  <div class="col">
    <div class="day">THU</div>
    <div class="day" v-for="time in times" :key="time.id"></div>
  </div>
  <div class="col">
    <div class="day">FRI</div>
    <div class="day" v-for="time in times" :key="time.id"></div>
  </div>
</div>
</template>

<script>
import CourseComponent from './CourseComponent'
import moment from 'moment'

const TIMES = [
  '8:00', '',
  '9:00', '',
  '10:00', '',
  '11:00', '',
  '12:00', '',
  '1:00', '',
  '2:00', '',
  '3:00', '',
  '4:00', '',
  '5:00', '',
  '6:00', '',
  '7:00', '',
  '8:00', '',
  '9:00', ''
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

  font-size: 12px;
}

.col {
  display: flex;
  flex-direction: column;
  min-width: 60px;
}

.day {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;

  min-height: 15px;

  background-color: transparentize(white, 0.30);
  box-shadow:
    -1px -1px #000000,
    inset -1px -1px 0 0 #000000;
}

.term {
  background: #FFA500
}
</style>
