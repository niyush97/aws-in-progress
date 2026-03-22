# AWS Machine Learning - SAA-C03 Exam Guide

---

>⚠️ These notes were created using Anthropic's AI Models (Opus 4.5 and 4.6).

---


# Machine Learning Strategy for SAA-C03 ⭐⭐

```
What You Need to Know:
✅ What each service does (one sentence)
✅ Key use case (when to use it)
✅ Keywords that identify it in questions
✅ Basic differentiators between similar services

What You DON'T Need:
❌ Deep technical details
❌ Model training specifics
❌ Algorithm details
❌ API parameters
❌ Pricing details

Exam Reality:
- 2-4 questions on ML services
- Usually straightforward keyword matching
- Focus on USE CASE identification
- Know which service solves which problem
```

---

# The Golden Rule for ML Questions ⭐⭐⭐⭐⭐

```
SPECIFIC TASK → SPECIFIC AWS ML SERVICE
CUSTOM ML MODEL → AMAZON SAGEMAKER

Examples:
"Detect faces in images" → Rekognition (NOT SageMaker)
"Convert speech to text" → Transcribe (NOT SageMaker)
"Build custom fraud model" → SageMaker (custom ML)
"Translate English to French" → Translate (NOT SageMaker)
"Build chatbot" → Lex (NOT SageMaker)

Rule:
If AWS has a specific service for the task → Use that service
If task requires custom ML → Use SageMaker
```

---

# Amazon Rekognition 
⭐⭐⭐

## What is Rekognition?
```
- Analyze images and videos using ML
- No ML expertise required
- Pre-trained models
- Real-time or batch processing
```

## Key Capabilities 
⭐⭐⭐⭐
```
Images:
✅ Object and scene detection
   "Detect a car, tree, person in image"

✅ Facial analysis and recognition
   "Identify person", "Detect emotions"
   "Compare faces", "Search face database"

✅ Text in images (OCR)
   "Read text from image/photo"

✅ Content moderation
   "Detect inappropriate/explicit content"

✅ Celebrity recognition
   "Identify famous people"

✅ Custom labels
   "Detect your specific objects"
   (Train with your own images)

Videos:
✅ Person tracking
✅ Activity detection
✅ Unsafe content detection
✅ Celebrity recognition in video
✅ Face search in video
```

## Common Exam Scenarios 
⭐⭐⭐
```
Scenario 1: Content Moderation
"Automatically detect inappropriate content in user uploads"
→ Amazon Rekognition (content moderation)

Scenario 2: User Verification
"Verify user identity by comparing selfie to ID photo"
→ Amazon Rekognition (face comparison)

Scenario 3: Security Surveillance
"Identify people in security camera footage"
→ Amazon Rekognition (face search in video)

Scenario 4: Image Cataloging
"Automatically tag and categorize product images"
→ Amazon Rekognition (object detection)

Scenario 5: Age Verification
"Detect if person in image is underage"
→ Amazon Rekognition (facial analysis)
```

## Architecture Pattern 
⭐⭐⭐⭐
```
Image/Video Processing Pipeline:
S3 (upload image)
    ↓
Lambda (trigger)
    ↓
Rekognition (analyze)
    ↓
DynamoDB (store results)
    ↓
SNS (notify if issue found)

Real-time Video:
Kinesis Video Streams
    ↓
Rekognition Video
    ↓
Kinesis Data Streams
    ↓
Lambda (process results)
```

## Keywords to Identify Rekognition
```
"Detect faces" ✅
"Facial recognition" ✅
"Content moderation" ✅
"Identify objects in images" ✅
"Image analysis" ✅
"Video analysis" ✅
"Celebrity recognition" ✅
"Inappropriate content detection" ✅
"Compare faces" ✅
"Text in images" ✅
```

---

# Amazon Transcribe 
⭐⭐⭐

## What is Transcribe?
```
- Automatic Speech Recognition (ASR)
- Convert audio/video to text
- Real-time or batch
- Multiple languages
- No ML expertise required
```

