const MAX_COURSES = 20;
/*
var mySched = [{'MICB 201 101': 
  [{'term': '1', 'day': 'Tue', 'start': '8:00', 'end': '9:30'}, 
    {'term': '1', 'day': 'Thu', 'start': '8:00', 'end': '9:30'}]
  }];
*/

var vue = new Vue({
    el: '#vue',
    data: {
      seen: false,
      courses: [{name : ''}],
      message: 'ewrwer'
    },
    methods: {
        add: function(index) {
          //this.courses.push({name : ''});
          if (this.courses.length != MAX_COURSES)
            this.courses.splice(index+1, 0, {name: ''});
      },
      remove: function(index) {
          this.courses.splice(index, 1);
      }
    }
  })

JSONArray jsonarray = new JSONArray(jsonStr);

for (int i = 0; i < jsonarray.length(); i++) {
  JSONObject jsonobject = jsonarray.getJSONObject(i);
  String term = jsonobject.getString("term");
  String day = jsonobject.getString("day");
  String start = jsonobject.getString("start");
  String end = jsonobject.getString("end");
}