---
sidebar_position: 1
---

# HTTP API

## 1. Authorization Endpoint

이 endpoint 를 통해 인증 토큰을 받아올 수 있습니다. 인증 토큰은 notifly 서버 API 활용에 필수적입니다.

### Endpoint

`POST https://api.notifly.tech/authorize`

### Specifications

#### Parameters

| Parameter | Type   | Required | Description                                                                                            |
|-----------|--------|----------|--------------------------------------------------------------------------------------------------------|
| userName  | String | Yes      | Notifly의 설정 페이지에서 확인하실 수 있습니다. 프로젝트 별로 하나의 사용자 이름이 생성됩니다. 문의 사항은 contact@notifly.tech 으로 이메일 부탁드립니다.   |
| password  | String | Yes      | Notifly의 설정 페이지에서 확인하실 수 있습니다. 프로젝트 별로 하나의 사용자 비밀번호가 생성됩니다. 문의 사항은 contact@notifly.tech 으로 이메일 부탁드립니다. |

#### Headers

| Parameter    | Value            | Description              |
|--------------|------------------|--------------------------|
| Content-Type | application/json | Request body 의 MIME Type |

#### Response (예시)

| Parameter    | Value                              |
|--------------|------------------------------------|
| Status code  | 200 OK                             |
| Content-Type | application/json                   |
| json         | {"data":"some-token","error":null} |

### 코드 예시

```js
// Endpoint
const url = "https://api.notifly.tech/authorize";

// Headers
const headers = {
    "Content-Type": "application/json",
};

// Body
const body = {
    userName: "provided_username",
    password: "provided_password",
};
const encodedBody = JSON.stringify(body);

// Fetch call
fetch(url, {
    method: "POST",
    headers: headers,
    body: encodedBody,
})
    .then((response) => response.json())
    .then((data) => {
        // Get response data
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

/**
 * Response data 예시
 {
 data: 'some-token',
 error: null
 }
 **/
```

## 2. Track Event Endpoint

이 endpoint 를 통해 notifly 엔진에 이벤트 데이터를 보낼 수 있습니다. Notifly 엔진은 수신한 이벤트 데이터를 모으고 분석해 캠페인 진행 시 메시지 발송 타이밍, 사용자 세그먼트 설정 등에 활용할
수 있게 준비합니다.

### Endpoint

`POST https://api.notifly.tech/track-event`

### Specifications

| Parameter                  | Type    | Required | Description                                                                                  |
|----------------------------|---------|----------|----------------------------------------------------------------------------------------------|
| projectID                  | String  | Yes      | Notifly 팀에서 제공드리는 project ID 입니다. 문의 사항은 contact@notifly.tech 으로 이메일 부탁드립니다.                 |
| eventName                  | String  | Yes      | 이벤트명                                                                                         |
| isGlobalEvent              | Boolean | Yes      | 특정 유저에게만 발생하는 것이 아니라 서비스 레벨에서 발생하는 이벤트인지의 여부                                                 |
| eventParams                | Object  | No       | 이벤트 파라미터 값들                                                                                  |
| segmentationEventParamKeys | List    | No       | 정교한 캠페인 집행을 위해 특정 파라미터들을 notifly 엔진에서 특수하게 처리합니다. 문의 사항은 contact@notifly.tech 으로 이메일 부탁드립니다. |
| userID                     | String  | No       | 유저 ID                                                                                        |

#### Headers

| Parameter     | Value            | Description                           |
|---------------|------------------|---------------------------------------|
| Content-Type  | application/json | Request body 의 MIME Type              |
| Authorization | some-token       | Authorization endpoint 를 통해 수령한 인증 토큰 |

#### Response (예시)

| Parameter    | Value                                                             |
|--------------|-------------------------------------------------------------------|
| Status code  | 200 OK                                                            |
| Content-Type | application/json                                                  |
| json         | {"data":"some-success-response-from-notifly-engine","error":null} |

### 코드 예시

Node.js

