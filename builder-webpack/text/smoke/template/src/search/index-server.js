// import React from 'react';
// import '../../common/index';
// import { a } from './tree-shaking';
// import largerNumber from 'yongx-large-number';
// import logo from '../image/logo.png';
// import './search.less';
const React = require('react')
const largerNumber = require('yongx-large-number')
const logo = require('../image/logo.png')
require('./search.less')



class Search extends React.Component {
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
        const { Text } = this.state;
        const addRes = largerNumber('888', '1');
        return (
            <div>
                <div className="search-text">Search text</div>
                {
                    Text ? <Text/> : ''
                }
                <img src={logo} alt="" onClick={this.loadCommopent.bind(this)}/>
                {addRes}
            </div>
        );
    }
}

module.exports = <Search/>