## Amazon Transcribe Key Features 
⭐⭐⭐⭐
```
Core:
✅ Speech to text conversion
✅ Multiple languages (100+)
✅ Real-time transcription
✅ Batch transcription (recorded audio)

Advanced:
✅ Speaker identification
   "Who said what" (diarization)

✅ Custom vocabulary
   "Teach it industry-specific terms"
   Medical terms, company names, etc.

✅ PII redaction
   "Automatically remove sensitive info"
   SSN, credit cards, phone numbers

✅ Automatic punctuation
   "Add punctuation automatically"

✅ Channel identification
   "Separate customer vs agent in call"

Specialized:
✅ Amazon Transcribe Medical
   "Medical terminology, clinical notes"
   HIPAA eligible

✅ Amazon Transcribe Call Analytics
   "Analyze call center recordings"
   Sentiment, talk time, interruptions
```

## Amazon Transcribe Common Exam Scenarios ⭐⭐⭐⭐
```
Scenario 1: Meeting Transcription
"Automatically transcribe recorded meetings"
→ Amazon Transcribe (batch)

Scenario 2: Live Captions
"Add real-time subtitles to live video"
→ Amazon Transcribe (real-time)

Scenario 3: Call Center Analytics
"Analyze customer service call recordings"
→ Amazon Transcribe Call Analytics

Scenario 4: Medical Records
"Transcribe doctor's voice notes to text"
→ Amazon Transcribe Medical

Scenario 5: Remove PII from Transcripts
"Transcribe calls but remove customer PII"
→ Amazon Transcribe (PII redaction)
```

## Keywords to Identify Amazon Transcribe 
```
"Speech to text" ✅
"Audio to text" ✅
"Transcription" ✅
"Subtitles/captions" ✅
"Voice to text" ✅
"Transcribe audio" ✅
"Speaker identification" ✅
"Call recording analysis" ✅
```

---

# Amazon Polly 
⭐⭐⭐

## What is Polly?
```
- Text-to-Speech (TTS) service
- Convert text to lifelike speech
- Multiple voices and languages
- Real-time or batch
- No ML expertise required
```

## Amazon Polly Key Features ⭐⭐⭐⭐
```
Core:
✅ Text to speech conversion
✅ 60+ voices
✅ 30+ languages
✅ Real-time synthesis
✅ Batch synthesis (store as MP3/OGG)

Voice Types:
✅ Standard voices (good quality)
✅ Neural voices (most natural, lifelike)
✅ Brand voice (custom voice - enterprise)

SSML Support:
✅ Control speech rate
✅ Control pitch
✅ Add pauses
✅ Emphasize words
✅ Pronunciation control

Lexicons:
✅ Custom pronunciation
✅ "AWS" → "Amazon Web Services"
✅ Industry-specific terms
```

## Amazon Polly Common Exam Scenarios ⭐⭐⭐⭐
```
Scenario 1: Accessibility
"Read website content aloud for visually impaired"
→ Amazon Polly

Scenario 2: E-Learning
"Convert course text to audio lessons"
→ Amazon Polly

Scenario 3: Voice Notifications
"Send audio notifications to users"
→ Amazon Polly

Scenario 4: IVR System
"Create interactive voice response system"
→ Amazon Polly + Amazon Lex

Scenario 5: Podcast Generation
"Convert blog posts to podcast audio"
→ Amazon Polly
```

## Transcribe vs Polly ⭐⭐⭐⭐⭐
```
Easy way to remember:

Transcribe: Audio → Text (transcribe what was said)
Polly: Text → Audio (polly wants to talk)

Transcribe: INPUT is audio
Polly: OUTPUT is audio

Memory trick:
"Polly the parrot TALKS" → Text to Speech
"Transcribe what you HEAR" → Speech to Text
```

## Keywords to Identify Polly
```
"Text to speech" ✅
"Generate audio from text" ✅
"Voice synthesis" ✅
"Read content aloud" ✅
"Convert text to audio" ✅
"Lifelike speech" ✅
"Audio generation" ✅
```

---

# Amazon Lex ⭐⭐⭐

## What is Lex?
```
- Build conversational chatbots
- Same technology as Amazon Alexa
- Natural language understanding (NLU)
- Automatic speech recognition (ASR)
- Text and voice interfaces
- No ML expertise required
```

