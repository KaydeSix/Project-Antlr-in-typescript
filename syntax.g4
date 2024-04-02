grammar syntax;

// Parser

equation : expr_list EOF;

// Expression list consists of one or more expressions
expr_list : expr +;

// Define expression extrutures 
expr : LPAREN expr RPAREN        // Parenthesized expression
        | expr expr MATHOP      // Binary expression with math operation between two sub-expressions
        | expr MOP              // Unary operation before an expression
        | MOP expr              // Unary operation after an expression
        | expr MATHOP           // Math operation applied to a single expression
        | NUMBER                // Single number
        | MEM;                  // Memory variable

// Define math operations
MATHOP : DIV                      // Division
        | POW                    // Exponentiation
        | PLUS                   // Addition
        | MULT                   // Multiplication
        | MINUS;                 // Subtraction

// Define memory operations
MOP : RES                        // Reset memory
    | MEM;                      // Use memory value

// Lexer

RES : 'RES';                      // SET RESET keyword
MEM : 'MEM';                      // SET MEMORY keyword
PLUS : '+';                       // SET Addition operator
MINUS : '-';                      // SET Subtraction operator
MULT : '*';                       // SET Multiplication operator
DIV : '/';                        // SET Division operator
POW : '^';                        // SET Exponentiation operator
LPAREN : '(';                     // SET Left parenthesis
RPAREN : ')';                     // SET Right parenthesis
WS: [ \t\n\r\f]+ -> skip;        // SET Whitespace, ignored in parsing
NUMBER: ('0' .. '9')+ ('.' ('0' .. '9')+)?;  // Number, can include decimal part
