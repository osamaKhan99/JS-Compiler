const fs = require('fs');
const { KW } = require('./keyword');
const { OPERATORS } = require('./operators');


var opMatch = '^';
for (var i in OPERATORS) {

    if (opMatch !== '^') {
        opMatch += '|^';
    }

    opMatch += i.replace(/[?|^&(){}\[\]+\-*\/\.]/g, '\\$&');

}

var opRegExp = new RegExp(opMatch),
    fpRegExp = /^\d+\.\d*(?:[eE][-+]?\d+)?|^\d+(?:\.\d*)?[eE][-+]?\d+|^\.\d+(?:[eE][-+]?\d+)?/,
    intRegExp = /[+-]?0[xX][\da-fA-F]+|^0[0-7]*|^\d+/,
    multiCommentRegExp = /^\/\*(.|[\r\n])*?\*\//m,
    commentRegExp = /^\/\/.*/,
    identRegExp = /^[$_\w]+/,
    wsRegExp = /^[\ \t]+/,
    strRegExp = /^'([^'\\]|\\.)*'|^"([^"\\]|\\.)*"/;

var code = fs.readFileSync("./mytext.txt").toString().toLowerCase(),
current = 0,
lineNo = 1,
tokens = []

while(current < code.length){

    var sub = code.substring(current),
    subline = sub.substring(0, sub.indexOf('\n')),
    m = null

    if(sub[0] === "\n"){
        lineNo++
    }
    else if((m = sub.match(wsRegExp))){
        m[0].replace(/\s/g,'')
    }
    else if ((m = sub.match(multiCommentRegExp ))) {
        tokens.push(`( ${KW.multicomment}, ${m[0].slice(2, -2)}, ${lineNo} )\n`)

        var lines = m[0].split('\n');
        lineNo += lines.length - 1;

    // Comment
    }
     else if ((m = subline.match(commentRegExp))) {
        tokens.push(`( ${KW.comments}, ${m[0].substr(2)}, ${lineNo} )\n`)
    }
    else if ((m = sub.match(strRegExp))){
        tokens.push(`( ${KW.stringConstant}, ${eval(m[0])}, ${lineNo} )\n`)
    }
    else if ((m = sub.match(fpRegExp))){
        tokens.push(`( ${KW.floatConstant} ${parseFloat(m[0])} ${lineNo} )\n`)
    }
    else if ((m = sub.match(intRegExp))){
        tokens.push(`( ${KW.intConstant}, ${parseInt(m[0])}, ${lineNo} )\n`)
    }
    else if ((m = sub.match(identRegExp))){
       KW.KEYWORDS.indexOf(m[0]) !== -1 ? 
       tokens.push(`( ${m[0]}, ${m[0]}, ${lineNo} )\n`) : 
       tokens.push(`( ${KW.identifer}, ${m[0]}, ${lineNo} )\n`)
    }
    else if((m = sub.match(opRegExp))) {
        tokens.push(`( ${OPERATORS[m[0]]} ${m[0]}, ${lineNo} )\n`)
    }
    else{
        tokens.push(`( INVALID LEXENE, ${sub[0]}, ${lineNo} )\n`)
    }
    var len = 1;
    if (m) {
      //  console.log(m)
        len = m[0].length
    }
    current += len;
}
fs.writeFileSync("./lexerTokens.txt", tokens.toLocaleString())