## Amazon Lex Key Concepts ⭐⭐⭐⭐
```
Bot:
- The chatbot itself
- Contains intents and slots

Intent:
- What user wants to do
- "BookFlight", "OrderPizza", "CheckBalance"

Slot:
- Information needed to fulfill intent
- "From city", "To city", "Date"

Utterance:
- How user expresses intent
- "I want to fly to New York"
- "Book me a flight to NYC"
- "Can I get a ticket to New York?"

Fulfillment:
- What happens when intent fulfilled
- Lambda function (most common)
- Return response to user
```

## Amazon Lex Key Features ⭐⭐⭐⭐
```
✅ Natural language understanding
✅ Multi-turn conversations
✅ Voice and text input
✅ Lambda integration (fulfillment)
✅ Multiple channels:
   - Web
   - Mobile
   - Slack
   - Facebook Messenger
   - Twilio (SMS)
   - Amazon Connect (call center)
✅ Built-in slot types (dates, numbers, etc.)
✅ Sentiment analysis (built-in)
✅ Multi-language support
```

## Amazon Lex Common Exam Scenarios ⭐⭐⭐⭐
```
Scenario 1: Customer Service Bot
"Build chatbot to handle common customer questions"
→ Amazon Lex

Scenario 2: Order Bot
"Allow customers to order via chat"
→ Amazon Lex + Lambda (process order)

Scenario 3: Call Center Bot
"Automate call center with voice bot"
→ Amazon Lex + Amazon Connect

Scenario 4: FAQ Bot
"Answer frequently asked questions automatically"
→ Amazon Lex

Scenario 5: Banking Bot
"Check account balance, transfer funds via chat"
→ Amazon Lex + Lambda + DynamoDB
```

## Lex Architecture Pattern ⭐⭐⭐⭐
```
User (text/voice)
    ↓
Amazon Lex (understand intent)
    ↓
Lambda (fulfill intent)
    ↓
Backend (DynamoDB, RDS, APIs)
    ↓
Response back to user

With Amazon Connect (call center):
Phone Call
    ↓
Amazon Connect
    ↓
Amazon Lex (understand)
    ↓
Lambda (process)
    ↓
Response to caller
```

## Keywords to Identify Lex
```
"Chatbot" ✅
"Conversational interface" ✅
"Virtual assistant" ✅
"Alexa technology" ✅
"Natural language" ✅
"Voice bot" ✅
"Intent recognition" ✅
"Multi-turn conversation" ✅
"Automated customer service" ✅
```

---

# Amazon Comprehend 
⭐⭐⭐

## What is Comprehend?
```
- Natural Language Processing (NLP) service
- Extract insights from text
- Understand text content
- No ML expertise required
- Pre-trained and custom models
```

## Amazon Comprehend Key Capabilities ⭐⭐⭐⭐
```
Pre-trained:
✅ Sentiment analysis
   "Is this review positive or negative?"
   Positive, Negative, Neutral, Mixed

✅ Entity recognition
   "Find people, places, dates, organizations"
   "John Smith works at Amazon in Seattle"

✅ Key phrase extraction
   "What are the main topics?"

✅ Language detection
   "What language is this text?"

✅ Syntax analysis
   "Parts of speech (noun, verb, etc.)"

✅ PII detection and redaction
   "Find and remove personal information"

Custom:
✅ Custom classification
   "Categorize documents your way"
   Support tickets → Category (billing, technical, etc.)

✅ Custom entity recognition
   "Find your specific entities"
   Product codes, internal IDs, etc.

Specialized:
✅ Amazon Comprehend Medical
   "Extract medical information from text"
   Diagnoses, medications, dosages
   HIPAA eligible
```

## Amazon Comprehend Common Exam Scenarios ⭐⭐⭐⭐
```
Scenario 1: Customer Feedback Analysis
"Analyze customer reviews for sentiment"
→ Amazon Comprehend (sentiment analysis)

Scenario 2: Support Ticket Routing
"Automatically categorize support tickets"
→ Amazon Comprehend (custom classification)

Scenario 3: Document Analysis
"Extract key information from contracts"
→ Amazon Comprehend (entity recognition)

Scenario 4: Social Media Monitoring
"Monitor brand sentiment on social media"
→ Amazon Comprehend (sentiment analysis)

Scenario 5: Medical Records
"Extract diagnoses and medications from notes"
→ Amazon Comprehend Medical
```

