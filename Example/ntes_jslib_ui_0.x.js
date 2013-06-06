/*
 *	NetEase Javascript UI Library (Based on NetEase Javascript Library 1.x)
 *	Version: 0.1.8
 *	Modified time: 2010/1/22 10:43
 */
(function(_,B){var A=_.NTES||{};if(!A.ui)A.ui={};A.ui.version="0.1.8";A.ui.Template=function(){this._cache={}};A.ui.Template.prototype={get:function($){return null==this._cache[$]?"":this._cache[$]},parse:function(_,$){return A.util.parseTpl(this.get(_),$)},load:function($){var _;if(A.util.isArray($)){_=$.length;while(--_>=0)this._cache[$[_].title]=$[_].innerHTML.replace(/(?:^\s*<!--)|(?:-->\s*$)/g,"")}else for(_ in $)$.hasOwnProperty(_)&&(this._cache[_]=$[_])}};A.ui.Template._cache={};A.ui.Template.get=A.ui.Template.prototype.get;A.ui.Template.parse=A.ui.Template.prototype.parse;A.ui.Template.load=function($){$=$||A("#templates > *");A.ui.Template.prototype.load.call(this,$)};A.ui.PopupLayer=function(E,$,C,D){if(!arguments.length)return;var _=this;_.constructor=arguments.callee;_._ctrl=E;_._content=$;_.delay=isNaN(D)?300:D;var B=_.delayHide.bind(_),F=_.clearDelay.bind(_);A.event.addEvent(E,C,_.show.bind(_));A.event.addEvent(E,"mouseout",B);A.event.addEvent(E,"mouseover",F);A.event.addEvent($,"mouseover",F);A.event.addEvent($,"mouseout",B)};A.ui.PopupLayer.prototype={show:function(){A.style.addCss(this._content,"display:block;");this.onShow&&this.onShow()},hide:function(){A.style.addCss(this._content,"display:none;");this.onHide&&this.onHide()},delayHide:function(){if(this._timerId===B)this._timerId=setTimeout(this.hide.bind(this),this.delay)},clearDelay:function(){if(this._timerId!==B){clearTimeout(this._timerId);this._timerId=B}}};var C={left:function(_){var $=this;$._wrapper.scrollLeft+=_;if($._copy.offsetWidth-$._wrapper.scrollLeft<=0)$._wrapper.scrollLeft-=$._body.offsetWidth},right:function(_){var $=this,A;if($._wrapper.scrollLeft<=0)$._wrapper.scrollLeft+=$._body.offsetWidth;A=$._wrapper.scrollLeft-_;$._wrapper.scrollLeft=A<0?$._body.offsetWidth+A:A},top:function(_){var $=this;$._wrapper.scrollTop+=_;if($._copy.offsetHeight-$._wrapper.scrollTop<=0)$._wrapper.scrollTop-=$._body.offsetHeight},bottom:function(_){var $=this,A;if($._wrapper.scrollTop<=0)$._wrapper.scrollTop+=$._body.offsetHeight;A=$._wrapper.scrollTop-_;$._wrapper.scrollTop=A<0?$._body.offsetHeight+A:A}};A.ui.Marquee=function($,A,B,C){if(!arguments.length)return;var _=this;_.constructor=arguments.callee;_._body=$;_._wrapper=$.parentNode;_._copy=document.createElement($.tagName);_._copy.className=$.className;_._copy.innerHTML=$.innerHTML;_._wrapper.appendChild(_._copy);_._wrapper=_._wrapper.parentNode;A=A?A.toLowerCase():"left";_.setDirection(A);_.fps=isNaN(B)?15:B;_.lpf=isNaN(C)?1:C;_._timerIds=[]};A.ui.Marquee.prototype={setDirection:function($){this.move=C[$];if(!this.move)throw"not such direction"},_scroll:function(A){var $=this,_=$.lpf;if(!$._isPause)if(A.length!==0){if(A.length>0){_=Math.min(A.length,_);A.length-=_}$.move(_)}else{$.stop();A.callback&&A.callback()}},start:function(){var $=this;if(0===$._timerIds.length){var E,C,D,_=arguments;switch(typeof _[0]){case"number":E=_[0];if("string"===typeof _[1]){C=_[1];D=_[2]}else D=_[1];break;case"string":C=_[0];E=_[1];D=_[2];break}C&&$.setDirection(C);var F={length:isNaN(E)?-1:parseInt(E)};if(F.length>0)F.callback=A.util.isFunction(D)?D:B;$._currentScroll=$._scroll.bind($,F);$._timerIds.push(setInterval($._currentScroll,$.fps))}},stop:function(){var $=this;while($._timerIds.length)clearInterval($._timerIds.pop());$._currentScroll=B},speedUp:function(){var $=this;$._timerIds.length&&$._timerIds.push(setInterval($._currentScroll,$.fps))},slowDown:function(){this._timerIds.length>1&&clearInterval(this._timerIds.pop())},go:function(){this._isPause=false},stay:function(){this._isPause=true}};var $=[31,28,31,30,31,30,31,31,30,31,30,31];A.ui.Calendar=function(_,$){this.constructor=arguments.callee;this.setDate(_,$)};A.ui.Calendar.prototype={getYear:function(){return this._year},getMonth:function(){return this._month+1},setDate:function(A,_){var $=new Date();this._year=isNaN(A)?$.getFullYear():A;this._month=isNaN(_)?$.getMonth():_-1},build:function(){var E=NTES.ui.Calendar.getDayCount(this._year,this._month+1),A=new Date(this._year,this._month,1),_=new Date(),$=A.getDay(),C={year:this._year,month:this._month+1,weeks:[]},G,B,D,F=[];_.setHours(0,0,0,0);_=_.getTime();while($-->0)F.push({value:""});for(G=1;G<=E;G++){A.setDate(G);D=A.getTime();if(D>_)B=1;else if(D<_)B=-1;else B=0;F.push({value:G,state:B});if(F.length===7){C.weeks.push(F);F=[]}}if(F.length%7!==0){while(F.length<7)F.push({value:""});C.weeks.push(F)}return C}};A.ui.Calendar.getDayCount=function(A,_){return 2==_?(0==A%4&&0!=A%100||0==A%400?29:28):$[_-1]}})(window)