"use strict";var showModal=function(e){document.getElementById(e).style.display="block"},hideModal=function(e){document.getElementById(e).style.display="none"},openTab=function(e,t){var n,l,a;for(l=document.getElementsByClassName("tabcontent"),n=0;n<l.length;n++)l[n].style.display="none";for(a=document.getElementsByClassName("tablinks"),n=0;n<a.length;n++)a[n].className=a[n].className.replace(" active","");document.getElementById(t).style.display="block",e.currentTarget.className+=" active"};