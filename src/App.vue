<template>
  <div id="app">
    <h2>UBC Course Schedule Creator</h2>
    <div>
      <h3>Selected Courses</h3>
      <div v-if="inputCourses.length > 0" class="wrapper centerme">
        <span class="wrapper centerme">
          <button v-for="(course, i) in inputCourses" :key="course.id" type="button" class="btn btn-info remove-course-button btn-sm btn-round" @click="removeCourseByIndex(i)"> {{ course.name }} &nbsp; &nbsp;x </button>
        </span>
      </div>
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label>
          <input type="radio" name="options" id="option1" value="1" v-model="termPicked"> Term 1
        </label>
        <label>
          <input type="radio" name="options" id="option2" value="2" v-model="termPicked"> Term 2
        </label>
        <label>
          <input type="radio" name="options" id="option3" value="1-2" v-model="termPicked"> Both
        </label>
      </div>
      <autocomplete :min-len="1" :items="autocompleteItems.slice(0, 7)" :auto-select-one-item="false" @update-items="getAutocomplete" @input="checkAutocomplete" placeholder="Enter a course here (e.g. CPSC 110)" @item-selected="addCourse" />
    </div>
    <div>
      <h4 v-if="schedules.length > 0">
        Created {{ schedules.length }} Schedules
      </h4>
      <div v-for="(schedule, i) in schedules.slice(0, 100)" :key="schedule.id">
        <h3>Schedule {{ i + 1}}</h3>
        <schedule-component v-if="showTerm1" :term="1" :sun="schedule[0][0]" :mon="schedule[0][1]" :tue="schedule[0][2]" :wed="schedule[0][3]" :thu="schedule[0][4]" :fri="schedule[0][5]" :sat="schedule[0][6]" />
        <schedule-component v-if="showTerm2" :term="2" :sun="schedule[1][0]" :mon="schedule[1][1]" :tue="schedule[1][2]" :wed="schedule[1][3]" :thu="schedule[1][4]" :fri="schedule[1][5]" :sat="schedule[1][6]" />
      </div>
      <p v-if="schedules.length > SCHEDULES_PER_PAGE">Only showing first {{ SCHEDULES_PER_PAGE }} schedules...</p>
    </div>
  </div>
</template>

<script>
import ScheduleComponent from './components/ScheduleComponent'
import Autocomplete from 'v-autocomplete'
import moment from 'moment'
import NProgress from 'nprogress'

const CreatorAPI = {
  // Use localhost for testing purposes
  // BASE: 'http://localhost:8080',
  BASE: 'https://schedulecreator.herokuapp.com',
  SCHEDULES_API: '/schedules',
  AUTOCOMPLETE_API: '/autocomplete',
  schedules: [],
  courses: [],
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
  create: function (courses, term, callback) {
    const coursesParam = courses.join(',')
    this.schedules = []
    const url = `${this.BASE + this.SCHEDULES_API}?courses=${coursesParam}&term=${term}`
    fetch(url, {
      method: 'GET'
    }).then(r => r.json())
      .then(function (r) {
        const schedules = r.body
        CreatorAPI.schedules = schedules.map(s => CreatorAPI.formatSchedule(s))
        callback.call()
      })
  },
  autocomplete: function (prefix, callback) {
    const url = `${this.BASE + this.AUTOCOMPLETE_API}?text=${prefix}`
    fetch(url, {
      method: 'GET'
    }).then(r => r.json())
      .then(function (r) {
        CreatorAPI.courses = r.body
        callback.call()
      })
  }
}

// const DEFAULT_INPUT_COURSES = [{ name: 'CPSC 121' }, { name: 'CPEN 221' }, { name: 'LING 101' }, { name: 'MATH 100' }, { name: 'MATH 101' }]
// const DEFAULT_INPUT_COURSES = [{name: 'MATH 101'}]
const DEFAULT_INPUT_COURSES = []