```js
// Endpoint
const url = "https://api.notifly.tech/track-event";

// Headers
const headers = {
    "Content-Type": "application/json",
    Authorization: "some-token", // retrieve this from authorization endpoint
};

// Body
const body = {
    projectID: "provided_project_id",
    eventName: "show_end",
    isGlobalEvent: true, // true if the event is not associated with a specific user
    eventParams: {},
    segmentationEventParamKeys: [],
    userID: null, // null if global event but should be specified otherwise
};
const encodedBody = JSON.stringify(body);

// Fetch call
fetch(url, {
    method: "POST",
    headers: headers,
    body: encodedBody,
})
    .then((response) => response.json())
    .then((data) => {
        // Get response data
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

/**
 * Response data 예시
 {
 data: 'some-success-response-from-notifly-engine',
 error: null
 }
 **/
```

## 3. Set User Properties Endpoint

이 endpoint 를 통해 notifly 엔진에 사용자 속성들을 등록할 수 있습니다. 등록된 속성값들은 캠페인 진행 시 사용자 세그먼트 설정에 활용하여 보다 효율적인 마케팅이 가능합니다.

### Endpoint

`POST https://api.notifly.tech/set-user-properties`

### Specifications

| Parameter      | Type   | Required | Description                                                                  |
|----------------|--------|----------|------------------------------------------------------------------------------|
| projectID      | String | Yes      | Notifly 팀에서 제공드리는 project ID 입니다. 문의 사항은 contact@notifly.tech 으로 이메일 부탁드립니다. |
| userProperties | Object | Yes      | 업데이트 할 사용자 속성값들                                                              |
| userID         | String | Yes      | 유저 ID                                                                        |

- 한번에 여러 사용자의 정보를 업데이트 할 수도 있습니다. 같은 형식의 Object들을 Array 형태로 호출 해주시면 됩니다.
  - 1회 호출당 최대 1,000명의 사용자 까지만 업데이트 가능합니다.
- <span style={{ color: "red", fontWeight: "bold" }}><em>중요: 이메일과 전화번호 정보는 userProperties Object에 반드시 $email, $phone_number 키값으로 정의해주셔야 캠페인 발송 시 활용할 수 있습니다! 코드 예시를 참고해주세요.</em></span>

#### Headers

| Parameter     | Value            | Description                           |
|---------------|------------------|---------------------------------------|
| Content-Type  | application/json | Request body 의 MIME Type              |
| Authorization | some-token       | Authorization endpoint 를 통해 수령한 인증 토큰 |

#### Response (예시)

| Parameter    | Value                                                             |
|--------------|-------------------------------------------------------------------|
| Status code  | 200 OK                                                            |
| Content-Type | application/json                                                  |
| json         | {"data":"some-success-response-from-notifly-engine","error":null} |

### 코드 예시

Node.js

```js
// Endpoint
const url = "https://api.notifly.tech/set-user-properties";

// Headers
const headers = {
    "Content-Type": "application/json",
    Authorization: "some-token", // retrieve this from authorization endpoint
};

// Body (Single User)
const body = {
    projectID: "provided_project_id",
    userProperties: {
        $email: "email@example.com",
        $phone_number: "010-7777-7777",
        // ... more properties
    },
    userID: "some-user-id",
};
const encodedBody = JSON.stringify(body);

// Body (Multple Users)
const user1 = {
    projectID: "provided_project_id",
    userProperties: {
        $email: "user1@example.com",
        $phone_number: "010-5555-5555",
        // ... more properties
    },
    userID: "some-user-id-1",
};
const user2 = {
    projectID: "provided_project_id",
    userProperties: {
        $email: "user2@example.com",
        $phone_number: "010-7777-7777",
        // ... more properties
    },
    userID: "some-user-id-2",
};
const encodedBody = JSON.stringify([user1, user2]);

// Fetch call
fetch(url, {
    method: "POST",
    headers: headers,
    body: encodedBody,
})
    .then((response) => response.json())
    .then((data) => {
        // Get response data
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

/**
 * Response data 예시
 {
 data: 'some-success-response-from-notifly-engine',
 error: null
 }
 **/
```

## 4. Campaign Triggering Endpoint

이 endpoint 를 통해 캠페인을 트리거링할 수 있습니다. 등록된 유저 및 디바이스의 속성 뿐만 아니라 API Request Body의 파라미터까지 모두 사용하여 메시지를 개인화할 수 있습니다.

### 주의 사항

- HTTP REST API를 이용한 Triggering은 캠페인이 **API 기반 발송**으로 설정되어있는 경우에만 사용 가능합니다.

### Endpoint

`POST https://api.notifly.tech/campaign/{projectId}/{campaignId}/send`

