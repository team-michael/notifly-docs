---
sidebar_position: 3
---

# Client SDK - Android

Notifly Android SDK는 노티플라이를 Android 어플리케이션과 연동하기 위해 사용할 수 있습니다. 다음과 같은 기능들을 지원합니다:

- 기기 정보를 노티플라이에 등록하여 노티플라이를 통해 발송된 앱 푸시, 인앱 메시지를 Android 앱에서 수신할 수 있습니다.
    - 노티플라이의 인앱 메시지는 앱이 Foreground 상태일 때만 수신됩니다. Backgound나 Quit 상태일 때는 무시됩니다.
- 이벤트, 사용자 정보를 노티플라이와 연동하여 모든 캠페인에서 활용할 수 있습니다. 
- 캠페인의 성과를 측정할 수 있도록 이벤트를 로깅합니다. 

## 1. Notifly SDK 셋업

### 1-1. SDK 설치

TODO: Jitpack

### 1-2. Notifly SDK 초기화 코드 추가

TODO: MainApplication

```kotlin title="Example Kotlin code for initialization"
import tech.notifly.Notifly

Notifly.initialize(
    context = applicationContext,
    projectId = "myProjectId",
    username = BuildConfig.NOTIFLY_USERNAME,
    password = BuildConfig.NOTIFLY_PASSWORD,
)
```

## 2. 사용자 프로퍼티 등록하기

- Notifly에서는 사용자의 아아디 (user_id) 및 프로퍼티 (user_properties)를 설정하여 마케팅 캠페인 집행 시에 활용할 수 있습니다.
    - Notifly에서는 채널별 푸시 알림 수신 동의 여부를 사용자 프로퍼티로 설정하여, 푸시 알림 전송 전에 필터링 할 수 있습니다.
    - Notifly SDK 초기화 코드 추가를 마친 후 프로퍼티 등록을 시작해 주세요.

### 2-1. user_id 등록

| Parameter | Type   | Required |
| --------- | ------ | -------- |
| user_id   | `String` | Yes      |

```kotlin
Notifly.setUserId(context: Context, userId: String,);
```

```kotlin title="Example Kotlin code for setUserId"
import tech.notifly.Notifly

Notifly.setUserId(
    context,
    "example_user_id"
)
```

### 2-2. user_properties 등록

| Parameter         | Type | Required |
| ----------------- | ---- | -------- |
| user_properties   | `Map<String, Any?>` | Yes      |

```kotlin
Notifly.setUserProperties(context: Context, params: Map<String, Any?>);
```

```kotlin title="Example Kotlin code for setUserProperties"
Notifly.setUserProperties(
    context,
    mapOf(propertyName to propertyValue)
)
```

## 3. 이벤트 로깅

- Notifly에서는 사용자의 행동 등 이벤트를 트래킹하여 캠페인 집행 시 타겟팅에 활용할 수 있습니다. 트래킹 된 이벤트는 푸시 알림 발송 타이밍, 사용자 세그먼트 설정 등에 활용할 수 있습니다.
    - Notifly SDK 초기화 코드 추가를 마친 후 이벤트 로깅을 시작해 주세요.
- segmentation_event_param_keys를 활용하여 이벤트 변수 (event_params)를 사용자 세그먼트 설정 등에 활용할 수 있습니다. 이를 위해서, 사용자 세그멘트 설정에 사용할 event params의 특정 field의 key 값을 segmentation_event_param_keys에 지정해주세요.
    - 현재는 segmentation_event_param_key를 한 개까지 지원하고 있기 때문에, segmentation_event_param_keys는 길이는 1이하인 List이여야합니다.

### 3-1. 이벤트 로깅

| Parameter                 | Type | Required |
| ------------------------- | ---- | -------- |
| event_name                | `String` | Yes     |
| event_params              | `Map<String, Any?>` | No       |
| segmentation_event_param_keys | `List<String>` | No       |

```kotlin
Notifly.trackEvent(context: Context, eventName: String, eventParams: Map<String, Any?>, segmentationEventParamKeys: List<String> = listOf())
```

```kotlin title="Example Kotlin code for trackEvent"
import tech.notifly.Notifly
...
Button(
    onClick = {
        Notifly.trackEvent(
            context,
            "click_button_1",
            mapOf(
                "keyString" to "value1",
                "keyBoolean" to true,
                "keyInt" to 100,
            ),
        )
    },
    modifier = Modifier.padding(top = 16.dp)
) {
    Text(text = "click_button_1")
}
...
```

TODO: 푸시 알림 동의 가이드

TODO: icon 등록


## FAQ

- Q. 이미 Firebase Cloud Messaging을 사용중이라면?
    - A. 충돌 안 남
