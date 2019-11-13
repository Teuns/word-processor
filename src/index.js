import './style.scss';
import mammoth from '../node_modules/mammoth/mammoth.browser.js';

if ('serviceWorker' in navigator) {
  	window.addEventListener('load', () => {
	    navigator.serviceWorker.register('service-worker.js').then(registration => {
	       console.log('SW registered: ', registration);
	    }).catch(registrationError => {
	       console.log('SW registration failed: ', registrationError);
	    });
   });
}

window.showHamburgerMenu = function() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
} 

window.chooseColor = function() {
    var mycolor = document.getElementById("myColor").value;
    document.execCommand('foreColor', false, mycolor);
}

window.changeFont = function() {
  var myFont = document.getElementById("input-font").value;
  document.execCommand('fontName', false, myFont);
  setEditorFocus();
}

window.changeSize = function() {
  var mysize = document.getElementById("fontSize").value;
  document.execCommand('fontSize', false, mysize);
  setEditorFocus();
}

window.openDocx = function(event) {
	mammoth.convertToHtml({arrayBuffer: event.target.result})
    .then(function(result){
        var html = result.value;
        var div = document.querySelector("page .document"); 
        div.innerHTML = html;
    })
    .done();
}

window.onChooseFile = function(event, onLoadFileHandler) {
    if (typeof window.FileReader !== 'function')
        throw ("The file API isn't supported on this browser.");
    let input = event.target;
    if (!input)
        throw ("The browser does not properly implement the event object");
    if (!input.files)
        throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
        return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = onLoadFileHandler;
    fr.readAsArrayBuffer(file);
}

window.onkeydown = function (e) {
	var ul = document.createElement("ul");
	var ol = document.createElement("ol");
	var li_button = document.getElementById("list");
	var ol_button = document.getElementById("ol-list");
	
	if(getSelectionStart().parentNode.nodeName === ul.nodeName) {
		if (li_button.className !== 'button-active')
			li_button.classList.toggle('button-active');
	} else {
		li_button.classList.remove('button-active');
	}

	if(getSelectionStart().parentNode.nodeName === ol.nodeName) {
		if (ol_button.className !== 'button-active')
			ol_button.classList.toggle('button-active');
	} else {
		ol_button.classList.remove('button-active');
	}
}

function getSelectionStart() {
   var node = document.getSelection().anchorNode;
   return (node.nodeType == 3 ? node.parentNode : node);
}

var buttons = document.querySelectorAll("button");  

Array.prototype.forEach.call(buttons, function (button) {
  button.addEventListener('click', function (event) {
    button.classList.toggle('button-active')
  });
});

window.setEditorFocus = function() {
	var div = document.querySelector("page .document"); 
	setTimeout(function() {
	    div.focus();
	}, 0);
}

window.showCtxMenu = function() {
	var x = event.clientX; 
    var y = event.clientY; 

	var div = document.getElementById("context-menu");
	
	div.style.top = y + 'px';
    div.style.left = x + 'px';

	div.style.display = "block";
}

window.hideCtxMenu = function() {
	var div = document.getElementById("context-menu");

	div.style.display = "none";
}

var editorElement = document.querySelector("page .document"); 

editorElement.addEventListener('click', function() {
	var div = document.getElementById("context-menu");
	div.style.display = "none";
}, false);

window.onload = function() {
	setEditorFocus();
	document.execCommand('enableObjectResizing', false, "true");
}

console.log("[-] Initialized word processor successfully!");