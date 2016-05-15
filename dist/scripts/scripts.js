!function(){"use strict";angular.module("wowCollectionsUi",["angularUtils.directives.dirPagination","ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.router"])}(),function(){"use strict";function a(a){return a.loadData()}function b(b,c){c.otherwise("/"),b.state("wcui",{"abstract":!0,resolve:{resolveMasterData:a}}).state("wcui.empty",{url:"/",views:{"wcui@":{templateUrl:"pages/empty/empty.html"}}}).state("wcui.main",{url:"/",views:{"wcui@":{templateUrl:"pages/main/main.html",controller:"MainController",controllerAs:"vm"}}}).state("wcui.main.pets",{url:"",views:{"tab@wcui.main":{templateUrl:"pages/pets/pets.html",controller:"PetsController",controllerAs:"vm"}}}).state("wcui.main.mounts",{url:"",views:{"tab@wcui.main":{templateUrl:"pages/mounts/mounts.html",controller:"MountsController",controllerAs:"vm"}}}).state("wcui.main.toys",{url:"",views:{"tab@wcui.main":{templateUrl:"pages/toys/toys.html",controller:"ToysController",controllerAs:"vm"}}})}angular.module("wowCollectionsUi").config(b),a.$inject=["masterFactory"],b.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function a(a,b,c,d){function e(){b.loadData(g.realm,g.character).then(f)}function f(){d.setActiveView(),a.go("wcui.main")}var g=this;g.realm="dalaran",g.data=c.data,g.character="Thulse",g.getCharacter=e}angular.module("wowCollectionsUi").controller("HeaderController",a),a.$inject=["$state","characterFactory","masterFactory","utilFactory"]}(),function(){"use strict";function a(a,b){var c=this;c.data=a.data,c.viewState=b.viewState}angular.module("wowCollectionsUi").controller("MainController",a),a.$inject=["characterFactory","utilFactory"]}(),function(){"use strict";function a(a){!function(){a.setActiveView("mounts")}()}angular.module("wowCollectionsUi").controller("MountsController",a),a.$inject=["utilFactory"]}(),function(){"use strict";function a(a,b,c){function d(){e(),f(),g(),console.log(k.pets)}function e(){for(var a,b=0,c=l.length;c>b;b++)a=l[b],a.collected=!0,a.theme=j(a),a.species=h(a),a.familyIcon="images/Pet_type_"+a.species.family+".svg"}function f(){k.pets=k.pets.concat(l).concat(_.xorBy(l,m,"creatureId"))}function g(){var a=-1;a=_.findIndex(k.pets,{creatureId:71021}),a&&(k.pets[a].icon="warlock_summon_-voidlord"),a=_.findIndex(k.pets,{creatureId:83817}),a&&(k.pets[a].icon="inv_pet_-goat"),a=_.findIndex(k.pets,{creatureId:88814}),a&&(k.pets[a].icon="trade_archaeology_draenei-candelabra")}function h(a){var b=_.filter(m,{creatureId:a.creatureId});return b.length?b[0]:{}}function i(a){var b;if(a.collected)switch(a.qualityId){case 3:b="pet-tile-primary";break;case 2:b="pet-tile-success";break;default:b="pet-tile-default"}else b="pet-tile-default-dashed";return b}function j(a){var b;switch(a.qualityId){case 3:b="primary";break;case 2:b="success";break;default:b="default"}return b}var k=this,l=a.character.pets.collected,m=b.data.pets;k.breeds=b.data.breeds,k.pageSize=24,k.pets=[],k.getPetTile=i,function(){d(),c.setActiveView("pets")}()}angular.module("wowCollectionsUi").controller("PetsController",a),a.$inject=["characterFactory","masterFactory","utilFactory"]}(),function(){"use strict";function a(a){!function(){a.setActiveView("toys")}()}angular.module("wowCollectionsUi").controller("ToysController",a),a.$inject=["utilFactory"]}(),function(){"use strict";var a={bnetKey:"eedv8cxqvh58re7gmfwhy5bhqbkcgwfh"};angular.module("wowCollectionsUi").constant("constants",a)}(),function(){"use strict";function a(a,b){function c(c,d){var e={method:"GET",url:"https://us.api.battle.net/wow/character/"+c+"/"+d+"?fields=pets,mounts&apikey="+a.bnetKey};return b.request(e)}function d(){var c={method:"GET",url:"https://us.api.battle.net/wow/pet/?fields=species&apikey="+a.bnetKey};return b.request(c)}function e(c,d){var e={method:"GET",url:"https://us.api.battle.net/wow/character/"+c+"/"+d+"?fields=pets&locale=en_US&apikey="+a.bnetKey};return b.request(e)}function f(){var c={method:"GET",url:"https://us.api.battle.net/wow/realm/status?locale=en_US&apikey="+a.bnetKey};return b.request(c)}return{getCharacter:c,getPets:d,getCharacterPets:e,getRealms:f}}angular.module("wowCollectionsUi").factory("bnetFactory",a),a.$inject=["constants","httpFactory"]}(),function(){"use strict";function a(a,b){function c(a,c){return b.getCharacter(a,c).then(e)["catch"](d)}function d(a){console.log("loadData failed:"+a)}function e(a){angular.copy(a.data,f)}var f={};return{character:f,loadData:c}}angular.module("wowCollectionsUi").factory("characterFactory",a),a.$inject=["$q","bnetFactory"]}(),function(){"use strict";function a(a,b){function c(c){var f=b.defer();return a(c).success(d(f)).error(e),f.promise}function d(a){return function(b,c,d,e){var f={data:b,status:c,headers:d,config:e};a.resolve(f)}}function e(a){return function(b,c,d,e){var f={data:b,status:c,headers:headers,config:e};a.reject(f)}}return{request:c}}angular.module("wowCollectionsUi").factory("httpFactory",a),a.$inject=["$http","$q"]}(),function(){"use strict";function a(a,b){function c(){return a.all([f(),e(),d(),i()]).then(function(){k.loaded=!0})["catch"](function(){k.loaded=!1})}function d(){}function e(){return b.getPets().then(function(a){k.pets=a.data.pets})}function f(){return b.getRealms().then(g)["catch"](h)}function g(a){k.realms=a.data.realms}function h(a){console.log("loadRealms failed:"+a)}function i(){}var j={4:{letters:"P/P",gender:"male"},14:{letters:"P/P",gender:"female"},5:{letters:"S/S",gender:"male"},15:{letters:"S/S",gender:"female"},6:{letters:"H/H",gender:"male"},16:{letters:"H/H",gender:"female"},7:{letters:"H/P",gender:"male"},17:{letters:"H/P",gender:"female"},8:{letters:"P/S",gender:"male"},18:{letters:"P/S",gender:"female"},9:{letters:"H/S",gender:"male"},19:{letters:"H/S",gender:"female"},10:{letters:"P/B",gender:"male"},20:{letters:"P/B",gender:"female"},11:{letters:"S/B",gender:"male"},21:{letters:"S/B",gender:"female"},12:{letters:"H/B",gender:"male"},22:{letters:"H/B",gender:"female"},3:{letters:"B/B",gender:"male"},13:{letters:"B/B",gender:"female"}},k={breeds:j,loaded:!1,pets:[],mounts:[],realms:[],toys:[]};return{data:k,loadData:c}}angular.module("wowCollectionsUi").factory("masterFactory",a),a.$inject=["$q","bnetFactory"]}(),function(){"use strict";function a(){function a(a){b.tab.pets=!1,b.tab.mounts=!1,b.tab.toys=!1,a&&(b.tab[a]=!0)}var b={tab:{pets:!1,mounts:!1,toys:!1}};return{viewState:b,setActiveView:a}}angular.module("wowCollectionsUi").factory("utilFactory",a)}(),angular.module("wowCollectionsUi").run(["$templateCache",function(a){"use strict";a.put("pages/empty/empty.html",""),a.put("pages/header/header.html",'<nav class="navbar navbar-default"> <form class="navbar-form navbar-center" role="search"> <!--<div class="form-group">--> <select class="form-control" data-ng-model="vm.realm" data-ng-options="realm.slug as realm.name for realm in vm.data.realms" placeholder="character realm"></select> <input class="form-control" data-ng-model="vm.character" placeholder="character name"> <!--</div>--> <button class="btn btn-primary" data-ng-click="vm.getCharacter()">Search</button> </form> </nav>'),a.put("pages/main/main.html",'<ul class="nav nav-tabs"> <li data-ng-class="{\'active\':vm.viewState.tab.pets}"><a ui-sref=".pets">Pets</a></li> <li data-ng-class="{\'active\':vm.viewState.tab.mounts}"><a ui-sref=".mounts">Mounts</a></li> <li class="disabled" data-ng-class="{\'active\':vm.viewState.tab.toys}"><a ui-sref=".toys">Toys</a></li> </ul> <div ui-view="tab"></div>'),a.put("pages/mounts/mounts.html","mounts"),a.put("pages/pets/pets.html",'<div class="row"> <div class="col-xs-6 col-sm-4 col-md-3" dir-paginate="pet in vm.pets | itemsPerPage: vm.pageSize | orderBy:\'creatureName\'"> <div class="pet-favorite" data-ng-if="pet.isFavorite" data-ng-include="\'images/favorite.be75fb8e.svg\'"></div> <div class="clearfix" data-ng-class="vm.getPetTile(pet)"> <div class="row"> <div class="text-center pet-tile-header"> <span data-ng-show="pet.collected" title="{{pet.creatureName}}">{{pet.creatureName}}</span> <span data-ng-hide="pet.collected" title="{{pet.name}}">{{pet.name}}</span> </div> </div> <div class="col-sm-3 pet-tile-body text-center"> <a href="http://www.wowhead.com/npc={{pet.creatureId}}" target="_blank" title="view on wowhead.com"> <img class="pet-icon pet-icon-{{pet.theme}}" data-ng-src="http://wow.zamimg.com/images/wow/icons/medium/{{pet.icon}}.jpg"> </a> </div> <div class="col-sm-9 pet-tile-body"> <div class="col-sm-5"> <div><span class="health-icon"></span>{{pet.stats.health}}</div> <div><span class="power-icon"></span>{{pet.stats.power}}</div> <div><span class="speed-icon"></span>{{pet.stats.speed}}</div> </div> <div class="col-sm-7 text-center"> <!--<div data-ng-if="pet.collected + pet.canBattle" class="text-center label label-{{pet.theme}} block">--> <!--{{pet.stats.level}}&nbsp;&nbsp;{{vm.breeds[pet.stats.breedId].letters}}--> <!--</div>--> <h1 class="text-{{pet.theme}}">{{pet.stats.level}}</h1> <div class="pet-family pet-family-{{pet.species.family}}"> <data-ng-include src="pet.familyIcon"></data-ng-include> </div> <!--<img src="http://wow.zamimg.com/images/pets/types/tiny/magic.png">--> </div> </div> </div> </div> </div> <div class="row text-center"> <dir-pagination-controls></dir-pagination-controls> </div>'),a.put("pages/toys/toys.html","toys")}]);