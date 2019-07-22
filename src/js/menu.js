$(function(){

    $('.menu__item').click(function(){
        $(this).siblings().find('.menu__desc').hide();
        $(this).find('.menu__desc').toggle(400);

    })
})