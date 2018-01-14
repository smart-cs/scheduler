const MAX_COURSES = 20;

Vue.component('course-component', {
  props: [
    'start', 'end', 'name'
  ],
  template: ` 
    <li class="single-event" :data-start="start" :data-end="end" data-event="event-1">
      <a href="#0">
        <em class="event-name">{{name}}</em>
      </a>
    </li>
  `
})

Vue.component('schedule-component', {
  props: [
    'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'
  ],
  template: `
  <div class="schedule">
      <div class="cd-schedule loading">
          <div class="timeline">
              <ul>
                  <li><span>08:00</span></li>
                  <li><span>08:30</span></li>
                  <li><span>09:00</span></li>
                  <li><span>09:30</span></li>
                  <li><span>10:00</span></li>
                  <li><span>10:30</span></li>
                  <li><span>11:00</span></li>
                  <li><span>11:30</span></li>
                  <li><span>12:00</span></li>
                  <li><span>12:30</span></li>
                  <li><span>13:00</span></li>
                  <li><span>13:30</span></li>
                  <li><span>14:00</span></li>
                  <li><span>14:30</span></li>
                  <li><span>15:00</span></li>
                  <li><span>15:30</span></li>
                  <li><span>16:00</span></li>
                  <li><span>16:30</span></li>
                  <li><span>17:00</span></li>
                  <li><span>17:30</span></li>
                  <li><span>18:00</span></li>
                  <li><span>18:30</span></li>
                  <li><span>19:00</span></li>
                  <li><span>19:30</span></li>
                  <li><span>20:00</span></li>
                  <li><span>20:30</span></li>
                  <li><span>21:00</span></li>
              </ul>
          </div> 


      <div class="events">
          <ul>
              <li class="events-group">
                  <div class="top-info"><span>Mon</span></div>
                  
                  <ul>
                      <course-component v-for="course in  mon" :start="course.start" :end="course.end" :name="course.name"></course-component>
                  </ul>
              </li>

              <li class="events-group">
                  <div class="top-info"><span>Tues</span></div>

                  <ul>
                      <course-component v-for="course in tue" :start="course.start" :end="course.end" :name="course.name"></course-component>        
                  </ul>
              </li>

              <li class="events-group">
                  <div class="top-info"><span>Wed</span></div>

                  <ul>
                      <course-component v-for="course in wed" :start="course.start" :end="course.end" :name="course.name"></course-component> 
                  </ul>
              </li>

              <li class="events-group">
                  <div class="top-info"><span>Thur</span></div>

                  <ul>
                      <course-component v-for="course in thu" :start="course.start" :end="course.end" :name="course.name"></course-component> 
                  </ul>
              </li>

              <li class="events-group">
                  <div class="top-info"><span>Fri</span></div>

                  <ul>
                      <course-component v-for= "course in fri" :start="course.start" :end="course.end" :name="course.name" ></course-component>
                  </ul>
              </li>
              
          </ul>
      </div>


      <div class="event-modal">
          <header class="header">
              <div class="content">
                  <span class="event-date"></span>
                  <h3 class="event-name"></h3>
              </div>

              <div class="header-bg"></div>
          </header>

          <div class="body">
              <div class="event-info"></div>
              <div class="body-bg"></div>
          </div>

          <a href="#0" class="close">Close</a>
      </div>

      
      </div> 
    </div>`
})

var vue = new Vue({
  el: '#vue',
  data: { 
    seen: true,
    schedules: [],
    inputCourses: [{name : ''}],
    loading: false
  },
  methods: {
    add: function(i) {
      if (this.inputCourses.length != MAX_COURSES) {
        this.inputCourses.splice(i+1, 0, {name: ''});
      }
    },
    remove: function(i) {
      if (this.inputCourses.length > 1) {
        this.inputCourses.splice(i, 1);
      }
    },
    backspace: function(coursename, i) {
      if (coursename == '') {
        this.remove(i);
      }
    },
    generateSchedule: function() {
      this.loading = true;
      const inputCourses = this.inputCourses.filter(function(c) {
        return c.name.length != 0;
      }).map(function(c) {
        return c.name.toUpperCase();
      });
      this.schedules = []
      CreatorAPI.create(inputCourses, function() {
        vue.schedules = CreatorAPI.schedules;
        vue.loading = false;
        // need to render the .cd-schedule elements first before we call makeSchedule
        // TODO: find out if there's a better way to do this
        $(function() {
          setTimeout(function(){
            schedule_template.makeSchedule($);
          }, 1000);
        });
      });
    }
  }
});
