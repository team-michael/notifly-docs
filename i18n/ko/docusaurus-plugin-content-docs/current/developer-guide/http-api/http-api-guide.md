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

| Parameter | Type   | Required | Description                                                                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userName  | String | Yes      | Notifly의 설정 페이지에서 확인하실 수 있습니다. 프로젝트 별로 하나의 사용자 이름이 생성됩니다. 문의 사항은 contact@workmichael.com 으로 이메일 부탁드립니다.     |
| password  | String | Yes      | Notifly의 설정 페이지에서 확인하실 수 있습니다. 프로젝트 별로 하나의 사용자 비밀번호가 생성됩니다. 문의 사항은 contact@workmichael.com 으로 이메일 부탁드립니다. |

#### Headers

| Parameter    | Value            | Description               |
| ------------ | ---------------- | ------------------------- |
| Content-Type | application/json | Request body 의 MIME Type |

#### Response (예시)

| Parameter    | Value                              |
| ------------ | ---------------------------------- |
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

이 endpoint 를 통해 notifly 엔진에 이벤트 데이터를 보낼 수 있습니다. Notifly 엔진은 수신한 이벤트 데이터를 모으고 분석해 캠페인 진행 시 메시지 발송 타이밍, 사용자 세그먼트 설정 등에 활용할 수 있게 준비합니다.

### Endpoint

`POST https://api.notifly.tech/track-event`

### Specifications

| Parameter                  | Type    | Required | Description                                                                                                                                     |
| -------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| projectID                  | String  | Yes      | Notifly 팀에서 제공드리는 project ID 입니다. 문의 사항은 contact@workmichael.com 으로 이메일 부탁드립니다.                                      |
| eventName                  | String  | Yes      | 이벤트명                                                                                                                                        |
| isGlobalEvent              | Boolean | Yes      | 특정 유저에게만 발생하는 것이 아니라 서비스 레벨에서 발생하는 이벤트인지의 여부                                                                 |
| eventParams                | Object  | No       | 이벤트 파라미터 값들                                                                                                                            |
| segmentationEventParamKeys | Array   | No       | 정교한 캠페인 집행을 위해 특정 파라미터들을 notifly 엔진에서 특수하게 처리합니다. 문의 사항은 contact@workmichael.com 으로 이메일 부탁드립니다. |
| userID                     | String  | No       | 유저 ID                                                                                                                                         |

#### Headers

| Parameter     | Value            | Description                                     |
| ------------- | ---------------- | ----------------------------------------------- |
| Content-Type  | application/json | Request body 의 MIME Type                       |
| Authorization | some-token       | Authorization endpoint 를 통해 수령한 인증 토큰 |

#### Response (예시)

| Parameter    | Value                                                             |
| ------------ | ----------------------------------------------------------------- |
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

| Parameter      | Type   | Required | Description                                                                                                |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| projectID      | String | Yes      | Notifly 팀에서 제공드리는 project ID 입니다. 문의 사항은 contact@workmichael.com 으로 이메일 부탁드립니다. |
| userProperties | Object | Yes      | 업데이트 할 사용자 속성값들                                                                                |
| userID         | String | Yes      | 유저 ID                                                                                                    |

<span style={{ color: "red", fontWeight: "bold" }}><em>중요: 이메일과 전화번호 정보는 userProperties Object에 반드시 $email, $phone_number 키값으로 정의해주셔야 캠페인 발송 시 활용할 수 있습니다! 코드 예시를 참고해주세요.</em></span>

#### Headers

| Parameter     | Value            | Description                                     |
| ------------- | ---------------- | ----------------------------------------------- |
| Content-Type  | application/json | Request body 의 MIME Type                       |
| Authorization | some-token       | Authorization endpoint 를 통해 수령한 인증 토큰 |

#### Response (예시)

| Parameter    | Value                                                             |
| ------------ | ----------------------------------------------------------------- |
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

// Body
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

본 API 를 통해 캠페인을 트리거링할 수 있습니다. 등록된 유저 및 디바이스의 속성 뿐만 아니라 API Request Body의 파라미터까지 모두 사용하여 메시지를 개인화할 수 있습니다.

### Endpoint

`POST https://api.notifly.tech/campaign/{projectId}/{campaignId}/send`

### Specifications

#### Path Parameters

| Parameter  | Type   | Required | Description                                                                                                                       |
| ---------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| projectId  | String | Yes      | [Notifly의 설정 페이지](https://notifly.tech/console/settings)에서 확인하실 수 있습니다.                                          |
| campaignId | String | Yes      | [캠페인 리스트](https://notifly.tech/console/campaign/list)의 캠페인 목록을 클릭하여 상세보기 팝업 상단에서 확인하실 수 있습니다. |

#### Request

| Parameter     | Type   | Required | Description                                                                              |
| ------------- | ------ | -------- | ---------------------------------------------------------------------------------------- |
| recipients    | List   | Yes      | 메시지를 발송할 유저의 ID 및 이벤트 파라미터를 포함하는 객체의 리스트 입니다.            |
| - userId      | String | Yes      | 메시지를 발송할 유저의 ID 입니다.                                                        |
| - eventParams | Object | Yes      | 이벤트 파라미터를 포함하는 객체 입니다. 해당 파라미터로 메시지를 개인화시킬 수 있습니다. |

#### Headers

| Parameter     | Value            | Description                                                                                          |
| ------------- | ---------------- | ---------------------------------------------------------------------------------------------------- |
| Content-Type  | application/json | Request body 의 MIME Type                                                                            |
| Authorization | some-token       | Authorization endpoint 를 통해 수령한 인증 토큰 (해당 Endpoint에서는 **Bearer Token**을 사용합니다.) |

#### Response

| Status Code            | Content-Type     | Example Response                                 |
| ---------------------- | ---------------- | ------------------------------------------------ |
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
	const {data: authToken} = await authResponse.json();

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

### 주의 사항

- HTTP Rest API를 이용한 Triggering은 캠페인이 **API 기반 발송**으로 설정되어있는 경우에만 사용 가능합니다.
