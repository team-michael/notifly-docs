---
sidebar_position: 2
---

# Firebase - Notifly Extension

The Firebase - Notifly Extension is a set of Google Cloud Functions that sends Firebase (Google Analytics) conversion events to Notifly. It enables seamless integration between your Firebase project and Notifly, allowing you to track conversion events and utilize Notifly's features based on these events.

## Prerequisites

Before you can use the Firebase - Notifly Extension, you'll need the following:

- A Firebase project with an app.
- Google Analytics enabled for your Firebase project.
- [Firebase CLI](https://firebase.google.com/docs/cli) installed.
- Upgrade your Firebase project to the Blaze plan.
- A list of conversion event names you want to track.

## Installation

To install (deploy) the Cloud Functions, follow these steps:

1. Clone the Firebase - Notifly Extension repository:

```
git clone https://github.com/team-michael/firebase-notifly-extension.git
```

2. Navigate to the cloned directory and install the required npm packages:

```
cd firebase-notifly-extension
npm install
```

3. Set environment configuration with the Firebase CLI

Set 5 configurations:

| Variable Name               | Description                                                  | Example Value                |
|-----------------------------|--------------------------------------------------------------|------------------------------|
| notifly.location            | The location/region for the Cloud Functions deployment       | 'asia-northeast3'           |
| notifly.conversion_events   | Comma-separated list of Google Analytics conversion events   | 'ticket_purchase,loginpage_visit' |
| notifly.project_id          | The Notifly project ID                                       | 'michael'                    |
| notifly.username            | The Notifly username used for authentication                | 'jordan'                    |
| notifly.password            | The Notifly password used for authentication                | '111111'                     |

Example:
```console
firebase functions:config:set notifly.location='asia-northeast3' notifly.conversion_events='ticket_purchase,loginpage_visit' notifly.project_id='michael' notifly.username='minyong' notifly.password='111111'
```

If you want to check the cloud function configuration, run
```console
firebase functions:config:get
```

4. Deploy the Cloud Functions:

```console
cd functions
firebase deploy --only functions:firebaseToNotifly
```

## Cloud Functions

The Firebase - Notifly Extension creates one Cloud Function for each conversion event specified in your project. These Cloud Functions listen for the corresponding conversion events in your Firebase project and send the event data to Notifly.

## Billing

This extension uses Google Cloud Platform services, which may incur charges if you exceed the service's free tier. The Firebase - Notifly Extension uses Cloud Functions with the Node.js 14+ runtime. For more information on billing and pricing, please refer to the [Google Cloud Functions Pricing](https://cloud.google.com/functions/pricing) page.

## Support

If you need support or have questions about the Firebase - Notifly Extension, please contact us at contact@workmichael.com.
