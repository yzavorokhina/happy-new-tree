let state = {
    currentQuest: null,
    wordLetters: [],
    questIndex: null,
    wrongLetters: 0,
    foundLetters: 0,
    selectedLetters: []
}

let statistics = {
    nextQuests: [],
    totalSuccessScore: 0,
    totalErrorScore: 0,
}

const triesLimit = 12;

//const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

// TODO: auto test for check letters
const answers = [
    "снегурочка",
    "морозко",
    "снеговик",
    "ведро",
    "сосулька",
    "снеговик",
    "фейерверк",
    "звезда",
    "узор",
    "письмо",
    "санки",
    "двенадцать",
    "валенки",
    "рождество",
    "заяц",
    "посох",
    "январь",
    "морковка",
    "мороженое",
    "мандарин",
    "гололёд",
    "конфетти",
    "снежинка",
    "гирлянда",
    "февраль",
    "табуретка"
]

const questions = [
    "Кто напарник Деда Мороза?",
    "Как иначе называют Деда Мороза в рассказах?",
    "Большой белый друг каждого двора?",
    "Что надевают на голову снеговику вместо шапки?",
    "С крыши капает, на лоб падает?",
    "Лучший друг Деда Мороза и Снегурочки?",
    "Что в Новогоднюю ночь повсюду взрывается ярким разными красками?",
    "Украшение на макушке красавицы-ёлки часто выглядит как...",
    "Украшает зимой окно в морозные дни...",
    "Что пишут дети, чтобы рассказать о своих желаниях Деду Морозу?",
    "Какой самый популярный зимний транспорт для детей?",
    "Сколько раз куранты ударяют в новогоднюю ночь?",
    "Что носит на ногах Дед Мороз зимой?",
    "После Нового года празднуют...",
    "Кто играл роль Деда Мороза в мультике Ну погоди!?",
    "Что традиционно держит в руках Дед Мороз?",
    "Какой месяц зимний по древнерусскому был снеговиком?",
    "Вместо носа у снеговика часто бывает...",
    "Самое популярное холодное сладкое угощение?",
    "Запах какого фрукта ассоциируется с Новым годом?",
    "Из-за чего люди зимой на улице часто падают?",
    "Что находится внутри новогодней хлопушки?",
    "Что зимой звезда, а весной – вода?",
    "На счёт три на новогодней ёлке загорается...",
    "Какой месяц зимы – месяц ветров?",
    "Место для рассказывания стихов Деду Морозу?"
]

const gameElements = {
    topic: document.getElementById("game-topic"),
    word: document.querySelector(".word"),
    letters: document.querySelector(".letters"),
    decoration: [
        document.getElementById("ball1"),
        document.getElementById("ball2"),
        document.getElementById("ball3"),
        document.getElementById("ball4"),
        document.getElementById("ball5"),
        document.getElementById("ball6"),
        document.getElementById("mBall1"),
        document.getElementById("mBall2"),
        document.getElementById("mBall3"),
        document.getElementById("mBall4"),
        document.getElementById("mBall5"),
        document.getElementById("mBall6")
    ]
}

async function clearGameState(result) {
    state = {
        currentQuest: null,
        wordLetters: [],
        topicIndex: null,
        questIndex: null,
        wrongLetters: 0,
        foundLetters: 0,
        selectedLetters: []
    }

    if(result) {
        statistics.totalSuccessScore += 1;
    } else {
        statistics.totalErrorScore += 1;
    }

    saveGameState();
}

async function saveGameState() {
    console.log({ save: true, gameState: { state, statistics } });
    window.localStorage.setItem('gameState', JSON.stringify({ state, statistics }));
}

async function loadGameState() {
    let loadState = JSON.parse(window.localStorage.getItem('gameState'));

    console.log({ load: true, loadState });

    if (loadState && loadState.state && loadState.state.topicIndex !== null) {
        state = loadState.state;
    }

    if (loadState && loadState.statistics && loadState.statistics.totalSuccessScore !== 0) {
        statistics = loadState.statistics;
    }
}

