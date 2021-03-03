import React from 'react';
import ReactDom from 'react-dom';
import '../../common/index';
import { a } from './tree-shaking';
import largerNumber from 'yongx-large-number';

import logo from '../image/logo.png';
import './search.less';

class Index extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            Text: null
        };
    }
    
    loadCommopent() {
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default
            });
        });
    }
    
    render() {
        const funa = a();
        const { Text } = this.state;
        const addRes = largerNumber('888', '1');
        return (
            <div>
                <div className="search-text">Search text</div>
                {
                    Text ? <Text/> : ''
                }
                <img src={logo} alt="" onClick={this.loadCommopent.bind(this)}/>
                {funa}
                {addRes}
            </div>
        );
    }
}

ReactDom.render(
    <Index/>,
    document.getElementById('root')
);

// "devDependencies": {
//     "@babel/core": "^7.4.4",
//         "@babel/preset-env": "^7.4.4",
//         "@babel/preset-react": "^7.0.0",
//         "babel-loader": "^8.1.0",
//         "css-loader": "^4.3.0",
//         "file-loader": "^6.1.0",
//         "less-loader": "^7.0.1",
//         "mini-css-extract-plugin": "^0.11.2",
//         "react": "^16.13.1",
//         "react-dom": "^16.13.1",
//         "style-loader": "^1.2.1",
//         "url-loader": "^4.1.0",
//         "webpack": "^4.44.1",
//         "webpack-cli": "^3.3.12",
//         "webpack-dev-server": "^3.11.0"
// }
