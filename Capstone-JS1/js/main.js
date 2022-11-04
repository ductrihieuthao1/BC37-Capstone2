

 showHeaderTop = (id1, id2) => {
    let rotateI = document.getElementById(id2);
    rotateI.style.transition = 'all .5s'
    rotateI.style.transform = rotateI.style.transform === 'rotate(0deg)' ? 'rotate(180deg)' : 'rotate(0deg)';
    // rotateI.style.transform = rotateI.style.transform === 'rotate(0)' ? 'rotate(180deg)' : 'rotate(0)'
    let tagName = document.getElementById(id1);
    tagName.style.opacity = tagName.style.opacity === '0' ? '1' : '0';
    tagName.style.top = tagName.style.top === '-300%' ? '38px' : '-300%';  
 }

 // OWL CAROUSEL
 $('.banner-carousel').owlCarousel({
    rewind:true,    
   margin: 10,
   responsiveClass: true,
   dots: false,
   autoplay: true,
   autoplayHoverPause: true,
   responsive: {
       0: {
           items: 1,
           nav: true
       },
       600: {
           items: 1,
           nav: true
       },
       1000: {
           items: 1,
           nav: true,
       }
   }
})

// product carousel

$('.product-carousel').owlCarousel({
    rewind:true,
    margin:10,
    nav:true,
    dots: false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3,
            rows: 2
        },
        1000:{
            items:4,
            rows: 2
        }
    }
})





$('.blog-carousel').owlCarousel({
    rewind:true,
    margin:10,
    nav:true,
    dots: false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2,
            rows: 2
        },
        1000:{
            items:3,
            rows: 2
        }
    }
})

function countItems() {
    var index = 0;
    var number = 0;
    var quanti1 = document.getElementById("quantity_number1").value;
    var quanti2 = document.getElementById("quantity_number2").value;
    var quanti3 = document.getElementById("quantity_number3").value;
    var sum = Number(quanti1) + Number(quanti2) + Number(quanti3);
    
    index = sum;
    number = document.getElementById("numCart").innerHTML = index;
}
