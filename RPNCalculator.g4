// Developed by: Gustavo Bordignon, Caua brito, Carlos eduardo
grammar syntaxCalculator;

// Parser

file : equations EOF;  

// Define the structure of a file consisting of equations
equations : equation+;  

// Define the structure of an equation
equation : LPAREN expression RPAREN;  

// Define the structure of an expression
expression : equation 
        | expression expression math  
        | expression MEM  
        | NUMBER RES  
        | NUMBER  
        | MEM;  

// Define the mathematical operators
math : DIV  
        | POW  
        | PLUS  
        | MULT  
        | MINUS;  



// Lexer

// Define the token for division
DIV : '/';  
// Define the token for exponentiation
POW : '^';  
// Define the token for addition
PLUS : '+';  
// Define the token for multiplication
MULT : '*';  
// Define the token for subtraction
MINUS : '-'; 
// Define the token for left parenthesis
LPAREN : '(';  
// Define the token for right parenthesis
RPAREN : ')';  
// Define the token for the result of the previous calculation
RES : 'RES';  
// Define the token for memory
MEM : 'MEM';  
// Define whitespace token to be ignored
WS: [ \t\n\r\f]+ -> skip ;  
// Define token for numbers
NUMBER : '0' .. '9'+ ('.' ('0'..'9')*)?;
