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
    $(this).find($('.back')).hide();
    if(first_card_clicked !== null && second_card_clicked !== null) {
        return;
    }
    if (first_card_clicked === null) {
        first_card_clicked = this;
        return
    } else {
        second_card_clicked = this;
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
                alert('You win!');
            } else {
                return;
            }
        } else {
            setTimeout(function () {
                $(first_card_clicked).find($('.back')).show();
                $(second_card_clicked).find($('.back')).show();
                first_card_clicked = null;
                second_card_clicked = null;

            },2000)
        }
    }
}

