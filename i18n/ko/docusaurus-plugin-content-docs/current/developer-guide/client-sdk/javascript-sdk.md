---
sidebar_position: 2
---

# Client SDK - Javascript

Notifly Javascript (JS) SDK는 노티플라이를 웹 브라우저 어플리케이션 및 프로그레시브 웹 어플리케이션과 연동하기 위해 사용할 수 있습니다.

- 서비스가 웹 브라우저에서 실행되는 경우 Notifly에서는 웹 푸시를 발송하게 됩니다.
- 프로그레시브 웹 앱의 경우 Android와 iOS의 앱 푸시를 모두 지원합니다.

Notifly JS SDK에서는 푸시를 발송하기 위해 Firebase Cloud Messaging을 활용하고 있습니다. 다음이 모두 준비되었는지 확인해 주세요.

1. Firebase 프로젝트 셋업이 되어 있어야 푸시 수신이 가능합니다.
2. Firebase Cloud Messaging에서 사용하는 token을 Notifly에 등록할 수 있는 준비가 되었는지 확인해 주세요.
3. 푸시를 Foreground 및 Background 상태에서 수신할 수 있는 handler 가 준비되었는지 확인해 주세요.

_참고: 인웹 메시지 및 인앱 메시지의 경우는 아직 JS SDK에서 지원하지 않습니다, 준비중입니다._

## 1. Notifly JS SDK 셋업

### 1-1. SDK 설치

- [notifly-js-sdk npm](https://www.npmjs.com/package/notifly-js-sdk)

패키지를 설치하기 위해, 다음을 실행해 주세요:

```shell
npm install notifly-js-sdk@latest --save
```

yarn을 사용하시는 경우:

```shell
yarn add notifly-js-sdk@latest
```

### 1-2. Notifly JS SDK 초기화 코드 추가
- index.js 또는 App.js에서 Notifly SDK 초기화 코드를 추가해 주세요.

<span style={{ color: "red" }}><em>* projectID, userName, password 파라미터는 노티플라이 홈페이지의 설정 페이지에서 확인하실 수 있습니다. 설정 페이지에 해당 값들이 존재하지 않거나 찾는데 어려움을 겪고 계시다면, 꼭 담당자에게 문의 부탁드립니다.</em></span>

| Parameter   | Type   | Required |
| ----------- | ------ | -------- |
| projectID   | String | Yes      |
| userName    | String | Yes      |
| password    | String | Yes      |

```js
notifly.initialize(projectID, userName, password);
```

```js
// index.js, App.js, _app.jsx or equivalent -- Example code
import notifly from 'notifly-js-sdk';
...
notifly.initialize(
    process.env.NOTIFLY_PROJECT_ID,
    process.env.NOTIFLY_USERNAME,
    process.env.NOTIFLY_PASSWORD,
);
...
```

## 2. 사용자 프로퍼티 등록하기

- Notifly에서는 사용자의 아이디 (userId) 및 프로퍼티 (userProperties)를 설정하여 마케팅 캠페인 집행 시에 활용할 수 있습니다.
  - Notifly에서는 채널 별 푸시 알림 수신 동의 여부를 사용자 프로퍼티로 설정하여, 푸시 알림 전송 전에 필터링 할 수 있습니다.
  - Notifly SDK 초기화 코드 추가를 마친 후 프로퍼티 등록을 시작해 주세요.

### 2-1. 사용자 아이디 등록

| Parameter | Type   | Required |
| --------- | ------ | -------- |
| userId    | String | Yes      |

```js
notifly.setUserId(userId);
```

```js
 // Example code
const handleLogin = () => {
    ...
    notifly.setUserId('example_user_id');
    ...
}

const handleLogout = () => {
    ...
    notifly.setUserId(); // unregister user id
    ...
}
```

### 2-2. 사용자 프로퍼티 등록

| Parameter        | Type                 | Required |
| ---------------- | -------------------- | -------- |
| userProperties   | Record<string, any>  | Yes      |

```js
notifly.setUserProperties(userProperties);
```

```js
 // Example code
const handleRejectPushNotification = () => {
    ...
    notifly.setUserProperties({
        "paid_membership": true,
        "subscriptions": ["astro_boy", "x-men"],
    });
    ...
}
```

## 3. 디바이스 토큰 등록하기
- 푸시 전송을 위해, Firebase Cloud Messaging의 device token을 등록합니다.

| Parameter   | Type   | Required |
| ----------- | ------ | -------- |
| deviceToken | String | Yes      |

```js
notifly.setDeviceToken(deviceToken);
```

```js
// Example code
useEffect(() => {
    async function initializeFCMToken() {
        try {
            const token = await getFCMToken();
            notifly.setDeviceToken(token);
        } catch (e) {
            console.error(e);
        }
    }
    initializeFCMToken();
}, []);
```


## 4. 이벤트 로깅

- Notifly에서는 사용자의 행동 등 이벤트를 트래킹하여 캠페인 집행 시 타겟팅에 활용할 수 있습니다. 트래킹 된 이벤트는 푸시 알림 발송 타이밍, 사용자 세그먼트 설정 등에 활용할 수 있습니다.
  - Notifly SDK 초기화 코드 추가를 마친 후 이벤트 로깅을 시작해 주세요.
- segmentationEventParamKeys 활용하여 이벤트 변수 (eventParams의)를 사용자 세그먼트 설정 등에 활용할 수 있습니다. 이를 위해서, 사용자 세그멘트 설정에 사용할 eventParams의 특정 field의 key 값을 segmentationEventParamKeys 지정해주세요.
  - 현재는 segmentationEventParamKeys 한 개까지 지원하고 있기 때문에, segmentationEventParamKeys 길이는 1이하인 List이어야합니다.

### 4-1. 이벤트 로깅

| Parameter                  | Type                 | Required |
| -------------------------- | -------------------- | -------- |
| eventName                  | String               | Yes      |
| eventParams                | Record<string, any>  | No       |
| segmentationEventParamKeys | string[]             | No       |

```js
notifly.trackEvent(eventName, eventParams, segmentationEventParamKeys);
```

```js
// Example code -- simple event logging
const handleContentView = () => {
    ...
    notifly.trackEvent("view_content", {
        "content_name": "mickey_mouse",
    });
    ...
}

// Example code -- with segmentationEventParamKeys
const handlePurchaseTicket = () => {
    ...
    notifly.trackEvent("ticket_purchase", {
        "show_id": "sample_show_id",
        "performance_start_time": 1674104659
    }, ["show_id"]);
    ...
}
```
