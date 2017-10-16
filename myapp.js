const MAX_COURSES = 20;
//document.getElementById("load").visible = false;
Vue.component('course-component', {
  props: [
    'start', 'end', 'name'
  ],
  template: ` 
    <li class="single-event" :data-start="start" :data-end="end" data-event="event-1">
      <a href="#0">
        <em class="event-name">{{name}}</em>
      </a>
    </li>`
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




// reformats one schedule to a format we can display easily
function reformat(sched) {
  var days = [[],[],[],[],[],[],[]];
  for (var i=0; i < sched.length; i++) {
    var course = sched[i];
    for (var [courseName, lectures] of Object.entries(course)) {
      for (var j=0; j < lectures.length; j++) {
        var lecture = lectures[j];
        var term = lecture.term;
        var day = lecture.day;
        var start = lecture.start;
        var end = lecture.end;
        var block = {name: courseName, start: start, end: end};

        //push block onto corresponding day in the array "days"
        days[dayStringToIndex(day)].push(block);
      }
    }
  }
  return days;
}

function dayStringToIndex(day) {
  switch(day) {
    case "Sun":
      return 0;
    case "Mon":
      return 1;
    case "Tue":
      return 2;
    case "Wed":
      return 3;
    case "Thu":
      return 4;
    case "Fri":
      return 5;
    case "Sat":
      return 6;
    default:
      throw day + ' is not a valid day!';
  }
}

const exampleScheduleResponse = [
  {
    'MICB 201 101': [
      {'term': '1', 'day': 'Tue', 'start': '8:00', 'end': '9:30'}, 
      {'term': '1', 'day': 'Thu', 'start': '8:00', 'end': '9:30'},
      {'term': '1', 'day': 'Tue', 'start': '11:00', 'end': '12:00'}
    ]
  },
  {
    'CPSC 320 101': [
      {'term': '1', 'day': 'Mon', 'start': '14:00', 'end': '15:00'}, 
      {'term': '1', 'day': 'Wed', 'start': '14:00', 'end': '15:00'}, 
      {'term': '1', 'day': 'Fri', 'start': '14:00', 'end': '15:00'}
    ]
  }
];

var vue = new Vue({
  el: '#vue',
  data: { 
    seen: true,
    schedules: [],
    courses: [{name : ''}],
    loading: false
  },
  methods: {
 
    remove: function(index) {
      if (this.courses.length > 1)
        this.courses.splice(index, 1);
    },
    backspace: function(coursename, index) {
      if (coursename=='')
        this.remove(index);
    },
 
    generateSchedule: function() {
      this.loading = true;
      //document.getElementById("load").visible = true;
      var PROXY = "https://cors-anywhere.herokuapp.com/";
      var BASE_API = "phzi353gq7.execute-api.us-west-2.amazonaws.com/test";
      var RETURN_SCHEDULE = "/returnSchedule";
      var INPUT_COURSES = this.courses.filter(function(c) {
        return c.name.length != 0;
      }).map(function(c) {
        return c.name.toUpperCase();
      }).join(",");

      var PARAMS = "?courses=" + INPUT_COURSES;
      var destUrl = PROXY + BASE_API + RETURN_SCHEDULE + PARAMS;

      console.log("Sending GET to " + destUrl);

      // clear out our previous schedules
      vue.schedules = [];

      $.ajax({
        type: 'GET',
        url: destUrl,
        success: function(response) {
          // response is an array of schedules
          response.forEach(function(schedule) {
            vue.schedules.push(reformat(schedule));
          });
          
          // need to render the .cd-schedule elements first before we call makeSchedule
          // TODO: find out if there's a better way to do this
          $(function() {
            setTimeout(function(){
              schedule_template.makeSchedule($);
            }, 1000)
          });

          vue.loading = false;
        },
        error: function(request, textStatus, errorThrown) {
          console.log(request);
          console.log(textStatus);
          console.log(errorThrown);
        }
      });
      
      //document.getElementById("load").visible = false;
    },
    
    add: function(index) {
      if (this.courses.length != MAX_COURSES) {
        //this.courses.push({name: ''});
        this.courses.splice(index+1, 0, {name: ''});
        this.generateSchedule();
      }
    }
  },
  
  mounted: function() {

  }
})
