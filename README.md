# 2025W2-FindingNibbles

# Overview

## Vision

At a time when we are spoiled for dining or cooking options, even a simple decision like “What should we eat tonight?” can feel overwhelming. FindingNibbles is a mobile application powered by artificial intelligence, designed to eliminate decision fatigue by delivering hyper-personalised restaurant and dish recommendations – tailored to your location, dietary restrictions, and cravings – so you can spend less time searching and more time savouring.

Unlike generic food applications, FindingNibbles combines AI-driven menu analysis, real-time review aggregation from Google, and collaborative filtering to act as your personal dining concierge. With the ability to input ingredients you have on hand, FindingNibbles generates quick recipes that match your pantry – turning leftovers into culinary wins. It doesn’t just provide a list of options, it understands your preferences, deciphers murky menu items for dietary restrictions (e.g. “Is this vegan-friendly?”), and even aids in planning meals for when you are next travelling or have a special occasion – all while tracking nutritional goals with the help of a calorie tracker. By automating the research process and grounding recommendations in data, we turn indecision into confidence, one bite at a time.

## Core Features

- Map-based restaurant discovery with customised recommendations
- Interactive cuisine selection tool
- AI-curated dish suggestions and menu analysis
- Comprehensive dietary and nutritional filters
- AI Integration with external reviews and users for data-driven recommendations based on collaborative filtering
- Meal planning and calorie tracking
- Recipe generation for home cooking
- Enhanced travel plans in regards to dining suggestions
- Key Beneficiaries
- Indecisive diners seeking quality options
- Food explorers looking for new experiences
- Health-conscious individuals tracking nutrition
- Restaurants gaining exposure to new customers
- Home cooks wanting to expand their culinary skills
- Non-Functional Requirements
- Maintainability for updates and error mitigation
- Cross-platform compatibility (iOS and Android)
- Strong security measures to protect user data
- Enhanced usability focusing on effectiveness, efficiency, engagement, and ease of learning
- Accessibility features for users of all abilities

# Contributors

| Name              | Email                       |
| ----------------- | --------------------------- |
| Raphael Schwalb   | raphael.schwalb@gmail.com   |
| Jack Moses        | mosesjack@gmail.com         |
| Blake Matheson    | blake.matheson3@gmail.com   |
| Maxwell Fergie    | maxpfergie@gmail.com        |
| Oliver Sirota     | oliver.sirota@gmail.com     |
| Lachlan MacPhee   | github@lachlanmacphee.com   |
| Charles Liu       | charlesliu004@gmail.com     |
| Chance Wong       | wong.chance232@gmail.com    |
| Max Zhuang        | maxzhuang12@gmail.com       |
| Kehan Ranasinghe  | kehanran51423@gmail.com     |
| Dhruv P Redhu     | redhudhruvpoojari@gmail.com |
| Clare Ahn         | ahnclare110@gmail.com       |
| Isabella Moffat   | isabellakmoffat@gmail.com   |
| Jeremia Yovinus   | jeremiayo@gmail.com         |
| Savera Disanayaka | savera.d@gmail.com          |

# Tech Stack

Our project leverages a modern, scalable technology stack:

## Frontend

- **Flutter**: Cross-platform mobile application development framework
  - Provides native performance on both iOS and Android
  - Material Design and Cupertino widgets for platform-specific UI
  - Hot reload for rapid development

## Backend

- **NestJS**: Progressive Node.js framework for building efficient and scalable server-side applications
  - TypeScript-based for improved type safety and developer experience
  - Modular architecture with dependency injection
  - Built-in support for REST APIs
- **Prisma**: Next-generation ORM for Node.js and TypeScript
  - Type-safe database access with auto-generated types
  - Database migrations and schema management
  - Seamless integration with PostgreSQL

## Infrastructure

- **OpenTofu**: Infrastructure as Code (IaC) tool
  - Declarative configuration for cloud resources
  - State management for infrastructure
  - Modular structure for reusable components
- **Google Cloud Platform (GCP)**: Cloud provider
  - Cloud Run for containerized applications
  - Cloud SQL for managed database services
  - Cloud Storage for object storage

## CI/CD Pipeline

- **GitHub Actions**: Automated workflows
  - Continuous Integration with automated testing
  - Continuous Deployment to staging and production environments
  - Code quality checks and linting

## AI/ML

- **SciKit Learn**: Machine learning library
  - Implementation of collaborative filtering algorithms for recommendations
  - Feature engineering and data preprocessing
  - Model evaluation and validation
- **Google Gemini**: Large Language Model
  - Natural language processing for menu analysis
  - Recipe generation and recommendations
  - User query understanding
