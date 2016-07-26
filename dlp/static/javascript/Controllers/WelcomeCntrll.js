/**
 * Created by xavi on 7/06/16.
 */
angular.module('DLPApp').controller('WelcomeCntrll',['$scope', '$http', '$state', '$translate', '$timeout', '$log', 'CityByPlaceId', 'City', '$interval',
    function($scope, $http, $state, $translate, $timeout, $log, CityByPlaceId, City, $interval){
        //$(document).foundation('orbit', 'reflow');
        $scope.city = {name: '', lat: '', lng: '', place_id: ''};
        $scope.place = {'place_id': ""}
        $scope.select = true;
        City.get({time: Date.now()},
            function (data) {
                $scope.cities_list = [];
                data.results.forEach(function(city) {
                    $scope.cities_list.push(city);
                });
            }
        );
        $scope.logos = [
            {'name': 'logo1', 'init': 'static/images/logos/logo-liquidgalaxylab-trans.png', 'hover': 'static/images/logos/logo-liquidgalaxylab.png'},
            {'name': 'logo2', 'init': 'static/images/logos/parc-logo-trans.png', 'hover': 'static/images/logos/parc-logo.jpg'},
            {'name': 'logo3', 'init': 'static/images/logos/lleidadrone-logo-trans.png', 'hover': 'static/images/logos/lleidadrone-logo.png'},
            {'name': 'logo4', 'init': 'static/images/logos/CataloniaSmartDrones-logo.png', 'hover': 'static/images/logos/CataloniaSmartDrones-logo-solid.png'},
            {'name': 'logo5', 'init': 'static/images/logos/hemav-academics1.png', 'hover': 'static/images/logos/hemav-academics-solid1.png'},
        ];
        $scope.alert = {show: false, type: 'alert', msg: 'ERROR_MESSAGE_1' };
        var timeout;
        var options = {
            types: ['(cities)']
        };
        var inputForm = document.getElementById('autocomplete_google');
        var autocompleteForm = new google.maps.places.Autocomplete(inputForm, options);
        google.maps.event.addListener(autocompleteForm, 'place_changed', function() {
            var place = autocompleteForm.getPlace();
            $scope.city.name = place.name;
            $scope.city.lat = place.geometry.location.lat();
            $scope.city.lng = place.geometry.location.lng();
            $scope.city.place_id = place.place_id;
            $scope.$apply();
        });

        $scope.saveCity = function(){
            if(!$scope.city.place_id){
                showAlert();
                return timeout = $timeout($scope.closeAlert, 5000);
            }
            CityByPlaceId.get({place_id: $scope.city.place_id, time: Date.now()}, function(data){
                if(data.results.length <= 0){
                    $scope.newCity = new City();
                    $scope.newCity.name = $scope.city.name;
                    $scope.newCity.lat = $scope.city.lat;
                    $scope.newCity.lng = $scope.city.lng;
                    $scope.newCity.place_id = $scope.city.place_id;
                    $scope.newCity.$save()
                        .then(function(result){
                            $state.go('main', {'city': result.place_id})
                        })
                }else{
                    $state.go('main', {'city': $scope.city.place_id})
                }
            });
        };

        $scope.changeTab = function(){
            $scope.select = !$scope.select;
        };

        $scope.accessDLP = function(){
            window.alert($scope.place.place_id);
            if($scope.place.place_id == ""){
                showAlert();
                return timeout = $timeout($scope.closeAlert, 5000);
            }
            $state.go('main', {'city': $scope.place.place_id})
        };

        $scope.stopTimeout = function() {
            if (angular.isDefined(timeout)) {
                $interval.cancel(timeout);
                timeout = undefined;
            }
        };

        $scope.closeAlert = function() {
            $scope.alert.show = false;
            $scope.stopTimeout();
        };

        var showAlert = function() {
            $scope.alert.show = true;
        };

        $scope.mobileAndTabletcheck = function() {
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };


        //$scope.open_modal = function () {
        //
        //    var modalInstance = $modal.open({
        //        templateUrl: '/static/templates/new_city_modal.html',
        //        controller: 'CreateCityModal',
        //        resolve: {
        //            city: function () {
        //                return $scope.city;
        //            }
        //        }
        //    });
        //
        //    modalInstance.result.then(function (id_city) {
        //        $scope.new_city_id = id_city;
        //        if($scope.new_city_id != null){
        //            $log.info('Created new city with id: ' + $scope.new_city_id);
        //            $state.go('main', {'city': $scope.new_city_id});
        //        }
        //    });
        //};

    }]);