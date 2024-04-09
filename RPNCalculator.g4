// Developed by: Gustavo Bordignon, Caua brito, Carlos eduardo
grammar RPNCalculator;

// Parser

file : equations EOF;  

equations : equation+;  

equation : LPAREN expression RPAREN;  


expression : equation 
        | expression expression math  
        | expression MEM  
        | NUMBER RES  
        | NUMBER  
        | MEM;  

math : DIV  
        | POW  
        | PLUS  
        | MULT  
        | MINUS;  


// Lexer

DIV : '/';  
POW : '^';  
PLUS : '+';  
MULT : '*';  
MINUS : '-'; 
LPAREN : '(';  
RPAREN : ')';  
RES : 'RES';  
MEM : 'MEM';  
WS: [ \t\n\r\f]+ -> skip ;  
NUMBER : '0' .. '9'+ ('.' ('0'..'9')*)?;  