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

/*
function backspace() {

}
*/

var days = reformat(urSched);
console.log(days);
//var days = [[],[],[],[],[],[],[]];
//var days = [[], [{name: "MICB 201 101", start: "8:00", end: "9:30"}, {name: "MICB 201 101", start: "11:00", end: "12:00"}], [],  [], [{name: "MICB 201 101", start: "8:00", end: "9:30"}], [], []]

//const exampleResponse = [[{"MICB 201 101": [{"term": "1", "day": "Tue", "start": "8:00", "end": "9:30"}, {"term": "1", "day": "Thu", "start": "8:00", "end": "9:30"}]}, {"CPSC 320 101": [{"term": "1", "day": "Mon", "start": "14:00", "end": "15:00"}, {"term": "1", "day": "Wed", "start": "14:00", "end": "15:00"}, {"term": "1", "day": "Fri", "start": "14:00", "end": "15:00"}]}, {"LING 101 004": [{"term": "1", "day": "Mon", "start": "13:00", "end": "14:00"}, {"term": "1", "day": "Wed", "start": "13:00", "end": "14:00"}, {"term": "1", "day": "Fri", "start": "13:00", "end": "14:00"}]}, {"MATH 200 101": [{"term": "1", "day": "Mon", "start": "9:00", "end": "10:00"}, {"term": "1", "day": "Wed", "start": "9:00", "end": "10:00"}, {"term": "1", "day": "Fri", "start": "9:00", "end": "10:00"}]}], [{"MICB 201 101": [{"term": "1", "day": "Tue", "start": "8:00", "end": "9:30"}, {"term": "1", "day": "Thu", "start": "8:00", "end": "9:30"}]}, {"CPSC 320 101": [{"term": "1", "day": "Mon", "start": "14:00", "end": "15:00"}, {"term": "1", "day": "Wed", "start": "14:00", "end": "15:00"}, {"term": "1", "day": "Fri", "start": "14:00", "end": "15:00"}]}, {"LING 101 004": [{"term": "1", "day": "Mon", "start": "13:00", "end": "14:00"}, {"term": "1", "day": "Wed", "start": "13:00", "end": "14:00"}, {"term": "1", "day": "Fri", "start": "13:00", "end": "14:00"}]}, {"MATH 200 103": [{"term": "1", "day": "Mon", "start": "11:00", "end": "12:00"}, {"term": "1", "day": "Wed", "start": "11:00", "end": "12:00"}, {"term": "1", "day": "Fri", "start": "11:00", "end": "12:00"}]}], [{"MICB 201 101": [{"term": "1", "day": "Tue", "start": "8:00", "end": "9:30"}, {"term": "1", "day": "Thu", "start": "8:00", "end": "9:30"}]}, {"CPSC 320 101": [{"term": "1", "day": "Mon", "start": "14:00", "end": "15:00"}, {"term": "1", "day": "Wed", "start": "14:00", "end": "15:00"}, {"term": "1", "day": "Fri", "start": "14:00", "end": "15:00"}]}, {"LING 101 004": [{"term": "1", "day": "Mon", "start": "13:00", "end": "14:00"}, {"term": "1", "day": "Wed", "start": "13:00", "end": "14:00"}, {"term": "1", "day": "Fri", "start": "13:00", "end": "14:00"}]}, {"MATH 200 105": [{"term": "1", "day": "Tue", "start": "9:30", "end": "11:00"}, {"term": "1", "day": "Thu", "start": "9:30", "end": "11:00"}]}], [{"MICB 201 101": [{"term": "1", "day": "Tue", "start": "8:00", "end": "9:30"}, {"term": "1", "day": "Thu", "start": "8:00", "end": "9:30"}]}, {"CPSC 320 101": [{"term": "1", "day": "Mon", "start": "14:00", "end": "15:00"}, {"term": "1", "day": "Wed", "start": "14:00", "end": "15:00"}, {"term": "1", "day": "Fri", "start": "14:00", "end": "15:00"}]}, {"LING 101 004": [{"term": "1", "day": "Mon", "start": "13:00", "end": "14:00"}, {"term": "1", "day": "Wed", "start": "13:00", "end": "14:00"}, {"term": "1", "day": "Fri", "start": "13:00", "end": "14:00"}]}, {"MATH 200 107": [{"term": "1", "day": "Tue", "start": "15:30", "end": "17:00"}, {"term": "1", "day": "Thu", "start": "15:30", "end": "17:00"}]}], [{"MICB 201 101": [{"term": "1", "day": "Tue", "start": "8:00", "end": "9:30"}, {"term": "1", "day": "Thu", "start": "8:00", "end": "9:30"}]}, {"CPSC 320 101": [{"term": "1", "day": "Mon", "start": "14:00", "end": "15:00"}, {"term": "1", "day": "Wed", "start": "14:00", "end": "15:00"}, {"term": "1", "day": "Fri", "start": "14:00", "end": "15:00"}]}, {"LING 101 004": [{"term": "1", "day": "Mon", "start": "13:00", "end": "14:00"}, {"term": "1", "day": "Wed", "start": "13:00", "end": "14:00"}, {"term": "1", "day": "Fri", "start": "13:00", "end": "14:00"}]}, {"MATH 200 201": [{"term": "2", "day": "Mon", "start": "9:00", "end": "10:00"}, {"term": "2", "day": "Wed", "start": "9:00", "end": "10:00"}, {"term": "2", "day": "Fri", "start": "9:00", "end": "10:00"}]}], [{"MICB 201 101": [{"term": "1", "day": "Tue", "start": "8:00", "end": "9:30"}, {"term": "1", "day": "Thu", "start": "8:00", "end": "9:30"}]}, {"CPSC 320 101": [{"term": "1", "day": "Mon", "start": "14:00", "end": "15:00"}, {"term": "1", "day": "Wed", "start": "14:00", "end": "15:00"}, {"term": "1", "day": "Fri", "start": "14:00", "end": "15:00"}]}, {"LING 101 004": [{"term": "1", "day": "Mon", "start": "13:00", "end": "14:00"}, {"term": "1", "day": "Wed", "start": "13:00", "end": "14:00"}, {"term": "1", "day": "Fri", "start": "13:00", "end": "14:00"}]}, {"MATH 200 203": [{"term": "2", "day": "Tue", "start": "12:30", "end": "14:00"}, {"term": "2", "day": "Thu", "start": "12:30", "end": "14:00"}]}]];
//const exampleSch = exampleResponse[0];
//const exampleReformat = reformat(exampleSch);

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
          if (this.courses.length != MAX_COURSES) {
            this.courses.splice(index+1, 0, {name: ''});
            //document.getElementById('first-field').nextSibling.focus();
          }
      },
      remove: function(index) {
        if (this.courses.length > 1)
          this.courses.splice(index, 1);
      },
      backspace: function(coursename, index) {
        if (coursename=='')
          this.remove(index);
      },
      generateSchedule: function() {
        var PROXY = "https://cors-anywhere.herokuapp.com/";
        var BASE_API = "phzi353gq7.execute-api.us-west-2.amazonaws.com/test";
        var RETURN_SCHEDULE = "/returnSchedule";
        var PARAMS = "?courses=" + this.courses.map(function(c) {return c.name;}).join(",");
        var destUrl = PROXY + BASE_API + RETURN_SCHEDULE + PARAMS;

        console.log("Sending GET to " + destUrl);
        $.ajax({
          type: "GET",
          url: destUrl,
          success: function(response) {
            // response is an array of schedules
            // TODO: need to hold an array of schedules
            vue.days = reformat(response[0]);

            // need vue.days to render first before we call makeSchedule
            // TODO: find out if there's a better way to do this
            $(function() {
              setTimeout(function(){
                schedule_template.makeSchedule($);
              }, 1000)
            })
          },
          error: function(request, textStatus, errorThrown) {
            console.log(request);
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      }
    },
    mounted: function() {
      schedule_template.makeSchedule(jQuery);
    }
  })



 
