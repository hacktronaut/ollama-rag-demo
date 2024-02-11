import {OllamaEmbeddings} from "@langchain/community/embeddings/ollama"
import { Ollama } from "@langchain/community/llms/ollama";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import {PromptTemplate} from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers"


const ollamaEmbeddings = new OllamaEmbeddings({
    baseUrl:"http://192.168.29.118:11434",
    model:"tinydolphin"
});

const ollamaLlm = new Ollama({
    baseUrl:"http://192.168.29.118:11434",
    model:"tinydolphin"
});


//Utility function to combine documents
function combineDocuments(docs) {
    return docs.map((doc) => doc.pageContent).join('\n\n');
}


//Get instance of vector store
//We will connect to langchainData collection
const vectorStore = await Chroma.fromExistingCollection(
    ollamaEmbeddings,
    { collectionName: "myLangchainCollection" , url: "http://localhost:8000"},
  );


//Get retriever
const chromaRetriever = vectorStore.asRetriever();

const userQuestion = "What are the three modules provided by langchain?";

//Create a prompt tempalate and convert the user question into standalone question
const simpleQuestionPrompt = PromptTemplate.fromTemplate(`
For following user question convert it into a standalone question
{userQuestion}`);

const simpleQuestionChain = simpleQuestionPrompt.pipe(ollamaLlm).pipe(new StringOutputParser()).pipe(chromaRetriever);

const documents = await simpleQuestionChain.invoke({
    userQuestion: userQuestion
});

//Combine the results into a string
const combinedDocs = combineDocuments(documents);


const questionTemplate = PromptTemplate.fromTemplate(`
    You are a langchain instructor who is good at answering questions raised by new developers or users. Answer the below question using the context.
    Strictly use the context and answer in crisp and point to point.
    <context>
    {context}
    </context>

    question: {userQuestion}
`)


const answerChain = questionTemplate.pipe(ollamaLlm);


const llmResponse = await answerChain.invoke({
    context: combinedDocs,
    userQuestion: userQuestion
});

console.log("Printing llm response --> ",llmResponse);


/**
 Printing llm response -->   The three modules provided by LangChain are Model I/O, Retrieval, and Agents. These modules allow developers to connect with various language models and interact with their data using high-level directives. They can be used to interface with applications that require the use of the Large Language Model (LLM).

Here is a brief explanation of each module:

1. Model I/O: This module provides an interface for connecting with various language models, allowing developers to interact with their data and use them as part of their chain.
2. Retrieval: This module allows developers to retrieve the output of a model or tool, allowing them to use the information in a given sequence.
3. Agents: This module provides a set of tools and APIs for running agents on top of the language models they interact with. Agents can be used to evaluate and analyze results, as well as perform tasks like automated feedback on user input or task completion.

 */













