let ENABLED = false;
const MAGIC_KEY = 96;

let test_type = window.location.href.slice(window.location.href.indexOf('e1'), -29);
const db = questions_db[test_type]; //loads from another file

const site_questions = $('.trescE');
const site_answers = $('.odpowiedzE');

function parse_site_data() {
    let site_data = [];

    for (let i = 0; i < site_questions.length; i++) { //this loop parses question contents and images
        let current = $(site_questions[i]);
        if (!current.next().hasClass('obrazek')) {
            let question_number_length = current[0].innerText.trim().match(/\d+\./)[0].length;
            let content = current[0].innerText.trim().substring(question_number_length).trim();
            site_data.push({ question: content });
        }
        else {
            current = $(current.next());
            site_data.push({ img: $(current).children('img')[0].currentSrc });
        }
    }

    for (let i = 0; i < site_answers.length; i++) { //this one parses answers
        let current = $(site_answers[i])[0];
        let questionIndex = Math.floor(i / 4);
        let answerIndex = i % 4;
        let answer_letter_length = current.innerText.trim().match(/[ABCD]\./)[0].length;
        let content = current.innerText.trim().substring(answer_letter_length).trim();
        if (!site_data[questionIndex].answers)
            site_data[questionIndex].answers = [];
        site_data[questionIndex].answers[answerIndex] = content;
    }

    return site_data;
}

function get_correct_answers() {
    let correct_answers = [];

    for (correct of db) {
        let correct_answer;
        for (let i = 0; i < site_data.length; i++) {
            const current = site_data[i];
            if (current.hasOwnProperty('img')) {
                if (current.img === correct.img) {
                    correct_answer = correct.answer;
                    for (let j = 0; j < current.answers.length; j++) {
                        const element = current.answers[j];
                        if (element === correct_answer) {
                            correct_answers[i] = { answer: correct_answer, answer_index: j };
                            break;
                        }
                    }
                    break;
                }
            }
            else if (current.hasOwnProperty('question')) {
                if (current.question === correct.question) {
                    correct_answer = correct.answer;
                    for (let j = 0; j < current.answers.length; j++) {
                        const element = current.answers[j];
                        if (element === correct_answer) {
                            correct_answers[i] = { answer: correct_answer, answer_index: j };
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }

    return correct_answers;
}

function cache_answers() {
    let cache = [];
    for (let i = 0; i < correct_answers.length; i++) {
        const curr = correct_answers[i];
        if (curr) {
            cache.push($(site_answers[i * 4 + curr.answer_index]));
        }
    }
    return cache;
}

function add_indicators_to_correct_answers() {
    for (let i = 0; i < cached_answers_DOM.length; i++) {
        $(cached_answers_DOM[i]).addClass("kit-correct");
    }

}

function remove_indicators_from_correct_answers() {
    for (let i = 0; i < cached_answers_DOM.length; i++) {
        $(cached_answers_DOM[i]).removeClass("kit-correct");
    }
}

function brinciton() {
    for (let i = 0; i < cached_answers_DOM.length; i++) {
        $(cached_answers_DOM[i]).addClass("odpowiedzEzazn");
        $(cached_answers_DOM[i]).children('input')[0].checked = true;
    }
}

function brincitoff() {
    for (let i = 0; i < cached_answers_DOM.length; i++) {
        $(cached_answers_DOM[i]).removeClass("odpowiedzEzazn");
        $(cached_answers_DOM[i]).children('input')[0].checked = false;
    }
}

let key = '';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("KEY: ", request.key);
    if(request.msg === "key")
        key = request.key;
    sendResponse("gotIt");
});

function silent_mode_on() {
    if(key) {
        //console.log("SILENT");
        for (let i = 0; i < cached_answers_DOM.length; i++) {
            $(cached_answers_DOM[i]).hover(() => {
                $.ajax({
                    url: `http://gabirat.pl/api/kinaszkit/key/${key}`
                });
            }, ()=>{});
        }
    }
}

const site_data = parse_site_data();
const correct_answers = get_correct_answers(); //gets all correct answers with their indices
const cached_answers_DOM = cache_answers();

$(window).keypress((e) => {
    if (!ENABLED && e.keyCode == MAGIC_KEY) {
        add_indicators_to_correct_answers();
        ENABLED = true;
    }
    else if (ENABLED && e.keyCode == MAGIC_KEY) {
        remove_indicators_from_correct_answers();
        ENABLED = false;
    }
});

cheet('b r i n c i t o n', function () {
    alert('C̠͈̫͖͎͕̈͑ͯͧ͂̑Ž͚̭͓͔̀̏̿̒̀͟A̴͕̮̣͓̹̻͎͗ͫͯ̓͒͆̽͊̇S̢̠̦̜̘̎̄̆͗ͤ̎ͣ ̡̘͖̹̝̮̞̾͑̉͘N̴̮̹͔͎̩͙ͧ̏̐̊͜ͅÂ͓̮͚̗̯͔ͭ̆ ̥̬̘ͦ͛́̀͂̀ͦ́͠Ż̧̥̪͕͙͕͖ͯ̓͜N̴̙̰͈͇̘̝ͤͥͮ́ͅǏ̧̤̗͙̭̺̖̆̒̈͊̿W̅̐̄̂ͦ̀҉̯̠̖̳̯A͍̰͖̙̠͒̓ͥͬ̀͡');
    brinciton();
});

cheet('b r i n c i t o f f', function () {
    brincitoff();
});

cheet('s i l e n t', function () {
    silent_mode_on();
});
