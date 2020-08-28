var bgImg,database,dog,dogHappy,foodST,foodStock,food,milkObject,feed,add;

function preload(){
    bgImg=loadImage("bg1.jpg");
    happyDogImg=loadImage("happydog.png")
    dogImg=loadImage("Dog.png");
}



function setup(){
   //  database=firebase.databse();
    database = firebase.database();
    createCanvas(3000,1800)

    dog=createSprite(2100,1350);
    dog.scale=0.8;
    dog.addImage(dogImg)
    foodStock=database.ref('food');
    foodStock.on("value",readStock,showError)

    var input=createInput('Pet name');
    var button=createButton('Start');

    input.position(2100,700)
    button.position(2200,750)
  //button{font-size: 100px;}
    milkObject=new Food();
    button.mousePressed(function(){
        input.hide();
        button.hide();
         var Dogname=input.value();

        feed=createButton("FEED THE "+Dogname);
        feed.position(2000,700);
        add=createButton("ADD FOOD");
       add.position(2200,700);
        feed.mousePressed(FeedDog)


    })
   
   var  fedTime=database.ref('FeedTime');
   fedTime.on("value",function(data){
    lastFed=data.val();
   })

}
function draw(){
    background(bgImg);
    drawSprites();
    textSize(60);
    textFont("Arial Black");
    fill(46, 139, 87);
     text("PRESS UP ARROW TO FEED MILK TO DOG",1000,150);
    fill("red");
    text("FOOD REMAINING:"+foodST,1400,950);
    milkObject.display();


   
   /* if(foodST!=undefined){
    if(keyWentDown(UP_ARROW)){
        writeStock(foodST);
      

        }
    }*/
}

function readStock(data){
    foodST=data.val();
}

function writeStock(x){

    if(x<=0){
        x=0
    }else{
        x=x-1;
    }
    database.ref('/').update({
    food:x
})
}
function showError(){
    console.log("Error in writing the database")
}

function FeedDog(){
      dog.addImage(happyDogImg);
      milkObject.updateFoodStock(milkObject.getFoodStock()-1)
      database.ref('/').update({
        food:milkObject.getFoodStock(),
        FeedTime:hour()
      })
}