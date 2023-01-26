// alert("ggkg");
$(function () {
    const par = $('.crossword p');
    let numberOfWord = 7;
    let inputPosition = 190;
    let zIndex = 14;
    
    $(".hButton").hover(function(){
        alert("Having a problem while displaying.");
    })

    par.each(function () {
        const words = $(this).text().split(' ');
        const letterSpan = [];
        //turning every letter to span.
        $(words).each(function () {
            const letters = this.split('');

            $(letters).each(function () {
                const span = $('<span>').text(this);
                letterSpan.push(span);
            });
        });

        $(this).html(letterSpan);
    });

         //adding user letters to the input.
        $(".wheel .letters").each(function () {
            $(this).click(function () {
                if ($(this).attr('id') === 'selectedLetter') {
                    $(this).animate({ top: "-=5px" }, 50)
                        .animate({ top: "+=10px" }, 50)
                        .animate({ top: "-=5px" }, 50)
                        .animate({ top: "-=5px" }, 50)
                        .animate({ top: "+=10px" }, 50)
                        .animate({ top: "-=5px" }, 50);
                    return;
                }
    
                $(this).attr('id', 'selectedLetter');
    
                let currentText = $(".input span").text();
                $(".input span").text(currentText + $(this).text());
    
                if ($(".input span").text() !== "") {
                    $(".input").css('display', 'block').css('left', `${inputPosition}px`);
                    inputPosition -= 7;
                }
            }).contextmenu(function (event) {
                event.stopPropagation();
                event.preventDefault();
            });
        });
    
        function resetinput() {
            zIndex += 7;
            $(".input span").text("");
            $(".input").css('display', 'none');
            inputPosition = 190;
        }

    //this makes the shuffle operation
    $(".sButton").click(function () {
        let set = false;
        $('.wheel .letters').each(function () {
            if ($(this).attr('id') === "selectedLetter") {
                set = true;
            }
        });

        if (set) {
             //animation for the letters
            $(".shuffleButton img").animate({ left: "-=5px" }, 50)
                .animate({ left: "+=10px" }, 50)
                .animate({ left: "-=5px" }, 50)
                .animate({ left: "-=5px" }, 50)
                .animate({ left: "+=10px" }, 50)
                .animate({ left: "-=5px" }, 50);
            return;
        }

        let letters = [];

        $('.wheel > .letters').each(function () {
            letters.push($(this).text());
        });

        letters.sort(() => 0.5 - Math.random());

        $('.wheel > .letters').each(function (i) {
            $(this).text(letters[i]);
        });
    }).contextmenu(function (event) {
        event.stopPropagation();
        event.preventDefault();
    });

    //checking right click mouse event
    $(".wheel").contextmenu(function (event) {
        event.preventDefault();
        let set = false;

        par.each(function () {
            //if word that created in the crossword, 
            if ($(this).text() === $(".input span").text()) {
                let word = $(this);

                if ($(word).hasClass("foundClass")) {
                    $(word).find('span').each(function () {
                        $(this).animate({ opacity: 0.5 }, 100)
                            .animate({ opacity: 1 }, 100)
                            .animate({ opacity: 0.5 }, 100)
                            .animate({ opacity: 1 }, 100)
                            .animate({ opacity: 0.5 }, 100)
                            .animate({ opacity: 1 }, 100);
                    });
                    return;
                }

                //find every span element and add found class
                $(word).find("span").each(function () {
                    $(this).css('display', 'none');
                    $(this).fadeIn(300);
                    $(this).css({ zIndex: `${zIndex}`, color: 'white', backgroundColor: 'darkgreen' });
                });

                $(word).addClass("foundClass");
                set = true;
            }

        });
        if (!set) {
            $(".input").animate({ left: "-=5px" }, 50)
                .animate({ left: "+=10px" }, 50)
                .animate({ left: "-=5px" }, 50)
                .animate({ left: "-=5px" }, 50)
                .animate({ left: "+=10px" }, 50)
                .animate({ left: "-=5px" }, 50, resetinput);
        } else {
            resetinput();
        }
        //setting the selectedLetter state to the normal so we can create again
        $(".wheel .letters").each(function () {
            if ($(this).attr('id') === "selectedLetter") {
                $(this).removeAttr('id');
            }
        });
    });

    // $(".hButton").hover(function(){
    //     $("#answers").css("display", "contents");
    // }, function(){
    //     $("#answers").css("display", "none");
    // });
});