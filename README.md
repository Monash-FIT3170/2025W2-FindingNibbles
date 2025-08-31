# FindingNibbles - 2025W2

At a time when we are spoiled for dining or cooking options, even a simple decision like “What should we eat tonight?” can feel overwhelming. FindingNibbles is a mobile application powered by artificial intelligence, designed to eliminate decision fatigue by delivering hyper-personalised restaurant and dish recommendations – tailored to your location, dietary restrictions, and cravings – so you can spend less time searching and more time savouring.

Unlike generic food applications, FindingNibbles combines AI-driven menu analysis, real-time review aggregation from Google, and collaborative filtering to act as your personal dining concierge. With the ability to input ingredients you have on hand, FindingNibbles generates quick recipes that match your pantry – turning leftovers into culinary wins. It doesn’t just provide a list of options, it understands your preferences, deciphers murky menu items for dietary restrictions (e.g. “Is this vegan-friendly?”), and even aids in planning meals for when you are next travelling or have a special occasion – all while tracking nutritional goals with the help of a calorie tracker. By automating the research process and grounding recommendations in data, we turn indecision into confidence, one bite at a time.

## Overview

### Core Features

- Map-based restaurant discovery with customised recommendations
- Interactive cuisine selection tool
- AI-curated dish suggestions and menu analysis
- Comprehensive dietary and nutritional filters
- AI Integration with external reviews and users for data-driven recommendations based on collaborative filtering
- Meal planning and calorie tracking
- Recipe generation for home cooking
- Enhanced travel plans in regards to dining suggestions

### Key Beneficiaries

- Indecisive diners seeking quality options
- Food explorers looking for new experiences
- Health-conscious individuals tracking nutrition
- Restaurants gaining exposure to new customers
- Home cooks wanting to expand their culinary skills

### Non-Functional Requirements

- Maintainability for updates and error mitigation
- Cross-platform compatibility (iOS and Android)
- Strong security measures to protect user data
- Enhanced usability focusing on effectiveness, efficiency, engagement, and ease of learning
- Accessibility features for users of all abilities

## Contributors

| Name            | Email                     | Name              | Email                       |
| --------------- | ------------------------- | ----------------- | --------------------------- |
| Raphael Schwalb | raphael.schwalb@gmail.com | Max Zhuang        | maxzhuang12@gmail.com       |
| Jack Moses      | mosesjack@gmail.com       | Kehan Ranasinghe  | kehanran51423@gmail.com     |
| Blake Matheson  | blake.matheson3@gmail.com | Dhruv P Redhu     | redhudhruvpoojari@gmail.com |
| Maxwell Fergie  | maxpfergie@gmail.com      | Clare Ahn         | ahnclare110@gmail.com       |
| Oliver Sirota   | oliver.sirota@gmail.com   | Isabella Moffat   | isabellakmoffat@gmail.com   |
| Lachlan MacPhee | github@lachlanmacphee.com | Jeremia Yovinus   | jeremiayo@gmail.com         |
| Charles Liu     | charlesliu004@gmail.com   | Savera Disanayaka | savera.d@gmail.com          |
| Chance Wong     | wong.chance232@gmail.com  |                   |                             |

## Tech Stack

Our project leverages a modern, scalable technology stack:

### Frontend

- **Flutter**: Cross-platform mobile application development framework
  - Provides native performance on both iOS and Android
  - Material Design and Cupertino widgets for platform-specific UI
  - Hot reload for rapid development

### Backend

- **NestJS**: Progressive Node.js framework for building efficient and scalable server-side applications
  - TypeScript-based for improved type safety and developer experience
  - Modular architecture with dependency injection
  - Built-in support for REST APIs
- **Prisma**: Next-generation ORM for Node.js and TypeScript
  - Type-safe database access with auto-generated types
  - Database migrations and schema management
  - Seamless integration with PostgreSQL

### Infrastructure

- **Google Cloud Platform (GCP)**: Cloud provider
  - Compute Engine for database, backend, and object storage

### CI/CD Pipeline

- **GitHub Actions**: Automated workflows
  - Continuous Integration with automated testing
  - Continuous Deployment to staging and production environments
  - Code quality checks and linting

### AI/ML

- **Google Gemini**: Large Language Model
  - Natural language processing for menu analysis
  - Recipe generation and recommendations
  - User query understanding

## Handover Documentation

This will act as documentation on how to get the project up and running for new developers. It will cover:

- Installation process for the relevant technologies
- How to Build the project and setup the development Environment
- Additional notes and common issues

### Required technology & installation processes

The Required Technology is as follows:

- **NestJS** for scalable backend development (Node.js + Typescript),
- **Prisma** as the ORM with **PostgreSQL** for relational data persistence,
- **Flutter** for cross-platform UI (Written in Dart),
- **Docker** for containerised database services (PotgreSQL + pgAdmin),
- and **Dio** as the HTTP client on the frontend

A thorough installation guide and steps to setting up the environment for both Windows and Mac is available here in the [Flutter Spike Guide.](https://finding-nibbles.gitbook.io/finding-nibbles)

### Cloning from git and setting up environment

Here are the steps required to perform when cloning FindingNibbles.

1. Create a**.env** file inside the root of the backend folder. Copy the contents of**.env.example** into the new**.env** file.
2. cd to the backend directory and run`docker-compose up --build` in terminal to create your docker containers.
3. Install Prisma dependencies and seed the database:

   1. `npm install prisma @prisma/client`

   2. `npm i prisma - d`

   3. `npx prisma db push`

   4. `npx prisma db seed`

      - Optional: view data using `npx prisma studio`

4. Start up the nest backend: `npm run start:dev`
5. In the frontend directory run`flutter pub get` to download dio dependencies.
6. **Ready to go!!**

### Day to day development process

1. Start your Docker containers built during the environment setup
2. cd to `/backend` and run `npm run start:dev`
3. If you are using an emulator start it by cd into `/frontend` and using the command `flutter emulators --launch EmulatorNameHere`

   1. You can use the command `flutter emulators` to see the available emulators
   2. Note if you aren't using the emulator you can still debug the app using the web view of the application

4. Once the emulator has launched you can cd to `/frontend` and run `flutter run`

   1. This will start flutter in debug mode allowing you to quick reload or restart the app live during development

5. **Ready to start coding !!**.

## Common issues faced & solutions

Below is a list of solutions or FAQ of sorts for issues that are commonly faced when working on the project.

| Description                                                                                                                                                                                                                                                                       | Solutions                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prisma Studio wont connect after running `npx prisma studio`                                                                                                                                                                                                                      | Close the emulator if you have it running, for some reason this can cause conficts with the prisma studio and cause it to fail when it attempts to connect.                                                                                                                                                                                                                                                                       |
| After running `npm run start:dev` recieve an error message that looks like this: `Cannot find module '@googlemaps/google-maps-services-js' or its corresponding type declarations.` or more generally: `Cannot find module '@moduleName' or its corresponding type declarations.` | This ussually means that you have not correctly installed that package/module, this can be done by using `npm install @googlemaps/google-maps-services-js` or more generally `npm install moduleName` . Alternatively using something `like npm install` when in the backend directory should install all the neccessary packages / modules, but manually installing those that are missing may be required if this doesn't work. |
| After running `npm run start:dev` recieve an error message that looks like this: `[Nest] ERROR [ExceptionHandler] Error: GOOGLE_PLACES_API_KEY is required but not provided`                                                                                                      | This means that you have not correctly updated your `.env` file with the appropriate API key, follow the instructions within the `.env.example` to solve this issue.                                                                                                                                                                                                                                                                  |
