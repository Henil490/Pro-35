//Create variables here
var dog,dogImg1,dogImg2;
var foodS,foodStock
var database;
var feed,addFood;
var fedTime,lastFed;
var foodObj;
function preload()
{
	//load images here
  dogImg1=loadImage("images/dogImg1.png");
  dogImg2=loadImage("images/dogImg2.png");
  milkimg=loadImage("Milk.png");
}

function setup() {
  database=firebase.database();
	createCanvas(600, 600);
  foodObj=new Food();
  
  dog=createSprite(250,300,50,150);
  dog.addImage(dogImg1)
 dog.scale=0.25;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}


function draw() {  
background(46,139,87);
drawSprites();
foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
lastFed=data.val();
fill("white")
textSize(20)
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 200,90);
 }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + " AM", 200,90);
 }
})

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogImg2)
  milk=createSprite(130,320,10,10);
  milk.addImage(milkimg);
  milk.scale=0.05;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
FeedTime:hour()
})

}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

  }



