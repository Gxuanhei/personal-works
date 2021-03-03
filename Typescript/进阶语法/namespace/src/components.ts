namespace Components {
    export namespace hh {
    }

    export interface user {
        name: string
    }

    export class Header {
        constructor() {
            const elem = document.createElement('div')
            elem.innerText = 'this is header'
            document.body.appendChild(elem)
        }
    }

    export class Content {
        constructor() {
            const elem = document.createElement('div')
            elem.innerText = 'this is content'
            document.body.appendChild(elem)
        }
    }

    export class Footer {
        constructor() {
            const elem = document.createElement('div')
            elem.innerText = 'this is Footer'
            document.body.appendChild(elem)
        }
    }


}

class Page {
    constructor() {
        new Components.Header();
        new Components.Content();
        new Components.Footer()
    }
}
