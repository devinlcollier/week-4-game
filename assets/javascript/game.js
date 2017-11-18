class Entity {
	constructor(sprite, name, health, baseAttack)
	{
		this.element = $("<div>");
		this.name = name;
		this.health = health;
		this.maxHealth = health;
		this.isPlayer = false;
		this.isDefender = false;
		this.baseAttack = baseAttack;
		this.attack = this.baseAttack;

		this.element.addClass("col-lg-1 entity");
		this.element.attr("data-name", this.name);

		this.element.append("<h2 class=\"entity-title\">" + health + "</h2>");

		var image = $("<img>");
		image.attr("src", sprite);
		image.attr("alt", name);
		image.addClass("img-responsive");
		this.element.append(image);

		this.element.append("<h2 class=\"entity-title\">" + name + "</h2>");
		this.click = this.click.bind(this);//bind click function to the class
		this.element.on("click", this.click);
	}

	click()
	{
		if(this.element.parent().attr("id") === "entities")
		{	
			this.isPlayer = true;
			game.startGame(this);
		}
		else if(this.element.parent().attr("id") === "enemies")
		{
			this.isDefender = true;
			game.setDefender(this);
		}
	}

	show(parent)
	{
		parent.append(this.element);
	}

	reset()
	{
		this.isPlayer = false;
		this.isDefender = false;
		this.attack = this.baseAttack;
		this.maxHealth = health;
	}
}

var game = {
	entities: [],
	player: null,
	defender: null,

	newGame: function(){
		for(var i = 0; i < game.entities.length; i++)
		{
			game.entities[i].show($("#entities"));
		}
	},

	startGame: function(Entity){
		$("#entities").empty();

		game.player = Entity;
		game.player.show($("#player"));

		for(var i = 0; i < game.entities.length; i++)
		{
			//game.entities[i].show($("#entities"));
		}
	},

	setDefender: function(element){

	},

	attack: function()
	{

	}
};

const path = "assets/images/";

window.onload = function(){
	game.entities.push(new Entity(path + "stormtrooper_star_wars-wide.jpg", "Stormtrooper", 40, 2));
	game.entities.push(new Entity(path + "BobaFettEAtlas.jpg", "Boba Fett", 90, 4));
	game.entities.push(new Entity(path + "HanSolo.jpg", "Han Solo", 110, 6));
	game.entities.push(new Entity(path + "vader.jpg", "Darth Vader", 200, 10));
	game.entities.push(new Entity(path + "Luke_Skywalker.jpg", "Luke Skywalker", 220, 11));

	game.newGame();

	$("#attack").on("click", game.attack);
}