$(document).ready(initializeApp);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 1;
var match_counter = 0;

function initializeApp(){
    // $(".card").click(handleClick);
    $('.card').on('click', card_clicked);
}

function card_clicked(){
    // console.log("handle click ran")
    if(first_card_clicked !== null && second_card_clicked !== null) {
        return;
    }
    if($(this).hasClass('clicked')) {
        return;
    }
    $(this).find($('.back')).hide();

    if (first_card_clicked === null) {
        first_card_clicked = this;
        $(first_card_clicked).addClass('clicked');
        return
    } else {
        second_card_clicked = this;
        $(second_card_clicked).addClass('clicked');
        var first_card_image_source = $(first_card_clicked).find('.front > img').attr('src');
        console.log('first card:', first_card_image_source);
        var second_card_image_source = $(second_card_clicked).find('.front > img').attr('src');
        console.log(second_card_image_source)
        if (first_card_image_source === second_card_image_source) {
            match_counter++;
            console.log(match_counter);
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                setTimeout(function() {
                    alert('You win!');
                },500);
            } else {
                return;
            }
        } else {
            setTimeout(function () {
                $(first_card_clicked).find($('.back')).show();
                $(second_card_clicked).find($('.back')).show();
                $(first_card_clicked).removeClass('clicked');
                $(second_card_clicked).removeClass('clicked');

                first_card_clicked = null;
                second_card_clicked = null;

            },2000)
        }
    }
}

