
# FineWipe - Ticket Resolution Website

## Overview
Welcome to **FineWipe**, my first website built using Bolt! FineWipe is designed to help users fight unfair tickets and fines using artificial intelligence. The platform allows users to upload their documents, and our AI processes them to help reclaim unfair charges—no legal expertise required. This project was a learning experience for me, and I’m excited to share how I built it, including the webhook process using Google’s free tier services.

## Purpose
FineWipe aims to simplify the process of contesting unfair tickets and fines. The tagline, *"Let’s wipe away all those fines!"*, reflects the mission: to use AI to analyze documents and assist users in resolving their issues efficiently. The website is user-friendly, with clear calls to action like "Get Started" and "Sign In," and it provides additional resources such as FAQs, pricing, and a help desk.

## How It Works
1. **User Interaction**: Users visit the FineWipe website and are greeted with a simple interface encouraging them to start saving by signing up or signing in.
2. **Document Upload**: Users upload their ticket or fine-related documents.
3. **AI Processing**: The backend, powered by a webhook process, uses AI tools to analyze the documents and provide actionable insights.
4. **Resolution**: FineWipe guides users through the steps to contest their fines, making the process seamless and accessible.

![image](https://github.com/user-attachments/assets/a70732dc-3586-4996-a880-79d467155e25)
![image](https://github.com/user-attachments/assets/54de5002-fca4-4931-a47b-b566ed8c46be)

- **Description**: This is the updated design of the FineWipe homepage. The tagline has been revised to *"Let’s wipe away all those fines!"*, emphasizing the core mission. 

## Webhook Process Using Google Free Tier
To power the AI-driven document analysis, I set up a webhook process using Google’s free tier services. The second image illustrates this workflow:

### Image 3: Webhook Process
![image](https://github.com/user-attachments/assets/47288aef-2fa8-4ca2-b4c1-a46918dcb452)

- **Description**: This image shows the webhook integration process for FineWipe:
  1. **Get Bolt**: The process starts with a custom webhook triggered by Bolt.
  2. **Dropbox Integration**: The user uploads a file to Dropbox, and a share link is created or updated.
  3. **Google Cloud Vision**: The file is processed using Google Cloud Vision for text detection (OCR) within the free tier limits.
  4. **Gemini API**: The extracted text is sent to the Gemini API to make a request for analysis.
  5. **Google Cloud Firestore**: The results are stored in Google Cloud Firestore for retrieval.
  6. **Send Bolt Response**: Finally, a response is sent back to the user via a webhook.
- **Purpose**: This workflow automates the document analysis process, leveraging free-tier Google services to keep costs low while providing powerful AI capabilities.


## Getting Started
To explore FineWipe:
1. Visit the website (link to be added once live).
2. Sign up or sign in to start uploading your documents.
3. Let FineWipe’s AI help you fight those unfair fines!

## Future Improvements
- Enhance the AI analysis with more advanced models.
- Add more user-friendly features, such as real-time progress tracking.
- Expand the "Our Benefits" section with detailed case studies and testimonials.

## Acknowledgments
- Built using **Bolt** for the website framework.
- Powered by **Google Cloud Vision**, **Gemini API**, and **Google Cloud Firestore** for the backend process.
---
