$(document).ready(function(){
    $(".fas.fa-bars").click(function(){
        if(document.getElementById("navbarCollapse").style.display == 'none'){
            document.getElementById("navbarCollapse").style.display = 'block'
        } else{
            document.getElementById("navbarCollapse").style.display = 'none'
        }
    });
})