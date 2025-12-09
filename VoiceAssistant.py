# enhanced_formal_assistant.py
import os
import speech_recognition as sr
import pygame
import tempfile
import time
from gtts import gTTS
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
import re
import random
from datetime import datetime

# --- Configuration ---
class EnhancedFormalAssistant:
    SIMILARITY_THRESHOLD = 1.0 # Adjusted for distance metric (lower is better)
    NAVIGATION_MAP = {
        "home": "/",
        "product": "/product-overview",
        "overview": "/product-overview",
        "product overview": "/product-overview",
        "demo": "/live-demo",
        "live demo": "/live-demo",
        "research": "/research",
        "dashboard": "/app/dashboard",
        "cases": "/app/cases",
        "new case": "/app/new-case",
        "studio": "/app/studio",
        "voice": "/app/voice-console",
        "console": "/app/voice-console",
        "reports": "/app/reports",
        "team": "/app/team",
        "settings": "/app/settings",
    }
    NAVIGATION_TRIGGERS = ["go to", "navigate to", "show me", "open", "take me to"]
    
    # Mode definitions
    MODES = {
        "normal": "Normal Medical Mode",
        "eli5": "Simple Explanations Mode", 
        "student": "Detailed Learning Mode"
    }

    def __init__(self):
        pygame.mixer.init()
        self.vector_stores = self.load_all_knowledge_bases()
        self.user_name = None
        self.conversation_count = 0
        self.current_mode = "normal"  # Default mode
        self.mode_indicators = {
            "normal": " Medical Mode",
            "eli5": " Simple Mode", 
            "student": "Student Mode"
        }
        
    def load_all_knowledge_bases(self):
        """Load all FAISS knowledge bases for each mode."""
        vector_stores = {}
        modes = {
            "normal": "faiss_index_local",
            "eli5": "faiss_index_eli5",
            "student": "faiss_index_student"
        }
        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")

        for mode, path in modes.items():
            # Construct the full path relative to the VoiceAssistant.py script
            full_path = os.path.join(os.path.dirname(__file__), path)
            if os.path.exists(full_path):
                try:
                    vector_stores[mode] = FAISS.load_local(full_path, embeddings, allow_dangerous_deserialization=True)
                    print(f"✅ {mode.capitalize()} knowledge base loaded from {full_path}")
                except Exception as e:
                    print(f"❌ Error loading {mode} knowledge base from {full_path}: {e}")
                    vector_stores[mode] = None
            else:
                print(f"⚠️ {mode.capitalize()} knowledge base not found at {full_path}")
                vector_stores[mode] = None
        
        return vector_stores
    def set_mode(self, mode_name):
        """Set the current explanation mode"""
        if mode_name in self.MODES:
            self.current_mode = mode_name
            mode_responses = {
                "normal": "Switched to normal medical mode. I'll provide standard medical explanations.",
                "eli5": "Switched to simple mode. I'll explain things in very basic terms.",
                "student": "Switched to student mode. I'll provide detailed educational explanations."
            }
            return f"{self.mode_indicators[mode_name]}: {mode_responses[mode_name]}"
        return "I don't recognize that mode. Available modes are: normal, simple, and student."

    def detect_mode_change(self, query):
        """Detect if user wants to change modes"""
        query_lower = query.lower()
        
        mode_keywords = {
            "eli5": ["simple mode", "explain simply", "like i'm five", "easy explanation", "basic terms", "eli5"],
            "student": ["student mode", "detailed mode", "learn more", "in depth", "comprehensive", "educational"],
            "normal": ["normal mode", "medical mode", "standard mode", "back to normal"]
        }
        
        for mode, keywords in mode_keywords.items():
            if any(keyword in query_lower for keyword in keywords):
                return self.set_mode(mode)
        
        # Direct mode commands
        if "switch to" in query_lower or "change to" in query_lower or "set mode" in query_lower:
            if "simple" in query_lower or "eli5" in query_lower:
                return self.set_mode("eli5")
            elif "student" in query_lower or "detailed" in query_lower:
                return self.set_mode("student")
            elif "normal" in query_lower or "medical" in query_lower:
                return self.set_mode("normal")
        
        return None

    def get_current_mode_indicator(self):
        """Get current mode indicator for responses"""
        return self.mode_indicators[self.current_mode]

    # --- Mode-Specific Response Processing ---
    

    

    

    # --- Enhanced Formal Responses Database ---
    GREETINGS = {
        'hello': [
            "Hello! It's wonderful to speak with you. How may I assist you today?",
            "Greetings! I'm here to help with information about brain tumors and medical topics. What would you like to know?",
            "Good day! I'm your medical information assistant. How can I be of service?",
            "Hello there! I'm ready to provide you with helpful medical information. What's on your mind?"
        ],
        'hi': [
            "Hi! Lovely to meet you. How can I help you today?",
            "Hi there! I'm here to assist with medical inquiries. What would you like to discuss?",
            "Hello! I'm your friendly medical assistant. What can I help you with?"
        ],
        'good_morning': [
            "Good morning! A wonderful day to seek knowledge. How may I assist you?",
            "Morning! I hope you're having a great start to your day. What medical information can I provide?",
            "Good morning! I'm here to help with any health-related questions you might have."
        ],
        'good_afternoon': [
            "Good afternoon! I hope your day is going well. How can I assist you?",
            "Afternoon! Ready to provide you with helpful medical information. What do you need?",
            "Good afternoon! What health topic would you like to explore today?"
        ],
        'good_evening': [
            "Good evening! I'm here to help with your medical queries, even at this hour.",
            "Evening! How can I assist you with health information tonight?",
            "Good evening! What brings you to our medical assistant today?"
        ]
    }

    APPRECIATION_RESPONSES = {
        'thanks': [
            "You're most welcome! I'm glad I could assist you.",
            "My pleasure! Don't hesitate to ask if you need more information.",
            "You're very welcome! I'm here whenever you need medical guidance.",
            "Happy to help! Is there anything else you'd like to know?"
        ],
        'thank_you': [
            "You're absolutely welcome! It's my purpose to provide helpful information.",
            "The pleasure is mine! Feel free to ask any other medical questions.",
            "You're very welcome! I'm here to support your health information needs."
        ],
        'appreciation': [
            "I appreciate your kind words! It motivates me to be more helpful.",
            "Thank you for your appreciation! I'm dedicated to providing accurate information.",
            "That's very kind of you to say! I'm here whenever you need assistance."
        ]
    }

    POLITE_RESPONSES = {
        'how_are_you': [
            "I'm functioning well, thank you for asking! Ready to assist with your medical queries.",
            "I'm doing great! Eager to help you with health information.",
            "I'm operating perfectly! How can I assist you today?"
        ],
        'who_are_you': [
            "I'm your Medical Information Assistant, specialized in providing information about brain tumors and related health topics.",
            "I'm an AI assistant designed to help with medical information, particularly focused on brain tumor education and support.",
            "I'm your dedicated health information assistant, here to provide reliable information about brain tumors and neurological health."
        ],
        'what_can_you_do': [
            "I can provide comprehensive information about brain tumors, including symptoms, diagnosis, treatment options, and support resources. I can also answer general medical questions and offer guidance.",
            "I specialize in brain tumor information but can also assist with general health queries. I provide explanations about medical terms, treatment options, and support available for patients and caregivers.",
            "My expertise includes detailed information about brain tumors, medical procedures, symptom analysis, and healthcare guidance. I'm here to educate and support your health journey."
        ]
    }

    MODE_RESPONSES = {
        'mode_help': [
            "I have different explanation modes: Normal for standard medical terms, Simple for easy understanding, and Student for detailed learning. Which would you prefer?",
            "You can choose how I explain things: Medical mode for professionals, Simple mode for basic understanding, or Student mode for comprehensive learning.",
            "I can adjust my explanations to your needs. Would you like normal medical terms, simple explanations, or detailed student-level information?"
        ],
        'current_mode': [
            "I'm currently in {} mode.",
            "Right now I'm using {} explanations.",
            "My current setting is {}."
        ]
    }

    FAREWELLS = [
        "Goodbye! Thank you for using our medical assistant. Take care of your health!",
        "Farewell! Remember that early detection and proper medical care are crucial for health.",
        "Goodbye! I hope the information was helpful. Wishing you the best in your health journey.",
        "Take care! Don't hesitate to return if you have more medical questions.",
        "Until next time! Remember to consult healthcare professionals for personalized medical advice."
    ]

    UNABLE_TO_ANSWER = [
        "I apologize, but I don't have specific information about that in my medical knowledge base. Could you try rephrasing your question?",
        # "That's outside my current medical expertise. I'm primarily focused on brain tumor information and related health topics.",
        # "I'm not equipped to answer that specific medical question. I specialize in brain tumor education and general health information.",
        # "My knowledge is limited to medical topics, particularly brain tumors. Could you ask about health-related subjects?"
    ]

    def get_navigation_action(self, query):
        """Check for navigation commands."""
        query_lower = query.lower()
        for trigger in self.NAVIGATION_TRIGGERS:
            if trigger in query_lower:
                potential_page = query_lower.split(trigger, 1)[1].strip()
                for page_name, path in self.NAVIGATION_MAP.items():
                    if page_name in potential_page:
                        return {
                            "action": "navigate",
                            "path": path,
                            "speak": f"Navigating to the {page_name} page."
                        }
        return None

    def get_greeting_response(self, query):
        """Handle greeting queries"""
        query_lower = query.lower()
        
        if any(word in query_lower for word in ['hello', 'hi', 'hey']):
            return random.choice(self.GREETINGS['hello'])
        elif 'good morning' in query_lower:
            return random.choice(self.GREETINGS['good_morning'])
        elif 'good afternoon' in query_lower:
            return random.choice(self.GREETINGS['good_afternoon'])
        elif 'good evening' in query_lower:
            return random.choice(self.GREETINGS['good_evening'])
        
        return None

    def get_appreciation_response(self, query):
        """Handle thank you and appreciation"""
        query_lower = query.lower()
        
        if any(word in query_lower for word in ['thank you', 'thanks', 'thankyou']):
            return random.choice(self.APPRECIATION_RESPONSES['thanks'])
        elif any(word in query_lower for word in ['appreciate', 'grateful', 'nice help']):
            return random.choice(self.APPRECIATION_RESPONSES['appreciation'])
        
        return None

    def get_polite_response(self, query):
        """Handle polite conversation"""
        query_lower = query.lower()
        
        if any(phrase in query_lower for phrase in ['how are you', "how're you", "how do you do"]):
            return random.choice(self.POLITE_RESPONSES['how_are_you'])
        elif any(phrase in query_lower for phrase in ['who are you', 'what are you']):
            return random.choice(self.POLITE_RESPONSES['who_are_you'])
        elif any(phrase in query_lower for phrase in ['what can you do', 'what do you do', 'your purpose']):
            return random.choice(self.POLITE_RESPONSES['what_can_you_do'])
        elif 'your name' in query_lower:
            return "I'm your Medical Information Assistant. You can think of me as your dedicated health companion."
        
        return None

    def get_mode_response(self, query):
        """Handle mode-related queries"""
        query_lower = query.lower()
        
        # Check for mode change
        mode_change = self.detect_mode_change(query)
        if mode_change:
            return mode_change
        
        # Mode information queries
        if any(phrase in query_lower for phrase in ['what modes', 'which modes', 'explanation modes', 'change mode']):
            return random.choice(self.MODE_RESPONSES['mode_help'])
        
        if any(phrase in query_lower for phrase in ['current mode', 'what mode', 'which mode']):
            mode_text = random.choice(self.MODE_RESPONSES['current_mode'])
            return mode_text.format(self.MODES[self.current_mode])
        
        return None

    def get_farewell_response(self):
        """Get a farewell message"""
        return random.choice(self.FAREWELLS)

    def extract_name(self, query):
        """Extract name from query if provided"""
        query_lower = query.lower()
        name_indicators = ['my name is', "i'm", 'im ', 'call me', 'name is']
        
        for indicator in name_indicators:
            if indicator in query_lower:
                # Extract the name part
                name_part = query_lower.split(indicator, 1)[1].strip()
                # Take first word as name
                name = name_part.split()[0].title()
                return name
        return None

    def split_text_into_chunks(self, text):
        """Split text into natural speaking chunks"""
        text = re.sub(r'\s+', ' ', text).strip()
        sentences = re.split(r'[.!?]+', text)
        sentences = [s.strip() for s in sentences if s.strip()]
        
        chunks = []
        current_chunk = ""
        
        for sentence in sentences:
            if len(current_chunk) + len(sentence) + 1 > MAX_CHUNK_LENGTH and current_chunk:
                chunks.append(current_chunk.strip())
                current_chunk = sentence
            else:
                if current_chunk:
                    current_chunk += ". " + sentence
                else:
                    current_chunk = sentence
        
        if current_chunk:
            chunks.append(current_chunk.strip())
        
        if not chunks:
            chunks = [text[i:i+MAX_CHUNK_LENGTH] for i in range(0, len(text), MAX_CHUNK_LENGTH)]
        
        return chunks

    def speak_chunk(self, text_chunk):
        """Speak a single chunk of text"""
        try:
            if not text_chunk or len(text_chunk.strip()) == 0:
                return True
            
            tts = gTTS(text=text_chunk, lang='en', slow=False)
            
            with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as tmp_file:
                temp_path = tmp_file.name
            
            tts.save(temp_path)
            
            pygame.mixer.music.load(temp_path)
            pygame.mixer.music.play()
            
            while pygame.mixer.music.get_busy():
                pygame.time.wait(100)
            
            pygame.mixer.music.unload()
            if os.path.exists(temp_path):
                os.unlink(temp_path)
            
            time.sleep(0.3)
            return True
            
        except Exception as e:
            print(f"❌ TTS error: {e}")
            if 'temp_path' in locals() and os.path.exists(temp_path):
                try:
                    pygame.mixer.music.unload()
                    os.unlink(temp_path)
                except:
                    pass
            return False

    def speak(self, text):
        """Convert text to speech using chunking"""
        try:
            print(f"🤖 {self.get_current_mode_indicator()} Assistant: {text}")
            
            chunks = self.split_text_into_chunks(text)
            
            if len(chunks) > 1:
                print(f"🗣️  Speaking {len(chunks)} parts...")
            
            successful_chunks = 0
            
            for i, chunk in enumerate(chunks):
                if self.speak_chunk(chunk):
                    successful_chunks += 1
                else:
                    print(f"❌ Failed to speak part {i+1}")
                    continue
            
            return successful_chunks > 0
            
        except Exception as e:
            print(f"🎯 TTS error: {e}")
            return False

    def listen(self):
        """Listen to user speech"""
        recognizer = sr.Recognizer()
        
        try:
            with sr.Microphone() as source:
                print("\n🎤 Listening... (speak now)")
                recognizer.adjust_for_ambient_noise(source, duration=0.5)
                audio = recognizer.listen(source, timeout=10, phrase_time_limit=8)
            
            print("🧠 Processing...")
            text = recognizer.recognize_google(audio)
            print(f"👤 User: {text}")
            return text.lower()
            
        except sr.WaitTimeoutError:
            print("⏰ Listening timeout")
            return "timeout"
        except sr.UnknownValueError:
            print("❓ Could not understand audio")
            self.speak("I apologize, I didn't catch that. Could you please repeat your question?")
            return "unknown"
        except Exception as e:
            print(f"🎤 Microphone error: {e}")
            return "error"

    def process_formal_query(self, query):
        """Process formal and conversational queries"""
        self.conversation_count += 1
        
        # Check for name introduction
        if not self.user_name:
            extracted_name = self.extract_name(query)
            if extracted_name:
                self.user_name = extracted_name
                return f"Nice to meet you, {self.user_name}! How can I assist you today?"
        
        # Use name in response if available
        name_suffix = f", {self.user_name}" if self.user_name else ""
        
        # Check different query types
        response = self.get_greeting_response(query)
        if response:
            return response + name_suffix if name_suffix and 'hello' in query.lower() else response
        
        response = self.get_appreciation_response(query)
        if response:
            return response
        
        response = self.get_polite_response(query)
        if response:
            return response
        
        response = self.get_mode_response(query)
        if response:
            return response
        
        # Special cases
        query_lower = query.lower()
        
        if any(word in query_lower for word in ['yes', 'yeah', 'yep', 'correct']):
            return "Great! What would you like to know next?"
        
        elif any(word in query_lower for word in ['no', 'nope', 'not really']):
            return "I understand. Is there something else I can help you with?"
        
        elif 'i don' in query_lower and 'know' in query_lower:
            return "That's perfectly alright. I'm here to help you understand. What specific information are you looking for?"
        
        elif any(word in query_lower for word in ['help', 'support', 'assist']):
            mode_info = f" Currently in {self.current_mode} mode." if self.current_mode != "normal" else ""
            return f"I'm here to help!{mode_info} I can provide information about brain tumors, symptoms, treatments, and general health guidance. What specifically would you like to know?"
        
        elif any(word in query_lower for word in ['sorry', 'apologize', 'apologies']):
            return "No need to apologize! I'm here to help without judgment. What can I assist you with?"
        
        return None

    def get_medical_response(self, query):
        """Generate medical response from knowledge base"""
        vector_store = self.vector_stores.get(self.current_mode)
        if not vector_store:
            return f"I apologize, but the knowledge base for the {self.current_mode} mode is currently unavailable. Please try another mode."

        try:
            docs_with_scores = vector_store.similarity_search_with_score(query, k=1)
            
            if docs_with_scores:
                doc, score = docs_with_scores[0]
                print(f"DEBUG: Query: '{query}', Top Doc Score: {score:.4f}, Mode: {self.current_mode}")
            else:
                print(f"DEBUG: No documents found for query: '{query}', Mode: {self.current_mode}")

            if not docs_with_scores or docs_with_scores[0][1] > self.SIMILARITY_THRESHOLD:
                return "I apologize, but your query seems unrelated to brain tumors or medical topics. Please ask a valid medical question."

            doc, score = docs_with_scores[0]
            response = doc.page_content.strip()
            response = re.sub(r'\s+', ' ', response)
            
            # Add polite introduction based on mode
            polite_intros = {
                "normal": [
                    "Based on medical information,",
                    "According to healthcare knowledge,",
                    "Medical sources indicate that",
                    "Here's what I can share about that:",
                ],
                "eli5": [
                    "Here's a simple way to think about it:",
                    "Let me break it down for you:",
                    "In simple terms:",
                ],
                "student": [
                    "From an educational perspective,",
                    "In academic terms,",
                    "For comprehensive understanding,",
                    "Here's detailed information:"
                ]
            }
            
            intro = random.choice(polite_intros[self.current_mode])
            return f"{intro} {response}"
            
        except Exception as e:
            print(f"Response error: {e}")
            return "I apologize, but I encountered an error while retrieving medical information. Please try again."

    def get_response(self, query):
        """Main response handler"""
        # Highest priority: check for navigation actions
        navigation_action = self.get_navigation_action(query)
        if navigation_action:
            return navigation_action

        # Second priority: check for formal/conversational queries
        formal_response = self.process_formal_query(query)
        if formal_response:
            return {"action": "speak", "speak": formal_response}

        # Third priority: check for exit commands
        if any(word in query.lower() for word in ['exit', 'quit', 'stop', 'goodbye', 'bye']):
            return {"action": "speak", "speak": self.get_farewell_response()}

        # Finally, get medical response
        medical_response = self.get_medical_response(query)
        return {"action": "speak", "speak": medical_response}

    def run(self):
        """Main assistant loop"""
        print("\n" + "="*50)
        print("🏥 ENHANCED MEDICAL VOICE ASSISTANT STARTING...")
        print("="*50)
        
        if not self.vector_store:
            print("❌ Knowledge base failed to load.")
            return
        
        # Initial greeting based on time of day
        current_hour = datetime.now().hour
        if 5 <= current_hour < 12:
            greeting = "Good morning! I'm your Medical Information Assistant."
        elif 12 <= current_hour < 17:
            greeting = "Good afternoon! I'm your Medical Information Assistant."
        elif 17 <= current_hour < 22:
            greeting = "Good evening! I'm your Medical Information Assistant."
        else:
            greeting = "Hello! I'm your Medical Information Assistant, available even during late hours."
        
        greeting += " I specialize in brain tumor information and general health guidance."
        greeting += " I have different explanation modes: normal, simple, and student. How may I assist you today?"
        
        self.speak(greeting)
        
        while True:
            try:
                user_input = self.listen()
                
                if user_input in ["timeout", "unknown", "error"]:
                    if user_input == "timeout" and self.conversation_count > 0:
                        self.speak("I notice you've been quiet. Are you still there? Feel free to ask any medical questions.")
                    continue
                
                response = self.get_response(user_input)
                self.speak(response)
                
                # Check if it was a farewell response
                if any(word in response.lower() for word in ['goodbye', 'farewell', 'take care']):
                    break
                
            except KeyboardInterrupt:
                print("\n🛑 Assistant stopped by user")
                self.speak("Session ended. Thank you for using our medical assistant!")
                break
            except Exception as e:
                print(f"Unexpected error: {e}")

# Run the assistant
if __name__ == "__main__":
    assistant = EnhancedFormalAssistant()
    assistant.run()