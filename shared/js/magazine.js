var Magazine;

function Magazine(){
	this.buttonList = new Array();
	this.imageList = new Array();
	this.currentIndex;
	this.pageIndex = 0;
};
Magazine.prototype = {
	init:function(){
	
		var scope = this;
		
		$magContainer = $('.magazine_viewer .img_container');
		$magNavi = $('.magazine_viewer nav .thumbs');
		$magNext = $('.magazine_viewer nav .next');
		$magPrev = $('.magazine_viewer nav .prev');
		
		$magNavi.find('ul li a').each(function(i, e) {
			
			$(this).hover(function(){ 
				$(this).fadeTo(100,0.2); 
			},function() {
				$(this).fadeTo(200,1); 
			});
			
			$(this).click(function(){
				scope.currentIndex = i;
				scope.shiftImage();
				return false;
			});
			//preload
			$('<img>').attr($(this).attr('href'));
			
			scope.imageList.push($(this).attr('href'));
								
			scope.buttonList.push($(this));
			
			
		});
		//next prev
		
		$magNext.hover(function(){ 
			$(this).fadeTo(100,0.2); 
		},function() {
			$(this).fadeTo(200,1); 
		});
		$magPrev.hover(function(){ 
			$(this).fadeTo(100,0.2); 
		},function() {
			$(this).fadeTo(200,1); 
		});
		
		$magPrev.click(function(){
			scope.shiftNavi(1);
		});
			
		$magNext.click(function(){
			scope.shiftNavi(-1);
		});
		
		$magNavi.find('ul').css({'width':this.imageList.length*103});
		
		this.shiftNavi(0);
		
		
	},
	shiftImage:function(){
		$magContainer.find('img').attr('src',this.imageList[this.currentIndex]);
		$magContainer.find('img').stop().fadeOut(0).fadeIn(500);
	},
	shiftNavi:function(i){
		
		this.pageIndex += i;
	
		this.pageIndex>=0 ? $magPrev.find('img').css({'display':'none'}) : $magPrev.find('img').css({'display':'inline'});
		this.pageIndex<=-this.imageList.length+5 ? $magNext.find('img').css({'display':'none'}) : $magNext.find('img').css({'display':'inline'});
		
		var targetX = this.pageIndex*103;
		$magNavi.find('ul').stop().animate({'left':targetX},1000,'easeOutExpo');
	}
};
Magazine = new Magazine();
// jQuery Ready
$(function(){
	Magazine.init();
});
// window Ready
$(window).load(function () {
});

