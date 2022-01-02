
$(document).ready(function () {
    $(".fas.fa-bars").click(function () {
        if (document.getElementById("navbar").style.display == 'block') {
            document.getElementById("navbar").style.display = 'none'
            document.getElementsByClassName("hamburguerIconNav")[0].classList.replace('fa-times', 'fa-bars');
            document.getElementsByClassName("hamburguerIconNav")[0].classList.add("animatedRight");
        } else {
            document.getElementById("navbar").style.display = 'block'
            document.getElementsByClassName("hamburguerIconNav")[0].classList.replace('fa-bars', 'fa-times');
            document.getElementsByClassName("hamburguerIconNav")[0].classList.add("animatedLeft");
        }
    });

    $(".searchIconNav").click(function () {
        if (document.getElementById("divInput").style.display == 'flex') {
            document.getElementById("divInput").style.display = 'none'
            if (window.innerWidth < 992) {
                document.getElementsByClassName("searchIconNav")[1].classList.replace('fa-times', 'fa-search');
                document.getElementsByClassName("searchIconNav")[1].classList.add("animatedRight");
            }

            if (window.innerWidth >= 992){
                document.getElementsByClassName("searchIconNav")[0].classList.replace('fa-times', 'fa-search');
                document.getElementsByClassName("searchIconNav")[0].classList.add("animatedRight");
            }

        } else {
            document.getElementById("divInput").style.display = 'flex'

            if (window.innerWidth < 992) {
                document.getElementsByClassName("searchIconNav")[1].classList.replace('fa-search', 'fa-times');
                document.getElementsByClassName("searchIconNav")[1].classList.add("animatedLeft");
            }

            if (window.innerWidth >= 992){
                document.getElementsByClassName("searchIconNav")[0].classList.replace('fa-search', 'fa-times');
                document.getElementsByClassName("searchIconNav")[0].classList.add("animatedLeft");
            }
        }
    });

    $('.searchIconNav').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $(this).removeClass("animatedLeft");
        $(this).removeClass("animatedRight");
    });

    $('.hamburguerIconNav').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $(this).removeClass("animatedLeft");
        $(this).removeClass("animatedRight");
    });


})

