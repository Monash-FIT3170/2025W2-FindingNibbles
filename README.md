# FindingNibbles - 2025W2

At a time when we are spoiled for dining or cooking options, even a simple decision like “What should we eat tonight?” can feel overwhelming. FindingNibbles is a mobile application powered by artificial intelligence, designed to eliminate decision fatigue by delivering hyper-personalised restaurant and dish recommendations – tailored to your location, dietary restrictions, and cravings – so you can spend less time searching and more time savouring.

Unlike generic food applications, FindingNibbles combines AI-driven menu analysis, real-time review aggregation, and collaborative filtering to act as your personal dining concierge. With the ability to input ingredients you have on hand, FindingNibbles generates quick recipes that match your pantry – turning leftovers into culinary wins. It doesn’t just provide a list of options, it understands your preferences, deciphers murky menu items for dietary restrictions (e.g. “Is this vegan-friendly?”), and even aids in planning meals for when you are next travelling or have a special occasion – all while tracking nutritional goals with the help of a calorie tracker.

## Overview

### Core Features

- Nearby restaurant suggestions – Discover dining options close to your location.
- Interactive map exploration – Find restaurants using an integrated map with built-in directions.
- Randomised discovery – Get spontaneous recommendations for cuisines, restaurants, and recipes.
- Menu scanning and analysis – Scan restaurant menus to view detailed nutritional insights.
- Restaurant details and ratings – Access reviews, ratings, and essential location information.
- Advanced search and filters – Easily find restaurants based on cuisine, price, or dietary preferences.
- AI-powered recipe generation – Create personalised recipes for home cooking using your chosen ingredients.
- Calorie and nutrition tracking – Monitor your daily intake for healthier dining and cooking habits.
- Favourites management – Save and revisit your preferred restaurants and recipes anytime.

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
  - There is a DNS A record setup from the`nibbles` subdomain of`lachlanmacphee.com` to the IP address`34.129.60.144`

### CI/CD Pipeline

