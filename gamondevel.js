
/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = classie;
} else {
  // browser global
  window.classie = classie;
}

})( window );


/***
 * Gamon Devel
 * Author: Erwin Yusrizal
 */

(function(window){
	var data = {};

	function _escape(str){
		return str.toString()
				.replace(/[\t]/g, '    ')
	            .split('&').join('&amp;')
	            .split('<').join('&lt;')
	            .split('>').join('&gt;')
	            .split('"').join('&quot;')
	            .split('\'').join('&#039;');
	}

	function _isArray(obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]';
	};

	function _isObject(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	};

	function _extend(target, options){
	    target = target || {};
	    for (var prop in options) {
	        if (typeof options[prop] === 'object') {
	            target[prop] = _extend(target[prop], options[prop]);
	        } else {
	            target[prop] = options[prop];
	        }
	    }
	    return target;
	}

	function _hasElementArray(a, b) {
	    for(var i = 0, len = a.length; i < len; i ++) {
	        if(a[i] == b) return true;
	    }
	    return false;
	}

	function _find(elm, selector) {
	    while ((elm = elm.parentElement) && !elm.classList.contains(selector));
    	return elm;
	}

	function develStyle(options){
		var css = '.gamon-devel{padding-bottom:10px;display:table;color:#999;background-color:#232323}.gamon-devel h1{color:#fff;padding:10px;margin:0;border-bottom:1px solid #333}.gamon-devel ul.devel:first-child{border-top:1px solid #111}ul.devel li ul{display:none}ul.devel,ul.devel ul{margin:0;list-style:none;padding-left:0}ul.devel{position:relative;top:0;left:0;z-index:99;font-size:12px;font-family:arial,helvetica,sans-serif;padding:10px;text-decoration:none;display:table;font-weight:700}ul.devel ul{position:relative;margin-left:5em}ul.devel > li{padding:0 10px;margin:0}ul.devel > li > span{font-size:14px;background:#c26230;padding:5px 10px;border-radius:3px;color:#fff;display:inline-block}ul.devel-item > li > span{background:#4ba614;padding:5px 10px;border-radius:3px;text-shadow:none;color:#fff}ul.devel ul ul{margin-left:.5em}ul.devel ul:before{content:"";display:block;width:0;position:absolute;top:0;bottom:0;left:0;border-left:1px solid #bc9458}ul.devel li ul li{margin:0;padding:0 1.5em;line-height:2.5em;font-weight:700;position:relative}ul.devel ul li:before{content:"";display:block;width:10px;height:0;border-top:1px solid #bc9458;margin-top:2px;position:absolute;top:1em;left:0}ul.devel ul li:last-child:before{background:#232323;height:auto;top:1em;bottom:0}ul.devel li ul li span.prop{background:#CC045A;border-radius:2px 0 0 2px;padding:3px 5px;color:#fff}ul.devel li ul li span.value{background:#bc9458;color:#fff;padding:3px 5px;border-radius:0 2px 2px 0}ul.devel li ul li span.func{background:#815ba4;color:#fff;padding:3px 5px;border-radius:0 2px 2px 0}ul.devel li pre{background:#2d2d2d;display:table;padding:10px;color:#fff}ul.devel li.hasChild > span.clickable{cursor:pointer}ul.devel li.show > ul{display:block}span.th-list{background:#333;display:inline-block;float:left;height:11px;margin-left:10px;margin-right:10px;width:22px;padding:8px!important;cursor:pointer}span.th-list .bar{display:block;height:2px;background:#ddd;margin-bottom:3px}',
			style = document.createElement('style'),
			head = document.getElementsByTagName('head')[0];
		style.innerHTML = css;
		head.appendChild(style);

		var bodyInner = document.body;

		document.body.innerHTML = '<div class="gamon-devel"></div>' + bodyInner.innerHTML;
	    
	}

	function generateHTML(obj, level, options){

		level = level || 0;

		var output = '',
			expandAll = options.expandAll ? ' show' : '',
			expandButton = '',
			clickable = options.expandAll ? '' : 'clickable';

		if(level == 0){
			if(options.showTitle){
				output = '<h1>'+options.title+'</h1><ul class="devel">';
			}else{
				output = '<ul class="devel">';
			}
			
		}

		for(var i in obj){		

			if(typeof obj[i] == 'function'){

				output += '<li class="hasChild'+expandAll+'">' +
	                '<span class="func clickable">' + i + ': </span><span class="value">function()</span><ul class="devel-item"><li><pre>'+_escape(obj[i])+'</pre></li></ul></li>';

			}else if ( typeof obj[i] == 'string' || typeof obj[i] == "boolean" || typeof obj[i] == "number") {

				var value = (typeof obj[i] == "boolean" || typeof obj[i] == "number") ? obj[i].toString() : obj[i];

	            output += '<li>' +
	                '<span class="prop">' + i + ': </span><span class="value">' + value + '</span></li>';
	        } else {

	        	if(_isArray(obj[i])){
	        		type = "[ " + obj[i].length + " ]";
	        	}else{
	        		type = "{ " + Object.keys(obj[i]).length + " }";
	        	}

	        	if(level == 0 && options.expandButton){
	        		expandButton = '<span class="expandAll th-list"><i class="bar"></i><i class="bar"></i><i class="bar"></i></span>';
	        	}

	        	output += '<li class="hasChild'+expandAll+'">' + expandButton + 
	                '<span class="'+clickable+'">' + i + ' ' + type  + '</span><ul class="devel-item">' + generateHTML( obj[i], level + 1, options) + '</ul></li>';	            
	        }
		}

		if ( level == 0 ) {
	        output += '</ul>';
	    }

		return output;
	}

	function generatePre(obj, level, options){
	    if ( typeof level == "undefined" ) {
	        level = 0;
	    }

	    var str = '';

	    if ( level == 0 ) {
	        str = '<pre>';
	    }

	    var levelStr = '';
	    for ( var x = 0; x < level; x++ ) {
	        levelStr += '    ';
	    }

	    for ( var i in obj ) {

	    	if(typeof obj[i] == 'function'){

				str += levelStr +
	                i + ': ' + _escape(obj[i]) + ' </br>';

			}else if( typeof obj[i] == "boolean" || typeof obj[i] == "number") {

				var value = (typeof obj[i] == "boolean" || typeof obj[i] == "number") ? obj[i].toString() : obj[i];

	            str += levelStr +
	                i + ': ' + value + ' </br>';

	        }else if( typeof obj[i] == 'string' ) {	        	
	            str += levelStr +
	                i + ': "' + obj[i] + '" </br>';
	        }else{

	        	if(_isArray(obj[i])){
	        		str += levelStr +
	                i + ': { </br>' + generatePre( obj[i], level + 1, options ) + levelStr + '}</br>';
	        	}else{
	        		str += levelStr +
	                i + ': { </br>' + generatePre( obj[i], level + 1, options ) + levelStr + '}</br>';
	        	}	            
	        }
	    }

	    if ( level == 0 ) {
	        str += '</pre>';
	    }
	    return str;
	}

	function initEvents(){
		var expandItem = document.body.querySelectorAll(".clickable"),
        	expandable = document.body.querySelectorAll(".expandAll");

        [].slice.call(expandItem).forEach(function(item, index){

        	item.addEventListener("click", function(e){
	        	e.preventDefault();
	        	e.stopPropagation();

	        	var parent = item.parentNode;

	        	if(classie.has(parent, 'show')){
	        		classie.remove(parent, 'show');
	        	}else{
	        		classie.add(parent, 'show');
	        	}		        	

	        	return false;
	        });
        });

        [].slice.call(expandable).forEach(function(item, index){

        	item.addEventListener("click", function(e){
	        	e.preventDefault();
	        	e.stopPropagation();

	        	var childs = item.parentNode.querySelectorAll(".hasChild");
	        	
	        	if(classie.has(item.parentNode, 'all')){
	        		[].slice.call(childs).forEach(function(child, idx){
	        			classie.remove(child, 'show');
	        		});
	        		classie.remove(item.parentNode, 'show');
	        		classie.remove(item.parentNode, 'all');
	        	}else{
	        		[].slice.call(childs).forEach(function(child, idx){
	        			classie.add(child, 'show');
	        		});
	        		classie.add(item.parentNode, 'show');
	        		classie.add(item.parentNode, 'all');
	        	}
	        	return false;
	        });
        });
	}


	function devel(options){
		var defaults = {
			title: 'Gamon Devel',
			expandAll: false,
			expandButton: true,
			showTitle: true,
			usePre: false
		};
		
		this.options = options ? _extend(defaults, options) : defaults;		

		if(!(this instanceof devel)) return new devel(options);

		this.outputs = [];

		if(Object.keys(data).length == 0 && !this.options.usePre) develStyle(this.options);

	}

	devel.prototype.output = function(name, output){
		if(typeof name != "string"){
			throw new Error('Output name required!');
		}		

		output = output || {};

		if(name in this.outputs){
			this.outputs[name].push(output);
		}else{
			this.outputs[name] = output;
		}			

		data = this.outputs;
		
		return this;
	};

	devel.prototype.done = function(){

		if(!this.options.usePre){
			var o = generateHTML(data, 0, this.options),
			 	container = document.body.querySelector('.gamon-devel');
	        container.innerHTML += o;	
			initEvents();
		}else{
			var o = generatePre(data, 0, this.options);
			return o;
		}		
	};

	if ( typeof define === 'function' && define.amd ) {
	  define( devel );
	} else if ( typeof exports === 'object' ) {
	  module.exports = devel;
	}else{
		window.devel = devel;
	}	

})(window);