class Element {
    constructor(elementName) {
        this.name = elementName;
        this.id = null;
        this.classes = [];
        this.children = [];
        this.css = {};
        this.innerText = null;
    }

    setId(id) {
        this.id = id;
    }

    setInnerText(text) {
        this.innerText = text;
    }

    addClasses(...classes) {
        this.classes = [...this.classes, ...classes];
    }

    removeClasses(...classes) {
        for (let c of classes) {
            let index = this.classes.indexOf(c);

            if (index != -1) {
                this.classes.splice(index, 1);
            }
        }
    }

    addStyles(styles) {
        Object.assign(this.css, styles);
    }


    deleteStyles(...styles) {
        for (let key of styles) {
            delete this.css[key];
        }
    }

    appendChilds(...childs) {
        for (let c of childs) {
            this.children.push(c);
        }
    };

    createDomElement() {
        let el = document.createElement(this.name);

        if (this.id) {
            el.id = this.id;
        }

        if (this.innerText) {
            el.innerText = this.innerText;
        }

        for (let c of this.classes) {
            el.classList.add(c);
        }

        for (let key in this.css) {
            el.style[key] = this.css[key];
        }

        for (let child of this.children) {
            el.append(child.createDomElement());
        }

        return el;
    }
}