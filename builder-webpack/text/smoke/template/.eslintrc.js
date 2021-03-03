module.exports = {
    // "parser": "esprima", // eslint 解析器
    "parser": "babel-eslint", // eslint 解析器 修改为babel-eslint
    "extends": ["airbnb"],
    "rules": {
        "semi": "error",
        "linebreak-style": [0, "error", "windows"],
        "indent": ["error", 4]
    },
    "env": {
        "browser": true,
        "node": true
    }
};

