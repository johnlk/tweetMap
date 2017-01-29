var limit = 20;
var count = 0;

var $div = $("<div class='tweet'><img class='profilePic' src=''><div class='name'></div><div class='handle'></div><div class='text'></div><div class='location'></div></div>");

$('#tweetHolder').append($div);

$('#map').usmap({
    // The click action
    click: function(event, data) {
  	alert('click');
	    // $('#clicked-state')
	    //   .text('You clicked: '+data.name)
	    //   .parent().effect('highlight', {color: '#C7F464'}, 2000);
	}
});

PUBNUB.init({
	subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
}).subscribe({
	channel : 'pubnub-twitter',
	message : function(msg){ 

		if(msg.place.country == "United States"){

			$('.text:last').html(msg.text);
			$('.profilePic:last').attr('src', msg.user.profile_image_url_https);
			$('.name:last').html(msg.user.name);
			$('.handle:last').html("@" + msg.user.screen_name);
			$('.location:last').html(msg.place.full_name);

			console.log(msg);
			//count++;
		}

	}	
});