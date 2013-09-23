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

      this.dictionary = {
          subdivisionMinutes: 15,
          startingAt: "9:00",
          endingAt: "14:00",
          activities: {
              lunes: [
                  {name: "Zumba", starts: "9:30", ends: "10:30"},
                  {name: "Step", starts: "11:15", ends: "12:15"}
              ],
              martes: [
                  {name: "Abdominales", starts: "12:00", ends: "13:00"}
              ],
              miercoles: [
                  {name: "Body Tonic", starts: "9:00", ends: "10:00"},
                  {name: "Step", starts: "10:00", ends: "11:00"}
              ],
              jueves: [
                  {name: "Body Tonic", starts: "9:45", ends: "10:45"},
                  {name: "Abdominales", starts: "13:00", ends: "13:45"}
              ],
              viernes: [
                  {name: "Zumba", starts: "9:00", ends: "9:30"},
                  {name: "Body Tonic", starts: "11:15", ends: "12:15"}
              ],
              sabado: [
                  {name: "Latinos", starts: "9:30", ends: "10:00"},
                  {name: "Yoga", starts: "10:00", ends: "10:45"}
              ]
          }
      };

      this.pruebas = scheduleForDictionary(this.dictionary);

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

      this.activities = function(){
          var result = [];
          for (var center in this.datasource) {
              for (var activities in this.datasource[center].schedule) {
                  result = result.merge(this.datasource[center].schedule[activities]);
              }
          }
          return result;
      };
  });
