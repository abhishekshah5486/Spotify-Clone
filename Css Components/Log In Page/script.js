let container = document.querySelector(".container");
let toggleBall = document.querySelector(".toggle-ball");
let isToggled = false;

container.addEventListener("click", function(){
    if (!isToggled) {
        
        toggleBall.classList.add("transition-toggle");
        container.classList.add("toggle-color");
        toggleBall.classList.remove("stretched");
        isToggled = true;
    }
    else {
        toggleBall.classList.remove("transition-toggle");
        container.classList.remove("toggle-color");
        toggleBall.classList.remove("stretched");
        // toggleBar.classList.add("transition-toggle-reverse");
        isToggled = false;
    }
})
toggleBall.addEventListener("mousedown",function(){
    toggleBall.classList.add("stretched");
})
// toggleBall.addEventListener("mouseup",function(){
//     toggleBall.classList.remove("stretched");
// })