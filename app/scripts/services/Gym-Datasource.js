'use strict';

angular.module('gymApp')
  .service('GymDatasource', function GymDatasource() {

        Array.prototype.merge = function(array) {
            for (var i=0; i<array.length; i++) {
                if (this.indexOf(array[i]) < 0) {
                    this.push(array[i]);
                }
            }
            return this;
        };

        Array.prototype.pushUnique = function(element) {
            if (this.indexOf(element) < 0) {
                this.push(element);
            }
            return this;
        };

        function hourWithString(string) {
            var hour = string.split(":");
            var result = new Date();
            result.setUTCHours(parseInt(hour[0]));
            result.setUTCMinutes(parseInt(hour[1]));
            result.setUTCSeconds(0);
            result.setUTCMilliseconds(0);
            return result;
        }

        function subdivisionsInHourRange (start, finish, minutesSubdivision) {
            var result = 0;
            var difference = new Date(hourWithString(finish) - hourWithString(start));
            result += difference.getUTCHours()*60/minutesSubdivision;
            result += difference.getUTCMinutes()/minutesSubdivision;
            return result;
        }

        function incrementOneHour(hourString) {
            var hourArray = hourString.split(":");
            var result = (parseInt(hourArray[0]) + 1)%24 + ":" + hourArray[1];
            return result;
        }

        function idleDuration(currentHour, nextClassHour, minutesSubdivision) {
            var result = 0;
            var difference = hourWithString(nextClassHour) - hourWithString(currentHour);
            if (difference > 0) {
                var differenceDate = new Date(difference);
                result += differenceDate.getUTCHours()*60/minutesSubdivision;
                result += differenceDate.getUTCMinutes()/minutesSubdivision;
            }
            return result;
        }

      function  scheduleForDictionary(dictionary) {
          var rows = subdivisionsInHourRange(dictionary.startingAt, dictionary.endingAt, dictionary.subdivisionMinutes);
          var hours = rows*dictionary.subdivisionMinutes/60;
          var result = new Array();
          for (var i = 0; i < rows; i++) {
              result.push(new Array());
          }

          // creates the cells for hours
          var localStarting = dictionary.startingAt;
          var localEnding;
          for (var i = 0; i < hours; i++) {
              localEnding = incrementOneHour(localStarting);
              var name = localStarting + " a " + localEnding;
              var quarters = 60/dictionary.subdivisionMinutes;
              result[i*quarters].push({class: "hour", text: name, quarters: "" + quarters, tooltip: ""});
              localStarting = localEnding;
          }

          // creates the rest of schedule
          for (var day in dictionary.activities) {
              localStarting = dictionary.startingAt;
              var classes = dictionary.activities[day];
              for(var i = 0; i < classes.length; i++) {
                  var singleClass = classes[i];
                  // inserts an idle cell if necessary
                  var haveToCreateAnIdleCell = idleDuration(localStarting, singleClass.starts, dictionary.subdivisionMinutes);
                  if (haveToCreateAnIdleCell) {
                     var idleInsertion = subdivisionsInHourRange(dictionary.startingAt, localStarting, dictionary.subdivisionMinutes);
                      result[idleInsertion].push({class: "idle", text: "", quarters: "" + haveToCreateAnIdleCell, tooltip: ""});
                  }
                  // insert a busy cell and update localStarting
                  var classInsertion = subdivisionsInHourRange(dictionary.startingAt, singleClass.starts, dictionary.subdivisionMinutes);
                  var classDuration = subdivisionsInHourRange(singleClass.starts, singleClass.ends, dictionary.subdivisionMinutes);
                  var classTooltip = singleClass.starts + " - " + singleClass.ends;
                  result[classInsertion].push({class: "busy", text: singleClass.name, quarters: "" + classDuration, tooltip: classTooltip});
                  localStarting = singleClass.ends;
              }
              // insert trailing idle
              var trailingIdleDuration = idleDuration(localStarting, dictionary.endingAt, dictionary.subdivisionMinutes);
              if (trailingIdleDuration) {
                  var trailingIdleInsertion = subdivisionsInHourRange(dictionary.startingAt, localStarting, dictionary.subdivisionMinutes);
                  result[trailingIdleInsertion].push({class: "idle", text: "", quarters: "" + trailingIdleDuration, tooltip: ""});
              }
          }
          return result;
      }

      this.ds = [{name: "Fuenlabrada",
                  terms: [{name: "Octubre",
                           schedules: [{
                              name: "Clases colectivas",
                              subdivisionMinutes: 15,
                              days: 6,
                              startingAt: "9:00",
                              endingAt: "22:00",
                              activities: {
                                  lunes: [
                                      {name: "Zumba", prov: false, level:"", starts: "9:30", ends: "10:30"},
                                      {name: "T-Extreme", prov: false, level: "", starts: "11:15", ends: "12:15"},
                                      {name: "Step", prov: true, level: "Principiantes", starts: "12:15", ends: "12:45"},
                                      {name: "CAD/Gluteo", prov: false, level: "", starts: "15:30", ends: "16:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "17:30", ends: "18:00"},
                                      {name: "Zumba", prov: false, level: "", starts: "18:00", ends: "19:00"},
                                      {name: "Step", prov: false, level: "", starts: "19:00", ends: "20:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "20:00", ends: "20:30"},
                                      {name: "Pilates", prov: false, level: "", starts: "20:30", ends: "21:30"}
                                  ],
                                  martes: [
                                      {name: "Pilates", prov: false, level: "", starts: "10:15", ends: "11:15"},
                                      {name: "Abdominales", prov: false, level: "", starts: "12:15", ends: "12:45"},
                                      {name: "Body Tonic", prov: false, level: "", starts: "14:30", ends: "15:30"},
                                      {name: "Pequebailes", prov: true, level: "", starts: "17:00", ends: "18:00"},
                                      {name: "Pilates", prov: false, level: "", starts: "18:00", ends: "19:00"},
                                      {name: "Funky", prov: false, level: "", starts: "19:00", ends: "20:00"},
                                      {name: "CAD/Gluteo", prov: false, level: "", starts: "20:00", ends: "20:30"},
                                      {name: "Body Tonic", prov: false, level: "", starts: "20:30", ends: "21:30"}
                                  ],
                                  miercoles: [
                                      {name: "Body Tonic", prov: false, level: "", starts: "9:30", ends: "10:30"},
                                      {name: "Step", prov: false, level: "Nivel Alto", starts: "11:15", ends: "12:15"},
                                      {name: "CAD/Gluteo", prov: false, level: "", starts: "12:15", ends: "12:45"},
                                      {name: "Abdominales", prov: false, level: "", starts: "15:30", ends: "16:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "17:30", ends: "18:00"},
                                      {name: "T-Extreme", prov: false, level: "", starts: "18:00", ends: "19:00"},
                                      {name: "Aerocombat", prov: false, level: "", starts: "19:00", ends: "20:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "20:00", ends: "20:30"},
                                      {name: "Zumba", prov: false, level: "", starts: "20:30", ends: "21:30"}
                                  ],
                                  jueves: [
                                      {name: "Pilates", prov: false, level: "", starts: "10:15", ends: "11:15"},
                                      {name: "Abdominales", prov: false, level: "", starts: "12:15", ends: "12:45"},
                                      {name: "T-Extreme", prov: false, level: "", starts: "14:30", ends: "15:30"},
                                      {name: "Pequebailes", prov: true, level: "", starts: "17:00", ends: "18:00"},
                                      {name: "Pilates", prov: false, level: "", starts: "18:00", ends: "19:00"},
                                      {name: "CAD/Gluteo", prov: false, level: "", starts: "19:00", ends: "19:30"},
                                      {name: "Latinos", prov: false, level: "", starts: "19:30", ends: "20:30"},
                                      {name: "Yoga", prov: false, level: "", starts: "20:30", ends: "21:30"}
                                  ],
                                  viernes: [
                                      {name: "Body Tonic", prov: false, level: "", starts: "10:15", ends: "11:15"},
                                      {name: "Zumba", prov: false, level: "", starts: "11:15", ends: "12:15"},
                                      {name: "Urban Dance", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                      {name: "Running", prov: false, level: "", starts: "18:00", ends: "19:00"},
                                      {name: "Bailes de salón", prov: false, level: "", starts: "20:00", ends: "21:00"}
                                  ],
                                  sabado: [
                                      {name: "Body Tonic", prov: false, level: "", starts: "11:15", ends: "12:15"}
                                  ]} // ACTIVITIES
                           },
                               {
                                   name: "Indoor Cycling",
                                   subdivisionMinutes: 15,
                                   days: 7,
                                   startingAt: "8:00",
                                   endingAt: "23:00",
                                   activities: {
                                       lunes: [
                                           {name: "Virtual", prov: false, level: "", starts: "9:00", ends: "9:45"},
                                           {name: "Normal", prov: false, level: "", starts: "10:30", ends: "11:15"},
                                           {name: "Virtual", prov: false, level: "", starts: "11:30", ends: "12:15"},
                                           {name: "Normal", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                           {name: "Virtual", prov: false, level: "", starts: "17:30", ends: "18:15"},
                                           {name: "Normal", prov: false, level: "", starts: "18:30", ends: "19:15"},
                                           {name: "Normal", prov: false, level: "", starts: "19:30", ends: "20:15"},
                                           {name: "Virtual", prov: false, level: "", starts: "21:30", ends: "22:15"}
                                       ],
                                       martes: [
                                           {name: "Virtual", prov: false, level: "", starts: "8:00", ends: "8:45"},
                                           {name: "Normal", prov: false, level: "", starts: "9:30", ends: "10:15"},
                                           {name: "Normal", prov: false, level: "", starts: "11:15", ends: "12:00"},
                                           {name: "Virtual", prov: false, level: "", starts: "15:30", ends: "16:15"},
                                           {name: "Virtual", prov: false, level: "", starts: "17:00", ends: "17:45"},
                                           {name: "Normal", prov: false, level: "", starts: "19:00", ends: "19:45"},
                                           {name: "Normal", prov: false, level: "", starts: "20:00", ends: "20:45"},
                                           {name: "Virtual", prov: false, level: "", starts: "21:00", ends: "21:45"}
                                       ],
                                       miercoles: [
                                           {name: "Virtual", prov: false, level: "", starts: "9:00", ends: "9:45"},
                                           {name: "Normal", prov: false, level: "", starts: "10:30", ends: "11:15"},
                                           {name: "Virtual", prov: false, level: "", starts: "11:30", ends: "12:15"},
                                           {name: "Normal", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                           {name: "Virtual", prov: false, level: "", starts: "18:00", ends: "18:45"},
                                           {name: "Normal", prov: false, level: "", starts: "19:15", ends: "20:00"},
                                           {name: "Normal", prov: false, level: "", starts: "20:30", ends: "21:15"},
                                           {name: "Virtual", prov: false, level: "", starts: "21:15", ends: "22:00"}
                                       ],
                                       jueves: [
                                           {name: "Virtual", prov: false, level: "", starts: "8:00", ends: "8:45"},
                                           {name: "Normal", prov: false, level: "", starts: "9:30", ends: "10:15"},
                                           {name: "Normal", prov: false, level: "", starts: "11:15", ends: "12:00"},
                                           {name: "Virtual", prov: false, level: "", starts: "15:30", ends: "16:15"},
                                           {name: "Virtual", prov: false, level: "", starts: "17:00", ends: "17:45"},
                                           {name: "Normal", prov: false, level: "", starts: "19:30", ends: "20:15"},
                                           {name: "Virtual", prov: false, level: "", starts: "21:30", ends: "22:15"}
                                       ],
                                       viernes: [
                                           {name: "Normal", prov: false, level: "", starts: "9:30", ends: "10:15"},
                                           {name: "Virtual", prov: false, level: "", starts: "11:00", ends: "11:45"},
                                           {name: "Virtual", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                           {name: "Virtual", prov: false, level: "", starts: "17:30", ends: "18:15"},
                                           {name: "Normal", prov: false, level: "", starts: "19:15", ends: "20:00"},
                                           {name: "Virtual", prov: false, level: "", starts: "20:30", ends: "21:15"}
                                       ],
                                       sabado: [
                                           {name: "Virtual", prov: false, level: "", starts: "10:15", ends: "11:00"},
                                           {name: "Normal", prov: false, level: "", starts: "12:30", ends: "13:15"}
                                       ],
                                       domingo: [
                                           {name: "Virtual", prov: false, level: "", starts: "12:00", ends: "13:00"}
                                       ]} // ACTIVITIES
                               }] // SCHEDULES
                  }] // TERMS
      },
          {name: "Moratalaz",
              terms: [
                  {name: "Octubre",
                      schedules: [
                          {
                              name: "Clases colectivas",
                              subdivisionMinutes: 15,
                              days: 6,
                              startingAt: "9:00",
                              endingAt: "22:00",
                              activities: {
                                  lunes: [
                                      {name: "Zumba", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Pilates", prov: false, level: "", starts: "11:00", ends: "12:00"},
                                      {name: "Funky", prov: false, level: "Principiantes", starts: "18:00", ends: "19:00"},
                                      {name: "Tonificación", prov: false, level: "", starts: "19:00", ends: "20:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "20:00", ends: "20:30"},
                                      {name: "Aerodance", prov: false, level: "", starts: "20:30", ends: "21:30"}
                                  ],
                                  martes: [
                                      {name: "Pilates", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Tonificación", prov: false, level: "", starts: "14:30", ends: "15:30"},
                                      {name: "Body Tonic", prov: false, level: "", starts: "18:15", ends: "19:00"},
                                      {name: "Pilates", prov: false, level: "", starts: "19:00", ends: "20:00"},
                                      {name: "Zumba", prov: false, level: "", starts: "20:00", ends: "21:00"},
                                      {name: "Aerobox", prov: false, level: "", starts: "21:00", ends: "21:45"}
                                  ],
                                  miercoles: [
                                      {name: "Alto Impacto", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Pilates", prov: false, level: "Nivel Alto", starts: "11:00", ends: "12:00"},
                                      {name: "Funky", prov: false, level: "", starts: "18:00", ends: "19:00"},
                                      {name: "Tonificación", prov: false, level: "", starts: "19:00", ends: "20:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "20:00", ends: "20:30"},
                                      {name: "Step", prov: false, level: "", starts: "20:30", ends: "21:30"}
                                  ],
                                  jueves: [
                                      {name: "Pilates", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Zumba", prov: false, level: "", starts: "14:30", ends: "15:30"},
                                      {name: "GAP", prov: false, level: "", starts: "18:15", ends: "19:00"},
                                      {name: "Pilates", prov: false, level: "", starts: "19:00", ends: "20:00"},
                                      {name: "Zumba", prov: false, level: "", starts: "20:00", ends: "21:00"},
                                      {name: "Body Tonic", prov: false, level: "", starts: "21:00", ends: "21:45"}
                                  ],
                                  viernes: [
                                      {name: "Zumba", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Body Tonic", prov: false, level: "", starts: "11:00", ends: "12:00"},
                                      {name: "Step", prov: false, level: "Nivel Alto", starts: "18:30", ends: "19:30"}
                                  ],
                                  sabado: [
                                      {name: "Tonificación", prov: false, level: "", starts: "12:00", ends: "13:00"}
                                  ]} // ACTIVITIES
                          },
                          {
                              name: "Indoor Cycling",
                              subdivisionMinutes: 15,
                              days: 5,
                              startingAt: "11:00",
                              endingAt: "22:00",
                              activities: {
                                  lunes: [
                                      {name: "Spinning", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                      {name: "Spinning", prov: false, level: "", starts: "19:00", ends: "19:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "20:30", ends: "21:15"}
                                  ],
                                  martes: [
                                      {name: "Spinning", prov: false, level: "", starts: "11:00", ends: "11:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "18:15", ends: "19:00"},
                                      {name: "Spinning", prov: false, level: "", starts: "20:00", ends: "20:45"}
                                  ],
                                  miercoles: [
                                      {name: "Spinning", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                      {name: "Spinning", prov: false, level: "", starts: "19:00", ends: "19:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "20:30", ends: "21:15"}
                                  ],
                                  jueves: [
                                      {name: "Spinning", prov: false, level: "", starts: "11:00", ends: "11:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "18:15", ends: "19:00"},
                                      {name: "Spinning", prov: false, level: "", starts: "20:00", ends: "20:45"}
                                  ],
                                  viernes: [
                                      {name: "Spinning", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                      {name: "Spinning", prov: false, level: "", starts: "20:00", ends: "20:45"}
                                  ]} // ACTIVITIES
                          }
                      ] // SCHEDULES
                  }
              ] // TERMS
          },
          {name: "Vallecas",
              terms: [
                  {name: "Octubre",
                      schedules: [
                          {
                              name: "Clases colectivas",
                              subdivisionMinutes: 15,
                              days: 5,
                              startingAt: "10:00",
                              endingAt: "22:00",
                              activities: {
                                  lunes: [
                                      {name: "Body Tonic", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "17:15", ends: "17:45"},
                                      {name: "Body Tonic", prov: false, level: "", starts: "18:30", ends: "19:15"},
                                      {name: "Cardiobox", prov: false, level: "", starts: "19:15", ends: "20:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "20:00", ends: "20:30"},
                                      {name: "Step", prov: false, level: "", starts: "20:30", ends: "21:15"}
                                  ],
                                  martes: [
                                      {name: "Pilates", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Tonificación", prov: false, level: "", starts: "11:00", ends: "12:00"},
                                      {name: "Boot-Camp", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                      {name: "Pilates", prov: false, level: "", starts: "18:00", ends: "19:00"},
                                      {name: "Cross-Fit", prov: false, level: "", starts: "19:15", ends: "20:00"},
                                      {name: "Zumba", prov: false, level: "", starts: "20:00", ends: "20:45"},
                                      {name: "Kick-Boxing", prov: false, level: "", starts: "21:00", ends: "22:00"}
                                  ],
                                  miercoles: [
                                      {name: "Zumba", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "17:15", ends: "17:45"},
                                      {name: "Boot-Camp", prov: false, level: "", starts: "18:30", ends: "19:15"},
                                      {name: "Zumba", prov: false, level: "", starts: "19:15", ends: "20:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "20:00", ends: "20:30"},
                                      {name: "Aerodance", prov: false, level: "", starts: "20:30", ends: "21:15"}
                                  ],
                                  jueves: [
                                      {name: "Pilates", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Step", prov: false, level: "", starts: "11:00", ends: "12:00"},
                                      {name: "Tonificación", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                      {name: "Pilates", prov: false, level: "", starts: "18:00", ends: "19:00"},
                                      {name: "Cross-Fit", prov: false, level: "", starts: "20:00", ends: "20:45"},
                                      {name: "Kick-Boxing", prov: false, level: "", starts: "21:00", ends: "22:00"}
                                  ],
                                  viernes: [
                                      {name: "GAP", prov: false, level: "", starts: "11:00", ends: "11:45"},
                                      {name: "Abdominales", prov: false, level: "", starts: "17:15", ends: "17:45"},
                                      {name: "Tonificación", prov: false, level: "", starts: "19:00", ends: "20:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "20:00", ends: "20:30"}
                                  ]} // ACTIVITIES
                          },
                          {
                              name: "Spinning",
                              subdivisionMinutes: 15,
                              days: 6,
                              startingAt: "10:00",
                              endingAt: "22:00",
                              activities: {
                                  lunes: [
                                      {name: "Spinning", prov: false, level: "", starts: "11:00", ends: "11:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                      {name: "Spinning", prov: false, level: "", starts: "18:00", ends: "18:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "20:30", ends: "21:15"}
                                  ],
                                  martes: [
                                      {name: "Spinning", prov: false, level: "", starts: "19:00", ends: "19:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "21:00", ends: "21:45"}
                                  ],
                                  miercoles: [
                                      {name: "Spinning", prov: false, level: "", starts: "11:00", ends: "11:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                      {name: "Spinning", prov: false, level: "", starts: "18:00", ends: "18:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "20:30", ends: "21:15"}
                                  ],
                                  jueves: [
                                      {name: "Spinning", prov: false, level: "", starts: "19:00", ends: "19:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "21:00", ends: "21:45"}
                                  ],
                                  viernes: [
                                      {name: "Spinning", prov: false, level: "", starts: "10:00", ends: "10:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                  ],
                                  sabado: [
                                      {name: "Spinning", prov: false, level: "", starts: "12:00", ends: "12:45"}
                                  ]} // ACTIVITIES
                          }
                      ] // SCHEDULES
                  },
                  {name: "Noviembre",
                      schedules: [
                          {
                              name: "Clases colectivas",
                              subdivisionMinutes: 15,
                              days: 5,
                              startingAt: "10:00",
                              endingAt: "22:00",
                              activities: {
                                  lunes: [
                                      {name: "Body Tonic", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "17:15", ends: "17:45"},
                                      {name: "Body Tonic", prov: false, level: "", starts: "18:30", ends: "19:15"},
                                      {name: "Cardiobox", prov: false, level: "", starts: "19:15", ends: "20:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "20:00", ends: "20:30"},
                                      {name: "Step", prov: false, level: "", starts: "20:30", ends: "21:15"}
                                  ],
                                  martes: [
                                      {name: "Pilates", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Tonificación", prov: false, level: "", starts: "11:00", ends: "12:00"},
                                      {name: "Boot-Camp", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                      {name: "Pilates", prov: false, level: "", starts: "18:00", ends: "19:00"},
                                      {name: "Cross-Fit", prov: false, level: "", starts: "19:15", ends: "20:00"},
                                      {name: "Zumba", prov: false, level: "", starts: "20:00", ends: "20:45"},
                                      {name: "Kick-Boxing", prov: false, level: "", starts: "21:00", ends: "22:00"}
                                  ],
                                  miercoles: [
                                      {name: "Zumba", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "17:15", ends: "17:45"},
                                      {name: "Boot-Camp", prov: false, level: "", starts: "18:30", ends: "19:15"},
                                      {name: "Zumba", prov: false, level: "", starts: "19:15", ends: "20:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "20:00", ends: "20:30"},
                                      {name: "Aerodance", prov: false, level: "", starts: "20:30", ends: "21:15"}
                                  ],
                                  jueves: [
                                      {name: "Pilates", prov: false, level: "", starts: "10:00", ends: "11:00"},
                                      {name: "Step", prov: false, level: "", starts: "11:00", ends: "12:00"},
                                      {name: "Tonificación", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                      {name: "Pilates", prov: false, level: "", starts: "18:00", ends: "19:00"},
                                      {name: "Cross-Fit", prov: false, level: "", starts: "20:00", ends: "20:45"},
                                      {name: "Kick-Boxing", prov: false, level: "", starts: "21:00", ends: "22:00"}
                                  ],
                                  viernes: [
                                      {name: "GAP", prov: false, level: "", starts: "11:00", ends: "11:45"},
                                      {name: "Abdominales", prov: false, level: "", starts: "17:15", ends: "17:45"},
                                      {name: "Tonificación", prov: false, level: "", starts: "19:00", ends: "20:00"},
                                      {name: "Abdominales", prov: false, level: "", starts: "20:00", ends: "20:30"}
                                  ]} // ACTIVITIES
                          },
                          {
                              name: "Spinning",
                              subdivisionMinutes: 15,
                              days: 6,
                              startingAt: "10:00",
                              endingAt: "22:00",
                              activities: {
                                  lunes: [
                                      {name: "Spinning", prov: false, level: "", starts: "11:00", ends: "11:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                      {name: "Spinning", prov: false, level: "", starts: "18:00", ends: "18:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "20:30", ends: "21:15"}
                                  ],
                                  martes: [
                                      {name: "Spinning", prov: false, level: "", starts: "19:00", ends: "19:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "21:00", ends: "21:45"}
                                  ],
                                  miercoles: [
                                      {name: "Spinning", prov: false, level: "", starts: "11:00", ends: "11:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                      {name: "Spinning", prov: false, level: "", starts: "18:00", ends: "18:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "20:30", ends: "21:15"}
                                  ],
                                  jueves: [
                                      {name: "Spinning", prov: false, level: "", starts: "19:00", ends: "19:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "21:00", ends: "21:45"}
                                  ],
                                  viernes: [
                                      {name: "Spinning", prov: false, level: "", starts: "10:00", ends: "10:45"},
                                      {name: "Spinning", prov: false, level: "", starts: "14:30", ends: "15:15"},
                                  ],
                                  sabado: [
                                      {name: "Spinning", prov: false, level: "", starts: "12:00", ends: "12:45"}
                                  ]} // ACTIVITIES
                          }
                      ] // SCHEDULES
                  }
              ] // TERMS
          }];

      this.centers = function () {
            var result = [];
            for (var i=0; i<this.ds.length; i++) {
                result.push(this.ds[i].name);
            }
            return result;
      };

      this.termsForCenter = function (center) {
            var result = [];
            for (var i=0; i<this.ds.length; i++) {
                if (this.ds[i].name === center) {
                    for (var j=0; j<this.ds[i].terms.length; j++) {
                        result.push(this.ds[i].terms[j].name);
                    }
                }
            }
            return result;
      };

      this.scheduleTypesForCenterAndTerm = function (center, term) {
            var result = [];
            for (var i=0; i<this.ds.length; i++) {
                if (this.ds[i].name === center) {
                    for (var j=0; j<this.ds[i].terms.length; j++) {
                        if (this.ds[i].terms[j].name === term) {
                            for (var k=0; k<this.ds[i].terms[j].schedules.length; k++) {
                                result.push(this.ds[i].terms[j].schedules[k].name);
                            }
                        }
                    }
                }
            }
            return result;
      };

      this.scheduleForCenterTermAndScheduleType = function (center, term, type) {
            for (var i=0; i<this.ds.length; i++) {
                if (this.ds[i].name === center) {
                    for (var j=0; j<this.ds[i].terms.length; j++) {
                        if (this.ds[i].terms[j].name === term) {
                            for (var k=0; k<this.ds[i].terms[j].schedules.length; k++) {
                                if (this.ds[i].terms[j].schedules[k].name === type) {
                                    return scheduleForDictionary(this.ds[i].terms[j].schedules[k]);
                                }
                            }
                        }
                    }
                }
            }
            return [];
      };

      this.daysInWeek = function (center, term, type) {
          for (var i=0; i<this.ds.length; i++) {
              if (this.ds[i].name === center) {
                  for (var j=0; j<this.ds[i].terms.length; j++) {
                      if (this.ds[i].terms[j].name === term) {
                          for (var k=0; k<this.ds[i].terms[j].schedules.length; k++) {
                              if (this.ds[i].terms[j].schedules[k].name === type) {
                                  return this.ds[i].terms[j].schedules[k].days;
                              }
                          }
                      }
                  }
              }
          }
          return 0;
      };

      this.activities = function (center, term, type) {
          var result = [];
          for (var i=0; i<this.ds.length; i++) {
              if (this.ds[i].name === center) {
                  for (var j=0; j<this.ds[i].terms.length; j++) {
                      if (this.ds[i].terms[j].name === term) {
                          for (var k=0; k<this.ds[i].terms[j].schedules.length; k++) {
                              if (this.ds[i].terms[j].schedules[k].name === type) {
                                  for (var day in this.ds[i].terms[j].schedules[k].activities) {
                                      for (var l=0; l<this.ds[i].terms[j].schedules[k].activities[day].length; l++) {
                                          result = result.pushUnique(this.ds[i].terms[j].schedules[k].activities[day][l].name);
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
          return result.sort();
      };

      // PROV SHIT !!!

      this.datasource = {
          Vallecas: {schedule: {'08 a 09': ['Pilates', 'T-Extreme', 'Tonificación', 'Latinos', 'Zumba', 'Aero-Combat'],
              '09 a 10': ['Zumba', 'Yoga', 'Pilates', 'Step Avanzado', 'Bailes de Salón', 'Abdominales'],
              '10 a 11': ['Aero-Combat', 'Body Tonic', 'Bailes de Salón', 'Abdominales', 'Pilates', 'T-Extreme'],
              '11 a 12': ['Yoga', 'Step Avanzado', 'Tonificación', 'T-Extreme', 'Latinos', 'Body Tonic'],
              '12 a 13': ['Tonificación', 'Pilates', 'Zumba', 'Abdominales', 'Body Tonic', 'Aero-Combat']},
              location: {longitude: '-3.6498084', latitude:'40.3819613'}},

          Moratalaz: {schedule: {'08 a 09': ['Zumba', 'T-Extreme', 'Tonificación', 'Latinos', 'Zumba', 'Aero-Combat'],
              '09 a 10': ['T-Extreme', 'Yoga', 'Pilates', 'Step Avanzado', 'Bailes de Salón', 'Abdominales'],
              '10 a 11': ['Aero-Combat', 'Body Tonic', 'Bailes de Salón', 'Abdominales', 'Pilates', 'T-Extreme'],
              '11 a 12': ['Yoga', 'Step Avanzado', 'Tonificación', 'T-Extreme', 'Latinos', 'Body Tonic'],
              '12 a 13': ['Tonificación', 'Pilates', 'Zumba', 'Abdominales', 'Body Tonic', 'Aero-Combat']},
              location: {longitude: '-3.6466968', latitude:'40.4079307'}}
      };

      this.activitiesProv = function(){
          var result = [];
          for (var center in this.datasource) {
              for (var activities in this.datasource[center].schedule) {
                  result = result.merge(this.datasource[center].schedule[activities]);
              }
          }
          return result;
      };
  });