### Specifications

#### Path Parameters

| Parameter  | Type   | Required | Description                                                                                   |
|------------|--------|----------|-----------------------------------------------------------------------------------------------|
| projectId  | String | Yes      | [Notifly의 설정 페이지](https://notifly.tech/console/settings)에서 확인하실 수 있습니다.                       |
| campaignId | String | Yes      | [캠페인 리스트](https://notifly.tech/console/campaign/list)의 캠페인 목록을 클릭하여 상세보기 팝업 상단에서 확인하실 수 있습니다. |

#### Request

| Parameter     | Type   | Required | Description                                        |
|---------------|--------|----------|----------------------------------------------------|
| recipients    | List   | Yes      | 메시지를 발송할 유저의 ID 및 이벤트 파라미터를 포함하는 객체의 리스트 입니다.      |
| - userId      | String | Yes      | 메시지를 발송할 유저의 ID 입니다.                               |
| - eventParams | Object | Yes      | 이벤트 파라미터를 포함하는 객체 입니다. 해당 파라미터로 메시지를 개인화시킬 수 있습니다. |

#### Headers

| Parameter     | Value            | Description                                                                     |
|---------------|------------------|---------------------------------------------------------------------------------|
| Content-Type  | application/json | Request body 의 MIME Type                                                        |
| Authorization | some-token       | Authorization endpoint 를 통해 수령한 인증 토큰 (해당 Endpoint에서는 **Bearer Token**을 사용합니다.) |

#### Response

| Status Code            | Content-Type     | Example Response                                 |
|------------------------|------------------|--------------------------------------------------|
| 200 OK                 | application/json | `{"success":true,"error":null}`                  |
| 400 Bad Request        | application/json | `{"success":false,"error":"some-error-message"}` |
| 405 Method Not Allowed | application/json | `{"success":false,"error":"Method not allowed"}` |

#### 코드 예시

Node.js

```js
async function triggerCampaign(projectId, campaignId) {
    // Retrieve authToken from authorization endpoint
    const authResponse = await fetch("https://api.notifly.tech/authorize", {
        method: "POST",
        body: JSON.stringify({
            userName: "your-user-name",
            password: "your-password",
        }),
    });
    const { data: authToken } = await authResponse.json();

    // Endpoint
    const url = `https://api.notifly.tech/campaign/${projectId}/${campaignId}/send`;

    // Request header
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // retrieve this authToken from authorization endpoint
    };

    // Request body
    const body = {
        recipients: [
            {
                userId: "alice",
                eventParams: {
                    messageTitle: "Hello Alice!",
                    messageBody: "How are you?",
                    // ... more event params
                },
            },
            {
                userId: "bob",
                eventParams: {
                    messageTitle: "Hello Bob!",
                    messageBody: "How are you?",
                    // ... more event params
                },
            },
            // ... more recipients
        ],
    };

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
    });

    const result = await response.json();
    if (!result.success) {
        console.error(result);
    } else {
        console.log("Campaign triggered successfully");
    }
}
```

## 5. Send Text Message Endpoint

이 endpoint 를 통해 문자 메시지(SMS, LMS, MMS)를 보낼 수 있습니다.

### 주의 사항

- HTTP REST API를 이용한 문자 발송은 **[Notifly 문자 자체 발송](/ko/user-guide/text-message/notifly_guide)** 설정이 되어있을 경우에만 가능합니다.
- 발신 번호는 자체 발송 설정에 입력된 번호가 사용 됩니다.
- 아직 API를 이용한 발송 결과에 대한 통계는 UI로 제공 되지 않습니다. 정보가 필요하실 경우 contact@notifly.tech 으로 이메일 부탁드립니다.

### Endpoint

`POST https://api.notifly.tech/messages/text-message`

### Specifications

#### Request

