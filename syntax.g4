grammar syntax;

// Parser

equation : expr_list EOF;

expr_list : expr +;

expr : LPAREN expr RPAREN 
        | expr expr MATHOP 
        | expr MOP 
        | MOP expr
        | expr MATHOP
        | NUMBER 
        | MEM;

MATHOP : DIV 
        | POW 
        | PLUS 
        | MULT 
        | MINUS;

MOP : RES | MEM;

// Lexer

RES : 'RES';
MEM : 'MEM';
PLUS : '+';
MINUS : '-';
MULT : '*';
DIV : '/';
POW : '^';
LPAREN : '(';
RPAREN : ')';
WS: [ \t\n\r\f]+ -> skip;
NUMBER: ('0' .. '9')+ ('.' ('0' .. '9')+)?;