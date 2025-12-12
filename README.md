# Authentication Service

Standalone authentication backend using Next.js (App Router), Better Auth, and Google SSO.

## Setup

1.  **Environment Variables**:
    Create a `.env` file with the following:

    ```env
    NEXT_PUBLIC_APP_URL=https://auth.vercel.app # Your Vercel URL
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    BETTER_AUTH_SECRET=your_random_secret # Generate with `openssl rand -base64 32`
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Locally**:
    ```bash
    npm run dev
    ```

## Endpoints

-   `GET /api/auth/session`: Get current session
-   `GET /api/auth/sign-in/google`: Initiate Google Sign-In
-   `GET /api/auth/sign-out`: Sign out

## Deployment on Vercel

1.  Push code to GitHub.
2.  Import project into Vercel.
3.  Add the environment variables in Vercel project settings.
4.  Deploy.
"# AR-Devs-SSO" 
"# AR-Devs-SSO" 
