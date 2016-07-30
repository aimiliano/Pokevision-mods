// ==UserScript==
// @name         pokevision mod
// @version      0.11
// @description  Pokevision full screen/restore pokemon choices / add many places to scan
// @author       aimilios peppas
// @match        https://pokevision.com/*
// @include 	 https://pokevision.com/*
// @downloadURL	 https://github.com/aimiliano/Pokevision-mods/blob/master/pokevision-mod-tampermonkey.js
// @namespace 	 https://github.com/aimiliano/Pokevision-mods
// @updateURL 	 https://github.com/aimiliano/Pokevision-mods/blob/master/pokevision-mod-tampermonkey.js
// @grant        none
// ==/UserScript==

(function() {
//Just copy paste this to your console (yuo have to do this in every page reload if you like you can install tempermonkey in order to do it automatically)
function init($){
	
$(document).ready(function(){
		
//Excluded Pokemon :D
//Here we put the pokemon we don't want to see on map
//ids are from here
//https://en.wikipedia.org/wiki/List_of_Pok%C3%A9mon (without zeros)
//here i already excluded some common pokemon 
$excluded = [150,115,114,102,77,31,128,79,118,134,142,44];

$.each($excluded,function(i,e){
//set unselected from select bar to the right.
$($("select.form-control").find("option")[e]).removeAttr("selected");
//set class for show unselected
$("li[data-original-index="+e+"]").removeClass("selected");
});
//trigger reflow of filters..
$("select.form-control").triggerNative('change');
App.home.updateMarkers();

// remove headers footers sidebars if you want.
$("header.header,.header-mobile,main.home-sidebar,footer").remove();
$(".home-map, body.home").css("height","100%"); //for mobile
$(".home-map-tooltip").css("height","auto");
$("button.home-map-scan").css("margin","0 0 2px -160px");
$("body.home").css("padding","0px");
$("main.home-map3").css("height","100%").css("width","100%");
$("div.home-map-wrapper3").css("height","100%").css("width","100%");
//recalculate map
App.home.map.invalidateSize();
	
//my locations save for including later lower in the code
$My_clicked_locations =[];

//Set circle on map to understand where we are clicking (circle click shower)
App.home.map.on("click", function(e) {
	  latLong =e.latlng;
	latlonarr =[latLong.lat, latLong.lng];
	//set it to 
	$My_clicked_locations.push(latlonarr);
	  //add a circle to see where am i clicking if i want to sum up my own area
	  //http://leafletjs.com/reference.html for reference
	  //UnComment that to work.
	  //L.circle(latlonarr, 1000).addTo(App.home.map);
	  //log that if you want to sum it up and paste it to the sectio auto refresh below.
	  console.log($My_clicked_locations.toString());
	});  
	
//Auto Refresh For your locations
//original work https://gist.github.com/MightyPork/aabffffe1f0dc113724dd8ceea83516e

scan_my_locations =function(){
	// milliseconds
	var RED_BUTTON_TIME = 30000; // time between pushing the red button
	var CLICK_SEQ_TIME = 60000; // Time between refreshing the nearby area by clicking
	var CLICK_TIME = 1000; // time between individual clicks

	// Put your home coords here - this will be refreshed using the red button
	// All coords are [Latitude, Longitude]
	//here you can include your home location
	var home = [37.97537763924482,23.655259609222412];

	// Those coords will be scanned 
	// Put some coords around your area here
	//these are all athens hot spot areas
	var nearby_All_Athens = [
	home,
	[37.992091541761745, 23.682323098182678],
	[37.99264536508517, 23.697853088378903],
	[37.99237479543429, 23.71021270751953],
	[37.99237479543429, 23.720169067382812],
	[37.993998198369574, 23.730125427246094],
	[37.993998198369574, 23.739824295043945],
	[37.991563080493655, 23.67176055908203],
	[37.98993962366689, 23.656654357910156],
	[37.98993962366689, 23.640174865722656],
	[37.98236301678186, 23.638458251953125],
	[37.97532689557135, 23.62884521484375],
	[37.96801944035648, 23.618545532226562],
	[37.957462943135575, 23.619232177734375],
	[37.949882983648976, 23.624038696289062],
	[37.94189610879601, 23.632750511169434],
	[37.93648078459463, 23.64154815673828],
	[37.944332874507054, 23.648929595947266],
	[37.954079129298556, 23.640003204345703],
	[37.96355341519888, 23.63485336303711],
	[37.96856075828048, 23.644466400146484],
	[37.960169881965356, 23.654422760009766],
	[37.9504244352654, 23.659744262695312],
	[37.941354594331514, 23.663692474365234],
	[37.930794264757274, 23.657169342041016],
	[37.9401361721973, 23.679485321044922],
	[37.934179150985045, 23.689098358154297],
	[37.92862785577981, 23.699054718017578],
	[37.924565666890146, 23.708667755126953],
	[37.91779485337734, 23.717079162597656],
	[37.949882983648976, 23.672962188720703],
	[37.960440570360944, 23.670558929443356],
	[37.97059066494912, 23.662662506103516],
	[37.979115660044805, 23.67107391357422],
	[37.98114527484491, 23.684463500976562],
	[37.97059066494912, 23.680686950683594],
	[37.96030522628786, 23.68480682373047],
	[37.95299627594772, 23.68927001953125],
	[37.94568659832042, 23.696823120117188],
	[37.937428495133396, 23.71072769165039],
	[37.93241902959728, 23.723258972167965],
	[37.97695067572292, 23.702659606933594],
	[37.96883141574578, 23.696136474609375],
	[37.98182180063798, 23.718795776367188],
	[37.982904228934125, 23.732528686523438],
	[37.96950805504374, 23.7139892578125],
	[37.95732759357514, 23.70746612548828],
	[37.94798787156644, 23.719482421875],
	[37.94460362126488, 23.738365173339844],
	[37.96071125775881, 23.728065490722656],
	[37.97116579496787, 23.732571601867676],
	[37.96260604160774, 23.743858337402344],
	[37.95245484328638, 23.751068115234375],
	[38.00116779822644, 23.66626739501953],
	[38.010230251583245, 23.656482696533203],
	[38.011177010439674, 23.67176055908203],
	[38.003737861469666, 23.683090209960938],
	[38.00454944167447, 23.700942993164062],
	[38.01455819225335, 23.687896728515625],
	[38.01685730679879, 23.705406188964844],
	[38.005902055387054, 23.71673583984375],
	[38.00603731538592, 23.729610443115234],
	[38.01685730679879, 23.719825744628906],
	[38.018074455890115, 23.73373031616211],
	[38.01036550359709, 23.747119903564453],
	[38.00049145082287, 23.753299713134766],
	[37.98809628017408, 23.753085136413574],
	[37.975056262053606, 23.74720573425293],
	[37.960981944158995, 23.759994506835938],
	[37.97241753296282, 23.764286041259762],
	[37.98337778629296, 23.766345977783203],
	[37.99460696520758, 23.76591682434082],
	[38.00698412839117, 23.766002655029293],
	[38.01685730679879, 23.75741958618164],
	[37.9322836338988, 23.73922348022461],
	[37.918065697886206, 23.732357025146484],
	[37.91427378400488, 23.749008178710938],
	[37.93688694775037, 23.756561279296875],
	[38.02916310538659, 23.683090209960938],
	[38.029703972192, 23.70128631591797],
	[38.03321950909025, 23.722915649414062],
	[38.03321950909025, 23.741455078125],
	[38.03078569382294, 23.75621795654297],
	[38.0241598981341, 23.773727416992188],
	[38.01442294797532, 23.783512115478512],
	[38.002655740556705, 23.78213882446289],
	[37.98926317271892, 23.781623840332028],
	[37.97221454987305, 23.780765533447266],
	[37.980333435660626, 23.797588348388672],
	[37.993051217690244, 23.80016326904297],
	[38.00657835288609, 23.799133300781246],
	[38.020373460133186, 23.79810333251953],
	[38.028487016264364, 23.787460327148434],
	[38.036870080366576, 23.772010803222653],
	[38.042953961480585, 23.752441406249996],
	[38.04430586642022, 23.735790252685547],
	[38.04741515305354, 23.714160919189453],
	[38.04525218502613, 23.701629638671875],
	[38.04241319251569, 23.687210083007812],
	[37.97803317586683, 23.653221130371094]
];

//Here define your own neighboorhood or places of inerest

// All coords are [Latitude, Longitude]
// your nearby coords (you can find them in the browser URL bar) 
//or you can uncomment the circle click shower upper in the code , re run the page click the places you want and 
//copy paste here the locations from the console here in the apropriate format [ [lat,long],[lat,long],... ] 

my_neighboorhood =[
	[38.04430586642022, 23.735790252685547],
	[38.04741515305354, 23.714160919189453],
	[38.04525218502613, 23.701629638671875],
	[38.04241319251569, 23.687210083007812],
	[37.97803317586683, 23.653221130371094]
];

//assign your locations if you want to have multiple and change. (might do UI in the future..)
	nearby=nearby_All_Athens;
	nearby=my_neighboorhood;

	var nearbyN = 0;

	function reload() {
		App.home.findNearbyPokemon(home[0], home[1], true);
		setTimeout(reload, RED_BUTTON_TIME);
	}

	function loadNearby() {
		nearbyN++;
		if (nearbyN == nearby.length) nearbyN = 0;
		console.log('Loading nearby #' + nearbyN);
		var coord = nearby[nearbyN];
		App.home.findNearbyPokemon(coord[0], coord[1], false);

		setTimeout(loadNearby, nearbyN == nearby.length - 1 ? CLICK_SEQ_TIME : CLICK_TIME);
	}

	setTimeout(reload, RED_BUTTON_TIME);
	loadNearby();

}

//continious scan.. comment it if you don't want that
scan_my_locations();	
	
});
} //end of init
function init_with_jQuery() {
	if (typeof jQuery =='undefined'){
		console.log("jQuery object not available.. aborting..");
	}
	else{
		init(jQuery);
	}
}
init_with_jQuery();

})();
