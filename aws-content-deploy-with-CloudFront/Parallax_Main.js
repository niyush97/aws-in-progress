const parallax = document.getElementById("parallax");
window.addEventListener('scroll',function(){
    let off = window.pageYOffset;
    parallax.style.backgroundPositionY= off*0.2 +"px";
})