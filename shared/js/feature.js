$( 'head' ).append('<style type="text/css">#features_title .f_text { display: none; }</style>');
var Feature;

function Feature(){
	// images [{ src:xxx , defaultX:xxx , titles:[xxxx,xxxx]}];
	this.images = new Array();
	this.IMG_WIDTH = 1100; 
	this.IMG_HEIGHT = 400;
	this.currentIndex = 1;
	this.interval; 
};
Feature.prototype = {
	init:function(){
		var scope = this;
		
		$('#features_imgages li:last').clone(true).prependTo($('#features_imgages ul'));
		
		$('#features_imgages li:eq(1)').clone(true).appendTo($('#features_imgages ul'));
		
		
		$('#features_imgages ul li').each(function(i, e) {
			var img = $(e).find('img');
			$(img).css({'left':(i-1)*scope.IMG_WIDTH});
			var obj = new Object();
			obj.src = $(img);
			obj.defaultX = i*scope.IMG_WIDTH;
			
			var ary = new Array();
			ary = $(img).attr('title').split('<br/>');
			if(ary.length <= 1){
				obj.titles = ary[0].split('<br>');
			}else{
				obj.titles = ary;
			}
			
			
			
			scope.images.push(obj);
			
		});
		this.update(1);
	
		
		$('#features').mouseover(function(){
			if(scope.interval){clearInterval(scope.interval);scope.interval=null;};
			
		});
		
		$('#features').mouseout(function(){
			if(!scope.interval){
				scope.interval = setInterval(function(){
				scope.currentIndex++;
				scope.update(scope.currentIndex);
				},5000);
			}
		});
		
		
		
		this.interval = setInterval(function(){
			scope.currentIndex++;
			scope.update(scope.currentIndex);
		},5000);
		
		this.setButton();
	},
	update:function(index){
		var scope = this;
		var len = this.images.length;
		if(this.currentIndex>len-2) this.currentIndex = 1;
		
		if(this.currentIndex<1) this.currentIndex = len-2;
		
		for(var i = 0 ; i<len ; i++){
			var img = this.images[i].src;
			var targetX = this.images[i].defaultX-this.IMG_WIDTH*this.currentIndex;
			$(img).stop().animate({'left':targetX},1000,'easeInOutExpo');
		}
		
		$('#features_title .f_text').each(function(i, element) {
			$(this).stop().fadeOut(500,function(){$(this).text(scope.images[scope.currentIndex].titles[i]);}).fadeIn(500);
		});
	}
	,
	setButton:function(){
		var scope = this;
		
		$("#features_nav .next , #features_nav .previous").hover(function(){ 
			$(this).fadeTo(100,0.8); 
		},function() {
			$(this).fadeTo(200,1); 
		});
		$('#features_nav .next').click(function(){
			scope.update(++scope.currentIndex);
		});
		$('#features_nav .previous').click(function(){
			scope.update(--scope.currentIndex);
		});
	}
}
Feature = new Feature();
// jQuery Ready
$(function(){
	Feature.init();
});
// window Ready
$(window).load(function () {
});

