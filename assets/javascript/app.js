var trivia = {
    myQuestions: [{
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
    correct: 0,
    incorrect: 0,
    outTime: 0,

    startScreen: function () {
        $("#start-button").click(function () {
            $('.start-screen').remove();
            $(".questions-screen").removeClass("hide");
            this.gameStart();
            this.clickHandler();
        }.bind(this));
    },

    gameStart: function () {
        this.render(this.myQuestions[this.currentQuestion]);
        this.countDown();
    },

    render: function (currentQuestion) {
        $(".timer").text("Time Remaining: " + trivia.time + " seconds");
        $(".questions-screen, .question, .answers", ).attr("id", "visible");
        $(".question").text(currentQuestion.question);
        $(".a").text(currentQuestion.answers.a);
        $(".b").text(currentQuestion.answers.b);
        $(".c").text(currentQuestion.answers.c);
        $(".d").text(currentQuestion.answers.d);
    },

    clickHandler: function () {
        $(".answer").click(function (event) {
            if ($(event.currentTarget).text() === this.myQuestions[this.currentQuestion].correctAnswer) {
                $(".status").text("CORRECT! YOU GOT IT!");
                $(".gif").html('<img src="assets/images/win.gif">');
                $(".status, .gif").attr("id", "visible");
                $(".question, .answers").removeAttr("id");
                trivia.correct++;
            } else {
                $(".status").text("NOPE! NOT THIS TIME!");
                $(".correct-a").text("Correct answer is: " + this.myQuestions[this.currentQuestion].correctAnswer);
                $(".gif").html('<img src="assets/images/loose.gif">');
                $(".status, .correct-a, .gif").attr("id", "visible");
                $(".question, .answers").removeAttr("id");
                trivia.incorrect++;
            };
            trivia.currentQuestion += 1;
            clearInterval(trivia.intervalID);
            trivia.messageScreen();
        }.bind(this));
    },

    OutOfTime: function () {
        $(".status").text("You've run out of time");
        $(".correct-a").text("Correct answer is: " + this.myQuestions[this.currentQuestion].correctAnswer);
        $(".gif").html('<img src="assets/images/out-of-time.gif">');
        $(".status, .correct-a, .gif").attr("id", "visible");
        $(".question, .answers").removeAttr("id");
        trivia.currentQuestion += 1;
        trivia.outTime++;
        trivia.messageScreen();
    },

    messageScreen: function () {
        var treeSeconds = setTimeout(function () {
            if (trivia.currentQuestion === trivia.myQuestions.length) {
                trivia.finalscreen()
            } else {
                trivia.nextQuestion()
            }
        }, 3000);
    },

    nextQuestion: function () {
        $(".question, .answers").attr("id", "visible");
        $(".status, .correct-a, .gif").removeAttr("id");
        trivia.time = 15;
        trivia.countDown();
        this.render(this.myQuestions[this.currentQuestion]);
    },

    finalscreen: function () {
        $(".status, .correct-a, .gif").removeAttr("id");
        $(".correct").text(trivia.correct);
        $(".incorrect").text(trivia.incorrect);
        $(".outTime").text(trivia.outTime);
        $(".last-screen").attr("id", "visible");
        $(".start-over").click(function () {
            trivia.reset();
        });
    },

    time: 15,
    intervalID: 0,

    timeRemaining: function () {
        trivia.time -= 1;
        $(".timer").text("Time Remaining: " + trivia.time + " seconds");
        if (trivia.time <= 0) {
            trivia.OutOfTime();
            clearInterval(trivia.intervalID)
        }
    },

    countDown: function () {
        trivia.intervalID = setInterval(this.timeRemaining, 1000);
    },

    reset: function () {
        $(".last-screen").removeAttr("id");
        clearInterval(this.intervalID);
        this.time = 15;
        this.currentQuestion = 0;
        this.correct = 0;
        this.incorrect = 0;
        this.outTime = 0;
        trivia.gameStart();
    },
}

trivia.startScreen();