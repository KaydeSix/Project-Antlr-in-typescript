import { CharStreams, CommonTokenStream } from "antlr4ts";
import { RPNCalculatorParser } from "./generated/RPNCalculatorParser";
import { RPNCalculatorLexer } from "./generated/RPNCalculatorLexer";
import * as fs from "fs";
import PDFDocument from "pdfkit";

// Function to print a parse tree to a PDF document in a detailed format
function printParseTreeDetailedPdf(doc: any, tree: any, depth: number = 0, parentIndent: string = "") {
    // Generate indentation based on the depth of the current node
    const indent = "    ".repeat(depth);
    const currentIndent = parentIndent + indent;

    // Check if the current node has children
    if (tree.children) {
        // Print the constructor name of the current node to the PDF document
        doc.text(`${currentIndent}${tree.constructor.name}:`);
        
        // Iterate through the children of the current node
        for (let i = 0; i < tree.children.length; i++) {
            const isLast = i === tree.children.length - 1;
            const child = tree.children[i];
            const childIndent = isLast ? "└── " : "├── ";
            
            // Check if the child node has children
            if (child.children && child.children.length > 0) {
                // If child has children, print its constructor name and recursively call the function
                doc.text(`${currentIndent}${childIndent}${child.constructor.name}:`);
                printParseTreeDetailedPdf(doc, child, depth + 1, currentIndent + (isLast ? "    " : "│   "));
            } else {
                // If child has no children, print its constructor name and text content
                doc.text(`${currentIndent}${childIndent}${child.constructor.name}: ${child.text}`);
            }
        }
    } else {
        // If the current node has no children, print its constructor name and text content
        doc.text(`${currentIndent}${tree.constructor.name}: ${tree.text}`);
    }
}

// Function to print a parse tree to the console in a detailed format
function printParseTreeDetailed(tree: any, depth: number = 0, parentIndent: string = "") {
    // Generate indentation based on the depth of the current node
    const indent = "    ".repeat(depth);
    const currentIndent = parentIndent + indent;

    // Check if the current node has children
    if (tree.children) {
        // Print the constructor name of the current node to the console
        console.log(`${currentIndent}${tree.constructor.name}:`);
        
        // Iterate through the children of the current node
        for (let i = 0; i < tree.children.length; i++) {
            const isLast = i === tree.children.length - 1;
            const child = tree.children[i];
            const childIndent = isLast ? "└── " : "├── ";
            
            // Check if the child node has children
            if (child.children && child.children.length > 0) {
                // If child has children, print its constructor name and recursively call the function
                console.log(`${currentIndent}${childIndent}${child.constructor.name}:`);
                printParseTreeDetailed(child, depth + 1, currentIndent + (isLast ? "    " : "│   "));
            } else {
                // If child has no children, print its constructor name and text content
                console.log(`${currentIndent}${childIndent}${child.constructor.name}: ${child.text}`);
            }
        }
    } else {
        // If the current node has no children, print its constructor name and text content
        console.log(`${currentIndent}${tree.constructor.name}: ${tree.text}`);
    }
}

// Read the contents of the "EXAMPLE.txt" file
const code = fs.readFileSync("EXAMPLE.txt", "utf8");

// Create an input stream of characters from the code
const inputStream = CharStreams.fromString(code);

// Create a lexer that reads from the input stream
const lexer = new RPNCalculatorLexer(inputStream);

// Create a token stream from the lexer
const tokenStream = new CommonTokenStream(lexer);

// Create a parser that reads from the token stream
const parser = new RPNCalculatorParser(tokenStream);

// Parse the input and generate the parse tree
const tree = parser.file();

// Create a new PDF document
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('parse_tree.pdf'));

// Reduce font size for smaller text
doc.fontSize(2);

// Print the parse tree to the PDF
printParseTreeDetailedPdf(doc, tree);

// Finalize the PDF document
doc.end();

console.log("PDD generated with success");



printParseTreeDetailed(tree);
