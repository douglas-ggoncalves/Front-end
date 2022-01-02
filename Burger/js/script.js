
$(document).ready(function(){
    $(".fas.fa-bars").click(function(){
        if(document.getElementById("navbar").style.display == 'block'){
            document.getElementById("navbar").style.display = 'none'
        } else{
            document.getElementById("navbar").style.display = 'block'
        }
    });
})