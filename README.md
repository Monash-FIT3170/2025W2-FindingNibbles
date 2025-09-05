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
  - A Compute Engine E2 Medium VM with 20GB disk, 1-2 vCPUS, 4GB memory on Ubuntu 24.04 LTS x86/64
  - The VM runs the database, backend, and object storage.
  - There is a DNS A record setup from the `nibbles` subdomain of `lachlanmacphee.com` to the IP address `34.129.60.144`

### CI/CD Pipeline

- **GitHub Actions**: Automated workflows
  - Continuous Integration with automated formatting checks, linting, and testing
  - Continuous Deployment to the production environment
  - Code quality checks and linting
  - For frontend deployment, we followed this guide [here](https://medium.com/@colonal/automating-flutter-builds-and-releases-with-github-actions-77ccf4a1ccdd).
  - The base-64 encoded keystore for frontend deploy is included in the GitHub repository's secrets, and a backup is stored on one of the contributors' laptop.
- **Manual Deployments**: Use this as a backup to GitHub actions if the pipeline is ffailing.
  - You can find a video guide on how to deploy the backend [here](https://drive.google.com/file/d/19m-NTtxg_W-4Dw40WJ4UpveQXae9S_FS/view?usp=drive_link)

### AI/ML

- **Google Gemini**: Large Language Model
  - Natural language processing for menu analysis
  - Recipe generation and recommendations
  - User query understanding

## Handover Documentation

This will act as documentation on how to get the project up and running for new developers. It will cover:

- Installation process for the relevant technologies
- How to build the project and setup the development environment
- Additional notes and common issues

### Required technology & installation processes

**Required technology is as follows:**

- **NestJS** for scalable backend development (Node.js + Typescript)
- **Prisma** as the ORM with **PostgreSQL** for relational data persistence
- **Docker** for containerised database services (PostgreSQL + pgAdmin)
- **Flutter** for the cross-platform frontend (written in Dart)
- **Dio** as the HTTP client on the frontend

A thorough installation guide and steps to setting up the environment for both Windows and Mac is available here in the [Flutter Spike Guide.](https://finding-nibbles.gitbook.io/finding-nibbles)

### Cloning from git and setting up environment

Here are the steps required to setup the environment on your local machine.

1. Start by cloning: `git clone https://github.com/Monash-FIT3170/2025W2-FindingNibbles.git`
2. You may rename the folder if you'd like, otherwise run `cd 2025W2-FindingNibbles`
3. `cd backend` to set that up first.
4. Run the command `cp .env.example .env` to create a copy of the example environment variables file into an actual one. This file is not committed to the repository due to security purposes.
5. Run `docker compose up -d` in a terminal to create your Docker containers in detached mode (i.e. in the background).
6. Install dependencies and seed the database with the following set of commands. You may wish to copy and paste them all at once, then hit enter.

```
npm install
docker compose down --volumes
docker compose up -d
npm run db:push
npm run db:seed
```

7. **Optional:** to view data, use `npm run db:studio` in a new terminal.
8. Start up the NestJS backend: `npm run start:dev`
9. Run `cd ../frontend` to switch to the frontend.
10. Run `flutter doctor` to ensure Flutter is installed and setup correctly and run any suggested commands to fix issues.
11. Run `flutter pub get` to download dio dependencies.
12. Install Android Studio using the instructions [here](https://developer.android.com/studio/install) and setup a virtual device.
13. Run `flutter run` to start the frontend.
14. When prompted to select a device, select virtual mobile device.
15. **Ready to go!!**

### Day to day development processor

1. Start your Docker containers built during the environment setup
2. cd to `/backend` and run `npm run start:dev`
3. For the frontend, f you are using an emulator start it with the the command `flutter emulators --launch EmulatorNameHere`

   1. You can use the command `flutter emulators` to see the available emulators
   2. Note if you aren't using the emulator you can still debug the app using the web view of the application

4. Once the emulator has launched you can cd to `/frontend` and run `flutter run`

   1. This will start flutter in debug mode allowing you to hot-reload (restart the app after making changes to the code in development).

5. **Ready to start coding !!**.

## Common issues faced & solutions

Below is a list of solutions or FAQ of sorts for issues that are commonly faced when working on the project.

| Description                                                                                                                                                                                                                                                                       | Solutions                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prisma Studio wont connect after running `npx prisma studio`                                                                                                                                                                                                                      | Close the emulator if you have it running, for some reason this can cause conficts with the prisma studio and cause it to fail when it attempts to connect.                                                                                                                                                                                                                                                                      |
| After running `npm run start:dev` recieve an error message that looks like this: `Cannot find module '@googlemaps/google-maps-services-js' or its corresponding type declarations.` or more generally: `Cannot find module '@moduleName' or its corresponding type declarations.` | This ussually means that you have not correctly installed that package/module, this can be done by using `npm install @googlemaps/google-maps-services-js` or more generally `npm install moduleName` . Alternatively using something like `npm install` when in the backend directory should install all the necessary packages / modules, but manually installing those that are missing may be required if this doesn't work. |
| After running `npm run start:dev` receive an error message that looks like this: `[Nest] ERROR [ExceptionHandler] Error: SOME_NAME_API_KEY is required but not provided` or `SOME_NAME_MODEL_NAME is required but not provided`                                                   | This means that you have not correctly updated your `.env` file with the appropriate API key or model name, please follow the instructions within the `.env.example` to solve this issue.                                                                                                                                                                                                                                        |
| Local copy of Postgres conflicts with the Docker containerised version                                                                                                                                                                                                            | Run in cmd as admin: `net stop postgresql-x64-17`                                                                                                                                                                                                                                                                                                                                                                                |
