$(function(){

    var posts = document.querySelector('ul.review__posts');
    var items = document.querySelector('ul.review__items');
    

   for(var i = 0; i < items.children.length; i++){
       items.children[i].addEventListener('click', function(e){
            this.classList.toggle("active");
       })
   }
})