| Parameter     | Type   | Required | Description                                                             |
|---------------|--------|----------|-------------------------------------------------------------------------|
| projectId     | String | Yes      | [Notifly의 설정 페이지](https://notifly.tech/console/settings)에서 확인하실 수 있습니다. |
| type          | String | Yes      | 메시지 유형 (`sms` 또는 `mms`)                                                 |
| title         | String | No       | 본문 제목(mms에만 사용)                                                         |
| body          | String | Yes      | 본문 내용                                                                   |
| recipientList | List   | Yes      | 수신자 목록(최대 1000명)                                                        |
| - recipientNo | String | Yes      | 수신 번호                                                                   |

#### Headers

| Parameter     | Value            | Description                           |
|---------------|------------------|---------------------------------------|
| Content-Type  | application/json | Request body 의 MIME Type              |
| Authorization | some-token       | Authorization endpoint 를 통해 수령한 인증 토큰 |

#### Response

| Status Code               | Content-Type     | Example Response                    |
|---------------------------|------------------|-------------------------------------|
| 200 OK                    | application/json | `{"success":true}`                  |
| 400 Bad Request           | application/json | `{"error":"some-error-message"}`    |
| 405 Method Not Allowed    | application/json | `{"error":"Method not allowed"}`    |
| 413 Payload Too Large     | application/json | `{"error":"Payload Too Large"}`     |
| 500 Internal Server Error | application/json | `{"error":"Internal Server Error"}` |

### 코드 예시

Node.js

```js
// Retrieve authToken from authorization endpoint
const authResponse = await fetch("https://api.notifly.tech/authorize", {
    method: "POST",
    body: JSON.stringify({
        userName: "your-user-name",
        password: "your-password",
    }),
});
const { data: authToken } = await authResponse.json();

// Endpoint
const url = `https://api.notifly.tech/messages/text-message`;

// Request header
const headers = {
    "Content-Type": "application/json",
    Authorization: authToken, // retrieve this authToken from authorization endpoint
};

// Request body
const body = {
    projectId: projectId,
    type: "sms",
    body: "Message Body",
    recipientList: [
        {
            recipientNo: "01012345678",
        },
        {
            recipientNo: "01045671234",
        },
        // ... more recipients
    ]
};

const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
});

const result = await response.json();
if (!result.success) {
    console.error(result);
} else {
    console.log("SMS Message sent successfully");
}
```

## 6.Send Kakao Alimtalk Message Endpoint

이 endpoint 를 통해 카카오 알림톡 메시지를 발송할 수 있습니다. 알림톡 템플릿 코드와 수신자 리스트를 사용하여 메시지를 전송합니다.

### 주의 사항

- HTTP REST API를 이용한 카카오 알림톡 발송은 **[Notifly 카카오톡 자체 발송](/ko/user-guide/kakaotalk/integration#notifly)** 설정이 되어있을 경우에만
  가능합니다.
- 아직 API를 이용한 발송 결과에 대한 통계는 UI로 제공 되지 않습니다. 정보가 필요하실 경우 contact@notifly.tech 으로 이메일 부탁드립니다.

### Endpoint

`POST https://api.notifly.tech/messages/kakao-alimtalk`

### Specifications

#### Request

