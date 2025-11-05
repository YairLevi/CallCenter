# Call Center Assignment Project
This project features a call center system, no authentication needed.
Users can add calls, tag them, and create tasks related to them. They can track and modify the status of each task.
Admins can create tag for assigning, and also suggest related tasks for users to assign to certain calls.

## Development
- clone the repo
- make sure you have a mongoDB instance to connect to. Use either a docker image, local-hosted or remote-hosted cluster.
- create a `.env.development` file for the backend project, and add `DB_URL` to link mongoDB.
  - if you want to hard-code a url, just go to the `app.module.ts` and modify there.
- go to the `backend/` folder, and run `npm run start:dev`.
- go to the `frontend/` folder, and run `npm run dev`.

No docker image was provided for development.

## Production
This project uses Google Cloud Run and the Google Artifact Registry.
