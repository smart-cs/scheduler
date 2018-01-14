const CreatorAPI = {
  BASE: "https://sheltered-taiga-32349.herokuapp.com",
  SCHEDULES_API: "/schedules",
  schedules: [],
  dayStrToIndex: function(day) {
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
  },
  intTimeToStr: function(time) {
    const timeStr = time.toString();
    const insertIndex = timeStr.length - 2;
    return timeStr.slice(0, insertIndex) + ":" + timeStr.slice(insertIndex);
  },
  formatSchedule: function(schedule){
    var days = [[],[],[],[],[],[],[]];
    const courses = schedule.courses; 
    for (var i=0; i < courses.length; i++) {
      const courseName = courses[i].name;
      const sessions = courses[i].sessions;
      for (var j=0; j < sessions.length; j++) {
        const s = sessions[j];
        const block = {
          name: courseName,
          start: this.intTimeToStr(s.start), 
          end: this.intTimeToStr(s.end)
        };
        days[this.dayStrToIndex(s.day)].push(block);
        // TODO: Use these
        // s.activity;
        // s.term;
      }
    }
    return days;
  },
  create: function(courses, callback) {
    const coursesParam = courses.join(",");

    this.schedules = []
    fetch(this.BASE + this.SCHEDULES_API + "?courses=" + coursesParam, {
      method: 'GET'
    }).then(r => r.json())
      .then(function(r) {
        const schedules = r.body;
        CreatorAPI.schedules = schedules.map(s => CreatorAPI.formatSchedule(s));
        callback.call();
      });
  }
}
