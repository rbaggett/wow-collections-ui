"use strict";angular.module("wowCollectionsUi",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainController",controllerAs:"vm"}).otherwise({redirectTo:"/"})}]),function(){function a(a,b,c){function d(){b.getCharacter(e.realm,e.character).then(function(a){c.current.character=a.data})}var e=this;e.realm={},e.character="",e.current=c.current,e.getCharacter=d,function(){b.getRealms().then(function(a){e.realms=a.data.realms})}()}angular.module("wowCollectionsUi").controller("MainController",a),a.$inject=["$q","bnetFactory","dataFactory"]}(),function(){var a={bnetKey:"eedv8cxqvh58re7gmfwhy5bhqbkcgwfh"};angular.module("wowCollectionsUi").constant("constants",a)}(),function(){function a(a,b){function c(c,d){var e={method:"GET",url:"https://us.api.battle.net/wow/character/"+c+"/"+d+"?locale=en_US&apikey="+a.bnetKey};return b.request(e)}function d(){var c={method:"GET",url:"https://us.api.battle.net/wow/pet/?locale=en_US&apikey="+a.bnetKey};return b.request(c)}function e(c,d){var e={method:"GET",url:"https://us.api.battle.net/wow/character/"+c+"/"+d+"?fields=pets&locale=en_US&apikey="+a.bnetKey};return b.request(e)}function f(){var c={method:"GET",url:"https://us.api.battle.net/wow/realm/status?locale=en_US&apikey="+a.bnetKey};return b.request(c)}return{getCharacter:c,getPets:d,getPlayerPets:e,getRealms:f}}angular.module("wowCollectionsUi").factory("bnetFactory",a),a.$inject=["constants","httpFactory"]}(),function(){function a(){var a={character:{},pets:[],mounts:[]};return{current:a}}angular.module("wowCollectionsUi").factory("dataFactory",a)}(),function(){function a(a,b){function c(c){var f=b.defer();return a(c).success(d(f)).error(e),f.promise}function d(a){return function(b,c,d,e){var f={data:b,status:c,headers:d,config:e};a.resolve(f)}}function e(a){return function(b,c,d,e){var f={data:b,status:c,headers:headers,config:e};a.reject(f)}}return{request:c}}angular.module("wowCollectionsUi").factory("httpFactory",a),a.$inject=["$http","$q"]}(),function(){function a(){var a={};return{masterPets:a}}angular.module("wowCollectionsUi").factory("petsFactory",a)}(),angular.module("wowCollectionsUi").run(["$templateCache",function(a){a.put("views/main.html",'<!--<div data-ng-repeat="pet in vm.missingPets">--><!--<img data-ng-src="http://wow.zamimg.com/images/wow/icons/medium/{{pet.icon}}.jpg">--><!--</div>--> <label> Realm <select class="form-control" data-ng-model="vm.realm" data-ng-options="realm.slug as realm.name for realm in vm.realms"></select> </label> <label> Character <input class="form-control" data-ng-model="vm.character"> </label> <button class="btn btn-primary" data-ng-click="vm.getCharacter()">Search</button> <img data-ng-src="http://us.battle.net/static-render/us/{{vm.current.character.thumbnail}}"> <pre data-ng-bind="vm.current | json"></pre>')}]);