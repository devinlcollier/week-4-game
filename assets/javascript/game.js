class Entity {
	constructor(sprite, name, health, baseAttack)
	{
		this.element = $("<div>");
		this.name = name;
		this.health = health;
		this.maxHealth = health;
		this.baseAttack = baseAttack;
		this.attack = this.baseAttack;

		this.element.addClass("col-lg-1 entity");
		this.element.attr("data-name", this.name);

		this.element.append("<h2 id=\"health\" class=\"entity-title\">" + health + "</h2>");

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
			game.startGame(this);
		}
		 if(this.element.parent().attr("id") === "enemies")
		{
			game.setDefender(this);
		}
	}

	show(parent)
	{
		parent.append(this.element);
	}

	update()
	{
		this.element.children("#health").text(this.health);
	}

	reset()
	{
		this.attack = this.baseAttack;
		this.health = this.maxHealth;
	}
}

var game = {
	entities: [],
	player: null,
	defender: null,
	enemies: 0,

	newGame: function(){
		for(var i = 0; i < game.entities.length; i++)
		{
			game.enemies = 0;
			game.player = null;
			game.defender = null;
			game.entities[i].reset();
			game.entities[i].update();
			game.entities[i].show($("#entities"));
		}
	},

	startGame: function(Entity){
		game.player = Entity;
		game.player.element.detach();
		game.player.show($("#player"));
		game.enemies = game.entities.length - 1;
		console.log(game.enemies);
		for(var i = 0; i < game.entities.length; i++)
		{
			if(game.entities[i] !== game.player)
			{
				game.entities[i].element.detach();
				game.entities[i].show($("#enemies"));
			}
		}
	},

	setDefender: function(Entity){
		if(game.defender === null)
		{
			game.defender = Entity;
			game.defender.element.detach();
			game.defender.show($("#defender"));
		}
	},

	attack: function()
	{
		if(game.player !== null && game.defender !== null)
		{
			game.defender.health -= game.player.attack;
			game.player.health -= game.defender.attack;

			$("#message1").text(game.player.name + " did " + game.player.attack + " damage to " + game.defender.name);
			$("#message2").text(game.defender.name + " did " + game.defender.attack + " damage to " + game.player.name);

			game.player.update();
			game.defender.update();

			game.player.attack += Math.round(game.player.baseAttack/2);

			if(game.defender.health <= 0)
			{
				game.defender.element.detach();
				game.defender = null;
				game.enemies--;
				if(game.enemies === 0)
				{
					$("#message1").text("You Won!");
					$("#message2").text("Play Again");
					setTimeout(function(){
					game.newGame();
					}, 2000);
				}
				console.log(game.enemies);
			}
			else if(game.player.health <= 0)
			{
				$("#message1").text("You Lost");
				$("#message2").text("Try Again");
				setTimeout(function(){
					game.newGame();
				}, 2000);
			}
		}
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