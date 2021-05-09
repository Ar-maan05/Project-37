class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();

    background("pink");

    textSize(30);
    fill("black");
    text("Result of The Quiz", 300, 50);

    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
      fill("blue");
      textSize(20);
      text("*NOTE: contestant who answered correctly are highlighted in green colour", 130, 230);
      for(var plr in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer){
          fill("green");
          text(allContestants[plr].name + ": " + allContestants[plr].answer, 400, 300);
        }
        else{
          fill("red");
          text(allContestants[plr].name + ": " + allContestants[plr].answer, 400, 350);
        }
      }
    }
    
  }

}
