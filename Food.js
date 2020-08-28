class Food{
	constructor(){
		this.foodStock=0
		this.image=loadImage("Milk.png");
	}

updateFoodStock(){
	this.foodStock=foodStock;

}
getFoodStock(){
	return this.foodStock;
}
deductFood(){
	if(this.foodStock>0){
		this.foodStock=this.foodStock-1
	}
}
display(){
	var x=200,y=150;
	imageMode(CENTER)
	image(this.image,720,400,30,30);
if(this.foodStock!=0){
	for(var i=0;i<this.foodStock;i++){
		if(i%10==0){
			x=200;
			y=y+40;
		}
		image(this.image,x,y,30,30);
		x=x+30
	}

}


}
}