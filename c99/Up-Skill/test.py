import streamlit as st
import openai  # Replace with the appropriate model library if using OpenAI, Google Gemini, or another service
from typing import List
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")


genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")
coding_topics = ["Arrays", "Strings", "Linked Lists", "Trees", "Graphs", "Sorting", "Dynamic Programming"]
dsa_topics = ["Binary Trees", "Hashing", "Stacks", "Queues", "Binary Search Trees", "Graphs", "Recursion"]
levels = ["Basic", "Intermediate", "Advanced"]
def generate_coding_question(topic: str, level: str, language: str = "Python") -> str:
    prompt = f"Generate a {level} level coding question for the topic '{topic}' in {language}."
    
    # Replace this with the actual API/model call to generate the content
    response = model.generate_content(prompt)
    
    
    return response.text

def generate_sample_solutions(question: str, language: str = "Python") -> List[str]:
    prompt = f"Provide 2 sample solutions in {language} for the following coding question: '{question}'"
    
    # Replace this with the actual API/model call to generate the solutions
    response = model.generate_content(prompt)
    
    # Split solutions by line breaks or another logic if required
    solutions = response.text
    
    return solutions

# Streamlit UI
st.title("Coding Question Generator")

# Selection of topic and level
st.subheader("Select Coding Question Parameters")
selected_topic = st.selectbox("Select a Topic", coding_topics + dsa_topics)
selected_level = st.selectbox("Select Difficulty Level", levels)
selected_language = st.selectbox("Select Language", ["Python", "JavaScript", "Java", "C++"])

# Button to generate coding question
if st.button("Generate Coding Question"):
    question = generate_coding_question(selected_topic, selected_level, selected_language)
    st.write("### Generated Coding Question:")
    st.write(question)
    
    # Option to generate sample solutions after generating the question
    if st.button("Generate Sample Solutions"):
        solutions = generate_sample_solutions("""You are given an array of integers called numbers. Write a Python program that:

Finds the sum of all the even numbers in the array.
Prints the calculated sum""", "Python")
        st.write("### Sample Solutions:")
        for i, solution in enumerate(solutions, 1):
            st.write(f"**Solution {i}:**")
            st.code(solution, language=selected_language.lower())