## Keywords to Identify Comprehend
```
"Sentiment analysis" ✅
"NLP" ✅
"Natural language processing" ✅
"Extract entities from text" ✅
"Text analysis" ✅
"Analyze text" ✅
"Key phrase extraction" ✅
"Document classification" ✅
"PII in text" ✅
```

---

# Amazon Translate ⭐⭐⭐

## What is Translate?
```
- Neural machine translation
- Translate text between languages
- Real-time or batch
- 75+ languages
- No ML expertise required
```

## Amazon Translate Key Features ⭐⭐⭐
```
✅ 75+ languages supported
✅ Real-time translation
✅ Batch translation (documents)
✅ Custom terminology
   "Keep brand names unchanged"
   "Use specific translations for terms"
✅ Formality settings
   "Formal vs informal language"
✅ Profanity masking
✅ Active Custom Translation
   "Fine-tune with your own data"
```

## Amazon Translate Common Exam Scenarios ⭐⭐⭐
```
Scenario 1: Multilingual App
"Support users in 50 languages"
→ Amazon Translate

Scenario 2: Content Localization
"Translate website content to local languages"
→ Amazon Translate

Scenario 3: Real-Time Chat Translation
"Translate messages between users in different languages"
→ Amazon Translate (real-time)

Scenario 4: Document Translation
"Translate large volumes of documents"
→ Amazon Translate (batch)

Scenario 5: Customer Support
"Translate customer emails to English for support team"
→ Amazon Translate
```

## Keywords to Identify Translate
```
"Translate" ✅
"Multilingual" ✅
"Language translation" ✅
"Multiple languages" ✅
"Localization" ✅
"Convert language" ✅
```

---

# Amazon SageMaker 
⭐⭐⭐⭐

## What is SageMaker?
```
- Fully managed ML platform
- Build, train, and deploy ML models
- For data scientists and ML engineers
- End-to-end ML workflow
- Custom ML models
```

## Amazon SageMaker Key Components ⭐⭐⭐⭐
```
Build:
✅ SageMaker Studio (IDE for ML)
✅ Notebooks (Jupyter)
✅ Data labeling (Ground Truth)
✅ Feature Store

Train:
✅ Managed training (any algorithm)
✅ Built-in algorithms
✅ Automatic Model Tuning (hyperparameter)
✅ Distributed training
✅ Spot training (save costs)

Deploy:
✅ Real-time endpoints
✅ Batch transform
✅ Serverless inference
✅ Multi-model endpoints
✅ A/B testing

Automate:
✅ SageMaker Autopilot (AutoML)
✅ SageMaker Pipelines (MLOps)
✅ Model Monitor (detect drift)
✅ Model Registry
```

## When to Use SageMaker ⭐⭐⭐⭐⭐
```
Use SageMaker When:
✅ Need CUSTOM ML model
✅ Data scientists on team
✅ Existing ML code to run
✅ Complex ML requirements
✅ Need full ML pipeline
✅ AutoML (Autopilot)

Use Specific Services When:
✅ Image analysis → Rekognition
✅ Speech to text → Transcribe
✅ Text to speech → Polly
✅ Translation → Translate
✅ NLP/sentiment → Comprehend
✅ Chatbot → Lex
✅ Recommendations → Personalize
✅ Forecasting → Forecast

Key Exam Tip:
"Data scientists building custom model" → SageMaker
"Specific pre-built task" → Specific service
```

## Amazon SageMaker Common Exam Scenarios 
⭐⭐⭐⭐
```
Scenario 1: Custom Fraud Detection
"Build custom ML model to detect fraud patterns"
→ Amazon SageMaker

Scenario 2: Churn Prediction
"Predict which customers will cancel subscription"
→ Amazon SageMaker

Scenario 3: Custom Image Classification
"Classify medical images (specific to your data)"
→ Amazon SageMaker
(Note: If general image analysis → Rekognition)

Scenario 4: AutoML
"Build ML model without ML expertise"
→ SageMaker Autopilot

Scenario 5: MLOps Pipeline
"Automate ML model training and deployment"
→ SageMaker Pipelines
```

