"use strict";
// // 命名空间
var home;
(function (home) {
    var Page = /** @class */ (function () {
        function Page() {
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
        return Page;
    }());
    home.Page = Page;
})(home || (home = {}));
// namespace home {
//     class Header {
//         constructor() {
//             const elem = document.createElement('div')
//             elem.innerText = 'this is header'
//             document.body.appendChild(elem)
//         }
//     }
//
//     class Content {
//         constructor() {
//             const elem = document.createElement('div')
//             elem.innerText = 'this is content'
//             document.body.appendChild(elem)
//         }
//     }
//
//     class Footer {
//         constructor() {
//             const elem = document.createElement('div')
//             elem.innerText = 'this is Footer'
//             document.body.appendChild(elem)
//         }
//     }
//
//     export class Page {
//         constructor() {
//             new Header();
//             new Content();
//             new Footer()
//         }
//     }
// }
//
