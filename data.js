var hangman_Game = {
    
    words_for_choose: {
        gtasanandreas: {
            picture: "gta-san-andreas-indir.jpg",
            song: "San Andreas Theme song",
            preview: "./mp3/gta.mp3"
        },
       
       witcher: {
           picture: "witcher.jpg",
           song: "Hunt or be Hunted",
           preview: "./mp3/assassin.mp3"
        },
        assassincreed: {
            picture: "assassin.jpg",
            song: "Ezio's Family",
            preview: "./mp3/assassin.mp3"
        },
        silenthill: {
            picture: "silent-hill.jpg",
            song: "Promise",
            preview: "./mp3/silent.mp3"
        },
        mortalkombat: {
            picture: "mortal.jpg",
            song: "Mortal Kombat",
            preview: "./mp3/mortal.mp3"
        },
      princeofpersia: {
              picture: "prince.jpeg",
              song: "Two Thrones",
              preview: "./mp3/prince.mp3"
        },
      halo: {
             picture: "halo.jpg",
             song: "Infinite",
             preview: "./mp3/halo.mp3"
           },
     residentevil: {
              picture: "resident2.jpeg",
               song: "End of Umbrella",
               preview: "./mp3/resident.mp3"
        },
     callofduty: {
             picture: "cod.jpg",
              song: "Modern Warfare",
              preview: "./mp3/call.mp3"
        },
     maxpayne: {
             picture: "max.jpg",
             song: "Main Theme",
             preview: "./mp3/max.mp3"
        }
        
       
    },

   
   
    

    


 letters_of_words: [],
 guessed_letters: [],
 trials_left: 0,
 wins: 0,
 word_for_play: null,
 matched_letters: [],
 total_gueeses: 0,
 letter_guessed: null,

 make_game: function() {
     var letter_keys = Object.keys(this.words_for_choose);
     this.word_for_play = letter_keys[Math.floor(Math.random() * letter_keys.length)]

     this.letters_of_words = this.word_for_play.split("");
     this.remake_word_view()
     this.process_update_guesses()

     

 },
 update_page: function(letter) {
     if (this.trials_left === 0) {
         this.restart_game()
     }
     else {
         this.update_guesses(letter)

         this.process_update_matched_letters(letter)

         this.remake_word_view()

         if (this.update_wins() === true) {
             this.restart_game()
            }
        }
    },

    update_guesses: function(letter) {

        if((this.guessed_letters.indexOf(letter) === -1 ) && (this.letters_of_words.indexOf(letter) === -1)) {
            
            this.guessed_letters.push(letter)

            this.trials_left--;

            document.querySelector("#trials-remaining").innerHTML = this.trials_left
            document.querySelector("#guessed-letters").innerHTML = this.guessed_letters.join(", ")

        }
    },

    process_update_guesses: function() {
        this.total_gueeses = this.letters_of_words.length + 5;
        this.trials_left = this.total_gueeses;

        document.querySelector("#trials-remaining").innerHTML = this.trials_left;

    },

    process_update_matched_letters: function(letter) {
        for(var i = 0; i < this.letters_of_words.length; i++) {
            if((letter === this.letters_of_words[i]) && (this.matched_letters.indexOf(letter) === -1)) {
                this.matched_letters.push(letter);
            }
        }
    },

    remake_word_view: function() {
        var word_view = "";

        for(var i = 0; i < this.letters_of_words.length; i++) {
            if(this.matched_letters.indexOf(this.letters_of_words[i]) !== -1) {
                word_view += this.letters_of_words[i];
            }
            else {
                word_view += "&nbsp;_&nbsp;"
            }
        }
        document.querySelector("#current-word").innerHTML = word_view
    },

    restart_game: function() {

        document.querySelector("#guessed-letters").innerHTML = "";
        this.letters_of_words = [];
        this.guessed_letters = [];
        this.trials_left = 0,
        this.wins = 0,
        this.word_for_play = null,
        this.matched_letters = [],
        this.total_gueeses = 0,
        this.letter_guessed = null,
        this.make_game();
        this.remake_word_view();
        
    },


    update_wins: function() {
        var win;

        if(this.matched_letters.length === 0) {
            win = false;
        }
        else {
            win = true;
        }

        for (var i = 0; i < this.letters_of_words.length; i++) {
            if (this.matched_letters.indexOf(this.letters_of_words[i]) === -1) {
                win = false;
            }
        }
        if (win) {
            this.wins = this.wins + 1;

            document.querySelector("#wins").innerHTML = this.wins;

            document.querySelector("#game-soundtrack").innerHTML = this.words_for_choose[this.word_for_play].song + " By " + this.word_for_play;
            document.querySelector("#game_div").innerHTML = "<img class='game-image' src='./img/" + this.words_for_choose[this.word_for_play].picture + " ' alt=' " + this.words_for_choose[this.word_for_play].song + " '>";

            var audio = new Audio(this.words_for_choose[this.word_for_play].preview)
            audio.currentTime = 0
           audio.play()
            return true
        }
    }

    
       

       


}
hangman_Game.make_game();

document.onkeyup = function(event) {
    hangman_Game.letter_guessed = String.fromCharCode(event.which).toLowerCase();
    hangman_Game.update_page(hangman_Game.letter_guessed)
}

picture = {
    innerWidth: "200px",
    innerHeight: "200px"
}
