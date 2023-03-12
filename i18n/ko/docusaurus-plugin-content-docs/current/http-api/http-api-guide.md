---
sidebar_position: 1
---

# HTTP API

## 1. Authorization Endpoint
이 endpoint 를 통해 인증 토큰을 받아올 수 있습니다. 인증 토큰은 notifly 서버 API 활용에 필수적입니다.

### Endpoint
`POST https://api.notifly.tech/authorize`

### Request

#### Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                  |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| userName  | String | Yes      | Notifly 팀에서 제공드리는 사용자 이름입니다. 프로젝트 별로 하나의 사용자 이름이 생성됩니다. 문의 사항은 contact@workmichael.com 으로 이메일 부탁드립니다.                                                                                   |
| password  | String | Yes      | Notifly 팀에서 제공드리는 비밀번호입니다. 프로젝트 별로 하나의 사용자 비밀번호가 생성됩니다. 문의 사항은 contact@workmichael.com 으로 이메일 부탁드립니다.                                                                                   |

#### Headers

| Parameter     | Value             | Description                                            |
| ------------- | ----------------- | ------------------------------------------------------ |
| Content-Type  | application/json  | Request body 의 MIME Type                              |

#### Response (예시)

| Parameter     | Value                |
| ------------- | -------------------- |
| Status code   | 200 OK               |
| Content-Type  | application/json     |
| json          | {"data":"some-token","error":null} |

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

이 endpoint 를 통해 notifly 엔진에 이벤트 데이터를 보낼 수 있습니다. Notifly 엔진은 수신한 이벤트 데이터를 모으고 분석해 캠페인 진행 시 메시지 발송 타이밍, 사용자 세그먼트 설정 등에 활용할 수 있게 준비합니다.

### Endpoint

### Request

#### Parameters


#### Headers

#### Response (예시)

### 코드 예시


## 3. Set User Properties Endpoint

이 endpoint 를 통해 notifly 엔진에 사용자 속성들을 등록할 수 있습니다. 등록된 속성값들은 캠페인 진행 시 사용자 세그먼트 설정에 활용하여 보다 효율적인 마케팅이 가능합니다.

### Endpoint

### Request

#### Parameters


#### Headers

#### Response (예시)

### 코드 예시
