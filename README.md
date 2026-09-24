# Keep the Internet Alive

A fast, audience-powered hackathon quiz about public attitudes toward sustainable data centres in Ireland.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The development command also starts the live-audience WebSocket service used by the QR-code voting feature.

## Build

```bash
npm run build
```

Survey percentages are stored centrally in `src/data/surveyData.ts`. They are rounded aggregates calculated from the supplied survey-response workbook; no individual responses are included in this repository.
