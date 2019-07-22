$(function(){
    $('.command__item').click(function(){
        $(this).find('.command__desc').slideToggle(100);
        $(this).find('.command__profession').slideToggle(100);
    })
})