- **GitHub Actions**: Automated workflows
  - Continuous Integration with automated formatting checks, linting, and testing
  - Continuous Deployment to the production environment
  - Code quality checks and linting
  - For frontend deployment, we followed this guide[here](https://medium.com/@colonal/automating-flutter-builds-and-releases-with-github-actions-77ccf4a1ccdd).
  - The base-64 encoded keystore for frontend deploy is included in the GitHub repository's secrets, and a backup is stored on one of the contributors' laptop.
- **Manual Deployments**: Use this as a backup to GitHub actions if the pipeline is ffailing.
  - You can find a video guide on how to deploy the backend[here](https://drive.google.com/file/d/19m-NTtxg_W-4Dw40WJ4UpveQXae9S_FS/view?usp=drive_link)

### AI/ML

- **Google Gemini**: Large Language Model
  - Natural language processing for menu analysis
  - Recipe generation and recommendations
  - User query understanding

## Versioning Strategy

FindingNibbles follows **Semantic Versioning (SemVer)** for all releases. Version numbers are structured as `MAJOR.MINOR.PATCH`:

- **MAJOR** version (X.0.0): Incremented for incompatible API changes or significant architectural updates
  - Example: Major database schema changes that aren't backwards compatible
- **MINOR** version (0.X.0): Incremented for new features that are backwards-compatible
  - Example: Adding new AI-powered recommendation algorithms, new search filters
- **PATCH** version (0.0.X): Incremented for backwards-compatible bug fixes
  - Example: Fixing map rendering issues, correcting calorie calculations

## Pull Request Strategy

All contributions to FindingNibbles must follow this Pull Request (PR) workflow to maintain code quality and consistency.

### Branch Naming Convention

Create feature branches following this pattern:

- **Features**: `feature/short-description` (e.g., `feature/calorie-tracker`)
- **Bug fixes**: `bugfix/issue-number-description` (e.g., `bugfix/123-map-crash`)
- **Hotfixes**: `hotfix/critical-issue` (e.g., `hotfix/security-patch`)
- **Documentation**: `docs/description` (e.g., `docs/api-endpoints`)
- **Refactoring**: `refactor/description` (e.g., `refactor/auth-module`)

### Creating a Pull Request

1. **Fork or branch**: Create a new branch from `main` or fork the repository
2. **Make changes**: Implement your feature or fix following our coding standards
3. **Write tests**: Ensure adequate test coverage for new functionality
4. **Update documentation**: Update relevant documentation in code and README if needed
5. **Commit messages**: Use clear, descriptive commit messages following Conventional Commits format:
   - `feat: add calorie tracking to recipe generation`
   - `fix: resolve map marker rendering issue`
   - `docs: update installation instructions`
   - `refactor: simplify authentication logic`
6. **Push changes**: Push your branch to the remote repository
7. **Open PR**: Create a pull request to merge into `main`

### Pull Request Template

When opening a PR, include:

```markdown
## Title

Begin with either feat/fix/docs depending on the type, then a colon, then a short description.

## Description

One to two paragraph description of what this PR does with any necessary details. Visuals are welcome, especially for frontend changes (e.g. images or videos).

## Related Issues

Closes #(issue number)

## Testing

Describe the tests you ran (if applicable) and how to reproduce them

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated and passing
- [ ] Dependent changes merged
```

### Review Process

1. **Automated checks**: All PRs must pass CI/CD pipeline checks (linting, tests, build)
2. **Code review**: At least one approving review required from a project maintainer
3. **Address feedback**: Respond to reviewer comments and make necessary changes
4. **Merge**: Once approved and all checks pass, PRs can be rebased and merged into the dev branch
5. **Delete branch**: Feature branches should be deleted after a successful merge

### Code Review Guidelines

**For Reviewers:**

- Check for code quality, readability, and maintainability
- Verify tests are comprehensive and passing
- Ensure documentation is updated
- Confirm adherence to project architecture and patterns
- Provide constructive, actionable feedback

**For Contributors:**

- Keep PRs focused and reasonably sized (< 400 lines changed when possible)
- Respond to feedback promptly and professionally
- Request re-review after addressing comments

### Merge Conflicts

If your PR has merge conflicts:

1. Fetch latest changes from `dev`
2. Rebase your feature branch onto `dev` locally
3. Resolve conflicts
4. Test thoroughly
5. Check code changes from the `HEAD` of `dev` branch using something like `Git Graph`
6. Force push your branch with `git push --force-with-lease`

## Handover Documentation

This will act as documentation on how to get the project up and running for new developers. It will cover:

- Installation process for the relevant technologies
- How to build the project and setup the development environment
- Additional notes and common issues

### Required technology & installation processes

**Required technology is as follows:**

- **NestJS** for scalable backend development (Node.js + Typescript)
- **Prisma** as the ORM with**PostgreSQL** for relational data persistence
- **Docker** for containerised database services (PostgreSQL + pgAdmin)
- **Flutter** for the cross-platform frontend (written in Dart)
- **Dio** as the HTTP client on the frontend

A thorough installation guide and steps to setting up the environment for both Windows and Mac is available here in the [Flutter Spike Guide.](https://finding-nibbles.gitbook.io/finding-nibbles)

### Cloning from git and setting up environment

Here are the steps required to setup the environment on your local machine.

1. Start by cloning:`git clone https://github.com/Monash-FIT3170/2025W2-FindingNibbles.git`
2. You may rename the folder if you'd like, otherwise run`cd 2025W2-FindingNibbles`
3. `cd backend` to set that up first.
4. Run the command`cp .env.example .env` to create a copy of the example environment variables file into an actual one. This file is not committed to the repository due to security purposes.
5. Run`docker compose up -d` in a terminal to create your Docker containers in detached mode (i.e. in the background).
6. Install dependencies and seed the database with the following set of commands. You may wish to copy and paste them all at once, then hit enter.

```
npm install
docker compose down --volumes
docker compose up -d
npm run db:push
npm run db:seed
```

7. **Optional:** to view data, use`npm run db:studio` in a new terminal.
8. Start up the NestJS backend:`npm run start:dev`
9. Run`cd ../frontend` to switch to the frontend.
10. Run`flutter doctor` to ensure Flutter is installed and setup correctly and run any suggested commands to fix issues.
11. Run`flutter pub get` to download dio dependencies.
12. Install Android Studio using the instructions[here](https://developer.android.com/studio/install) and setup a virtual device.
13. Run`flutter run` to start the frontend.
14. When prompted to select a device, select virtual mobile device.
15. **Ready to go!!**

### Updating or Modifying App launcher Icon or Splash Screen

We are using the [Flutter Native Splash](https://pub.dev/packages/flutter_native_splash) and [Flutter Launcher Icons](https://pub.dev/packages/flutter_launcher_icons) packages to make the app launcher icon and splash screens easily. For an in-depth guide to these packages, we recommend following the documented guides provided on their respective pages. As a simple process for changing the current app icon:

1. Replace the `launcher_icon.png` located in `/frontend/assets` with the new desired launcher icon or `branding.png` to change to the Splash Screen
2. When in `/frontend` run the commands:

   ```
   dart run flutter_launcher_icons
   dart run flutter_native_splash:create
   ```

This will complete the process of changing the launcher icon and splash screen. If you want to modify these images then it is very important that you read and understand the intricacies behind the behaviour of splash screens and app launchers before and after Android 12.

### Day to day development process

1. Start your Docker containers built during the environment setup
2. cd to `/backend` and run `npm run start:dev`
3. For the frontend, if you are using an emulator start it with the the command `flutter emulators --launch EmulatorNameHere`

   1. You can use the command`flutter emulators` to see the available emulators
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