export default {
  name: 'App',
  components: {
    ScheduleComponent,
    Autocomplete
  },
  // This is here for testing purposes
  // mounted: function() {
  //  this.generateSchedule()
  // },
  data: function () {
    return {
      MAX_INPUT_COURSES: 20,
      SCHEDULES_PER_PAGE: 100,
      courseInput: 'Hello',
      inputCourses: DEFAULT_INPUT_COURSES,
      autocompleteItems: [],
      loading: false,
      schedules: [],
      termPicked: '1-2',
      progressBarInterval: null
    }
  },
  computed: {
    showTerm1: function () {
      return this.termPicked === '1' || this.termPicked === '1-2'
    },
    showTerm2: function () {
      return this.termPicked === '2' || this.termPicked === '1-2'
    }
  },
  watch: {
    termPicked: function (val) {
      if (this.inputCourses.length > 0) {
        this.generateSchedule()
      }
    },
    loading: function (val) {
      console.log(val)
      if (val) {
        this.progressBarInterval = setInterval(this.runProgressBar, 1000)
      } else {
        clearInterval(this.progressBarInterval)
      }
    }
  },
  methods: {
    runProgressBar: function () {
      NProgress.set(8.0)
      NProgress.done()
    },
    addCourse: function (course) {
      if (this.inputCourses.length === this.MAX_INPUT_COURSES) {
        // TODO: Output max courses message
        return
      }
      if (this.inputCourses.map(e => e.name).includes(course)) {
        // Already selected
        return
      }
      this.inputCourses.push({ 'name': course })
      this.generateSchedule()
    },
    removeCourseByIndex: function (i) {
      this.inputCourses.splice(i, 1)
      this.generateSchedule()
    },
    getAutocomplete: function (prefix) {
      let self = this
      CreatorAPI.autocomplete(prefix, function () {
        self.autocompleteItems = CreatorAPI.courses.sort()
      })
    },
    checkAutocomplete: function (prefix) {
      if (!prefix) {
        this.autocompleteItems = []
      }
    },
    generateSchedule: function () {
      if (this.inputCourses.length === 0) {
        this.schedules = []
        return
      }
      this.loading = true
      const upperInputCourses = this.inputCourses.map(e => e.name.toUpperCase())
      this.schedules = []
      let self = this
      CreatorAPI.create(upperInputCourses, this.termPicked, function () {
        self.schedules = CreatorAPI.schedules
        console.debug('Schedules successfully retrieved:', self.schedules)
        self.$nextTick(function () {
          self.loading = false
        })
      })
    }
  },
  props: {
    placeholder: {
      type: String,
      default: 'Enter a course here (e.g. CPSC 110)'
    }
  }
}
</script>

<style lang="stylus">
@import "assets/css/nprogress.css"
@import "assets/css/paper-kit.css"
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

input-width = 400px
.centerme
  text-align: center;

.wrapper
  display: grid;
  grid-template-columns: repeat( 6, minmax(100px, 1fr) );
  grid-template-rows: 30px 30px;
  grid-column-gap: 8px;
  grid-row-gap: 0.7em;
  margin-top 16px;
  margin-left 200px;
  margin-bottom 40px;

.remove-course-button
  border: none;
  outline: none;
  display: inline-block;

.margin-bottom-px
  margin-bottom: 2px;

.instruction-font

.v-autocomplete
  .v-autocomplete-input-group
    .v-autocomplete-input
      width input-width
      font-size 1 em
      padding 10px 15px
      box-shadow none
      border 1px solid #157977
      outline none
      background-color #eee
    &.v-autocomplete-selected
      .v-autocomplete-input
        color green
        background-color #f2fff2
  .v-autocomplete-list
    margin auto
    width input-width
    text-align left
    border none
    border-top none
    max-height 400px
    overflow-y auto
    border-bottom 1px solid #157977
    .v-autocomplete-list-item
      cursor pointer
      background-color #fff
      padding 10px
      border-bottom 1px solid #157977
      border-left 1px solid #157977
      border-right 1px solid #157977
      &:last-child
        border-bottom none
      &:hover
        background-color #eee
      abbr
        opacity 0.8
        font-size 0.8em
        display block
        font-family sans-serif

</style>