async function init() {
    await loadGameState();
    console.log({ state });

    // get questions one by one from the very first one, without repeats and randoms:
    statistics.nextQuests = statistics.nextQuests.length > 0 ? statistics.nextQuests : Array.from(answers);
    let nextQuest = statistics.nextQuests.shift();
    let questIndex = answers.indexOf(nextQuest);

    console.log({ compare: true, nextQuest, nextQuest2: answers[0] });

    console.log({ questIndex, nextQuest, nextQuests: statistics.nextQuests });

    state.selectedLetters = state.selectedLetters !== null ? state.selectedLetters : [];
    state.questIndex = questIndex;
    state.currentQuest = answers[questIndex];

    saveGameState();

    console.log({ state, len: questions.length });

    gameElements.topic.innerText = questions[questIndex];
   

    for (let i = 0; i < statistics.totalSuccessScore; i++) {    
        showDecorationPart.next();
    }

    const totalBalls = gameElements.decoration.length;

    // check if the game is finished
    if (statistics.totalSuccessScore >= totalBalls) {
        // TODO: make animation for greeting text:
        gameElements.topic.innerText = "Happy New Year 2026!";
        gameElements.topic.classList.add("greeting");
        const newGameBtn = document.getElementById("newGameBtn");
        newGameBtn.style.display = 'block';
        

        newGameBtn.onclick = async () => {
            statistics.totalErrorScore = 0;
            statistics.totalSuccessScore = 0;
            clearGameState();
            saveGameState();
            window.location.reload();
        }

        return;
    }

    for (let i = 0; i < state.currentQuest.length; i++) {
        let span = document.createElement("span");
        span.classList.add("word-letter");

        gameElements.word.append(span);

        let wordLetter = {
            letter: state.currentQuest[i],
            element: span
        }
        state.wordLetters.push(wordLetter);
    }

    for (let i = 0; i < alphabet.length; i++) {
        let button = document.createElement("button");
        button.id = 'key' + i;
        button.classList.add("letter");
        button.innerText = alphabet[i];

        if (state.selectedLetters.indexOf(alphabet[i]) !== -1) {
            button.classList.add('grey-letter');
            button.disabled = true;
            await checkLetter(alphabet[i], true);
        }

        button.onclick = async () => {
            await checkLetter(alphabet[i]);

            // stylization of pressed letters:
            button.classList.add('grey-letter');
            button.disabled = true;
        }

        gameElements.letters.append(button);
    }

    document.addEventListener('keydown', async function (event) {
        console.log({ keyCode: event.code});
        if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
            alert('Отменить!')
        }
        let pressedLetter;

        switch (event.code) {

            case 'Backquote':
                pressedLetter = 'ё';
                break;

            case 'KeyQ':
                pressedLetter = 'й';
                break;
            case 'KeyW':
                pressedLetter = 'ц';
                break;
            case 'KeyE':
                pressedLetter = 'у';
                break;
            case 'KeyR':
                pressedLetter = 'к';
                break;
            case 'KeyT':
                pressedLetter = 'е';
                break;
            case 'KeyY':
                pressedLetter = 'н';
                break;
            case 'KeyU':
                pressedLetter = 'г';
                break;
            case 'KeyI':
                pressedLetter = 'ш';
                break;
            case 'KeyO':
                pressedLetter = 'щ';
                break;
            case 'KeyP':
                pressedLetter = 'з';
                break;
            case 'BracketLeft':
                pressedLetter = 'х';
                break;
            case 'BracketRight':
                pressedLetter = 'ъ';
                break;
            case 'KeyA':
                pressedLetter = 'ф';
                break;
            case 'KeyS':
                pressedLetter = 'ы';
                break;
            case 'KeyD':
                pressedLetter = 'в';
                break;
            case 'KeyF':
                pressedLetter = 'а';
                break;
            case 'KeyG':
                pressedLetter = 'п';
                break;
            case 'KeyH':
                pressedLetter = 'р';
                break;
            case 'KeyJ':
                pressedLetter = 'о';
                break;
            case 'KeyK':
                pressedLetter = 'л';
                break;
            case 'KeyL':
                pressedLetter = 'д';
                break;

            case 'Semicolon':
                pressedLetter = 'ж';
                break;

            // TODO: fix when pressed Э on ENG - switch the search on the page:    
            case 'Quote':
                pressedLetter = 'э';
                break;

            case 'KeyZ':
                pressedLetter = 'я';
                break;
            case 'KeyX':
                pressedLetter = 'ч';
                break;
            case 'KeyC':
                pressedLetter = 'с';
                break;
            case 'KeyV':
                pressedLetter = 'м';
                break;
            case 'KeyB':
                pressedLetter = 'и';
                break;
            case 'KeyN':
                pressedLetter = 'т';
                break;
            case 'KeyM':
                pressedLetter = 'ь';
                break;
            case 'Comma':
                pressedLetter = 'б';
                break;
            case 'Period':
                pressedLetter = 'ю';
                break;
        }

        if (!pressedLetter) {
            return;
        }

        await checkLetter(pressedLetter);

        // TODO: make selected btn colored because it is the new year atmos...
        const btnId = 'key' + alphabet.indexOf(pressedLetter);
        const button = document.getElementById(btnId);
        button.classList.add('grey-letter');
        button.disabled = true;
    });
}

