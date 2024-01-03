---
sidebar_position: 2
---

# Client SDK - React Native ( 3.0.0 이전 버전 )

Notifly React Native SDK는 노티플라이를 React Native 어플리케이션과 연동하기 위해 사용할 수 있습니다. 다음과 같은 기능들을 지원합니다:

- 기기 정보를 노티플라이에 등록하여 노티플라이를 통해 발송된 앱 푸시, 인앱 팝업을 React Native 앱에서 수신할 수 있습니다.
  - 노티플라이에서 앱 푸시는 앱이 Background나 Quit 상태일 때 수신됩니다. 앱이 Foreground 상태일 때도 앱 푸시를 수신하기 위해서는 Foreground handler를 직접 구현해 주셔야 합니다.
  - 노티플라이의 인앱 팝업은 앱이 Foreground 상태일 때만 수신됩니다. Background나 Quit 상태일 때는 무시됩니다.
- 이벤트, 유저 정보를 노티플라이와 연동하여 모든 캠페인에서 활용할 수 있습니다.
- 캠페인의 성과를 측정할 수 있도록 이벤트를 로깅합니다.

노티플라이에서는 푸시를 발송하기 위해 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)을 활용하고 있습니다. 다음 과정을 먼저 진행해주세요:

1. [Firebase 프로젝트 연동](http://docs.notifly.tech/ko/developer-guide/client-sdk/firebase_project_setup)
2. [iOS APNs 인증 정보 설정](http://docs.notifly.tech/ko/developer-guide/client-sdk/firebase_project_setup#1-2-apns-%EC%9D%B8%EC%A6%9D%EC%84%9C-%EB%93%B1%EB%A1%9D)

## 1. Notifly SDK 셋업

### 1-1. SDK 설치

- [notifly-sdk npm](https://www.npmjs.com/package/notifly-sdk)

패키지를 설치하기 위해, 다음을 실행해 주세요:

```shell
npm install notifly-sdk@latest --save
```

yarn을 사용하시는 경우:

```shell
yarn add notifly-sdk@latest
```

추가적으로, notifly-sdk에서 사용하는 peer dependency도 같이 설치를 해주세요.

```shell
npm install \
  @react-native-async-storage/async-storage@^1.17.11 \
  @react-native-firebase/app@^16.4.3 \
  @react-native-firebase/messaging@^16.4.3 \
  react-native-device-info@^8.1.4 \
  react-native-modal@^13.0.1 \
  react-native-root-siblings@^4.1.1 \
  react-native-webview@^11.26.1 \
  uuid@^8.3.0
```

### 1-2. Notifly SDK 초기화 코드 추가

- index.js 또는 App.js에서 Notifly SDK 초기화 코드를 추가해 주세요.

_노티플라이에서 제공하는 푸시알림 클릭 핸들러에 추가로 개인화된 핸들러를 사용하시고 싶으신 분들은 다음 section인 '(Advanced) 푸시알림 클릭 핸들러 커스터마이징'을 확인해 주세요._
<span style={{ color: "red" }}><em>\* NOTIFLY_PROJECT_ID, NOTIFLY_USERNAME, NOTIFLY_PASSWORD 파라미터는 노티플라이 홈페이지의 설정 페이지에서 확인하실 수 있습니다. 설정 페이지에 해당 값들이 존재하지 않거나 찾는데 어려움을 겪고 계시다면, 꼭 담당자에게 문의 부탁드립니다.</em></span>

```js
// index.js -- Example code
import notifly from 'notifly-sdk';
...
notifly.initialize(
    process.env.NOTIFLY_PROJECT_ID,
    process.env.NOTIFLY_USERNAME,
    process.env.NOTIFLY_PASSWORD
);
AppRegistry.registerComponent(...);
...
```

#### (Advanced) 푸시알림 클릭 핸들러 커스터마이징

커스터마이징을 위하여, notifly.initialize의 네번째 인자로 true를 입력해주세요.

```js
// index.js -- Example code
import notifly from 'notifly-sdk';
import messaging from "@react-native-firebase/messaging";
...
notifly.initialize(
    process.env.NOTIFLY_PROJECT_ID,
    process.env.NOTIFLY_USERNAME,
    process.env.NOTIFLY_PASSWORD,
    true,
).then(() => {
    messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
        if (remoteMessage) {
            /*
                TODO: Implement your customized handler
            */
            notifly.clickHandler(remoteMessage); // required
        }
    });
});
AppRegistry.registerComponent(...);
...
```

### 1-3. 푸시 수신 측정 셋업하기

앱 푸시 캠페인의 성과를 측정하기 위해서는 유저들이 푸시를 수신했는지 여부를 측정하는 것이 중요합니다.

다음과 같은 예시들에서 발송된 푸시를 유저들이 수신하지 않을 수 있습니다:

- 유저가 앱에 대해 푸시를 수신하지 않음으로 설정한 경우
- 유저가 앱을 삭제한 경우
- 앱 푸시 토큰이 만료된 경우
- 유저의 기기가 인터넷에 연결되어 있지 않은 경우

푸시 수신 여부를 측정하기 위해서는 앱의 Background handler에서 노티플라이의 handler를 등록해 주셔야 합니다. 이미 Firebase Cloud Messaging의 background handler가 앱에 구현되어 있는지 없는지에 따라 등록 방식이 다릅니다.

_참고: 여러 개의 background handler가 등록되는 경우 가장 마지막에 등록된 background handler만 작동합니다._

#### Case 1: Firebase Cloud Messaging의 background handler가 이미 구현되어 있는 경우

```js
notifly.notiflyBackgroundHandler(remoteMessage);
```

```js
// index.js -- Example code
...
import messaging from '@react-native-firebase/messaging';
import notifly from 'notifly-sdk';

notifly.initialize('myProjectId', 'myUserName', 'myPassword', false);
messaging().setBackgroundMessageHandler(async remoteMessage => {
    ... // Existing background handler logic
    await notifly.notiflyBackgroundHandler(remoteMessage);
});

AppRegistry.registerComponent(...);
```

#### Case 2: Firebase Cloud Messaging의 background handler가 없는 경우

```js
notifly.setNotiflyBackgroundMessageHandler();
```

```js
// index.js -- Example code
...
import notifly from 'notifly-sdk';

notifly.initialize('myProjectId', 'myUserName', 'myPassword', false);
notifly.setNotiflyBackgroundMessageHandler();
AppRegistry.registerComponent(...);
```

## 2. 유저 프로퍼티 등록하기

- 노티플라이에서는 유저의 아이디 (userId) 및 프로퍼티 (params)를 설정하여 마케팅 캠페인 집행 시에 활용할 수 있습니다.
  - 노티플라이에서는 채널 별 푸시 알림 수신 동의 여부를 유저 프로퍼티로 설정하여, 푸시 알림 전송 전에 필터링 할 수 있습니다.
  - 카카오 알림톡, 친구톡, 문자 발송을 위해서는 전화번호를 유저 프로퍼티로 설정해야 합니다.
  - 이메일 발송을 위해서는 이메일 주소를 유저 프로퍼티로 설정해야 합니다.
  - 전화번호와, 이메일의 프로퍼티 필드명은 꼭 각각 $phone_number, $email로 설정해 주세요.
  - Notifly SDK 초기화 코드 추가를 마친 후 프로퍼티 등록을 시작해 주세요.

### 2-1. 유저 아이디 등록

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

### 2-2. 유저 프로퍼티 등록

| Parameter | Type   | Required |
| --------- | ------ | -------- |
| params    | Object | Yes      |

```js
notifly.setUserProperties(params);
```

```js
 // Example code
const handleRejectPushNotification = () => {
    ...
    notifly.setUserProperties({
        "push_subscription_channel1": false,
        "push_subscription_channel2": false,
        "push_subscription_channel3": false,
    });
    ...
}
```

## 3. 이벤트 로깅

- 노티플라이에서는 유저의 행동 등 이벤트를 트래킹하여 캠페인 집행 시 타겟팅에 활용할 수 있습니다. 트래킹 된 이벤트는 푸시 알림 발송 타이밍, 발송 대상 설정 등에 활용할 수 있습니다.
  - Notifly SDK 초기화 코드 추가를 마친 후 이벤트 로깅을 시작해 주세요.
- segmentationEventParamKeys 활용하여 이벤트 변수 (eventParams)를 발송 대상 설정 등에 활용할 수 있습니다. 이를 위해서, 발송 대상 설정에 사용할 eventParams의 특정 field의 key 값을 segmentationEventParamKeys 지정해주세요.
  - 현재는 segmentationEventParamKeys 한 개까지 지원하고 있기 때문에, segmentationEventParamKeys 길이는 1이하인 List이어야합니다.

### 3-1. 이벤트 로깅

| Parameter                  | Type   | Required |
| -------------------------- | ------ | -------- |
| eventName                  | String | Yes      |
| eventParams                | Object | No       |
| segmentationEventParamKeys | List   | No       |

```js
notifly.trackEvent(eventName, eventParams, segmentationEventParamKeys);
```

```js
 // Example code
const handlePurchaseTicket = () => {
    ...
    notifly.trackEvent("ticket_purchase", {
        "show_id": "sample_show_id",
        "performance_start_time": 1674104659
    }, ["show_id"]);
    ...
}
```

## 4. 연동 테스트

[Client SDK - 연동 Test](https://docs.notifly.tech/ko/developer-guide/client-sdk/sdk_test) 섹션에서 테스트를 진행합니다.

## FAQ

- Q. 이미 Firebase Cloud Messaging을 사용 중인데 어떻게 해야 할까요?
  - A. Notifly Flutter Plugin은 기존 앱에서 사용하고 있을 수 있는 Firebase Cloud Messaging과의 충돌을 방지하기 위한 처리를 이미 자체적으로 구현해 두었기 때문에 안전하게 사용하실 수 있습니다.
