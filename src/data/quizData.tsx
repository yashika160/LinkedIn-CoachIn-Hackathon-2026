export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  correctAnswer?: string;
  explanation: string;
};

export const quizData = [
  /* =========================================================
      💻 SOFTWARE ENGINEER
  ========================================================= */

  {
    role: "Software Engineer",
    subjects: [
      {
        subject: "DSA",
        questions: [
          {
            question: "Which data structure follows LIFO?",
            options: ["Queue", "Stack", "Array", "Graph"],
            answer: "Stack",
            explanation: "Stack follows Last In First Out principle."
          },
          {
            question: "Time complexity of binary search?",
            options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
            answer: "O(log n)",
            explanation: "Binary search divides search space by half."
          },
          {
            question: "Which structure is used in recursion?",
            options: ["Queue", "Stack", "Heap", "Tree"],
            answer: "Stack",
            explanation: "Function calls use stack memory."
          },
          {
            question: "Which traversal gives sorted BST output?",
            options: ["Preorder", "Postorder", "Inorder", "Level order"],
            answer: "Inorder",
            explanation: "Inorder traversal of BST gives sorted result."
          },
          {
            question: "Which algorithm finds shortest path?",
            options: ["DFS", "BFS", "Dijkstra", "KMP"],
            answer: "Dijkstra",
            explanation: "Dijkstra is used for weighted shortest path."
          },
          {
            question: "Which DS gives O(1) lookup?",
            options: ["Array", "Linked List", "HashMap", "Stack"],
            answer: "HashMap",
            explanation: "Hashing gives constant time lookup."
          },
          {
            question: "Which sorting is stable?",
            options: ["Quick Sort", "Merge Sort", "Heap Sort", "Selection Sort"],
            answer: "Merge Sort",
            explanation: "Merge sort maintains order of equal elements."
          },
          {
            question: "Worst case QuickSort complexity?",
            options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
            answer: "O(n²)",
            explanation: "Worst case happens with bad pivot selection."
          },
          {
            question: "Which DS used in undo operations?",
            options: ["Queue", "Stack", "Tree", "Graph"],
            answer: "Stack",
            explanation: "Undo uses LIFO structure."
          },
          {
            question: "Cycle detection in graph?",
            options: ["DFS only", "Union Find", "Binary Search", "Heap"],
            answer: "Union Find",
            explanation: "Union Find detects cycles efficiently."
          }
        ]
      },

      {
        subject: "Git & GitHub",
        questions: [
          {
            question: "Which command initializes a new Git repository?",
            options: ["git start", "git init", "git create", "git new"],
            answer: "git init",
            explanation: "git init creates a new local repository."
          },
          {
            question: "How do you stage all changes for commit?",
            options: ["git commit -a", "git add .", "git push", "git stage"],
            answer: "git add .",
            explanation: "git add . stages all changes in the current directory."
          },
          {
            question: "Which command creates a new branch?",
            options: ["git new branch", "git branch <name>", "git checkout branch", "git push branch"],
            answer: "git branch <name>",
            explanation: "git branch <name> creates a new branch."
          },
          {
            question: "How do you merge a branch into main?",
            options: ["git merge <branch>", "git combine", "git pull branch", "git add branch"],
            answer: "git merge <branch>",
            explanation: "git merge integrates changes from another branch."
          },
          {
            question: "What does git stash do?",
            options: ["Deletes changes", "Saves changes temporarily", "Commits changes", "Pushes changes"],
            answer: "Saves changes temporarily",
            explanation: "git stash temporarily shelves uncommitted changes."
          },
          {
            question: "How do you view commit history?",
            options: ["git history", "git log", "git show", "git status"],
            answer: "git log",
            explanation: "git log shows the commit history."
          },
          {
            question: "What is a pull request?",
            options: ["Download code", "Propose changes to a repository", "Delete a branch", "Force push"],
            answer: "Propose changes to a repository",
            explanation: "Pull requests are used to propose and review code changes."
          },
          {
            question: "How do you undo the last commit but keep changes?",
            options: ["git revert HEAD", "git reset HEAD~1", "git checkout HEAD", "git rollback"],
            answer: "git reset HEAD~1",
            explanation: "git reset HEAD~1 undoes the last commit while keeping changes staged."
          },
          {
            question: "What does git clone do?",
            options: ["Creates a new repo", "Copies a remote repository locally", "Merges branches", "Deletes a repository"],
            answer: "Copies a remote repository locally",
            explanation: "git clone downloads a full copy of a remote repository."
          },
          {
            question: "What is a .gitignore file?",
            options: ["Stores git config", "Lists files to ignore from tracking", "Shows git logs", "Defines merge strategy"],
            answer: "Lists files to ignore from tracking",
            explanation: ".gitignore specifies files that Git should not track."
          }
        ]
      },

      {
        subject: "HTML/CSS/JS",
        questions: [
          {
            question: "What does HTML stand for?",
            options: ["HyperText Markup Language", "High Text Machine Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
            answer: "HyperText Markup Language",
            explanation: "HTML is the standard markup language for web pages."
          },
          {
            question: "Which CSS property controls text size?",
            options: ["text-size", "font-size", "size", "letter-size"],
            answer: "font-size",
            explanation: "font-size sets the size of the text."
          },
          {
            question: "How do you select an element with id='header' in CSS?",
            options: [".header", "#header", "header", "*header"],
            answer: "#header",
            explanation: "The # selector targets elements by their id."
          },
          {
            question: "Which JS method adds an element at the end of an array?",
            options: ["append()", "push()", "add()", "insert()"],
            answer: "push()",
            explanation: "Array.push() adds one or more elements to the end."
          },
          {
            question: "What is the correct way to declare a variable in modern JS?",
            options: ["var x = 5", "let x = 5", "set x = 5", "define x = 5"],
            answer: "let x = 5",
            explanation: "let is the modern block-scoped variable declaration."
          },
          {
            question: "Which HTML tag is used for the largest heading?",
            options: ["<h6>", "<heading>", "<h1>", "<head>"],
            answer: "<h1>",
            explanation: "<h1> defines the most important heading."
          },
          {
            question: "What is Flexbox used for?",
            options: ["Animations", "One-dimensional layout", "Grid layout", "Color management"],
            answer: "One-dimensional layout",
            explanation: "Flexbox is a one-dimensional CSS layout model."
          },
          {
            question: "How do you write an arrow function in JS?",
            options: ["function => {}", "const fn = () => {}", "arrow fn() {}", "def fn() {}"],
            answer: "const fn = () => {}",
            explanation: "Arrow functions use the => syntax."
          },
          {
            question: "Which HTML attribute specifies a link destination?",
            options: ["src", "href", "link", "url"],
            answer: "href",
            explanation: "href specifies the URL for anchor tags."
          },
          {
            question: "What does CSS z-index control?",
            options: ["Zoom level", "Stacking order of elements", "Font size", "Border radius"],
            answer: "Stacking order of elements",
            explanation: "z-index controls which elements appear in front."
          }
        ]
      },

      {
        subject: "React + Tailwind",
        questions: [
          {
            question: "Which hook is used to manage state in React?",
            options: ["useEffect", "useContext", "useState", "useRef"],
            answer: "useState",
            explanation: "useState is the primary hook for managing component state."
          },
          {
            question: "Which hook runs side effects in React?",
            options: ["useState", "useEffect", "useReducer", "useMemo"],
            answer: "useEffect",
            explanation: "useEffect runs after every render by default."
          },
          {
            question: "What is JSX?",
            options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extra"],
            answer: "JavaScript XML",
            explanation: "JSX is a syntax extension that lets you write HTML in JavaScript."
          },
          {
            question: "How do you pass data to a child component in React?",
            options: ["state", "props", "context", "refs"],
            answer: "props",
            explanation: "Props are used to pass data from parent to child components."
          },
          {
            question: "Which Tailwind class adds a top margin of 4 units?",
            options: ["m-4", "mt-4", "margin-top-4", "top-4"],
            answer: "mt-4",
            explanation: "mt-4 in Tailwind sets margin-top: 1rem."
          },
          {
            question: "What does the key prop do in React lists?",
            options: ["Styles the element", "Helps React identify changed items", "Adds an event listener", "Sets focus"],
            answer: "Helps React identify changed items",
            explanation: "Keys help React efficiently update the DOM."
          },
          {
            question: "Which Tailwind class makes text blue?",
            options: ["color-blue-500", "text-blue-500", "font-blue-500", "blue-text-500"],
            answer: "text-blue-500",
            explanation: "text-{color} sets the text color in Tailwind."
          },
          {
            question: "What is a controlled component in React?",
            options: ["A component with no props", "A component whose form data is handled by React state", "A styled component", "A server component"],
            answer: "A component whose form data is handled by React state",
            explanation: "Controlled components use state to manage form input values."
          },
          {
            question: "Which Tailwind class makes a div a flex container?",
            options: ["display-flex", "flexbox", "flex", "d-flex"],
            answer: "flex",
            explanation: "Adding 'flex' class sets display: flex in Tailwind."
          },
          {
            question: "What does useContext hook do?",
            options: ["Fetches API data", "Manages local state", "Consumes a React context", "Handles routing"],
            answer: "Consumes a React context",
            explanation: "useContext lets you subscribe to React context."
          }
        ]
      },

      {
        subject: "Node.js",
        questions: [
          {
            question: "What is Node.js?",
            options: ["A browser", "A JavaScript runtime built on Chrome V8", "A database", "A CSS framework"],
            answer: "A JavaScript runtime built on Chrome V8",
            explanation: "Node.js allows JavaScript to run on the server side."
          },
          {
            question: "Which module handles file operations in Node.js?",
            options: ["path", "fs", "http", "os"],
            answer: "fs",
            explanation: "The fs (file system) module provides file I/O operations."
          },
          {
            question: "What does npm stand for?",
            options: ["Node Package Module", "Node Package Manager", "New Project Manager", "Node Project Module"],
            answer: "Node Package Manager",
            explanation: "npm is the default package manager for Node.js."
          },
          {
            question: "Which method creates an HTTP server in Node.js?",
            options: ["http.createServer()", "server.start()", "http.listen()", "createApp()"],
            answer: "http.createServer()",
            explanation: "http.createServer() creates an HTTP server instance."
          },
          {
            question: "What is Express.js?",
            options: ["A database ORM", "A web framework for Node.js", "A task runner", "A testing library"],
            answer: "A web framework for Node.js",
            explanation: "Express is a minimal and flexible Node.js web application framework."
          },
          {
            question: "What is middleware in Express?",
            options: ["A database layer", "Functions that execute during the request-response cycle", "Frontend templates", "Static file hosting"],
            answer: "Functions that execute during the request-response cycle",
            explanation: "Middleware functions have access to req, res, and next."
          },
          {
            question: "How do you read an environment variable in Node?",
            options: ["env.VAR", "process.env.VAR", "config.VAR", "env.get('VAR')"],
            answer: "process.env.VAR",
            explanation: "Environment variables are accessed via process.env."
          },
          {
            question: "What is the event loop in Node.js?",
            options: ["A CSS animation loop", "A mechanism to handle async operations non-blockingly", "A database query loop", "A render loop"],
            answer: "A mechanism to handle async operations non-blockingly",
            explanation: "The event loop allows Node.js to perform non-blocking I/O operations."
          },
          {
            question: "What does async/await do in Node.js?",
            options: ["Runs code in parallel threads", "Simplifies working with Promises", "Adds delay to code", "Handles errors only"],
            answer: "Simplifies working with Promises",
            explanation: "async/await is syntactic sugar over Promises for cleaner async code."
          },
          {
            question: "Which Node.js module manages paths?",
            options: ["url", "path", "dir", "file"],
            answer: "path",
            explanation: "The path module provides utilities for working with file paths."
          }
        ]
      },

      {
        subject: "Databases",
        questions: [
          {
            question: "What does SQL stand for?",
            options: ["Structured Query Language", "Simple Query Logic", "Standard Query Language", "System Query Language"],
            answer: "Structured Query Language",
            explanation: "SQL is a domain-specific language for managing relational databases."
          },
          {
            question: "Which SQL command retrieves data?",
            options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
            answer: "SELECT",
            explanation: "SELECT is used to query and retrieve data."
          },
          {
            question: "What is a primary key?",
            options: ["The first column", "A unique identifier for each row", "An encrypted field", "A foreign reference"],
            answer: "A unique identifier for each row",
            explanation: "Primary keys uniquely identify each record in a table."
          },
          {
            question: "What does a JOIN do in SQL?",
            options: ["Deletes rows", "Combines rows from two or more tables", "Creates a new table", "Updates data"],
            answer: "Combines rows from two or more tables",
            explanation: "JOIN combines records from multiple tables based on a condition."
          },
          {
            question: "What is indexing used for?",
            options: ["Encrypting data", "Speeding up query performance", "Backing up data", "Adding constraints"],
            answer: "Speeding up query performance",
            explanation: "Indexes allow the database engine to find data faster."
          },
          {
            question: "What is a foreign key?",
            options: ["A key from another server", "A field referencing the primary key of another table", "An encrypted key", "A composite key"],
            answer: "A field referencing the primary key of another table",
            explanation: "Foreign keys establish relationships between tables."
          },
          {
            question: "Which type of database is MongoDB?",
            options: ["Relational", "NoSQL (Document)", "Graph", "Column-family"],
            answer: "NoSQL (Document)",
            explanation: "MongoDB stores data as BSON documents in collections."
          },
          {
            question: "What is normalization in databases?",
            options: ["Encrypting data", "Organising data to reduce redundancy", "Indexing columns", "Adding constraints"],
            answer: "Organising data to reduce redundancy",
            explanation: "Normalization reduces data redundancy and improves integrity."
          },
          {
            question: "What does ACID stand for in databases?",
            options: ["Access, Control, Index, Data", "Atomicity, Consistency, Isolation, Durability", "Automated, Clean, Integrated, Distributed", "None of the above"],
            answer: "Atomicity, Consistency, Isolation, Durability",
            explanation: "ACID properties ensure reliable database transactions."
          },
          {
            question: "What is a transaction in a database?",
            options: ["A backup", "A sequence of operations treated as a single unit", "An index update", "A stored procedure"],
            answer: "A sequence of operations treated as a single unit",
            explanation: "Transactions ensure data integrity through ACID properties."
          }
        ]
      },

      {
        subject: "System Design",
        questions: [
          {
            question: "What is horizontal scaling?",
            options: ["Adding more RAM to a server", "Adding more servers to handle load", "Upgrading CPU", "Partitioning a database"],
            answer: "Adding more servers to handle load",
            explanation: "Horizontal scaling (scale-out) adds more machines to distribute load."
          },
          {
            question: "What is a CDN?",
            options: ["A type of database", "A network that serves content from nearby servers", "A CSS framework", "A DNS provider"],
            answer: "A network that serves content from nearby servers",
            explanation: "CDN improves performance by serving content from geographically closer servers."
          },
          {
            question: "What is caching used for in system design?",
            options: ["Permanent data storage", "Storing frequently accessed data for fast retrieval", "Logging errors", "Encrypting data"],
            answer: "Storing frequently accessed data for fast retrieval",
            explanation: "Caching reduces latency and database load by storing hot data in memory."
          },
          {
            question: "What is a load balancer?",
            options: ["A CPU management tool", "Distributes incoming traffic across multiple servers", "A database optimizer", "A firewall"],
            answer: "Distributes incoming traffic across multiple servers",
            explanation: "Load balancers prevent any single server from becoming a bottleneck."
          },
          {
            question: "What is the CAP theorem?",
            options: ["A security principle", "Consistency, Availability, Partition Tolerance trade-off", "A CPU architecture", "Cache Access Protocol"],
            answer: "Consistency, Availability, Partition Tolerance trade-off",
            explanation: "CAP theorem states a distributed system can only guarantee 2 of 3 properties."
          },
          {
            question: "What is a message queue?",
            options: ["A browser queue", "An async communication buffer between services", "A database table", "A priority list"],
            answer: "An async communication buffer between services",
            explanation: "Message queues decouple producers and consumers in distributed systems."
          },
          {
            question: "What is sharding in databases?",
            options: ["Encrypting data", "Splitting data horizontally across multiple databases", "Indexing all columns", "Creating backups"],
            answer: "Splitting data horizontally across multiple databases",
            explanation: "Sharding distributes data across shards to improve performance."
          },
          {
            question: "What is the difference between SQL and NoSQL?",
            options: ["SQL is faster", "SQL uses tables, NoSQL uses flexible models", "NoSQL is always better", "They are the same"],
            answer: "SQL uses tables, NoSQL uses flexible models",
            explanation: "SQL is relational; NoSQL can be document, key-value, column, or graph-based."
          },
          {
            question: "What is eventual consistency?",
            options: ["Immediate sync across all nodes", "Data will become consistent over time", "Only one node holds data", "Consistency is not guaranteed"],
            answer: "Data will become consistent over time",
            explanation: "Eventual consistency means replicas will sync eventually, not immediately."
          },
          {
            question: "What is a microservices architecture?",
            options: ["A monolithic app", "An app split into small, independently deployable services", "A frontend pattern", "A database pattern"],
            answer: "An app split into small, independently deployable services",
            explanation: "Microservices break an application into loosely coupled services."
          }
        ]
      }
    ]
  },

  /* =========================================================
      🤖 AI/ML ENGINEER
  ========================================================= */

  {
    role: "AI/ML Engineer",
    subjects: [
      {
        subject: "Python for ML",
        questions: [
          {
            question: "Which library is primarily used for ML in Python?",
            options: ["NumPy", "Scikit-learn", "Matplotlib", "Flask"],
            answer: "Scikit-learn",
            explanation: "Scikit-learn provides simple ML tools for Python."
          },
          {
            question: "What does NumPy primarily provide?",
            options: ["Database access", "N-dimensional array operations", "Web requests", "Plotting"],
            answer: "N-dimensional array operations",
            explanation: "NumPy provides fast numerical array operations."
          },
          {
            question: "Which pandas method reads a CSV file?",
            options: ["pd.load_csv()", "pd.read_csv()", "pd.open_csv()", "pd.import_csv()"],
            answer: "pd.read_csv()",
            explanation: "pd.read_csv() is the standard way to load CSV files."
          },
          {
            question: "What is list comprehension in Python?",
            options: ["A class method", "A concise way to create lists", "A loop type", "A sorting algorithm"],
            answer: "A concise way to create lists",
            explanation: "[x for x in range(10)] creates a list concisely."
          },
          {
            question: "What is a decorator in Python?",
            options: ["A UI tool", "A function that wraps another function", "A data type", "A loop modifier"],
            answer: "A function that wraps another function",
            explanation: "Decorators modify or enhance functions without changing their source code."
          },
          {
            question: "What does df.describe() show?",
            options: ["Column names", "Statistical summary of numeric columns", "Data types", "Null values"],
            answer: "Statistical summary of numeric columns",
            explanation: "describe() shows count, mean, std, min, and max for numeric data."
          },
          {
            question: "Which method checks for null values in pandas?",
            options: ["df.isnull()", "df.nulls()", "df.check_na()", "df.find_null()"],
            answer: "df.isnull()",
            explanation: "df.isnull() returns a boolean DataFrame indicating null values."
          },
          {
            question: "What is a generator in Python?",
            options: ["A class factory", "A function that yields values lazily", "A dictionary method", "An async function"],
            answer: "A function that yields values lazily",
            explanation: "Generators produce items one at a time using yield, saving memory."
          },
          {
            question: "How do you split data into train and test sets?",
            options: ["df.split()", "train_test_split()", "data.partition()", "split_dataset()"],
            answer: "train_test_split()",
            explanation: "sklearn.model_selection.train_test_split splits data for training and testing."
          },
          {
            question: "What is broadcasting in NumPy?",
            options: ["Sending data to a network", "Operating on arrays of different shapes", "Printing arrays", "Converting data types"],
            answer: "Operating on arrays of different shapes",
            explanation: "Broadcasting allows NumPy to work with arrays of different shapes."
          }
        ]
      },

      {
        subject: "Mathematics for ML",
        questions: [
          {
            question: "What is the dot product used for in ML?",
            options: ["Image resizing", "Computing similarity and neural network layers", "Data cleaning", "Sorting arrays"],
            answer: "Computing similarity and neural network layers",
            explanation: "Dot products are fundamental to neural network computations."
          },
          {
            question: "What is a gradient in calculus?",
            options: ["A color transition", "The slope of a function at a point", "A matrix type", "A loss function"],
            answer: "The slope of a function at a point",
            explanation: "Gradients indicate the direction and rate of steepest ascent."
          },
          {
            question: "What does the sigmoid function output?",
            options: ["Values from -1 to 1", "Values from 0 to 1", "Any real number", "Integer values"],
            answer: "Values from 0 to 1",
            explanation: "Sigmoid squashes inputs to a probability-like range (0,1)."
          },
          {
            question: "What is eigenvalue decomposition used for in ML?",
            options: ["Data encoding", "PCA dimensionality reduction", "Gradient descent", "Overfitting control"],
            answer: "PCA dimensionality reduction",
            explanation: "PCA uses eigenvalue decomposition to find principal components."
          },
          {
            question: "What is mean squared error?",
            options: ["Average absolute difference", "Average of squared differences", "Sum of errors", "Max error"],
            answer: "Average of squared differences",
            explanation: "MSE measures average squared difference between predictions and actuals."
          },
          {
            question: "What is Bayes theorem used for?",
            options: ["Matrix multiplication", "Updating probability based on evidence", "Gradient computation", "Dimensionality reduction"],
            answer: "Updating probability based on evidence",
            explanation: "Bayes theorem relates conditional and marginal probabilities."
          },
          {
            question: "What is a probability distribution?",
            options: ["A data sorting method", "A function describing likelihood of outcomes", "A neural layer", "A loss function"],
            answer: "A function describing likelihood of outcomes",
            explanation: "Probability distributions describe how likely each outcome is."
          },
          {
            question: "What is variance in statistics?",
            options: ["The average value", "Measure of spread from the mean", "The median value", "Number of data points"],
            answer: "Measure of spread from the mean",
            explanation: "Variance measures how far data points are spread from the mean."
          },
          {
            question: "What does gradient descent minimize?",
            options: ["Model complexity", "Loss/cost function", "Training time", "Data dimensions"],
            answer: "Loss/cost function",
            explanation: "Gradient descent iteratively adjusts weights to reduce the loss."
          },
          {
            question: "What is the chain rule used for in deep learning?",
            options: ["Data preprocessing", "Backpropagation gradient computation", "Weight initialization", "Activation functions"],
            answer: "Backpropagation gradient computation",
            explanation: "The chain rule computes gradients through multiple layers in backprop."
          }
        ]
      },

      {
        subject: "Machine Learning",
        questions: [
          {
            question: "What is supervised learning?",
            options: ["Training without labels", "Training with labeled input-output pairs", "Reinforcement training", "Unsupervised clustering"],
            answer: "Training with labeled input-output pairs",
            explanation: "Supervised learning uses labeled data to train predictive models."
          },
          {
            question: "What is overfitting?",
            options: ["Model performs well on all data", "Model memorizes training data, fails on new data", "Model is too simple", "Model trains too slowly"],
            answer: "Model memorizes training data, fails on new data",
            explanation: "Overfitting occurs when a model learns noise instead of the signal."
          },
          {
            question: "Which algorithm is used for classification?",
            options: ["Linear Regression", "K-Means", "Logistic Regression", "PCA"],
            answer: "Logistic Regression",
            explanation: "Logistic Regression outputs class probabilities for classification."
          },
          {
            question: "What does cross-validation do?",
            options: ["Splits data for parallel training", "Evaluates model performance on multiple data splits", "Normalizes features", "Selects features"],
            answer: "Evaluates model performance on multiple data splits",
            explanation: "Cross-validation gives a more reliable estimate of model performance."
          },
          {
            question: "What is the purpose of regularization?",
            options: ["Speed up training", "Prevent overfitting", "Improve accuracy", "Reduce data size"],
            answer: "Prevent overfitting",
            explanation: "Regularization adds a penalty for model complexity to prevent overfitting."
          },
          {
            question: "What is a Random Forest?",
            options: ["A single decision tree", "An ensemble of decision trees", "A clustering algorithm", "A neural network"],
            answer: "An ensemble of decision trees",
            explanation: "Random Forest combines multiple decision trees to improve accuracy."
          },
          {
            question: "What is unsupervised learning?",
            options: ["Learning with labels", "Finding patterns in unlabeled data", "Reinforcement learning", "Semi-supervised learning"],
            answer: "Finding patterns in unlabeled data",
            explanation: "Unsupervised learning discovers structure without labeled examples."
          },
          {
            question: "What does K-Means clustering do?",
            options: ["Classifies data into K classes", "Groups data into K clusters by similarity", "Regresses K variables", "Reduces K dimensions"],
            answer: "Groups data into K clusters by similarity",
            explanation: "K-Means partitions data into K clusters based on distance to centroids."
          },
          {
            question: "What is feature engineering?",
            options: ["Collecting raw data", "Creating useful input features from raw data", "Training the model", "Deploying the model"],
            answer: "Creating useful input features from raw data",
            explanation: "Feature engineering transforms raw data into meaningful inputs for models."
          },
          {
            question: "What metric evaluates classification models?",
            options: ["RMSE", "R-squared", "F1 Score", "MAE"],
            answer: "F1 Score",
            explanation: "F1 Score balances precision and recall for classification evaluation."
          }
        ]
      },

      {
        subject: "Deep Learning",
        questions: [
          {
            question: "What is a neural network?",
            options: ["A database system", "Layers of interconnected nodes inspired by the brain", "A sorting algorithm", "A SQL query system"],
            answer: "Layers of interconnected nodes inspired by the brain",
            explanation: "Neural networks learn complex patterns through layered nodes."
          },
          {
            question: "What does CNN stand for?",
            options: ["Connected Neural Network", "Convolutional Neural Network", "Cross Network Node", "Complex Neural Net"],
            answer: "Convolutional Neural Network",
            explanation: "CNNs use convolution operations, excellent for image processing."
          },
          {
            question: "What is backpropagation?",
            options: ["Forward data pass", "Algorithm to compute gradients and update weights", "Data augmentation", "Batch normalization"],
            answer: "Algorithm to compute gradients and update weights",
            explanation: "Backprop calculates gradients from output to input to update weights."
          },
          {
            question: "What is the ReLU activation function?",
            options: ["max(0, x)", "sigmoid(x)", "tanh(x)", "1/x"],
            answer: "max(0, x)",
            explanation: "ReLU outputs the input if positive, else 0. It helps avoid vanishing gradients."
          },
          {
            question: "What is dropout in neural networks?",
            options: ["Removing layers", "Randomly deactivating neurons during training to prevent overfitting", "Reducing learning rate", "Data augmentation"],
            answer: "Randomly deactivating neurons during training to prevent overfitting",
            explanation: "Dropout randomly zeroes neurons during training as regularization."
          },
          {
            question: "What is a RNN used for?",
            options: ["Image classification", "Sequential data like text and time series", "Object detection", "Dimensionality reduction"],
            answer: "Sequential data like text and time series",
            explanation: "RNNs maintain hidden state to process sequences."
          },
          {
            question: "What is batch normalization?",
            options: ["Splitting data into batches", "Normalizing layer inputs to stabilize training", "Batch prediction", "Data preprocessing"],
            answer: "Normalizing layer inputs to stabilize training",
            explanation: "Batch normalization normalizes activations for faster, stable training."
          },
          {
            question: "What is transfer learning?",
            options: ["Moving data between servers", "Reusing a pretrained model on a new task", "Transferring weights randomly", "Multi-GPU training"],
            answer: "Reusing a pretrained model on a new task",
            explanation: "Transfer learning fine-tunes a model trained on large data for a new task."
          },
          {
            question: "What is the Transformer architecture mainly used for?",
            options: ["Image segmentation", "Natural language processing and sequence tasks", "Reinforcement learning", "Time series forecasting only"],
            answer: "Natural language processing and sequence tasks",
            explanation: "Transformers use self-attention and are the basis of modern LLMs."
          },
          {
            question: "What does GANs stand for?",
            options: ["Global Attention Networks", "Generative Adversarial Networks", "Graph Attention Nodes", "Gaussian Analytic Networks"],
            answer: "Generative Adversarial Networks",
            explanation: "GANs pit a generator and discriminator against each other to generate data."
          }
        ]
      },

      {
        subject: "Generative AI / LLMs",
        questions: [
          {
            question: "What does LLM stand for?",
            options: ["Layered Learning Module", "Large Language Model", "Linear Learning Method", "Local Learning Machine"],
            answer: "Large Language Model",
            explanation: "LLMs are trained on vast text data to generate and understand language."
          },
          {
            question: "What is prompt engineering?",
            options: ["Building hardware prompts", "Designing inputs to get desired outputs from AI models", "Training LLMs from scratch", "Database querying"],
            answer: "Designing inputs to get desired outputs from AI models",
            explanation: "Prompt engineering crafts effective inputs to guide LLM behaviour."
          },
          {
            question: "What is RAG in the context of LLMs?",
            options: ["Rapid Algorithm Generation", "Retrieval-Augmented Generation", "Random Array Generation", "Recursive Auto Generator"],
            answer: "Retrieval-Augmented Generation",
            explanation: "RAG combines retrieval of relevant documents with generation for accurate answers."
          },
          {
            question: "What is fine-tuning an LLM?",
            options: ["Training from scratch", "Adapting a pretrained model to a specific task", "Quantizing the model", "Resizing the model"],
            answer: "Adapting a pretrained model to a specific task",
            explanation: "Fine-tuning trains an LLM further on domain-specific data."
          },
          {
            question: "What is tokenization in NLP?",
            options: ["Encrypting text", "Breaking text into smaller units (tokens)", "Translating text", "Summarizing text"],
            answer: "Breaking text into smaller units (tokens)",
            explanation: "Tokenizers split text into tokens that models can process."
          },
          {
            question: "What is self-attention in Transformers?",
            options: ["Model reviewing its own code", "Mechanism to weigh importance of different tokens", "An optimization algorithm", "A loss function"],
            answer: "Mechanism to weigh importance of different tokens",
            explanation: "Self-attention allows the model to relate different parts of the input."
          },
          {
            question: "What is hallucination in LLMs?",
            options: ["Visual output", "Model generating plausible but factually incorrect content", "Model refusing to answer", "Model crashing"],
            answer: "Model generating plausible but factually incorrect content",
            explanation: "Hallucinations occur when LLMs produce confident but false statements."
          },
          {
            question: "What is temperature in LLM generation?",
            options: ["Hardware heat level", "Controls randomness of output — higher = more creative", "Training speed", "Model size"],
            answer: "Controls randomness of output — higher = more creative",
            explanation: "Temperature scales the probability distribution over next tokens."
          },
          {
            question: "What is embedding in NLP/AI?",
            options: ["Inserting code into HTML", "Dense vector representation of words or sentences", "Encrypting data", "A storage format"],
            answer: "Dense vector representation of words or sentences",
            explanation: "Embeddings capture semantic meaning in continuous vector space."
          },
          {
            question: "What is a vector database used for in AI?",
            options: ["Storing relational data", "Storing and querying high-dimensional embeddings for similarity search", "A NoSQL store", "A key-value cache"],
            answer: "Storing and querying high-dimensional embeddings for similarity search",
            explanation: "Vector databases power semantic search and RAG pipelines."
          }
        ]
      }
    ]
  },

  /* =========================================================
      📊 DATA ANALYST
  ========================================================= */

  {
    role: "Data Analyst",
    subjects: [
      {
        subject: "Excel & Statistics",
        questions: [
          {
            question: "Which Excel function looks up a value in a table?",
            options: ["SUMIF", "VLOOKUP", "COUNTIF", "INDEX"],
            answer: "VLOOKUP",
            explanation: "VLOOKUP searches a column and returns data from the same row."
          },
          {
            question: "What is a Pivot Table used for?",
            options: ["Creating charts", "Summarizing and analysing large datasets interactively", "Writing formulas", "Managing sheets"],
            answer: "Summarizing and analysing large datasets interactively",
            explanation: "Pivot Tables let you group, filter, and aggregate data quickly."
          },
          {
            question: "What does COUNTIF do?",
            options: ["Counts all cells", "Counts cells meeting a condition", "Sums values", "Averages values"],
            answer: "Counts cells meeting a condition",
            explanation: "COUNTIF counts cells that match a specified criteria."
          },
          {
            question: "What is the mean?",
            options: ["Most frequent value", "Middle value", "Average of all values", "Difference of max and min"],
            answer: "Average of all values",
            explanation: "Mean is the sum of values divided by the count."
          },
          {
            question: "What is standard deviation?",
            options: ["Average of data", "Measure of data spread from the mean", "The max value", "A percentage"],
            answer: "Measure of data spread from the mean",
            explanation: "Standard deviation quantifies how spread out data values are."
          },
          {
            question: "What does the Excel INDEX-MATCH combination do?",
            options: ["Sort data", "More flexible lookup than VLOOKUP", "Create charts", "Filter data"],
            answer: "More flexible lookup than VLOOKUP",
            explanation: "INDEX-MATCH can look up in any direction and column."
          },
          {
            question: "What is a normal distribution?",
            options: ["A skewed distribution", "Bell-shaped symmetric distribution", "A uniform distribution", "A bimodal distribution"],
            answer: "Bell-shaped symmetric distribution",
            explanation: "Normal distribution is symmetric around the mean with a bell curve shape."
          },
          {
            question: "What is correlation?",
            options: ["Causation between variables", "Statistical measure of relationship between variables", "Difference between values", "A regression type"],
            answer: "Statistical measure of relationship between variables",
            explanation: "Correlation ranges from -1 to 1, showing direction and strength of a relationship."
          },
          {
            question: "What does SUMIF do in Excel?",
            options: ["Sums all values", "Sums values meeting a condition", "Counts values", "Averages values"],
            answer: "Sums values meeting a condition",
            explanation: "SUMIF adds values in a range that meet specified criteria."
          },
          {
            question: "What is a hypothesis test?",
            options: ["A formula in Excel", "Statistical method to make decisions from data", "A chart type", "A data format"],
            answer: "Statistical method to make decisions from data",
            explanation: "Hypothesis testing determines if data supports a specific claim."
          }
        ]
      },

      {
        subject: "SQL",
        questions: [
          {
            question: "Which SQL clause filters rows?",
            options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"],
            answer: "WHERE",
            explanation: "WHERE filters rows before grouping."
          },
          {
            question: "What does GROUP BY do?",
            options: ["Sorts results", "Groups rows for aggregate functions", "Filters rows", "Joins tables"],
            answer: "Groups rows for aggregate functions",
            explanation: "GROUP BY groups rows sharing a value to apply aggregates like SUM or COUNT."
          },
          {
            question: "What is the difference between WHERE and HAVING?",
            options: ["No difference", "WHERE filters rows, HAVING filters groups", "HAVING is for JOIN", "WHERE works after GROUP BY"],
            answer: "WHERE filters rows, HAVING filters groups",
            explanation: "HAVING is used to filter grouped results after GROUP BY."
          },
          {
            question: "What does INNER JOIN return?",
            options: ["All rows from both tables", "Only matching rows from both tables", "All rows from left table", "All rows from right table"],
            answer: "Only matching rows from both tables",
            explanation: "INNER JOIN returns rows where the join condition is met in both tables."
          },
          {
            question: "What does COUNT(*) do?",
            options: ["Counts non-null values", "Counts all rows including nulls", "Counts distinct values", "Sums values"],
            answer: "Counts all rows including nulls",
            explanation: "COUNT(*) counts every row regardless of null values."
          },
          {
            question: "What is a subquery?",
            options: ["A secondary database", "A query nested inside another query", "A stored procedure", "A view"],
            answer: "A query nested inside another query",
            explanation: "Subqueries allow complex filtering and computations inside a query."
          },
          {
            question: "What does DISTINCT do?",
            options: ["Sorts results", "Returns only unique values", "Filters nulls", "Groups rows"],
            answer: "Returns only unique values",
            explanation: "SELECT DISTINCT removes duplicate rows from results."
          },
          {
            question: "Which SQL function returns the highest value?",
            options: ["MIN()", "AVG()", "MAX()", "SUM()"],
            answer: "MAX()",
            explanation: "MAX() returns the maximum value in a column."
          },
          {
            question: "What is a LEFT JOIN?",
            options: ["Returns only left table rows", "Returns all rows from left table plus matching right rows", "Returns matching rows only", "Returns all rows from right table"],
            answer: "Returns all rows from left table plus matching right rows",
            explanation: "LEFT JOIN includes all left table rows with NULLs for unmatched right rows."
          },
          {
            question: "What does ORDER BY DESC do?",
            options: ["Sorts ascending", "Sorts descending", "Groups data", "Filters data"],
            answer: "Sorts descending",
            explanation: "ORDER BY DESC sorts results from highest to lowest."
          }
        ]
      },

      {
        subject: "Data Visualization",
        questions: [
          {
            question: "Which chart best shows trend over time?",
            options: ["Pie chart", "Bar chart", "Line chart", "Scatter plot"],
            answer: "Line chart",
            explanation: "Line charts show how values change over a continuous time period."
          },
          {
            question: "What is a KPI?",
            options: ["Key Performance Indicator", "Kernel Performance Index", "Key Process Integration", "Knowledge Performance Input"],
            answer: "Key Performance Indicator",
            explanation: "KPIs are quantifiable metrics that reflect success of an objective."
          },
          {
            question: "Which tool is commonly used for BI dashboards?",
            options: ["Microsoft Word", "Power BI", "Notepad", "GitHub"],
            answer: "Power BI",
            explanation: "Power BI is a Microsoft BI tool for interactive reports and dashboards."
          },
          {
            question: "What is a scatter plot used for?",
            options: ["Showing categories", "Showing relationship between two numeric variables", "Showing proportions", "Showing time trends"],
            answer: "Showing relationship between two numeric variables",
            explanation: "Scatter plots reveal correlation or patterns between two variables."
          },
          {
            question: "What does a histogram show?",
            options: ["Category comparisons", "Distribution of a numeric variable", "Trends over time", "Part-to-whole relationships"],
            answer: "Distribution of a numeric variable",
            explanation: "Histograms show the frequency distribution of numerical data."
          },
          {
            question: "When would you use a pie chart?",
            options: ["Comparing many categories", "Showing part-to-whole relationships with few categories", "Showing trends", "Showing correlation"],
            answer: "Showing part-to-whole relationships with few categories",
            explanation: "Pie charts work best with 2-5 clear categories that sum to 100%."
          },
          {
            question: "What is Tableau primarily used for?",
            options: ["Database management", "Data visualization and BI", "Web development", "Machine learning"],
            answer: "Data visualization and BI",
            explanation: "Tableau is a leading interactive data visualization platform."
          },
          {
            question: "What is data storytelling?",
            options: ["Writing fiction with data", "Communicating insights from data through narrative and visuals", "Data collection", "Statistical testing"],
            answer: "Communicating insights from data through narrative and visuals",
            explanation: "Data storytelling connects analysis to decision-making through narrative."
          },
          {
            question: "What does a box plot show?",
            options: ["Trend over time", "Distribution summary with quartiles and outliers", "Correlation", "Category comparison"],
            answer: "Distribution summary with quartiles and outliers",
            explanation: "Box plots show median, quartiles (IQR), and outliers."
          },
          {
            question: "What is a heat map?",
            options: ["A temperature chart", "A color-coded matrix showing data intensity", "A geographic map", "A line chart variant"],
            answer: "A color-coded matrix showing data intensity",
            explanation: "Heat maps use color gradients to represent values in a matrix."
          }
        ]
      },

      {
        subject: "Python for Data Analysis",
        questions: [
          {
            question: "Which library is used for data manipulation in Python?",
            options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"],
            answer: "Pandas",
            explanation: "Pandas provides DataFrame structures for data manipulation."
          },
          {
            question: "What does df.shape return?",
            options: ["Column names", "Data types", "Rows and columns count as a tuple", "Summary statistics"],
            answer: "Rows and columns count as a tuple",
            explanation: "df.shape returns (number_of_rows, number_of_columns)."
          },
          {
            question: "How do you drop a column in pandas?",
            options: ["df.remove('col')", "df.drop('col', axis=1)", "del df.col", "df.delete('col')"],
            answer: "df.drop('col', axis=1)",
            explanation: "df.drop with axis=1 removes a column from the DataFrame."
          },
          {
            question: "Which method fills null values in pandas?",
            options: ["df.fill()", "df.fillna()", "df.replace_null()", "df.impute()"],
            answer: "df.fillna()",
            explanation: "fillna() replaces NaN values with a specified value or method."
          },
          {
            question: "Which library creates static visualizations in Python?",
            options: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
            answer: "Matplotlib",
            explanation: "Matplotlib is the foundational plotting library in Python."
          },
          {
            question: "What does groupby() do in pandas?",
            options: ["Sorts data", "Groups data for aggregate operations", "Merges DataFrames", "Filters rows"],
            answer: "Groups data for aggregate operations",
            explanation: "groupby() is used for split-apply-combine operations on data."
          },
          {
            question: "How do you merge two DataFrames in pandas?",
            options: ["df.concat()", "pd.merge(df1, df2)", "df.join_all()", "pd.combine(df1, df2)"],
            answer: "pd.merge(df1, df2)",
            explanation: "pd.merge() joins DataFrames similar to SQL JOIN operations."
          },
          {
            question: "What does df.value_counts() do?",
            options: ["Counts total rows", "Counts unique values in a Series", "Sums a column", "Lists all values"],
            answer: "Counts unique values in a Series",
            explanation: "value_counts() shows frequency of each unique value."
          },
          {
            question: "What library makes prettier statistical visualizations?",
            options: ["Matplotlib", "Pandas", "Seaborn", "Plotly"],
            answer: "Seaborn",
            explanation: "Seaborn is built on Matplotlib and provides attractive statistical plots."
          },
          {
            question: "What does df.corr() compute?",
            options: ["Mean of columns", "Correlation matrix between numeric columns", "Null value count", "Data types"],
            answer: "Correlation matrix between numeric columns",
            explanation: "df.corr() computes pairwise correlation between columns."
          }
        ]
      }
    ]
  }
];