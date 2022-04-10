
var largura;

if(largura == undefined){
    largura = window.innerWidth;
    console.log(largura)
    if(largura < 768) {
        var swiper = new Swiper(".mySwiper", {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            //freeMode: true,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            }
        });
    }
    if(largura > 768 && largura < 992){
        var swiper = new Swiper(".mySwiper", {
            loop: true,
            slidesPerView: 2,
            spaceBetween: 30,
            //freeMode: true,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            }
        });
    }
    if(largura > 992){
        var swiper = new Swiper(".mySwiper", {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 30,
            //freeMode: true,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            }
        });
    }   
}


window.addEventListener("resize", () => {
    largura = window.innerWidth;
    
    if(largura < 768) {
        var swiper = new Swiper(".mySwiper", {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            //freeMode: true,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            }
        });
    }
    if(largura > 768 && largura < 992){
        var swiper = new Swiper(".mySwiper", {
            loop: true,
            slidesPerView: 2,
            spaceBetween: 30,
            //freeMode: true,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            }
        });
    }
    if(largura > 992){
        var swiper = new Swiper(".mySwiper", {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 30,
            //freeMode: true,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            }
        });
    }
  });