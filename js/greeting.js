
function updateGreetings(input) {
    const greeting = document.getElementById('greeting');
    const letters = input.split('');

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

updateGreetings("С новым годом 2026!");