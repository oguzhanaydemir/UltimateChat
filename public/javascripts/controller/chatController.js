app.controller('chatController', ['$scope', ($scope) => {
    const socket = io.connect('http://localhost:3000');

    $scope.activeTab = 2;

    $scope.changeTab = tabValue => {
        $scope.activeTab = tabValue;
    }

}]);