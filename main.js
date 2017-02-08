var limit = 500;
var tweets = 0;

var $div = $("<div class='tweet'><img class='profilePic' src=''><div class='name'></div><div class='handle'></div>" + 
	"<div class='text'></div><div class='location'></div></div>");

$('#tweetHolder').append($div);

$('.stately').eq(0).css('width', window.innerWidth);

var stateTotals = {
	"AL": 0, "AK": 0, "AZ": 0, "AR": 0,	"CA": 0,
	"CO": 0, "CT": 0, "DE": 0, "FL": 0,	"GA": 0,
	"HI": 0, "ID": 0, "IL": 0, "IN": 0, "IA": 0,
	"KS": 0, "KY": 0, "LA": 0, "ME": 0,	"MD": 0,
	"MA": 0, "MI": 0, "MN": 0, "MS": 0, "MO": 0,
	"MT": 0, "NE": 0, "NV": 0, "NH": 0, "NJ": 0,
	"NM": 0, "NY": 0, "NC": 0, "ND": 0, "OH": 0,
	"OK": 0, "OR": 0, "PA": 0, "RR": 0, "SC": 0,
	"SD": 0, "TN": 0, "TX": 0, "UT": 0, "VT": 0,
	"VA": 0, "WA": 0, "WV": 0, "WI": 0, "WY": 0,
	"DC": 0, "GU": 0, "PR": 0, "VI": 0//guam, puerto rico, virgin islands
}

function addToState(placeName){
	if(placeName.split(',')[1] != ' USA'){
		if(placeName.split(',')[1] && placeName.split(',')[1].trim() in stateTotals){
			stateTotals[placeName.split(',')[1].trim()]++;
		}else if(placeName.split(',')[1]){
			stateTotals[placeName.split(',')[1].trim()] = 1;
		}
		//console.log(stateTotals);
	}else{
		switch(placeName.split(',')[0]){
			case "Alabama":	stateTotals["AL"]++; break;
			case "Alaska":stateTotals["AK"]++; break;
			case "Arizona": stateTotals["AZ"]++; break;
			case "Arkansas": stateTotals["AR"]++; break;
			case "California" :	stateTotals["CA"]++; break;
			case "Colorado": stateTotals["CO"]++; break;
			case "Connecticut":	stateTotals["CT"]++; break;
			case "Delaware": stateTotals["DE"]++; break;
			case "Florida":	stateTotals["FL"]++; break;
			case "Georgia":	stateTotals["GA"]++; break;
			case "Hawaii": stateTotals["HI"]++;	break;
			case "Idaho": stateTotals["ID"]++; break;
			case "Illinois": stateTotals["IL"]++; break;
			case "Indiana": stateTotals["IN"]++; break;
			case "Iowa": stateTotals["IA"]++; break;
			case "Kansas": stateTotals["KS"]++; break;
			case "Kentucky": stateTotals["KY"]++; break;
			case "Louisiana": stateTotals["LA"]++; break;
			case "Maine": stateTotals["ME"]++; break;
			case "Maryland": stateTotals["MD"]++; break;
			case "Massachusetts": stateTotals["MA"]++; break;
			case "Michigan": stateTotals["MI"]++; break;
			case "Minnesota": stateTotals["MN"]++; break;
			case "Mississippi": stateTotals["MS"]++; break;
			case "Missouri": stateTotals["MO"]++; break;
			case "Montana":	stateTotals["MT"]++; break;
			case "Nebraska": stateTotals["NE"]++; break; 
			case "Nevada": stateTotals["NV"]++;	break;
			case "New Hampshire": stateTotals["NH"]++; break;
			case "New Jersey": stateTotals["NJ"]++;	break;
			case "New Mexico": stateTotals["NM"]++; break;
			case "New York": stateTotals["NY"]++; break;
			case "North Carolina": stateTotals["NC"]++;	break;
			case "North Dakota": stateTotals["ND"]++; break;
			case "Ohio": stateTotals["OH"]++; break;
			case "Oklahoma": stateTotals["OK"]++; break;
			case "Oregon": stateTotals["OR"]++; break;
			case "Pennsylvania": stateTotals["PA"]++; break;
			case "Rhode Island": stateTotals["RI"]++; break;
			case "South Carolina": stateTotals["SC"]++; break;
			case "South Dakota": stateTotals["SD"]++; break;
			case "Tennessee": stateTotals["TN"]++; break;
			case "Texas": stateTotals["TX"]++; break;
			case "Utah": stateTotals["UT"]++; break;
			case "Vermont": stateTotals["VT"]++; break;
			case "Virginia": stateTotals["VA"]++; break;
			case "Washington": stateTotals["WA"]++; break;
			case "West Virginia": stateTotals["WV"]++; break;
			case "Wisconsin": stateTotals["WI"]++; break;
			case "Wyoming":	stateTotals["WY"]++; break;
			default:
				console.log(placeName.split(',')[0]);
		}
	}
}

var colors = ["ff0000", "ff3333", "ff4000", "ff6633", "ff8000", "ff9933", "ffbf00", "ffcc33", "ffff00", "ffff33",
			  "bfff00", "ccff33", "80ff00", "99ff33", "40ff00", "66ff33", "00ff00", "33ff33", "00ff40", "33ff66",
			  "00ff80", "33ff99", "00ffbf", "33ffcc", "00ffff", "33ffff", "00bfff", "33ccff", "0080ff", "3399ff",
			  "0040ff", "3366ff", "0000ff", "3333ff", "4000ff", "6633ff", "8000ff", "9933ff", "bf00ff", "cc33ff",
			  "ff00ff", "ff33ff", "ff00bf", "ff33cc", "ff0080", "ff3399"];

function updateColor(){	
	var count = 0;

	var states = Object.keys(stateTotals).map(function(key) {
	    return [key, stateTotals[key]];
	});

	states.sort(function(first, second) {
	    return second[1] - first[1];
	});

	for(var i = 0; i < states.length-1; i++){
		if(states[i][1] > 0){
			$("." + (states[i][0]).toLowerCase()).css('color', '#' + colors[count]);
			count++;
		}
	}
}

PUBNUB.init({
	subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
}).subscribe({
	channel : 'pubnub-twitter',
	message : function(msg){ 

		if(tweets < limit && msg.place != null && msg.place.country == "United States"){

			$('.text:last').html(msg.text);
			$('.profilePic:last').attr('src', msg.user.profile_image_url_https);
			$('.name:last').html(msg.user.name);
			$('.handle:last').html("@" + msg.user.screen_name);
			$('.location:last').html(msg.place.full_name);

			addToState(msg.place.full_name);			
			tweets++;
			updateColor();
		}

	}	
});