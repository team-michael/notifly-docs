---
sidebar_position: 1
---

# Client SDK - React Native

## 1. Initial SDK Setup

### 1-1. 다음 node package들을 설치합니다.

`npm install --save ...`

```js
 "notifly-sdk": "^2.0.0",
 "@react-native-async-storage/async-storage": "^1.17.11",
 "@react-native-firebase/app": "^16.4.3",
 "@react-native-firebase/messaging": "^16.4.3",
 "react-native-device-info": "^8.1.4",
 "uuid": "^8.3.0"
```

### 2-ver1) (Recommended) Notifly SDK 초기화 코드를 추가합니다.

__Notifly에서 제공하는 푸시알림 클릭 핸들러에 추가로 개인화된 핸들러를 사용하시고 싶으신 분들은 ver1이 아닌 ver2를 참고해주세요.__

```js
 import notifly from 'notifly-sdk';
...
 useEffect(() => {
    notifly.initialize('project_id', 'user_name', 'password', false) 
        .then(() => { notifly.setUserId('user_id') }) // optional (user_id: string)
 , []); 
...
```

### 2-ver2) (Advanced) 푸시알림 클릭 핸들러 커스터마이징

__주의) 커스터마이징을 위하여, notifly.initialize의 네번째 인자로 꼭 true(bool)를 기입해주세요.__

```js
 // Example code of customizing
import notifly from 'notifly-sdk';
import messaging from "@react-native-firebase/messaging";
...
 useEffect(() => {
    notifly.initialize('project_id', 'user_name', 'password', true) // true if you want to customize push notification click event handler
        .then(() => { notifly.setUserId('user_id') }) // optional (user_id: string)
        .then(() => { 
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
        })
 , []); 
...
```

## 2. How to set user information

- Notifly에서는 user의 id 및 property를 설정하여 마케팅 캠페인 집행 시에 활용할 수 있습니다.
- 캠페인 집행 시 설정된 user property를 타겟 유저들 선정 기준으로 활용함으로써 보다 효율적인 마케팅을 펼칠 수 있습니다.
    - cf) Notifly에서는 채널별 푸시 알림 수신 동의 여부를 user property로 설정하여, 푸시 알림 전송 전에 필터링 할 수 있습니다.
    - __주의 : 1에서의 notifly initialize를 마친 후 사용해주세요.__

### 1) Register user_id

| Parameter | Type   | Required |
| --------- | ------ | -------- |
| user_id   | String | Yes      |

`notifly.setUserId(user_id);`

```js
const handleLogin = () => {
    ...
    notifly.setUserId('user_id'); // (user_id: string)
    ...
}

const handleLogout = () => {
    ...
    notifly.setUserId(); // unregister user id
    ...
}
```

### 2) Set user_properties

| Parameter         | Type | Required |
| ----------------- | ---- | -------- |
| user_properties   | json | Yes      |

`notifly.setUserProperties( user_properties (json) );`

```js
const handleRejectPushNoti = () => {
    ...
    notifly.setUserProperties({
        "push_subscription_channel1": false,
        "push_subscription_channel2": false,
        "push_subscription_channel3": false,
    });
    ...
}
```

## 3. How to track events

- Notifly에서는 사용자의 행동 등 이벤트를 tracking하여 캠페인 집행 시 타겟팅에 활용할 수 있습니다.
- 트래킹 된 event는 푸시 알림 발송 타이밍, 사용자 세그먼트 설정 등에 활용할 수 있습니다.
- 더욱이 segmentation_event_param_keys를 활용하여 event params를 사용자 세그먼트 설정 등에 활용할 수 있습니다. 이를 위해서, 사용자 세그멘트 설정에 사용할 event params의 특정 field를 segmentation_event_param_keys에 지정해주세요.
    - 현재는 segmentation_event_param_key를 한 개까지 지원하고 있기 때문에, segmentation_event_param_keys는 길이는 1이하인 List이여야합니다.
    - __주의 : 1에서의 notifly의 initialize를 마친 후 사용해주세요.__

### 1) track event

| Parameter                 | Type | Required |
| ------------------------- | ---- | -------- |
| event_name                | String | Yes     |
| event_params              | json | No       |
| segmentation_event_param_keys | List | No       |

`notifly.trackEvent( event_name, event_params, event_param_key_for_targeting );`

```js
const handlePurchaseTicket = () => {
    ...
    notifly.trackEvent("ticket_purchase", {
        "show_id": "sample_show_id",
        "performance_start_time": 1674104659
    }, ["show_id"]);
    ...
}
```
