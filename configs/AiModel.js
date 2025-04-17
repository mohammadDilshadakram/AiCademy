const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  const generationConfig2 = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  
    export const courseOutlineAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a study material for react for exam and level of difficulty will be Easy with summary of course,tutle of the course, list of chapters along with summary for each chapter topic list in each chapter, All result in JSON format"},

          ],
        },
        {
          role: "model",
          parts: [
                     {text: "```json\n{\n  \"courseTitle\": \"React Fundamentals for Beginners\",\n  \"courseSummary\": \"This course provides a gentle introduction to React, covering the fundamental concepts and techniques needed to build simple React applications.  It focuses on practical application and avoids complex topics suitable for beginners.\",\n  \"chapters\": [\n    {\n      \"chapterTitle\": \"Introduction to React\",\n      \"chapterSummary\": \"This chapter introduces React, its core concepts, and why it's used for building user interfaces.  We'll also set up our development environment.\",\n      \"topics\": [\n        \"What is React?\",\n        \"Why use React?\",\n        \"Setting up a React development environment (using Create React App)\",\n        \"JSX: JavaScript XML\",\n        \"Components: Functional and Class Components (basic overview)\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"JSX and Components\",\n      \"chapterSummary\": \"This chapter dives deeper into JSX and building reusable components. We will explore props and how to pass data between them.\",\n      \"topics\": [\n        \"Detailed explanation of JSX syntax\",\n        \"Creating functional components\",\n        \"Understanding props and passing data to components\",\n        \"Rendering lists in React using `map()`\",\n        \"Conditional rendering (using `if` statements and ternary operators)\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"State and Events\",\n      \"chapterSummary\": \"This chapter explores how to manage data within components using state and how to handle user interactions using events.\",\n      \"topics\": [\n        \"Introduction to component state using `useState` hook\",\n        \"Handling events (e.g., onClick, onChange)\",\n        \"Updating state based on events\",\n        \"Simple state management techniques\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Forms in React\",\n      \"chapterSummary\": \"This chapter covers building forms in React, handling form submission, and managing form data.\",\n      \"topics\": [\n        \"Controlled vs. uncontrolled components\",\n        \"Handling form input changes\",\n        \"Submitting forms and preventing default behavior\",\n        \"Basic form validation\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Lists and Keys\",\n      \"chapterSummary\": \"This chapter explains how to efficiently render lists of data in React and the importance of using keys for optimal performance.\",\n      \"topics\": [\n        \"Rendering lists of data\",\n        \"The importance of unique keys\",\n        \"Troubleshooting common list rendering issues\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Styling in React\",\n      \"chapterSummary\": \"This chapter introduces different ways to style React components, including inline styles, CSS modules, and styled-components (brief overview).\",\n      \"topics\": [\n        \"Inline styles\",\n        \"CSS modules (basic concept)\",\n        \"External CSS files\"\n      ]\n    }\n  ]\n}\n```\n"},

          ],
        },
      ],
    });


   export const generateNotesAiModel = model.startChat({
      generationConfig2,
      history: [
        {
          role: "user",
          parts: [
            {text: "generate exam material detail content for each chapter, make sure to include all topics point in the content,make sure to give content in html format (Do not include htmlkl,head ,body,title tag)\nthe chapters:\n  \"chapterTitle\": \"Advanced State Management with Redux Toolkit\",\n      \"chapterSummary\": \"This chapter delves into advanced state management techniques using Redux Toolkit, emphasizing efficient data handling and architectural best practices for large-scale applications.\",\n      \"topics\": [\n        \"Redux fundamentals (reducers, actions, store)\",\n        \"Redux Toolkit: createSlice, createAsyncThunk\",\n        \"Middleware: Logging, error handling, asynchronous operations\",\n        \"Normalizing state: Improving data structure and performance\",\n        \"Advanced selectors and data transformations\",\n        \"Testing Redux reducers and actions\""},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```html\n<h1>Advanced State Management with Redux Toolkit</h1>\n\n<p>This chapter explores advanced state management strategies using Redux Toolkit, focusing on effective data management and architectural best practices for complex applications.</p>\n\n<h2>Redux Fundamentals (Reducers, Actions, Store)</h2>\n<ul>\n  <li>Defining actions and action creators</li>\n  <li>Creating reducers with immutability best practices</li>\n  <li>Setting up the Redux store and integrating it with a React application</li>\n  <li>Understanding the Redux data flow (dispatching actions, updating the state)</li>\n  <li>Using the <code>connect</code> function (or equivalent hooks) to connect components to the store.</li>\n  <li>Practice exercises: Building a simple counter app using basic Redux.</li>\n</ul>\n\n\n<h2>Redux Toolkit: createSlice, createAsyncThunk</h2>\n<ul>\n  <li>Introduction to Redux Toolkit and its benefits</li>\n  <li>Using <code>createSlice</code> to simplify reducer creation</li>\n  <li>Handling asynchronous operations with <code>createAsyncThunk</code></li>\n  <li>Managing loading states, success states, and error states with <code>createAsyncThunk</code></li>\n  <li>Example: Fetching data from an API using <code>createAsyncThunk</code></li>\n  <li>Practice exercises: Building an app that fetches and displays data from an API.</li>\n</ul>\n\n\n<h2>Middleware: Logging, Error Handling, Asynchronous Operations</h2>\n<ul>\n  <li>Understanding middleware and its role in the Redux lifecycle</li>\n  <li>Implementing logging middleware to monitor actions and state changes</li>\n  <li>Creating custom middleware for error handling and centralized error logging</li>\n  <li>Using middleware to handle asynchronous operations (alternatives to <code>createAsyncThunk</code>)</li>\n  <li>Example: Implementing a custom middleware for API request logging and error handling</li>\n  <li>Practice exercises: Adding logging and error handling middleware to a Redux application</li>\n</ul>\n\n\n<h2>Normalizing State: Improving Data Structure and Performance</h2>\n<ul>\n  <li>Understanding the challenges of deeply nested state structures</li>\n  <li>Implementing normalized state structures using entity IDs and lookup tables</li>\n  <li>Benefits of normalized state: Improved performance and reduced redundancy</li>\n  <li>Example: Normalizing a state structure with related entities</li>\n  <li>Practice exercises: Normalizing the state of an application with multiple related data entities.</li>\n</ul>\n\n\n<h2>Advanced Selectors and Data Transformations</h2>\n<ul>\n  <li>Creating custom selectors for derived data</li>\n  <li>Using <code>reselect</code> library for memoization of selectors</li>\n  <li>Advanced selector techniques: combining selectors, filtering data, and transforming data</li>\n  <li>Example: Implementing complex selectors to calculate aggregate statistics from normalized data.</li>\n  <li>Practice exercises: Creating efficient and reusable selectors for various data transformations.</li>\n</ul>\n\n\n<h2>Testing Redux Reducers and Actions</h2>\n<ul>\n  <li>Writing unit tests for reducers using assertion libraries (e.g., Jest, Chai)</li>\n  <li>Testing action creators to ensure they produce the correct action objects</li>\n  <li>Techniques for testing asynchronous actions with <code>createAsyncThunk</code></li>\n  <li>Example: Writing comprehensive unit tests for reducers and actions</li>\n  <li>Practice exercises: Writing unit tests for a given Redux application.</li>\n</ul>\n```\n"},
          ],
        },
      ],
    });

    //generate the flashcard on topic :Flutter Fundamentals user Interface (UI) Development , Basic app navigation in json format with front back content ,Maximum 15
    export const GenerateStudyTypeContentAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "generate the flashcard on topic :Flutter Fundamentals user Interface (UI) Development , Basic app navigation in json format with front back content ,Maximum 15"},
          ],
        },
        {
          role: "model",
          parts: [ 
            {text: "```json\n[\n  {\n    \"front\": \"What is a `Navigator` in Flutter?\",\n    \"back\": \"A `Navigator` is a widget that manages a stack of `Route` objects, allowing you to move between screens (pages) in your app.\"\n  },\n  {\n    \"front\": \"What is a `Route` in Flutter?\",\n    \"back\": \"A `Route` represents a screen or a page in your application. It defines the visual content and transition behavior when navigating to or from it.\"\n  },\n  {\n    \"front\": \"How do you navigate to a new screen using a named route?\",\n    \"back\": \"Use `Navigator.pushNamed(context, '/routeName');`. You must have the named route defined in your `MaterialApp`.\"\n  },\n    {\n    \"front\": \"How do you navigate to a new screen with a generated route?\",\n    \"back\": \"Use `Navigator.push(context, MaterialPageRoute(builder: (context) => NewScreen()));`\"\n  },\n  {\n    \"front\": \"How do you return to the previous screen?\",\n      \"back\":\"Use `Navigator.pop(context);`\"\n  },\n  {\n     \"front\":\"What is `MaterialApp`?\",\n      \"back\": \"It's a fundamental widget that sets up app-wide configurations like routes, theme, and title for Material Design.\"\n  },\n  {\n    \"front\": \"What is the main purpose of `routes` in `MaterialApp`?\",\n    \"back\": \"To define the mapping between named routes (strings) and the widgets that represent those screens. It helps with navigation.\"\n  },\n    {\n        \"front\": \"What is `initialRoute` in `MaterialApp`?\",\n        \"back\": \"Specifies the route that the app will navigate to when it first starts (default is `/`).\"\n    },\n  {\n      \"front\": \"What is the use of `onGenerateRoute` in `MaterialApp`?\",\n      \"back\": \"It allows for more complex route generation, handling dynamic route parameters, and controlling the navigation logic.\"\n  },\n  {\n    \"front\": \"What is the difference between `push` and `pushReplacementNamed`?\",\n    \"back\": \"`push` adds a new route on top of the stack, while `pushReplacementNamed` replaces the current route with a new one. The replaced route cannot be popped back\"\n  },\n  {\n    \"front\": \"What is the use of `popAndPushNamed`?\",\n    \"back\":\"It pops the current screen from the navigation stack and then pushes a new screen.\"\n  },\n  {\n    \"front\":\"What is the use of `ModalRoute.of(context)`?\",\n    \"back\":\"It used to access the properties of the current route, useful for retrieving route arguments.\"\n  },\n    {\n    \"front\": \"What is a `Scaffold` widget?\",\n    \"back\": \"A layout structure providing basic visual elements like an app bar, body, and floating action button.\"\n  },\n  {\n    \"front\": \"What are some common widgets you might use in the `body` of a `Scaffold`?\",\n    \"back\": \"Container, Column, Row, ListView, GridView, etc. These are used to build the content of the screen.\"\n  },\n {\n    \"front\": \"What is `AppBar` widget?\",\n    \"back\": \"A widget that appears at the top of the screen, typically displaying a title, actions, and back button.\"\n }\n]\n```\n"},
          ],
        },
      ],
    });



    export const GenerateQuizAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "generate quiz on topic: flutter fundamentals user interfcae ui development, basics App navigation with question and options along with correct answer in json format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"quizTitle\": \"Flutter Fundamentals: UI Development & App Navigation\",\n  \"questions\": [\n    {\n      \"questionNumber\": 1,\n      \"questionText\": \"Which widget is the fundamental building block for UI in Flutter?\",\n      \"options\": [\n        \"Container\",\n        \"Widget\",\n        \"Text\",\n        \"Row\"\n      ],\n      \"correctAnswer\": \"Widget\"\n    },\n    {\n      \"questionNumber\": 2,\n      \"questionText\": \"What is the purpose of the `build` method in a Flutter widget?\",\n      \"options\": [\n        \"To define the widget's visual appearance\",\n        \"To handle user input\",\n        \"To manage the widget's state\",\n        \"To initialize the widget\"\n      ],\n      \"correctAnswer\": \"To define the widget's visual appearance\"\n    },\n    {\n       \"questionNumber\": 3,\n      \"questionText\": \"Which widget is used to display a single line of text?\",\n       \"options\": [\n        \"TextField\",\n        \"Text\",\n        \"RichText\",\n        \"Label\"\n      ],\n      \"correctAnswer\": \"Text\"\n    },\n    {\n      \"questionNumber\": 4,\n      \"questionText\": \"How do you arrange widgets horizontally in Flutter?\",\n      \"options\": [\n        \"Using a Column widget\",\n        \"Using a Stack widget\",\n        \"Using a Row widget\",\n        \"Using a Container widget\"\n      ],\n      \"correctAnswer\": \"Using a Row widget\"\n    },\n      {\n      \"questionNumber\": 5,\n      \"questionText\": \"Which widget allows you to stack widgets on top of each other?\",\n       \"options\": [\n        \"Column\",\n        \"Row\",\n        \"Stack\",\n         \"ListView\"\n      ],\n      \"correctAnswer\": \"Stack\"\n    },\n     {\n      \"questionNumber\": 6,\n      \"questionText\": \"What is the purpose of the `Navigator` class in Flutter?\",\n      \"options\": [\n        \"To manage the layout of widgets\",\n        \"To handle user gestures\",\n        \"To manage navigation between screens\",\n        \"To perform network requests\"\n      ],\n        \"correctAnswer\": \"To manage navigation between screens\"\n    },\n     {\n      \"questionNumber\": 7,\n      \"questionText\": \"Which method is used to push a new screen onto the navigation stack?\",\n       \"options\": [\n        \"pushReplacementNamed\",\n        \"pop\",\n        \"pushNamed\",\n        \"navigate\"\n      ],\n      \"correctAnswer\": \"pushNamed\"\n    },\n    {\n      \"questionNumber\": 8,\n      \"questionText\": \"How do you return to the previous screen in Flutter's navigation?\",\n      \"options\": [\n        \"By calling `pushNamed`\",\n        \"By calling `pop`\",\n        \"By calling `setState`\",\n        \"By calling `build`\"\n      ],\n       \"correctAnswer\": \"By calling `pop`\"\n    },\n    {\n        \"questionNumber\": 9,\n        \"questionText\":\"What is the use of MaterialPageRoute in flutter navigation?\",\n        \"options\":[\n            \"To manage application state\",\n            \"To create a route with material design animations\",\n            \"To create a custom route with no animations\",\n            \"To handle app configurations\"\n        ],\n        \"correctAnswer\":\"To create a route with material design animations\"\n    },\n    {\n      \"questionNumber\": 10,\n      \"questionText\": \"What is a 'Named Route' in Flutter navigation?\",\n      \"options\": [\n        \"A route that has a predefined name associated with it\",\n        \"A route that is only used for one specific screen\",\n        \"A route that cannot be popped\",\n        \"A route that does not require a builder function\"\n      ],\n      \"correctAnswer\": \"A route that has a predefined name associated with it\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });




  
//     const result = await courseOutlineAiModel.sendMessage("Provide detailed React concepts for intermediate learners.");
// console.log(result.response.text());

 