## Keywords to Identify SageMaker
```
"Train ML model" ✅
"Custom ML" ✅
"Data scientists" ✅
"ML platform" ✅
"Build and deploy models" ✅
"Machine learning pipeline" ✅
"AutoML" ✅
"Custom algorithm" ✅
"MLOps" ✅
```

---

# Amazon Forecast 
⭐⭐⭐

## What is Forecast?
```
- Time-series forecasting service
- Predict future values
- No ML expertise required
- Same technology as Amazon.com
- Combines historical data with related data
```

## Amazon Forecast Key Features 
⭐⭐⭐
```
✅ Time-series forecasting
✅ Multiple ML algorithms (AutoML)
✅ Related data (weather, events, etc.)
✅ What-if analysis
✅ Explainability (why this forecast?)
✅ Probabilistic forecasts (confidence intervals)

Input Data:
- Historical time-series data
- Related time-series (optional)
- Item metadata (optional)
```

## Amazon Forecast Common Exam Scenarios 
⭐⭐⭐
```
Scenario 1: Inventory Planning
"Predict product demand for next 3 months"
→ Amazon Forecast

Scenario 2: Resource Planning
"Forecast server capacity needs"
→ Amazon Forecast

Scenario 3: Financial Forecasting
"Predict revenue for next quarter"
→ Amazon Forecast

Scenario 4: Energy Demand
"Forecast electricity demand"
→ Amazon Forecast

Scenario 5: Staffing
"Predict call center volume for scheduling"
→ Amazon Forecast
```

## Keywords to Identify Forecast
```
"Demand forecasting" ✅
"Predict future values" ✅
"Time-series" ✅
"Inventory planning" ✅
"Future demand" ✅
"Forecast" ✅
"Predict demand" ✅
```

---

# Amazon Personalize 
⭐⭐⭐

## What is Personalize?
```
- Real-time personalization and recommendations
- Same technology as Amazon.com
- No ML expertise required
- Real-time or batch recommendations
- Learns from user behavior
```

## Amazon Personalize Key Features 
⭐⭐⭐
```
✅ Real-time recommendations
✅ Personalized rankings
✅ Similar items
✅ User segmentation
✅ Contextual recommendations
   (device, time, location)
✅ Automatic retraining
✅ A/B testing support

Input Data:
- User interactions (clicks, purchases, views)
- Item catalog (products, content)
- User data (demographics, preferences)
```

## Amazon Personalize Common Exam Scenarios 
⭐⭐⭐
```
Scenario 1: Product Recommendations
"Show personalized product recommendations"
→ Amazon Personalize

Scenario 2: Content Recommendations
"Recommend articles/videos to users"
→ Amazon Personalize

Scenario 3: Personalized Search
"Rank search results by user preference"
→ Amazon Personalize

Scenario 4: Email Personalization
"Send personalized product emails"
→ Amazon Personalize

Scenario 5: Similar Items
"Show similar products to what user is viewing"
→ Amazon Personalize
```

## Keywords to Identify Personalize
```
"Personalized recommendations" ✅
"Product recommendations" ✅
"Like Amazon.com" ✅
"User behavior" ✅
"Recommendation engine" ✅
"Personalization" ✅
"Collaborative filtering" ✅
```

---

# Additional ML Services (Awareness) ⭐⭐

## Amazon Textract 
⭐⭐⭐
```
What: Extract text and data from documents
Beyond simple OCR

Features:
✅ Extract text from PDFs, images
✅ Extract tables (structured data)
✅ Extract forms (key-value pairs)
✅ Handwriting recognition
✅ Medical document analysis

Use Cases:
✅ Document processing automation
✅ Invoice processing
✅ Form data extraction
✅ Medical records processing

Keywords:
"Extract from documents" → Textract
"OCR" → Textract
"Extract from PDF" → Textract
"Forms and tables" → Textract
"Document digitization" → Textract
```

## Amazon Kendra 
⭐⭐
```
What: Intelligent enterprise search
Natural language search powered by ML

Features:
✅ Natural language queries
✅ Multiple data sources (S3, SharePoint, etc.)
✅ Relevance tuning
✅ FAQ answers
✅ Incremental learning

Use Cases:
✅ Enterprise search
✅ Knowledge base search
✅ Internal document search

Keywords:
"Enterprise search" → Kendra
"Natural language search" → Kendra
"Intelligent search" → Kendra
"Search documents" → Kendra
```