function* showDecorationPartGenerator() {
    for (let i = 0; i < gameElements.decoration.length; i++) {
        gameElements.decoration[i].style.display = 'block';
        yield;
    }
}

let showDecorationPart = showDecorationPartGenerator();

async function checkLetter(letter, init = false) {
    console.log(letter);
    let pos = 0;
    let found = []; //false

    while (true) {
        let foundPos = state.currentQuest.indexOf(letter, pos);

        if (foundPos == -1) {
            break;
        }
        found.push(foundPos);
        pos = foundPos + 1;
    }

    console.log({ indexes: found });

    if (state.selectedLetters.indexOf(letter) === -1) {
        if (found.length > 0) {
            for (let index of found) {
                state.wordLetters[index].element.innerText = state.wordLetters[index].letter;
                state.foundLetters++;
            }
        } else {
            state.wrongLetters++; 
        }
    }

    if (!init) {
        state.selectedLetters.push(letter);
        await saveGameState();
    }

    if (state.foundLetters == state.currentQuest.length) {
        gameOver(true);
    } else if (state.wrongLetters >= triesLimit) {
        gameOver(false);
    }
}

function gameOver(result) {
    let gameOverElement = document.querySelector(".game-over");
    gameOverElement.classList.add("active");

    if (result) {
        gameOverElement.innerText = 'Прекрасно, ещё один шарик на ёлке!!';
        gameOverElement.classList.add('green-success');
        clearGameState(result);
    } else {
        gameOverElement.innerText = 'Попробуй ответить на другой вопрос';
        gameOverElement.classList.add('red-fail');
        clearGameState(result);
    }

    setTimeout(() => {
        window.location.reload();
    }, 3000);
}

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}

init();

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoTest(run) {
    const totalBalls = gameElements.decoration.length;
    if (run) {
        if (statistics.totalSuccessScore >= totalBalls) {
            return;
        }
        
        await delay(5000);
        console.log({ run, state, statistics });
        if (!state.currentQuest) {
            console.log({ wait: 3, state, statistics });
            await delay(3000);
        }

        let loadState = state;

        for (let i = 0 ; i <= loadState.currentQuest.length ; i++) {
            const letter = loadState.currentQuest[i];
            console.log({ letter });
            try {
                await checkLetter(letter);
            } catch(e) {
                console.log({ error: e })
            }
            await delay(1000);
        }
    } 
}

autoTest(false);