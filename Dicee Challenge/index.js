number1 = 1 + Math.floor(Math.random() * 6);
number2 = 1 + Math.floor(Math.random() * 6);

var dice_image1 = "images/dice" + number1 +".png"
var dice_image2 = "images/dice" + number2 +".png"
document.querySelector(".img1").src = dice_image1
document.querySelector(".img2").src = dice_image2

if (number1 > number2){
    document.querySelector(".container h1").innerHTML = "Player1 Wins"
}else if (number2 > number1){
    document.querySelector(".container h1").innerHTML = "Player2 Wins"
}else{


    document.querySelector(".container h1").innerHTML = "Ties"
}