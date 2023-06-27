$(function (){
    const btn = document.querySelector('.header__btn')
const btnClose = document.querySelector('.rightside-menu')
const btnClose2 = document.querySelector('.rightside-menu__close')
btn.addEventListener('click', () =>{
    setTimeout(() =>{
        btnClose.classList.remove('rightside-menu--close');
    }, 100)
})
btnClose2.addEventListener('click', () =>{
    btnClose.classList.add('rightside-menu--close')
})
    $('.top__slider').slick({
        dots:true,
        arrows:false,
        fade:true,
        //slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    })
    let mixer = mixitup('.gallery__inner', {
        load:{
            filter:'.living'
        }
    })
})