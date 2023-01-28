

for(var i = 0; i<document.querySelectorAll(".drum").length; i ++){
    
    document.querySelectorAll(".drum")[i].addEventListener("click", function(){
        
        var buttonInnerHtml = this.innerHTML;
        playSound(buttonInnerHtml)
        playButtonAnimation(buttonInnerHtml)
    })
}

document.addEventListener("keydown", function (event) {
    playSound(event.key)
    playButtonAnimation(event.key)
});

function playSound(key){
    switch (key) {
        case "w":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("sounds/tom-2.mp3")
            audio.play()
            break;
        case "s":
            var audio = new Audio("sounds/tom-3.mp3")
            audio.play()
            break;
        case "d":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;
        default:
            break;
    }
}

function playButtonAnimation(key){
    var button = document.querySelector("." + key)

    button.classList.add("pressed")

    setTimeout(function () {
        button.classList.remove("pressed")
    }, 100)
}