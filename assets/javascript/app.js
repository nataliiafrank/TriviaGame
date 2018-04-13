var trivia = {
    myQuestions: [
        {
            question: "To get over Richard, what did Monica start making?",
            answers: {
                a: "Marmalade",
                b: "Pancakes",
                c: "Candy",
                d: "Jam",
            },
            correctAnswer: "Jam",
        },
        {
            question: "What was the name of the self help book that the girls loved?",
            answers: {
                a: "Be Your Own Wind Keeper",
                b: "Be Your Own Lightning Bearer",
                c: "Be Your Own Cleansing Pool",
                d: "Be Your Own Person",
            },
            correctAnswer: "Be Your Own Wind Keeper",
        },
        {
            question: "Where was the 'Aroma' room?",
            answers: {
                a: "Monica's dollhouse",
                b: "Phoebe's dollhouse",
                c: "Monica's apartment",
                d: "Phoebe's apartment",
            },
            correctAnswer: "Phoebe's dollhouse",
        },
        {
            question: "What was wrong with the couch Ross returned to the store?",
            answers: {
                a: "The color was wrong",
                b: "It had a stain",
                c: "It was cut in half",
                d: "It was torn",
            },
            correctAnswer: "It was cut in half",
        },
        {
            question: "Who was 'The Holiday Armadillo'?",
            answers: {
                a: "Chandler",
                b: "Joey",
                c: "Ross",
                d: "Richard",
            },
            correctAnswer: "Ross",
        },
        {
            question: "What type of animal is 'Hugsy'?",
            answers: {
                a: "Dog",
                b: "Tiger",
                c: "Bear",
                d: "Pinguin",
            },
            correctAnswer: "Pinguin",
        },
        {
            question: "What was Phoebe in charge of at Rachel's surprise party?",
            answers: {
                a: "Cups and food",
                b: "Ice and food",
                c: "Balloons and ice",
                d: "Cups and ice",
            },
            correctAnswer: "Cups and ice",
        },
        {
            question: "Where is Chandler forced to work after falling asleep in a meeting?",
            answers: {
                a: "Frankfort, Kentucky",
                b: "Paris, France",
                c: "Tulsa, Oklahoma",
                d: "Sandwich, Illinois",
            },
            correctAnswer: "Tulsa, Oklahoma",
        },
        {
            question: "What does Chandler do to prove he's sorry to Joey after kissing Cathy, Joey's girlfriend?",
            answers: {
                a: "Sit in the box",
                b: "Kiss Rachel",
                c: "Cleans an apartment",
                d: "Dance naked",
            },
            correctAnswer: "Sit in the box",
        },
        {
            question: "Who did Phoebe think would have very hairy children?",
            answers: {
                a: "Chandler and Monica",
                b: "Chandler and Janice",
                c: "Janice and Ross",
                d: "Joey and Monica",
            },
            correctAnswer: "Janice and Ross",
        }
    ],

    currentQuestion: 0,
    
    startScreen: function(){
       $("#start-button").click(function(){
            $('.start-screen').remove();
            $(".questions-screen").removeClass("hide");
            trivia.render(trivia.myQuestions[trivia.currentQuestion]);
            trivia.timeRemaining();
            trivia.OutOfTime();
            trivia.gameStart();
       }) 
    },

    render: function(currentQuestion){
        $(".questions-screen").addClass("visible");
        $(".question").text(currentQuestion.question);
        $(".a").text(currentQuestion.answers.a);
        $(".b").text(currentQuestion.answers.b);
        $(".c").text(currentQuestion.answers.c);
        $(".d").text(currentQuestion.answers.d);
    },

    clickHandler: function(){
        $(".answer").click(function(event){
            if($(event.currentTarget).text() === this.myQuestions[this.currentQuestion].correctAnswer){
                $(".questions-screen").removeClass("visible");
                $(".status").text("CORRECT! YOU GOT IT!");
                $(".gif").html('<img src="assets/images/win.gif">');
                $(".status, .gif").addClass("visible");
            }
            else{
                $(".status").text("NOPE! NOT THIS TIME!");
                $(".correct-a").text("Correct answer is: " + this.myQuestions[this.currentQuestion].correctAnswer);
                $(".gif").html('<img src="assets/images/loose.gif">');
                $(".status, .correct-a, .gif").addClass("visible");
            };

            this.currentQuestion +=1;
        }.bind(this));
    },

    countDown: 10,

    OutOfTime: function(){
        setTimeout(function(){
            $(".status").text("You've run out of time");
            $(".correct-a").text("Correct answer is: " + this.myQuestions[this.currentQuestion]); 
            $(".gif").html('<img src="assets/images/out-of-time.gif">');
        }.bind(this), 1000 * this.countDown)
    },

    timeRemaining: function(){
        this.countDown -= 1;
        console.log(this.countDown)
        $(".timer").text("Time Remaining: " + this.countDown + " seconds");
    }.bind(this),

    interval: function(){
        setInterval(this.timeRemaining(), 1000)
    },
    
    gameStart: function(){
        this.render(this.myQuestions[this.currentQuestion]);
        this.clickHandler();  
    },
                                                                                                                                                                                                                                                                                                                                                                    
}

trivia.startScreen();

                    
    