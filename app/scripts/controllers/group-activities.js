'use strict';
var app = angular.module('gymApp');

app.controller('GroupActivitiesCtrl', function ($scope) {

    $scope.selectedActivity = 'Resalta un tipo de actividad...';

    $scope.center = 'Vallecas';

    $scope.activities = ['Abdominales', 'Aero-Combat', 'Bailes de Salón', 'Body Tonic', 'Latinos', 'Pilates', 'Step Avanzado',
        'T-Extreme', 'Tonificación', 'Yoga', 'Zumba'];

    $scope.datasource = {
        Vallecas: {'08 a 09': ['Pilates', 'T-Extreme', 'Tonificación', 'Latinos', 'Zumba', 'Aero-Combat'],
            '09 a 10': ['Zumba', 'Yoga', 'Pilates', 'Step Avanzado', 'Bailes de Salón', 'Abdominales'],
            '10 a 11': ['Aero-Combat', 'Body Tonic', 'Bailes de Salón', 'Abdominales', 'Pilates', 'T-Extreme'],
            '11 a 12': ['Yoga', 'Step Avanzado', 'Tonificación', 'T-Extreme', 'Latinos', 'Body Tonic'],
            '12 a 13': ['Tonificación', 'Pilates', 'Zumba', 'Abdominales', 'Body Tonic', 'Aero-Combat']},
        Moratalaz: {'08 a 09': ['Zumba', 'T-Extreme', 'Tonificación', 'Latinos', 'Zumba', 'Aero-Combat'],
            '09 a 10': ['T-Extreme', 'Yoga', 'Pilates', 'Step Avanzado', 'Bailes de Salón', 'Abdominales'],
            '10 a 11': ['Aero-Combat', 'Body Tonic', 'Bailes de Salón', 'Abdominales', 'Pilates', 'T-Extreme'],
            '11 a 12': ['Yoga', 'Step Avanzado', 'Tonificación', 'T-Extreme', 'Latinos', 'Body Tonic'],
            '12 a 13': ['Tonificación', 'Pilates', 'Zumba', 'Abdominales', 'Body Tonic', 'Aero-Combat']}
    }

    $scope.datasourceForCurrentCenter = function () {
        return $scope.datasource[$scope.center];
    }
});