# Intern GPT – Internship Scam Detection System 🚨

Intern GPT is a **rule-based internship scam detection web application** designed to help students identify fraudulent internship messages.  
The system analyzes internship-related messages and classifies them into **Low, Medium, or High Risk**, along with **clear safety tips**.

This project was built as part of the **Hack the Winter Hackathon** to address the growing issue of internship scams targeting students.

---

## 🔍 Problem Statement

Many students receive internship offers via WhatsApp, Telegram, email, and social media.  
These messages often:
- Ask for upfront fees
- Promise unrealistic salaries
- Use suspicious links
- Lack official contact details  

Students often fail to identify scams early, leading to financial loss and data theft.

---

## 💡 Solution Overview

Intern GPT provides a **simple and effective rule-based detection system** that:
- Accepts internship messages as input
- Matches them against predefined scam rules
- Calculates risk level
- Displays safety recommendations instantly

The system focuses on **clarity, transparency, and explainability**, making it easy for students to understand *why* a message is risky.

---

## ⚙️ Key Features

-  Internship message analysis  
-  Rule-based scam detection logic  
-  Risk classification (Low / Medium / High)  
-  Safety tips for each risk level  
-  Structured database design  
-  Simple and user-friendly interface  

---

## 🧠 Rule-Based Analysis System

The application uses a **Rule-Based Analysis System**, not AI or Machine Learning.

### How it works:
- Messages are scanned for predefined scam indicators such as:
  - Keywords like *“registration fee”*, *“instant joining”*, *“limited slots”*
  - Suspicious URLs
  - Unrealistic salary claims
- Each rule contributes to a **risk score**
- Final output is generated based on total risk score

### Why Rule-Based?
- Transparent and explainable logic
- Easy to validate and improve
- No dependency on training data
- Suitable for early-stage detection systems

---

## 🧩 System Architecture

### 📌 Level 0 DFD
- User submits internship message
- System analyzes the message
- Risk result and safety tips are returned

### 📌 Level 1 DFD
1. Receive & validate message  
2. Analyze message using scam rules  
3. Generate risk result and safety tips  

(DFD diagrams are included in the repository)

---

## 🗄️ Database Schema

The system uses a structured relational schema consisting of:

### Tables:
- **Users**
  - user_id (PK)
  - name
  - email
  - created_at

- **Internship_Messages**
  - message_id (PK)
  - user_id (FK)
  - message_text
  - source_platform
  - submitted_at

- **Scam_Rules**
  - rule_id (PK)
  - rule_keyword
  - rule_description

- **Analysis_Results**
  - result_id (PK)
  - message_id (FK)
  - risk_level (Low / Medium / High)
  - risk_score
  - safety_tips

(Database schema diagram is included in the repository)

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend Logic:** Rule-Based Analysis  
- **Database Design:** Relational Schema  
- **Hosting:** GitHub Pages  

---

## 🚀 How to Run the Project

1. Clone the repository  
   ```bash
   git clone https://github.com/kritimalkani0609-sudo/intern-gpt.gitOpen index.html in any modern browser
Enter an internship message and analyze risk
# 🎯 Use Cases
Students verifying internship messages
Colleges spreading scam awareness
Early-stage fraud detection prototypes
# 🔮 Future Scope
Admin dashboard for managing scam rules
Advanced risk scoring
Integration with real-time reporting systems
# Mobile-friendly version
