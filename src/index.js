import './style.scss';

window.showHamburgerMenu = function() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
} 

window.chooseColor = function(){
    var mycolor = document.getElementById("myColor").value;
    document.execCommand('foreColor', false, mycolor);
}

window.changeFont = function(){
  var myFont = document.getElementById("input-font").value;
  document.execCommand('fontName', false, myFont);
  setEditorFocus();
}

window.changeSize = function(){
  var mysize = document.getElementById("fontSize").value;
  document.execCommand('fontSize', false, mysize);
  setEditorFocus();
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

window.onload = function() {
	setEditorFocus();
}

console.log("[-] Initialized word processor successfully!");