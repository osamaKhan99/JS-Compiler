const OPERATORS = {
    '+=':   'COMPOUND_OP',
    '-=':   'COMPOUND_OP',
    '*=':   'COMPOUND_OP',
    '/=':   'COMPOUND_OP',
    '%=':   'COMPOUND_OP',
    ';':    'SEMICOLON',
    ',':    'COMMA',
    ':':    'COLON',
    '||':   'LOGICAL_OR',
    '&&':   'LOGICAL_AND',
    '==':   'RELATIONAL_OP',
    '=':    'ASSIGN',
    '!=':   'REALTIONAL_OP',
    '<=':   'RELATIONAL_OP',
    '<':    'RELATIONAL_OP',
    '>=':   'RELATIONAL_OP',
    '>':    'RELATIONAL_OP',
    '++':   'INCREMENT',
    '--':   'DECREMENT',
    '+':    'PM',
    '-':    'PM',
    '*':    'MDM',
    '/':    'MDM',
    '%':    'MDM',
    '!':    'NOT',
    '.':    'DOT',
    '[':    'OPEN_BRACKET',
    ']':    'CLOSE_BRACKET',
    '{':    'OPEN_CURLY',
    '}':    'CLOSE_CURLY',
    '(':    'OPEN_PAREN',
    ')':    'CLOSE_PAREN'

}
var s = "ss\\sss\\*ff*\\"

exports.OPERATORS = OPERATORS