| Parameter           | Type   | Required | Description                                                                             |
|---------------------|--------|----------|-----------------------------------------------------------------------------------------|
| projectId           | String | Yes      | [Notifly의 설정 페이지](https://notifly.tech/console/settings)에서 확인하실 수 있습니다.                 |
| templateId          | String | Yes      | 등록한 발송 템플릿 ID ([알림톡 템플릿 리스트](https://notifly.tech/console/kakao-template/list)에서 확인 가능) |
| recipientList       | List   | Yes      | 수신자 리스트(최대 1000명)                                                                       |
| - recipientNo       | String | Yes      | 수신 번호                                                                                   |
| - templateParameter | Object | No       | 템플릿 파라미터, 치환할 변수가 포함된 경우 필수                                                             |

#### Headers

| Parameter     | Value            | Description                           |
|---------------|------------------|---------------------------------------|
| Content-Type  | application/json | Request body 의 MIME Type              |
| Authorization | some-token       | Authorization endpoint 를 통해 수령한 인증 토큰 |

#### Response

| Status Code               | Content-Type     | Example Response                    |
|---------------------------|------------------|-------------------------------------|
| 200 OK                    | application/json | `{"success":true}`                  |
| 400 Bad Request           | application/json | `{"error":"some-error-message"}`    |
| 405 Method Not Allowed    | application/json | `{"error":"Method not allowed"}`    |
| 413 Payload Too Large     | application/json | `{"error":"Payload Too Large"}`     |
| 500 Internal Server Error | application/json | `{"error":"Internal Server Error"}` |

### 코드 예시

Node.js

```js
// Retrieve authToken from authorization endpoint
const authResponse = await fetch("https://api.notifly.tech/authorize", {
    method: "POST",
    body: JSON.stringify({
        userName: "your-user-name",
        password: "your-password",
    }),
});
const { data: authToken } = await authResponse.json();

// Endpoint
const url = `https://api.notifly.tech/messages/kakao-alimtalk`;

// Request header
const headers = {
    "Content-Type": "application/json",
    Authorization: authToken, // retrieve this authToken from authorization endpoint
};

// Request body
const body = {
    projectId: projectId,
    templateId: templateId,
    recipientList: [
        {
            "recipientNo": "01012345678",
            "templateParameter": {
                "user_name": "Notifly User"
            }
        },
        {
            "recipientNo": "01056781234",
            "templateParameter": {
                "user_name": "Notifly Customer"
            }
        }
    ],
};

const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
});

const result = await response.json();
if (!result.success) {
    console.error(result);
} else {
    console.log("SMS Message sent successfully");
}
```

## 7. Send Kakao Friendtalk Message Endpoint

이 endpoint 를 통해 카카오 친구톡 메시지를 발송할 수 있습니다. 프렌드톡 메시지는 수신자 목록, 광고 여부, 메시지 유형 등을 설정하여 전송합니다.

### 주의 사항

- HTTP REST API를 이용한 카카오 친구톡 발송은 **[Notifly 카카오톡 자체 발송](/ko/user-guide/kakaotalk/integration#notifly)** 설정이 되어있을 경우에만
  가능합니다.
- 아직 API를 이용한 발송 결과에 대한 통계는 UI로 제공 되지 않습니다. 정보가 필요하실 경우 contact@notifly.tech 으로 이메일 부탁드립니다.

### Endpoint

`POST https://api.notifly.tech/messages/kakao-friendtalk`

### Specifications

#### Request

| Parameter      | Type    | Required | Description                                                             |
|----------------|---------|----------|-------------------------------------------------------------------------|
| projectId      | String  | Yes      | [Notifly의 설정 페이지](https://notifly.tech/console/settings)에서 확인하실 수 있습니다. |
| messageType    | String  | Yes      | 메시지 타입. (현재 `text`타입만 지원합니다.)                                           |
| isAd           | Boolean | No       | 광고 여부                                                                   |
| recipientList  | List    | Yes      | 수신자 리스트(최대 1000명)                                                       |
| - recipientNo  | String  | Yes      | 수신 번호                                                                   |
| - content.text | String  | Yes      | 본문 내용                                                                   |

#### Headers

| Parameter     | Value            | Description                           |
|---------------|------------------|---------------------------------------|
| Content-Type  | application/json | Request body 의 MIME Type              |
| Authorization | some-token       | Authorization endpoint 를 통해 수령한 인증 토큰 |

#### Response

| Status Code               | Content-Type     | Example Response                    |
|---------------------------|------------------|-------------------------------------|
| 200 OK                    | application/json | `{"success":true}`                  |
| 400 Bad Request           | application/json | `{"error":"some-error-message"}`    |
| 405 Method Not Allowed    | application/json | `{"error":"Method not allowed"}`    |
| 413 Payload Too Large     | application/json | `{"error":"Payload Too Large"}`     |
| 500 Internal Server Error | application/json | `{"error":"Internal Server Error"}` |

### 코드 예시

Node.js

```js
// Example usage of sendFriendtalk function
// Retrieve authToken from authorization endpoint
const authResponse = await fetch("https://api.notifly.tech/authorize", {
    method: "POST",
    body: JSON.stringify({
        userName: "your-user-name",
        password: "your-password",
    }),
});
const { data: authToken } = await authResponse.json();

// Endpoint
const url = `https://api.notifly.tech/messages/kakao-friendtalk`;

// Request header
const headers = {
    "Content-Type": "application/json",
    Authorization: authToken, // retrieve this authToken from authorization endpoint
};

// Request body
const body = {
    projectId: projectId,
    messageType: "text",
    isAd: false,
    recipientList: [
        {
            recipientNo: "01030494522",
            content: {
                text: "test",
            }
        }
    ],
};

const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
});

const result = await response.json();
if (!result.success) {
    console.error(result);
} else {
    console.log("SMS Message sent successfully");
}
```
