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

/* TODO:  Add more decor and anything else that can be displayed from the questions themselves (a snowman, sleds, Father Frost, Snow Maiden, etc.)
// to cover more questions and make the final greeting more visually interesting */

/* kids level: */
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
    "Место для рассказывания стихов Деду Морозу?",
    "Какой снег лучше всего подходит для лепки снеговика?",
    "Сколько лучей у снежинки?"
]

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
    "табуретка",
    "мокрый",
    "шесть"
]

/* TODO: reduce questions to two lines on the screen
// or use the function to assign a different font size in case of long questions: */

/* middle level */
// const questionsMiddleLevel = [
//     "Как называется календарь, по которому Новый год наступает 1 января?",
//     "В честь какого римского бога был назван Январь?",
//     "Как называется календарь, по которому отмечается китайский Новый год?",
//     "Какая страна первой встречает Новый год?",
//     "Под каким названием известен Канун Нового года в Шотландии?",
//     "Традиционно испанцы встречают Новый год, съедая 12 штук чего?",
//     "В какой стране традиция на Новый год разбивать тарелки о чью-то дверь на счастье и удачу?",
//     "В какой стране новогодняя традиция — звонить в колокола 108 раз, чтобы избавиться от злых духов и человеческих пороков?",
//     "Какой уникальный подарок дарили на Новый год в Персии?",
//     "Как называется боязнь снега?",
//     "Счастлив тот, кто не замечает, лето теперь или зима - какого известного писателя эта цитата?",
//     "Какого цвета 2 февраля 2007 года в нескольких регионах Сибири выпал снег?",
//     "В какой стране были проведены первые зимние Олимпийские игры?",
//     "Как называется состояние, при котором из-за замерзания повреждаются ткани организма?",
//     "В каком городе можно посетить Зимний дворец?",
//     "Какая вымышленная страна мифических существ и говорящих животных находилась под властью Белой Ведьмы на протяжении столетней зимы?",
//     "Какой зимний вид спорта также известен как «игра в ревущие камни»?",
//     "Когда в Европе зима, в какой из стран - точно лето?",
//     "Люди какого знака зодиака рождаются с 22 ноября по 21 декабря?",
//     "На какой ещё планете Солнечной системы ученые наблюдали выпадение снега?",
//     "В какой из перечисленных ниже стран лучше всего наблюдать за северным сиянием?",
//     "Мех какого животного становится белым зимой?",
//     "Как императорские пингвины согревают яйца зимой?",
//     "Кто из перечисленных ниже животных запасает на зиму пищу вместо того, чтобы впадать в спячку?",
//     "В какой пустыне в 2011 году выпало много снега?",
//     "В какой стране были изобретены сапоги угги?"
// ]

// const answersMiddleLevel = [
//     "григорианский",
//     "янус",
//     "лунный",
//     "кирибати",
//     "хогманай",
//     "виноградин",
//     "дания",
//     "япония",
//     "яйца",
//     "хионофобия",
//     "чехов",
//     "оранжевый",
//     "франция",
//     "обморожение",
//     "петербург",
//     "нарния",
//     "керлинг",
//     "австралия",
//     "стрелец",
//     "марс",
//     "исландия",
//     "песец",
//     "животом",
//     "белки",
//     "атакама",
//     "австралия"
// ]

