/**
 * Created by Freax on 17-1-18.
 * @blog http://www.myfreax.com
 */
import {app} from './app'
app.directive('bindValueTo',['commonFactory',(commonFactory) => {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            let prop = commonFactory.capitalize($attrs.bindValueTo),
                getter = 'get' + prop,
                setter = 'set' + prop;

            $element.on('change keyup select', function () {
                if ($element[0].type !== 'checkbox') {
                    $scope[setter] && $scope[setter](this.value);
                }
            });

            $element.on('click', function () {
                if ($element[0].type === 'checkbox') {
                    if ($element[0].checked) {
                        $scope[setter] && $scope[setter](true);
                    }
                    else {
                        $scope[setter] && $scope[setter](false);
                    }
                }
            });

            $scope.$watch($scope[getter], function (newVal) {
                if ($element[0].type === 'radio') {
                    let radioGroup = document.getElementsByName($element[0].name);
                    for (let i = 0, len = radioGroup.length; i < len; i++) {
                        radioGroup[i].checked = radioGroup[i].value === newVal;
                    }
                }
                else if ($element[0].type === 'checkbox') {
                    $element[0].checked = newVal;
                }
                else {
                    $element.val(newVal);
                }
            });
        }
    }
}]);