## Amazon Fraud Detector 
⭐⭐
```
What: ML-based fraud detection
No ML expertise required

Features:
✅ Real-time fraud detection
✅ Account takeover detection
✅ Online payment fraud
✅ Custom fraud models
✅ Pre-built fraud models

Use Cases:
✅ Online payment fraud
✅ Account registration fraud
✅ Fake reviews

Keywords:
"Detect fraud" → Fraud Detector
"Online fraud" → Fraud Detector
"Payment fraud" → Fraud Detector
```

## Amazon Lookout Services 
⭐⭐
```
Amazon Lookout for Equipment:
- Detect abnormal equipment behavior
- Predictive maintenance
- Industrial IoT

Amazon Lookout for Metrics:
- Detect anomalies in business metrics
- Revenue, traffic, user activity

Amazon Lookout for Vision:
- Detect defects in products
- Visual inspection automation
- Manufacturing quality control

Keywords:
"Equipment anomaly" → Lookout for Equipment
"Business metric anomaly" → Lookout for Metrics
"Visual defect detection" → Lookout for Vision
```

## Amazon Monitron 
⭐
```
What: End-to-end equipment monitoring
Predictive maintenance
Industrial sensors + ML

Keywords:
"Predictive maintenance"
"Industrial equipment monitoring"
```

## AWS DeepRacer 
⭐
```
What: Autonomous racing car
Learn reinforcement learning
Educational/fun

Keywords:
"Reinforcement learning"
"Autonomous racing"
```

---

# ML Services Master Cheat Sheet 
⭐⭐⭐⭐⭐

## One-Line Descriptions

| Service | One Line | Keywords |
|---------|----------|----------|
| **Rekognition** | Analyze images/videos | Faces, objects, content moderation |
| **Transcribe** | Audio → Text | Speech to text, subtitles |
| **Polly** | Text → Audio | Text to speech, voice |
| **Lex** | Build chatbots | Chatbot, Alexa, conversational |
| **Comprehend** | Understand text (NLP) | Sentiment, entities, NLP |
| **Translate** | Translate languages | Multilingual, localization |
| **SageMaker** | Custom ML platform | Data scientists, custom models |
| **Forecast** | Predict future values | Time-series, demand forecasting |
| **Personalize** | Recommendations | Product recommendations, personalization |
| **Textract** | Extract from documents | OCR, PDF extraction, forms |
| **Kendra** | Enterprise search | Natural language search |
| **Fraud Detector** | Detect fraud | Online fraud, payment fraud |

---

# ML Decision Tree 
⭐⭐⭐⭐⭐

```
What do you need?

├─ Analyze IMAGES or VIDEOS?
│  └─ Amazon Rekognition
│     ├─ Faces, objects, scenes
│     ├─ Content moderation
│     └─ Text in images

├─ AUDIO to TEXT?
│  └─ Amazon Transcribe
│     ├─ Meetings, calls
│     └─ Medical → Transcribe Medical

├─ TEXT to AUDIO?
│  └─ Amazon Polly
│     ├─ Accessibility
│     └─ Voice applications

├─ Build a CHATBOT?
│  └─ Amazon Lex
│     ├─ Text or voice
│     └─ + Connect for call center

├─ Understand TEXT (NLP)?
│  └─ Amazon Comprehend
│     ├─ Sentiment analysis
│     ├─ Entity extraction
│     └─ Medical → Comprehend Medical

├─ TRANSLATE languages?
│  └─ Amazon Translate
│     └─ Multilingual apps

├─ FORECAST future values?
│  └─ Amazon Forecast
│     └─ Demand, inventory, capacity

├─ RECOMMENDATIONS?
│  └─ Amazon Personalize
│     └─ Products, content, search

├─ Extract from DOCUMENTS?
│  └─ Amazon Textract
│     └─ PDFs, forms, tables

├─ SEARCH documents?
│  └─ Amazon Kendra
│     └─ Enterprise search

├─ Detect FRAUD?
│  └─ Amazon Fraud Detector
│     └─ Online fraud

└─ CUSTOM ML model?
   └─ Amazon SageMaker
      └─ Data scientists, custom algorithms
```

---

# Common Exam Traps - ML 
⭐⭐⭐⭐⭐

