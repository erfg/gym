'use strict';
var app = angular.module('gymApp');

app.controller('GroupActivitiesCtrl', function ($scope) {

    $scope.selectedActivity = 'Resalta un tipo de actividad...';
    $scope.selectedCenter = {};
    $scope.center = 'Vallecas';

    $scope.activities = ['Abdominales', 'Aero-Combat', 'Bailes de Salón', 'Body Tonic', 'Latinos', 'Pilates', 'Step Avanzado',
        'T-Extreme', 'Tonificación', 'Yoga', 'Zumba'];

    $scope.datasource = {
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

    $scope.$watch('center', function (newValue) {
        $scope.selectedCenter = $scope.datasource[newValue];
    });
});