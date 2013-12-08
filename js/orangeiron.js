function OrangeIronCtrl($scope, $http) {

	$scope.server = {};
	$scope.lessonToEdit = null;

	$scope.newAlternativeTranslations = [];
	$scope.newVocabulary = [];
	$scope.newWord = {};
	$scope.newWords = [];

	var currIndex = -1;

	$scope.getData = function(url) {
		$http.get(url).success(function(data) {
	    $scope.server = data;
	  });
	};

	$scope.createServer = function() {
		$scope.server = {uuid:uuid(), serverName:$scope.serverName, serverDescription:$scope.serverDescription, version:1, lessons:[]};
	};

	$scope.addLesson = function() {
		$scope.server.lessons.push({uuid:uuid(), name:$scope.newLessonName, version:1, vocabulary:$scope.newVocabulary});
		$scope.server.version++;
		$scope.newLessonName = '';
		$scope.newWords =  [];
	};

	$scope.addTranslation = function() {
		$scope.newAlternativeTranslations.push($scope.newAlternativeTranslation);
		$scope.newAlternativeTranslation = '';
	};

	$scope.addWord = function() {
		$scope.newWord = {uuid:uuid(), originalWord:$scope.newOriginalWord, correctTranslation:$scope.newCorrectTranslation, alternativeTranslations:$scope.newAlternativeTranslations};
		$scope.newVocabulary.push($scope.newWord);
		$scope.newWords.push($scope.newWord);
		$scope.newOriginalWord = '';
		$scope.newCorrectTranslation = '';
		$scope.newAlternativeTranslations = [];
		$scope.newAlternativeTranslation = '';
	};

	$scope.editLesson = function(idx) {
		$scope.lessonToEdit = angular.copy($scope.server.lessons[idx]);
		currIndex = idx;
	};

	$scope.saveEditedLesson = function(index) {
		$scope.lessonToEdit.version++;
		$scope.server.lessons[currIndex] = $scope.lessonToEdit;
		$scope.server.version++;
		$scope.lessonToEdit = {};
	};

	$scope.cancelEditedLesson = function() {
		$scope.lessonToEdit = null;
	};

	$scope.showEditSection = function() {
		if ($scope.lessonToEdit) {
			return true;
		} else {
			return false;
		}
	};

	uuid = function() {
		return UUIDjs.create().toString();
	};
}