### Trap 1: SageMaker for Everything
```
❌ Wrong: Use SageMaker to detect faces in images
✅ Right: Use Rekognition for face detection

Why: Rekognition is pre-built for image analysis
SageMaker = custom models only
```

### Trap 2: Transcribe vs Polly Confusion
```
❌ Wrong: Use Transcribe to generate speech from text
✅ Right: Use Polly for text-to-speech

Memory trick:
Transcribe = LISTEN and write down (audio → text)
Polly = SPEAK out loud (text → audio)
```

### Trap 3: Comprehend vs Rekognition for Text
```
❌ Wrong: Use Rekognition to analyze text sentiment
✅ Right: Use Comprehend for text analysis

Why:
Rekognition = images and videos
Comprehend = text analysis (NLP)

Note: Rekognition CAN detect text IN images (OCR)
But for analyzing text content → Comprehend
```

### Trap 4: Lex vs Comprehend for Chatbots
```
❌ Wrong: Use Comprehend to build a chatbot
✅ Right: Use Lex for chatbots

Why:
Lex = build conversational interfaces (chatbots)
Comprehend = analyze text (NLP insights)
```

### Trap 5: Forecast vs Personalize
```
❌ Wrong: Use Personalize to forecast inventory
✅ Right: Use Forecast for time-series prediction

Why:
Forecast = predict future VALUES (time-series)
Personalize = recommend items TO USERS

Memory trick:
Forecast = "What will happen?" (future values)
Personalize = "What does this USER want?" (recommendations)
```

### Trap 6: Textract vs Rekognition for Text
```
❌ Wrong: Use Rekognition to extract structured data from forms
✅ Right: Use Textract for document data extraction

Why:
Rekognition = detect text exists in image (basic OCR)
Textract = extract structured data (tables, forms, key-value pairs)

Use Textract when you need STRUCTURED extraction
Use Rekognition when you need to DETECT text presence
```

---

# ML Exam Scenarios Quick Reference 
⭐⭐⭐⭐⭐

| Scenario | Service | Reason |
|----------|---------|--------|
| "Detect faces in photos" | Rekognition | Image analysis |
| "Moderate user content" | Rekognition | Content moderation |
| "Transcribe meeting recordings" | Transcribe | Audio to text |
| "Add subtitles to videos" | Transcribe | Speech to text |
| "Read website content aloud" | Polly | Text to speech |
| "Build customer service bot" | Lex | Chatbot |
| "Analyze review sentiment" | Comprehend | NLP/sentiment |
| "Translate app to 50 languages" | Translate | Translation |
| "Custom fraud ML model" | SageMaker | Custom ML |
| "Predict product demand" | Forecast | Time-series |
| "Product recommendations" | Personalize | Recommendations |
| "Extract data from invoices" | Textract | Document extraction |
| "Search company documents" | Kendra | Enterprise search |
| "Detect payment fraud" | Fraud Detector | Fraud detection |
| "Medical transcription" | Transcribe Medical | Medical speech |
| "Extract medical entities" | Comprehend Medical | Medical NLP |
| "Call center automation" | Lex + Connect | Voice bot |
| "AutoML (no ML expertise)" | SageMaker Autopilot | AutoML |
| "Detect equipment failure" | Lookout for Equipment | Predictive maintenance |
| "Visual defect detection" | Lookout for Vision | Manufacturing QC |

---

# 🎉 FINAL SUMMARY - ALL ML SERVICES 🎉

## The Complete ML Cheat Sheet 
⭐⭐⭐⭐⭐

```
VISION (Images/Video)
Rekognition → Faces, objects, content moderation, text in images

SPEECH
Transcribe → Audio/Speech TO Text
Polly → Text TO Audio/Speech

LANGUAGE
Comprehend → Understand text (sentiment, entities, NLP)
Translate → Translate between languages
Lex → Build chatbots (conversational AI)

PREDICTIONS
Forecast → Time-series forecasting (future values)
Personalize → Personalized recommendations

DOCUMENTS
Textract → Extract structured data from documents

SEARCH
Kendra → Intelligent enterprise search

FRAUD
Fraud Detector → Detect online fraud

CUSTOM ML
SageMaker → Build, train, deploy custom ML models
```