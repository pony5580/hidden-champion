
$.fn.spectragram.accessData = {
    accessToken: '254921076.71326b9.4eda75dfe61e4cf4ab8d038d6db0a330',
    clientID: '71326b99faa84f88acc73fbe44f2c221'
};
var Project;

function Project(){
};
Project.prototype = {
	init:function(){
		this.setSNS();
		
		this.setInstagram();
		this.setButton();
		this.setNavigation();
		this.loadAdvertise();
		
		this.bloggerSort();
		this.setScroll();		
	},
	setButton:function(){
		$("#pagetop img").hover(function(){ 
			$(this).fadeTo(100,0.5); 
		},function() {
			$(this).fadeTo(200,1); 
		});
		//scroll
		$('a[href*=#]').click(function(){
			var id = $(this).attr('href');
			if(id=='#'){
				targetY=0;
			}else{
				targetY=$(id).offset().top;
			}
	     	$('html,body').stop().animate({ scrollTop:targetY },1000, 'easeOutExpo');
    	 	return false;
		});
	},
	setNavigation:function(){
		var url = $.url();
		var currentDir = url.segment(1);
		
		$('#header_global li a').each(function(i, e) {
			var str = $(this).attr('href').replace(/\//g,'');
			if(currentDir == str){
				$(this).css({'border-bottom-style':'solid','border-bottom-width':2});
			};
		});
		
	},
	setSNS:function(){
		$('.twitter').sharrre({
			share: {twitter: !0},
			template: '{total} <span>tweets</span>',
			enableHover: false,
			enableTracking: true,
			buttons:{twitter:{via:"HIDDEN_CHAMPION"}},
			click:function(a,b){a.openPopup("twitter")}
		});
		$('.facebook').sharrre({
			share: {facebook: !0},
			template: '{total} <span>likes</span>',
			enableHover: false,
			enableTracking: true,
			click:function(a,b){a.openPopup("facebook")}
		});
	},
	setInstagram:function(){
		$('.instagram ul').spectragram('getRecentTagged',{
    		query: 'hiddenchampion',
			max:20,
			size:'small'
		});
	},
	setScroll:function(){
		$('.scroll_container').jScrollPane();
		$('.scroll_container article').last().css('border-bottom-style', 'none');
	},
	loadAdvertise:function(){
		var scope = this;
		$.ajax({
			url : "/shared/images/ad/ad_large.json",
			dataType : "json",
			success : function(json){
				var adArray = new Array();
				var len = json.ad.length;
				for(var i = 0 ; i<len ; i++){
					var adObj = json.ad[i];
					adArray.push(adObj);
				}	
			scope.setAdvertise(adArray);		
			
			 },
			error : function(XMLHttpRequest, textStatus, errorThrown){
				console.log("XMLHttpRequest : " + XMLHttpRequest);
				console.log("textStatus : " + textStatus);
				console.log("errorThrown : " + errorThrown);
			}
		});
	},
	setAdvertise:function(adArray){
		this.shuffleAry(adArray);
		$('.ads').each(function(i, e) {
			var adObj = adArray[i]
			$(this).find('a').attr({ href: adObj.link, target : adObj.target}).find('img').attr({ src: adObj.img, alt: adObj.alt});
			
		});
	},
	bloggerSort: function() {
		
		if($('.blogs article').length == 0) return false;
		var blogArr = [];
		var blogWrp = $('<div>');
		
		$('.blogs a').each(function(i,elm){
			var ts = $(this).find('time').attr('datetime');		
			var thisDate = new Date(ts);
			blogArr[i] = [];
			blogArr[i][0] = thisDate.getTime();
			blogArr[i][1] = $(this);
		});
		blogArr.sort(dateSort);
		for(var i=0; i<blogArr.length; i++){
			blogWrp.append(blogArr[i][1]);
		}
		$('.blogs .scroll_container').html(blogWrp.html());
		$('.scroll_container').jScrollPane();
	},
	shuffleAry:function(ary){
		var i = ary.length;
		while (i--) {
			var j = Math.floor(Math.random()*(i+1));
			var t = ary[i];
			ary[i] = ary[j];
			ary[j] = t;
		}
	}
};
function dateSort(a, b) { return(b[0] - a[0]); }
Project = new Project();
// jQuery Ready
$(function(){
	Project.init();
});
// window Ready
$(window).load(function () {
});

