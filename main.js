// loads the game when the document is ready
$(document).ready(initializeGame);
// stores the new Game constructor
var game;

// this starts the game
function initializeGame(){
    game = new Game();
}

// creates a new Game instance
function Game(){
    this.imageArray = [
        "./images/card1.png",
        "./images/card2.png",
        "./images/card3.png",
        "./images/card4.png",
        "./images/card5.png",
        "./images/card6.png",
        "./images/card7.png",
        "./images/card8.png",
        "./images/card9.png",
        "./images/card1.png",
        "./images/card2.png",
        "./images/card3.png",
        "./images/card4.png",
        "./images/card5.png",
        "./images/card6.png",
        "./images/card7.png",
        "./images/card8.png",
        "./images/card9.png"
    ];
    this.first_card_clicked = null;
    this.second_card_clicked = null;
    this.match_counter = 0;
    this.total_possible_matches = 9;
    this.games_played = 0;
    this.attempts = 0 ;
    this.accuracy = 0;
    this.initialize = function(){
        this.shuffleCards();
        this.makeCardsOnDom();
        $('.card').on('click', this.card_clicked.bind(this));
        $('#reset').on('click', this.reset_button_clicked.bind(this));
    }
    this.shuffleCards = function(){
        for(var i = this.imageArray.length - 1; i > 0; i--){
            var randomCardIndex = Math.floor(Math.random() * (i + 1));
            var temp = this.imageArray[i];
            this.imageArray[i] = this.imageArray[randomCardIndex];
            this.imageArray[randomCardIndex] = temp;
        }
    }
    this.makeCardsOnDom = function(){
        for(var i = 0; i < this.imageArray.length; i++){
            var frontImage = $("<img>").attr("src", this.imageArray[i]);
            var frontDiv = $('<div>').addClass('front');
            frontDiv.append(frontImage);
        
            var backImage = $("<img>").attr("src", "images/cardback.png");
            var backDiv = $('<div>').addClass('back');
            backDiv.append(backImage);
        
            var cardDiv = $("<div>").addClass('card');
            cardDiv.append(frontDiv, backDiv);
        
            $('.game-area').append(cardDiv); 
        }
    }
    this.card_clicked = function(event){
        console.log("handle click ran")
        if(this.first_card_clicked !== null && this.second_card_clicked !== null) {
            return;
        }
        if($(event.currentTarget).hasClass('clicked')) {
            return;
        }
        $(event.currentTarget).find($('.back')).hide();
        if (this.first_card_clicked === null) {
            this.first_card_clicked = event.currentTarget;
            $(this.first_card_clicked).addClass('clicked');
            return;
        } else {
            this.attempts++;
            this.second_card_clicked = event.currentTarget;
            $(this.second_card_clicked).addClass('clicked');
            var first_card_image_source = $(this.first_card_clicked).find('.front > img').attr('src');
            var second_card_image_source = $(this.second_card_clicked).find('.front > img').attr('src');
            if (first_card_image_source === second_card_image_source) {
                this.match_counter++;
                this.first_card_clicked = null;
                this.second_card_clicked = null;
                if (this.match_counter === this.total_possible_matches) {
                    setTimeout(function() {
                        $('.modal').removeClass("hide");
                        $('.shadowBox').removeClass("hide");
                    },500);
                } 
            } else {
                setTimeout((function(){
                    $(this.first_card_clicked).find($('.back')).show();
                    $(this.second_card_clicked).find($('.back')).show();
                    $(this.first_card_clicked).removeClass('clicked');
                    $(this.second_card_clicked).removeClass('clicked');
                    this.first_card_clicked = null;
                    this.second_card_clicked = null;
                }).bind(this), 1500)
            }
        }
        this.display_stats();
    }
    this.toggleModal = function(){
        $('.modal').toggleClass("hide");
        $('.shadowBox').toggleClass("hide");
        console.log('modal works');
    }
    this.display_stats = function(){
        $('.games-played .value').text(this.games_played);
        $('.attempts .value').text(this.attempts);
        this.accuracy = (this.match_counter/this.attempts * 100).toFixed(2) + "%";
        $('.accuracy .value').text(this.accuracy);
    }
    this.reset_stats = function(){
        this.match_counter = 0;
        this.attempts = 0;
        this.accuracy = 0;
        this.display_stats();
        $('.accuracy .value').text(0);
    }
    this.reset_button_clicked = function(){
        this.games_played++;
        this.reset_stats();
        $('.card').find('.back').show();
    }
    this.initialize();
}




