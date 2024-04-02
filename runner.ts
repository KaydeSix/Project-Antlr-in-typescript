import { CharStreams, CommonTokenStream } from "antlr4ts";
import { syntaxParser } from "./generated/syntaxParser";
import { syntaxLexer } from "./generated/syntaxLexer";
import * as fs from "fs";

// Create the lexer and parser
const code = fs.readFileSync("equations.txt", "utf8");
const inputStream = CharStreams.fromString(code);
const lexer = new syntaxLexer(inputStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new syntaxParser(tokenStream);
const tree = parser.equation();