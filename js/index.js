let state = {
    currentQuest: null,
    answerLetters: [],
    questIndex: null,
    errorScore: 0,
    successScore: 0,
    totalErrorScore: 0,
    totalSuccessScore: 0,
    selectedLetters: []
}

let statistics = {
    totalSuccessScore: 0,
    totalErrorScore: 0,
}

let currentWord = null;
let wordLetters = [];
let selectedLetters = [];
let errorScore = 0;
let successScore = 0;
let totalSuccessScore = 12;

//const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
// const topics = ["Города", "Транспорт", "Спорт"];

// const words = {
//     "Города": ["минск", "москва", "париж", "рим"],
//     "Транспорт": ["автомобиль", "самолет", "телега", "трамвай"],
//     "Спорт": ["футбол", "шахматы", "теннис", "бокс"]
// }
// const topics = ["Кто напарник Деда Мороза?", "Как иначе называют Деда Мороза в рассказах?", "Большой белый друг каждого двора?", "Что надевают на голову снеговику вместо шапки?", "С крыши капает, на лоб падает?", "Лучший друг Деда Мороза и Снегурочки?", "Что в Новогоднюю ночь повсюду взрывается ярким разными красками?", "Украшение на «голове» красавицы-ёлки часто выглядит как...", "Украшает зимой окно в морозные дни...", "Что пишут дети, чтобы рассказать о своих желаниях Деду Морозу?", "Какой самый популярный зимний транспорт для детей?", "Сколько раз куранты ударяют в новогоднюю ночь?", "После Нового года празднуют...", "Кто играл роль Деда Мороза в мультике «Ну погоди!»?", "Что традиционно держит в руках Дед Мороз?", "Какой месяц зимний по древнерусскому был снеговиком?", "Вместо носа у снеговика часто бывает...", "Самое популярное холодное сладкое угощение?", "Запах какого фрукта ассоциируется с Новым годом?", "Из-за чего люди зимой на улице часто падают?", "Что находится внутри новогодней хлопушки?", "Что зимой звезда, а весной – вода?", "На счёт три на новогодней ёлке загорается...", "Какой месяц зимы – месяц ветров?", "Место для рассказывания стихов Деду Морозу?"];

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
    hungman: [
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
        currentWord: null,
        wordLetters: [],
        topicIndex: null,
        questIndex: null,
        errorScore: 0,
        successScore: 0,
        selectedLetters: []
    }
    currentWord = null;
    wordLetters = [];
    selectedLetters = [];
    errorScore = 0;
    successScore = 0;

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

    if (loadState && loadState.state && loadState.state.statistics !== null) {
        statistics = loadState.statistics;
    }
}

async function init() {
    await loadGameState();
    console.log({ state });
    console.log({ currentWord, selectedLetters });

    // let topicIndex = rand(0, topics.length - 1);
    // let topicIndex = state.topicIndex !== null ? state.topicIndex : rand(0, topics.length - 1);
    // let wordsSet = words[topics[topicIndex]];
    // let questIndex = rand(0, wordsSet.length - 1);
    let questIndex = state.questIndex !== null ? state.questIndex : rand(0, questions.length - 1);

    selectedLetters = state.selectedLetters !== null ? state.selectedLetters : [];

    // TODO: add totalErrorScore & totalSuccessScore fields:
    //totalErrorScore = state.totalErrorScore > 0 ? state.totalErrorScore : 0;
    //totalSuccessScore = state.totalSuccessScore > 0 ? state.totalSuccessScore : 0;

    state.questIndex = questIndex;
    saveGameState();

    currentWord = answers[questIndex];
    // currentWord = 'молоко';

    console.log({ state, len: questions.length });

    gameElements.topic.innerText = questions[questIndex];

    for (let i = 0; i < statistics.totalSuccessScore; i++) {    
        showHungmanPart.next();
    }

    
    const totalBalls = gameElements.hungman.length;

    // check if the game is finished
    if (statistics.totalSuccessScore >= totalBalls) {
        gameElements.topic.innerText = "Happy New Year 2026!";
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

    for (let i = 0; i < currentWord.length; i++) {
        let span = document.createElement("span");
        span.classList.add("word-letter");

        gameElements.word.append(span);

        let wordLetter = {
            letter: currentWord[i],
            element: span
        }
        wordLetters.push(wordLetter);
    }

    for (let i = 0; i < alphabet.length; i++) {
        let button = document.createElement("button");
        button.id = 'key' + i;
        button.classList.add("letter");
        button.innerText = alphabet[i];

        if (selectedLetters.indexOf(alphabet[i]) !== -1) {
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
        console.log(event.code);
        if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
            alert('Отменить!')
        }
        let pressedLetter;

        switch (event.code) {
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

            case 'Key{':
                pressedLetter = 'х';
                break;
            case 'Key}':
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

            case 'Key:':
                pressedLetter = 'ж';
                break;
            case 'Key"':
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

            // case 'Key?': 
            //     pressedLetter = '/';
            //     break;
        }

        if (!pressedLetter) {
            return;
        }

        await checkLetter(pressedLetter);

        // make selected btn grey
        // TODO: make it colored because it is the new year atmos...
        const btnId = 'key' + alphabet.indexOf(pressedLetter);
        const button = document.getElementById(btnId);
        button.classList.add('grey-letter');
        button.disabled = true;
    });
}

function* showHungmanPartGenerator() {
    for (let i = 0; i < gameElements.hungman.length; i++) {
        gameElements.hungman[i].style.display = 'block';
        yield;
    }
}

let showHungmanPart = showHungmanPartGenerator();

async function checkLetter(letter, init = false) {
    console.log(letter);
    let pos = 0;
    let indexes = []; //false

    while (true) {
        let foundPos = currentWord.indexOf(letter, pos);

        if (foundPos == -1) {
            break;
        }
        indexes.push(foundPos);
        pos = foundPos + 1;
    }

    console.log({ indexes });

    if (!init) {
        selectedLetters.push(letter);
        await saveGameState();
    }

    if (indexes.length > 0) {

        for (let index of indexes) {
            wordLetters[index].element.innerText = wordLetters[index].letter;
            successScore++;
        }

        if (successScore == currentWord.length) {
            gameOver(true);
        }

    } else {
        errorScore++;

        if (errorScore >= gameElements.hungman.length) {
            gameOver(false);
        }
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
        gameOverElement.innerText = 'Nice try bro/sis!! ;-)';
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