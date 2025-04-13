# Auth Module

Followed [this guide](https://docs.nestjs.com/recipes/passport) to implement

# Google OAuth Setup

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/projectcreate) called `nibbles`

2. Use the search at the top to find `OAuth Consent Screen` and click on it

3. For app information, set app name as `nibbles` and user support email as your Monash email address

4. For audience, select `Internal`

5. For contact, use your Monash email again

6. Agree to the policy

7. Click `Create`

8. Click `Create OAuth Client`

9. For application type, select `Web application`. This is because the auth requests will always be coming from our backend.

10. For the name, use `nestjs`

11. For the authorised javascript origins, enter `http://localhost:3000`

12. For the authorised redirect URIs, enter `http://localhost:3000/api/auth/google/callback`
