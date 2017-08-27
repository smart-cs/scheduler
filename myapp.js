const MAX_COURSES = 20;


var mySched = [{'MICB 201 101': 
  [{'term': '1', 'day': 'Tue', 'start': '8:00', 'end': '9:30'}, 
    {'term': '1', 'day': 'Thu', 'start': '8:00', 'end': '9:30'}]
  }];

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

const urSched = [
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

//
function reformat(sched) {
  var days = [[],[],[],[],[],[],[]];
  for (var i=0; i < sched.length; i++) {
    var course = sched[i];
    for (var [courseName, lectures] of Object.entries(course)) {
      for (var i=0; i < lectures.length; i++) {
        var lecture = lectures[i];
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

function backspace() {

}


var days = reformat(urSched);
console.log(days);
//var days = [[],[],[],[],[],[],[]];
//var days = [[], [{name: "MICB 201 101", start: "8:00", end: "9:30"}, {name: "MICB 201 101", start: "11:00", end: "12:00"}], [],  [], [{name: "MICB 201 101", start: "8:00", end: "9:30"}], [], []]


const exampleMon = [
    {name: "BIOL112", start: "8:00", end: "9:00"}, 
    {name: "CHEM121", start: "13:00", end: "14:00"}
]

var vue = new Vue({
    el: '#vue',
    data: { 
      seen: true,
      courses: [{name : ''}],
      days: days,
      //mon:[{name: "BIOL112", start: "8:00", end: "9:00"}, {name: "CHEM121", start: "13:00", end: "14:00"}],
      //fri:[{name: "CPSC210", start:"15:00", end: "16:00"}],
      message: 'ewrwer'
    },
    computed: {
      sun: function() {
        return this.days[0];
      },
      mon: function() {
        return this.days[1];
      },
      tue: function() {
        return this.days[2];
      },
      wed: function() {
        return this.days[3];
      },
      thu: function() {
        return this.days[4];
      },
      fri: function() {
        return this.days[5];
      },
      sat: function() {
        return this.days[6];
      }
    },
    methods: {
        add: function(index) {
          //this.courses.push({name : ''});
          if (this.courses.length != MAX_COURSES)
            this.courses.splice(index+1, 0, {name: ''});
      },
      remove: function(index) {
          this.courses.splice(index, 1);
      },
      backspace: function(index) {
        if (course.name=='')
          this.courses.splice(index, 1);
      },
      generateSchedule: function() {
        var PROXY = "https://cors-anywhere.herokuapp.com/";
        var BASE_API = "phzi353gq7.execute-api.us-west-2.amazonaws.com/test/returnSchedule";

        var params = "?courses=" + this.courses.map(function(c) {
          return c.name;
        }).join(" ");
        var destUrl = PROXY + BASE_API + params;

        $.ajax({
          type: "GET",
          url: destUrl,
          contentType: "application/x-www-form-urlencoded",
          success: function(response) {
            // response is an array of schedules
            // TODO: need to hold an array of schedules
            var schedule = reformat(response[0]);
            console.log(schedule);
            //for (var i=0; i < schedule.length; i++) {
            //  vue.days[i].splice(i, 1, schedule[i]);
            //}
          },
          error: function(request, textStatus, errorThrown) {
            console.log(request);
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      }
    }
  })



 