/* high level */
// const questionsHighLevel = [
//     "Как зовут внучку Деда Мороза?",
//     "Какой месяц на Руси был началом Нового года До указа Петра I?",
//     "Какой город считается официальной Родиной Деда Мороза в России?",
//     "Какой салат, вероятно, получил свое название в честь итальянского певца?",
//     "Что бросают в бокал с шампанским, загадывая желание под бой курантов?",
//     "В какой стране Новый год встречают, осыпая друг друга лепестками роз?",
//     "В какой стране первый день нового года называется Днем визитов?",
//     "Как называется пирог, в который (на удачу) кладут монетку в Греции?",
//     "В Италии под Новый год принято выбрасывать старые вещи. Что часто летит из окон?",
//     "Как зовут мальчика, которого вместе с щенком увозят в неизвестном направлении в фильме Чародеи?",
//     "В каком новогоднем фильме главный герой повторяет: Я не волшебник, я только учусь?",
//     "Как зовут снежного человека, который искал своего папу в советском мультфильме?",
//     "В каком диснеевском мультфильме мыши готовят праздник для сиротки?",
//     "Какой фильм начинается со слов: На момент начала нашей истории этим оленем еще никто не управлял?",
//     "Кто автор музыки к песне В лесу родилась елочка?",
//     "Для празднования какого праздника изначально была написана Песня Jingle Bells?",
//     "Какой композитор написал знаменитый Вальс из фильма Мой ласковый и нежный зверь?",
//     "В каком веке появилась традиция наряжать рождественскую елку?",
//     "Кто был первым официальным советским Дедом Морозом на кремлевской елке?",
//     "Откуда пошла традиция запускать фейерверки на Новый год? Шум и огонь, по поверьям, отпугивали злых духов.",
//     "В какой стране жил реальный прототип Санта-Клауса — Святой Николай?",
//     "Кто автор стихотворения - Вот север, тучи нагоняя ... Зима! Крестьянин, торжествуя...?",
//     "Кто написал сказку Снежная королева?",
//     "Как зовут мальчика, который растаял в конце сказки, потому что его поцеловала девушка?",
//     "Кто автор детской книжки Елка, изданной в 1941 году в осажденном Ленинграде?",
//     "Какой русский писатель написал рассказ Мальчик у Христа на елке?",
//     "Кабы не было зимы в городах и селах… — это строчка из песни. А кто автор стихов?",
//     "В какой стране Новый год встречают первым на планете?",
//     "А в какой стране встречают последним?",
//     "Город, в котором проходит самый масштабный новогодний фейерверк?",
//     "В какой стране Новый год — это летний праздник, который часто отмечают на пляже?",
//     "Какой город в России славится своими ледяными скульптурами и целыми городками изо льда?",
//     "В какой европейской столице на Новый год принято прыгать с моста в ледяную воду?",
//     "Где находится официальная резиденция Санта-Клауса, куда приходит много писем?",
//     "В какой стране на Новый год дарят друг другу ветки падуба (остролиста) на счастье?",
//     "Какой теплый напиток традиционно пьют на рождественских рынках в Германии и Австрии?",
//     "Без какого салата сложно представить традиционный новогодний стол в России?",
//     "Какой цитрус традиционно ассоциируется с Новым годом в России?",
//     "Что является главным ингредиентом настоящей Селедки под шубой?",
//     "Какое мясное блюдо в форме кольца готовят на Новый год во многих странах Европы?",
//     "Как называется немецкий кекс с цукатами, который готовят к Рождеству?",
//     "Какой пряный сладкий напиток на основе красного вина пьют в Европе зимой?",
//     "Какое печенье в форме человечков особенно популярно в США под Рождество?",
//     "Как называется итальянский сладкий хлеб с изюмом и цукатами, который едят на Новый год?",
//     "Сколько раз бьют куранты Спасской башни, возвещая о наступлении Нового года?",
//     "Что обычно пишут в новогодних открытках?",
//     "Как называется предновогодняя суета, когда все покупают подарки и продукты?",
//     "Что принято делать в первую минуту Нового года?",
//     "Что можно увидеть с закрытыми глазами?",
//     "Что общего у Деда Мороза и снегоуборочной машины?",
//     "Какое ощущение, ради которого на Новый год принято надевать что-то новое?",
//     "Что тяжелее: килограмм елочных игрушек или килограмм мандаринов?",
//     "Сколько иголок на средней новогодней елке?",
//     "Кто никогда не замерзает на улице зимой?",
//     "Что идет, не двигаясь с места?",
//     "Как закончить фразу: С Новым годом, с новым…?",
// ]

// const answersHighLevel = [
//     "снегурочка", 
//     "сентябрь",
//     "устюг",
//     "оливье",
//     "монетку",
//     "бразилия", 
//     "греция",
//     "василопита",
//     "хлам",
//     "иван",
//     "золушка",
//     "умка",
//     "золушка", 
//     "эльф",
//     "бекман",
//     "благодарения",
//     "дога",
//     "шестнадцатом",
//     "гаркави",
//     "китай",
//     "византия",
//     "пушкин",
//     "андерсен",
//     "снеговик",
//     "инбер",
//     "достоевский",
//     "энтин",
//     "кирибати",
//     "самоа",
//     "сидней",
//     "австралия",
//     "новосибирск",
//     "амстердам",
//     "финляндия",
//     "великобритания",
//     "глинтвейн",
//     "оливье",
//     "мандарин",
//     "селедка",
//     "полено",
//     "штоллен",
//     "глинтвейн",
//     "имбирное",
//     "панеттоне",
//     "двенадцать",
//     "поздравления",
//     "ажиотаж",
//     "поздравлять",
//     "сон", 
//     "снег",
//     "обновление",
//     "одинаково",
//     "много",
//     "снеговик",
//     "время",
//     "счастьем"
// ]

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

function updateGreetings(inputText) {
    const greeting = document.getElementById("greeting");
    const letters = inputText.split('');

    for (const letter of letters) {
        const span = new Element('span');
        span.setInnerText(letter);
        console.log({ letter })
        if (letter !== " ") {
            span.addClasses('text');
        } else {
            span.addClasses('space');
        }
        greeting.appendChild(span.createDomElement());
    }
}

function* showDecorationPartGenerator() {
    for (let i = 0; i < gameElements.decoration.length; i++) {
        gameElements.decoration[i].style.display = 'block';
        yield;
    }
}

let showDecorationPart = showDecorationPartGenerator();

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
        updateGreetings("Happy New Year 2026!");
        gameElements.topic.innerText = "";
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
            button.classList.add('frozen-symbols');
            button.disabled = true;
            await checkLetter(alphabet[i], true);
        }

        button.onclick = async () => {
            await checkLetter(alphabet[i]);

            // stylization of pressed letters:
            button.classList.add('frozen-symbols');
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

            // TODO: fix when pressed "Э" on ENG - switch the search on the page:    
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

        const btnId = 'key' + alphabet.indexOf(pressedLetter);
        const button = document.getElementById(btnId);
        button.classList.add('frozen-symbols');
        button.disabled = true;
    });
}

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
        showDecorationPart.next();
        clearGameState(result);
    } else {
        gameOverElement.innerText = 'Попробуй ответить на другой вопрос..';
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
        
        await delay(3000);
        console.log({ run, state, statistics });
        if (!state.currentQuest) {
            console.log({ wait: 3, state, statistics });
            await delay(1000);
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