## ollama-rag-demo

### Overview

Welcome to the ollama-rag-demo app! This application serves as a demonstration of the integration of langchain.js, Ollama, and ChromaDB to showcase question-answering capabilities. With a focus on Retrieval Augmented Generation (RAG), this app enables shows you how to build context-aware QA systems with the latest information.

> Features

    RAG-Powered QA: Implement Retrieval Augmented Generation techniques to enhance language models with additional, up-to-date data for accurate and context-aware responses.

    Dynamic Prompt Templates: Utilize prompt templates to structure user questions, providing context for the language model and improving the quality of generated responses.

    ChromaDB Integration: Connect to ChromaDB, a vector store, to efficiently retrieve relevant information and enhance the QA capabilities of the application.

### Setup

Install Dependencies:

```
npm install
```

##### Configure ollama:

Update the baseUrl and model parameters in OllamaEmbeddings and Ollama instances within your application based on your ollama setup.

```javascript
const ollamaEmbeddings = new OllamaEmbeddings({
    baseUrl:"http://192.168.29.118:11434",
    model:"tinydolphin"
});

const ollamaLlm = new Ollama({
    baseUrl:"http://192.168.29.118:11434",
    model:"tinydolphin"
});

```

##### Configure ChromaDB:

Ensure the collectionName and url parameters in the script match your ChromaDB setup.

```javascript
const vectorStore = await Chroma.fromDocuments(output, ollamaEmbeddings, {
    collectionName: "myLangchainCollection",
    url: "http://localhost:8000", // Optional, will default to this value
});

```

##### Run the Application:

Run loadData.js and push embeddings to vector store

```
cd utility
node loadData.js

```

Run index.js and see AI responses

```
node index.js
```

Sample response

```javascript
/**
 Printing llm response -->   The three modules provided by LangChain are Model I/O, Retrieval, and Agents. These modules allow developers to connect with various language models and interact with their data using high-level directives. They can be used to interface with applications that require the use of the Large Language Model (LLM).

Here is a brief explanation of each module:

1. Model I/O: This module provides an interface for connecting with various language models, allowing developers to interact with their data and use them as part of their chain.
2. Retrieval: This module allows developers to retrieve the output of a model or tool, allowing them to use the information in a given sequence.
3. Agents: This module provides a set of tools and APIs for running agents on top of the language models they interact with. Agents can be used to evaluate and analyze results, as well as perform tasks like automated feedback on user input or task completion.

 */
```

### Usage

Ask a Question:
    Input a user question, and observe how the application leverages RAG to process and generate context-aware responses.

Experiment with Templates:
    Modify prompt templates in the code to explore different ways of structuring questions and extracting relevant information.

Extend Functionality:
    Feel free to expand the application by integrating additional langchain.js features or customizing the behavior based on your requirements.

### Contributions

Contributions to improve or extend the functionality of the ollama-rag-demo are welcome. If you encounter issues or have ideas for enhancements, please submit a GitHub issue or pull request.
License

This application is licensed under the MIT License. Feel free to use, modify, and distribute it according to the terms of the license.