import {OllamaEmbeddings} from "@langchain/community/embeddings/ollama"
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


//Get an instance of ollama embeddings
const ollamaEmbeddings = new OllamaEmbeddings({
    baseUrl:"http://192.168.29.118:11434",
    model:"tinydolphin"
});


//Load data from txt file
const loader = new TextLoader("./data.txt");
const docs = await loader.load();

//Create a text splitter
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize:1000,
    separators: ['\n\n','\n',' ',''],
    chunkOverlap: 200
});

//Split the text and get Document list as response
const output = await splitter.splitDocuments(docs);

//Creat embeddings and push it to collection
const vectorStore = await Chroma.fromDocuments(output, ollamaEmbeddings, {
    collectionName: "myLangchainCollection",
    url: "http://localhost:8000", // Optional, will default to this value
});


//Search and see if we are able to get results from similarity search

// Search for the most similar document
const vectorStoreResponse = await vectorStore.similaritySearch("What is langchain", 1);

console.log("Printing docs after similarity search --> ",vectorStoreResponse);