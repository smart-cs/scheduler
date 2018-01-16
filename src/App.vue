<template>
  <div id="app">
    <h1>UBC Course Scheduler</h1>
    <div>
      <div>Enter your courses here (e.g. CPSC 110)</div>
      <div>
        <div v-for="(c, i) in inputCourses" :key="c.id">
          <button @click="add">+</button>
          <input type="text" v-model="c.name" @keyup.enter="add(i)"/>
          <button @click="remove(i)">x</button>
        </div>
        <button @click="generateSchedule()">Generate</button>
      </div>
    </div>
    <div v-if="loading">LOADING</div>
    <div>
      <div v-for="(schedule, i) in schedules" :key="schedule.id">
      <h3>Schedule {{ i + 1}}</h3>
      <schedule-component
        :term="1"
        :sun="schedule[0][0]"
        :mon="schedule[0][1]"
        :tue="schedule[0][2]"
        :wed="schedule[0][3]"
        :thu="schedule[0][4]"
        :fri="schedule[0][5]"
        :sat="schedule[0][6]"/>
      <schedule-component
        :term="2"
        :sun="schedule[1][0]"
        :mon="schedule[1][1]"
        :tue="schedule[1][2]"
        :wed="schedule[1][3]"
        :thu="schedule[1][4]"
        :fri="schedule[1][5]"
        :sat="schedule[1][6]"/>
      </div>
    </div>
  </div>
</template>

<script>
import ScheduleComponent from './components/ScheduleComponent'
import moment from 'moment'

const MAX_COURSES = 20

const CreatorAPI = {
  BASE: 'https://sheltered-taiga-32349.herokuapp.com',
  SCHEDULES_API: '/schedules',
  schedules: [],
  dayStrToIndex: function (day) {
    switch (day) {
      case 'Sun':
        return 0
      case 'Mon':
        return 1
      case 'Tue':
        return 2
      case 'Wed':
        return 3
      case 'Thu':
        return 4
      case 'Fri':
        return 5
      case 'Sat':
        return 6
      default:
        throw Error(day + ' is not a valid day!')
    }
  },
  intTimeToStr: function (time) {
    const timeStr = time.toString()
    const mid = timeStr.length - 2
    const timeFmted = moment({
      hours: parseInt(timeStr.substring(0, mid)),
      minutes: parseInt(timeStr.substring(mid))
    }).format('HH:mm')
    return timeFmted
  },
  formatSchedule: function (schedule) {
    let days = [
      [[], [], [], [], [], [], []],
      [[], [], [], [], [], [], []]
    ]
    const courses = schedule.courses
    for (let i = 0; i < courses.length; i++) {
      const courseName = courses[i].name
      const sessions = courses[i].sessions
      for (let j = 0; j < sessions.length; j++) {
        const s = sessions[j]
        const block = {
          name: courseName,
          type: s.activity,
          start: this.intTimeToStr(s.start),
          end: this.intTimeToStr(s.end)
        }

        // TODO: factour this out
        switch (s.term) {
          case '1':
            days[0][this.dayStrToIndex(s.day)].push(block)
            break
          case '2':
            days[1][this.dayStrToIndex(s.day)].push(block)
            break
          case '1-2':
            days[0][this.dayStrToIndex(s.day)].push(block)
            days[1][this.dayStrToIndex(s.day)].push(block)
            break
          default:
            throw Error(s.term + ' not recognized!')
        }
      }
    }
    return days
  },
  create: function (courses, callback) {
    const coursesParam = courses.join(',')
    this.schedules = []
    fetch(this.BASE + this.SCHEDULES_API + '?courses=' + coursesParam, {
      method: 'GET'
    }).then(r => r.json())
      .then(function (r) {
        const schedules = r.body
        CreatorAPI.schedules = schedules.map(s => CreatorAPI.formatSchedule(s))
        callback.call()
      })
  }
}

// const TEST_INPUT_COURSES = [{name: 'MATH 101'}, {name: 'CPEN 221'}, {name: 'LING 101'}, {name: 'CPSC 221'}, {name: 'CPSC 121'}]
// const TEST_INPUT_COURSES = [{name: 'MATH 101'}]

export default {
  name: 'App',
  components: {
    ScheduleComponent
  },
  // mounted: function () {
  //   this.generateSchedule()
  // },
  data: function () {
    return {
      inputCourses: [{name: ''}],
      // inputCourses: TEST_INPUT_COURSES,
      loading: false,
      schedules: []
    }
  },
  methods: {
    add: function (i) {
      if (this.inputCourses.length !== MAX_COURSES) {
        this.inputCourses.splice(i + 1, 0, {name: ''})
      }
    },
    remove: function (i) {
      if (this.inputCourses.length > 1) {
        this.inputCourses.splice(i, 1)
      }
    },
    backspace: function (coursename, i) {
      if (coursename === '') {
        this.remove(i)
      }
    },
    generateSchedule: function () {
      this.loading = true
      const inputCourses = this.inputCourses.filter(function (c) {
        return c.name.length !== 0
      }).map(function (c) {
        return c.name.toUpperCase()
      })
      this.schedules = []
      let self = this
      CreatorAPI.create(inputCourses, function () {
        self.schedules = CreatorAPI.schedules
        self.loading = false
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
