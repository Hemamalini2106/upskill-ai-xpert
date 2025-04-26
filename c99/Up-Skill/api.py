import os
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
from google.generativeai.types.safety_types import HarmBlockThreshold, HarmCategory
from typing import List, Dict
from typing import Dict, Any
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",          
    "http://localhost:5173",     
]



load_dotenv()



safety_settings = {
    HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
    HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
    HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
}


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # List of allowed origins
    allow_credentials=True,      # Allow cookies or authentication headers
    allow_methods=["*"],         # Allow all HTTP methods
    allow_headers=["*"],         # Allow all headers
)
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv


GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")
SYSTEM_PROMPT = """
You are an AI-powered virtual HR professional conducting a mock interview to help the user prepare for real-world job interviews. Start by introducing yourself and explaining that this session is a practice interview designed to help the user develop their skills in a supportive, realistic setting. Remind the user that you’ll provide constructive feedback after each response to help them improve.

    **Interview Introduction:**
    - Begin with a formal introduction as an HR interviewer (e.g., “Hello, and thank you for joining this interview session! I’m here to guide you through a virtual interview where I’ll be assessing your responses and communication skills.”).
    - Explain the interview flow, including self-introduction, situational and behavioral questions, and closing remarks.
    - Encourage the user to answer each question sincerely and to treat this session as if it were a real interview.

    **Capabilities of the Interview Bot:**
    - Inform the user that this interview session is a fully interactive experience to help them improve through real-time feedback and guidance.
    - Emphasize that you will provide tips and suggestions after each response, focusing on strengths, areas for improvement, and effective communication techniques.

    **Interview Structure:**
    1. **Self-Introduction:** Begin by asking the candidate to introduce themselves. Example: “Lets start with a quick introduction. Can you tell me a bit about yourself and your professional background?”
    2. **Behavioral Questions:** Ask common HR behavioral questions (e.g., “Can you describe a time when you faced a significant challenge at work and how you handled it?”). Listen attentively and follow up if needed for clarity or more detail.
    3. **Situational Questions:** Pose situational questions to gauge problem-solving and critical thinking (e.g., “Imagine you are leading a project, but it’s running behind schedule. How would you handle this situation?”).
    4. **Feedback and Tips:** After each response, provide friendly, constructive feedback. Focus on strengths (e.g., clear communication, confidence) and areas for improvement (e.g., being concise, providing examples). Offer specific tips to help the candidate refine their responses.
  
    **Avatar Interaction:** Use a lively, encouraging tone and make the experience feel personal and engaging, as if the candidate were speaking to a real HR interviewer.
"""




Basic_Python_Topics=["Introduction to Python", "Syntax and Indentation", "Variables and Data Types", "Operators (Arithmetic, Logical, Comparison)", "Control Flow (If-Else Statements)", "Loops (For, While)", "Functions (Defining and Calling)", "Input/Output (User Input, Print Statements)", "Basic Error Handling (Try-Except)", "Introduction to Python IDEs and Environment Setup"]
Intermediate_Python_Topics =["Lists and List Operations", "Tuples", "Sets", "Dictionaries", "File Handling (Read, Write, Append)", "Modules and Packages", "Basic Object-Oriented Programming (Classes, Objects)", "Inheritance and Polymorphism", "List Comprehensions", "Generators and Iterators", "Exception Handling", "Debugging", "Unit Testing", "Basic Algorithms (Sorting, Searching)"]
Advance_Python_Topics =  ["Stacks and Queues", "Linked Lists", "Trees (Binary Trees, Binary Search Trees)", "Graphs (DFS, BFS)", "Dynamic Programming", "Decorators", "Multithreading and Multiprocessing", "Web Development Basics (Flask/Django)", "APIs and RESTful Services", "SQLite Database Integration", "Data Analysis with Pandas", "Data Visualization with Matplotlib", "Profiling and Optimization", "Machine Learning Basics"]

Basic_DSA_Topics = ["Introduction to Data Structures", "Arrays (Basics, Traversal)", "Strings (Basics, Common Operations)", "Mathematics for DSA (GCD, LCM, Prime Numbers)", "Time and Space Complexity (Introduction)", "Sorting Basics (Bubble Sort, Selection Sort)", "Searching Basics (Linear Search)", "Recursion (Introduction)", "Stack and Queue (Basic Definitions)", "Linked Lists (Introduction)"]
Intermediate_DSA_Topics = ["Advanced Arrays (Prefix Sum, Sliding Window)", "Strings (Pattern Matching, Anagram Problems)", "Sorting Algorithms (Quick Sort, Merge Sort, Insertion Sort)", "Binary Search and Applications", "Recursion and Backtracking (Subset Problems, N-Queens)", "Stack (Infix to Postfix, Balanced Parentheses)", "Queue (Circular Queue, Priority Queue)", "Linked Lists (Singly, Doubly, Circular)", "Binary Trees (Traversals, Height, Diameter)", "Hashing (Hash Maps, Collision Resolution)", "Two Pointers Technique", "Greedy Algorithms (Activity Selection, Huffman Coding)"]
Advance_DSA_Topics = ["Dynamic Programming (Knapsack, Longest Increasing Subsequence)", "Graph Algorithms (DFS, BFS, Dijkstras, Kruskals)", "Advanced Trees (AVL Trees, Segment Trees)", "Trie (Prefix Tree)", "Heap (Max Heap, Min Heap, Heap Sort)", "Disjoint Set Union (Union-Find)", "Bit Manipulation (XOR Problems, Subsets)", "String Algorithms (KMP, Rabin-Karp)", "Divide and Conquer Algorithms (Matrix Multiplication, Binary Search Variants)", "Advanced Graph Problems (Topological Sort, Shortest Path in DAG)", "Sliding Window and Monotonic Queues", "Advanced Dynamic Programming (DP on Trees, DP with Bitmask)", "Network Flow (Ford-Fulkerson Algorithm)"]



class UserMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
def chat(user_message: UserMessage):

    chat = model.start_chat(
        history=[
            {"role": "user", "parts": SYSTEM_PROMPT},
            {"role": "model", "parts": "Hello! I'm here to guide you through a practice interview session. How can I assist you today?"}
        ]
    )


    response_chunks = chat.send_message(user_message.message, stream=True)
    bot_response = ""

    for chunk in response_chunks:
        bot_response += chunk.text

    return {"response": bot_response}


class QuestionRequest(BaseModel):
    core_concept: str
    level: str

class QuestionResponse(BaseModel):
    questions: str


def generate_questions(core_concept, level):

    prompt = f'''Generate 10 multiple-choice questions based on the topic "{core_concept}" at a "{level}" difficulty level. Each question should include four answer choices, labeled A, B, C, and D. Additionally, provide:

    1. The correct answer for each question.
    2. A brief explanation to clarify why the correct answer is accurate.
    Sample Format
    Q1. What is an array?
        A) A single variable that can store multiple values of different data types
        B) A collection of variables of the same data type, stored contiguously in memory
        C) A type of loop used for iterating through data
        D) A function used for sorting data
        Answer: B
        Explanation: Arrays store multiple values of the same data type, and these values are stored together in memory for efficient access.
        Q2. How are elements in an array typically accessed?
        A) By name
        B) By using a random number generator
        C) By using an index (starting from 1)
        D) By using an index (starting from 0)
        Answer: D
        Explanation: Most programming languages use zero-based indexing for arrays, meaning the first element is at index 0, the second at index 1, and so on.
    This format has:
    - No extra newlines between questions
    - Consistent spacing after 2 new line only not more than that Q1/Q2, A)/B)/C)/D)
    - One newline after question text
    - One newline after each option
    - One newline after Answer:
    - One newline after Explanation
    '''
    
    response = model.generate_content(prompt)
  
    response_data = response.text  
    

    
    return response_data

@app.post("/generate_questions", response_model=QuestionResponse)
async def get_questions(request: QuestionRequest):
    questions = generate_questions(request.core_concept, request.level)
    return QuestionResponse(questions=questions)


coding_topics = ["Arrays", "Strings", "Linked Lists", "Trees", "Graphs", "Sorting", "Dynamic Programming"]
dsa_topics = ["Binary Trees", "Hashing", "Stacks", "Queues", "Binary Search Trees", "Graphs", "Recursion"]

levels = ["Basic", "Intermediate", "Advanced"]

# Define request and response models
class CodingQuestionRequest(BaseModel):
    topic: str
    level: str
    language: str = "Python"  # Default language is Python

class SampleSolutionRequest(BaseModel):
    question: str
    language: str = "Python"  # Default language is Python

class CodingQuestionResponse(BaseModel):
    question: str

class SampleSolutionResponse(BaseModel):
    solutions: List[str]



# API to generate coding questions
class GenerateContentResponse(BaseModel):
    title: str
    question: str
    example: Dict[str, Any]
    hint: str

@app.post("/generate_coding_question")
async def generate_coding_question(request: CodingQuestionRequest):
    try:
        prompt = f"""
            Generate a {request.level} level coding question for the topic '{request.topic}' in {request.language} in a form of a dictionary with the following keys:
            1. 'title': Title with difficulty and topic (e.g., 'Basic Array Manipulation (Python)')
            2. 'question': Question statement
            3. 'example': Example with input and output
            4. 'hint': Hint, if applicable
        Please follow this structure only and all of this should be in a format of string..no need to add formatting and all..as FastAPI doesn't support
        in json format please give the response... 
         need to generate 5 questions"""
        content_response = model.generate_content(prompt)

        # # Parse the response from model.generate_content()
        # result = content_response.result
        # candidates = result.candidates
        # if candidates:
        #     content = candidates[0].content
        #     parts = content.parts
        #     if parts:
        #         part = parts[0]
        #         text = part.text
        #         try:
        #             response_data = eval(text)
        #             return GenerateContentResponse(**response_data)
        #         except (ValueError, SyntaxError):
        #             pass
        return content_response.text
        # If parsing fails, raise an exception
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# API to generate sample solutions
@app.post("/generate_sample_solution")
async def generate_sample_solution(request: SampleSolutionRequest):
  
    prompt = f"Provide 2 sample solutions in {request.language} for the following coding question: '{request.question}' Make sure result isin the form of json."
    solutions_text = model.generate_content(prompt)
    
    
    solutions = solutions_text.text
    return solutions


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="localhost", port=8000, log_level="debug", proxy_headers=True, reload=True)


