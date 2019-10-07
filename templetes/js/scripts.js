$(function(){
   //highligt current nav
    $("#home a:contains('Home')").parent().addClass("active");
           //make menus drop on hover
     $("ul.nav li.dropdown-toggle").hover(function(){
         
         $("ul.dropdown-menu", this).fadeIn();
         
     }); //hover     
           
           
           
       });