import streamlit as st
from pydantic import BaseModel
from typing import List, Dict
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")


genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")
# Streamlit app
st.title("AI-Generated Multiple-Choice Questions")
st.write("Generate multiple-choice questions on any core concept and difficulty level.")

# Input fields
core_concept = st.text_input("Enter the core concept (e.g., DBMS, OOP, Networks)")
level = st.selectbox("Select difficulty level", ["Basic", "Intermediate", "Advanced"])

# Button to generate questions
if st.button("Generate Questions"):
    if core_concept and level:
        # Placeholder for actual question generation
        prompt = f'''Generate 10 multiple-choice questions based on the topic "{core_concept}" at a "{level}" difficulty level. Each question should include four answer choices, labeled A, B, C, and D. Additionally, provide:

        1. The correct answer for each question.
        2. A brief explanation to clarify why the correct answer is accurate.
        
        
         
        '''

        # Simulate API response (replace this with actual API call)
        # Replace this code block with the real API call if available
        response = model.generate_content(prompt)
  
        response_data = response.text  
        # Display questions
        st.write(response_data)
    else:
        st.error("Please enter both core concept and difficulty level.")
