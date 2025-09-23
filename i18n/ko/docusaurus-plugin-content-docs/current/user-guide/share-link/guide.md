---
title: 쉐어 링크 가이드
---

# 쉐어 링크 가이드

Notifly Share Link는 외부 도구(예: Google 스프레드시트)의 `IMPORTDATA` 등에서 바로 사용할 수 있도록 통계 데이터를 CSV 형식으로 제공합니다. 발생 일자별로 캠페인 기준 지표를 조회할 수 있습니다.

:::info 제공 항목

- 발생 일자
- 캠페인 ID
- 캠페인 제목
- 발송 채널
- 발송 수
- 수신 수
- 클릭 수
- 전환 수
  :::

## Endpoint

`GET https://api.notifly.tech/${version}/projects/${project_id}/statistics.csv`

## Specifications

### Request Headers

| Parameter     | Value      | Description                                                               |
| ------------- | ---------- | ------------------------------------------------------------------------- |
| Authorization | {auth-key} | 인증 토큰. [HTTP API - Authentication]을 통해 발급받은 토큰을 사용합니다. |
| Accept        | text/csv   | (선택) CSV 응답 기대 시 지정 가능                                         |

:::note 인증
401 Unauthorized 응답 방지를 위해 유효한 인증 토큰이 필요합니다.
:::

### Query Parameters

| Name       | Type   | Required | Description                                                                                                        | Example            |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `start`    | String | Cond.    | 조회 시작일(포함). `YYYY-MM-DD`. `end`와 함께 사용합니다.                                                          | `start=2022-01-01` |
| `end`      | String | Cond.    | 조회 종료일(포함). `YYYY-MM-DD`. `start`와 함께 사용합니다.                                                        | `end=2022-03-01`   |
| `since`    | String | Cond.    | 특정 일자부터 오늘 전일까지. `YYYY-MM-DD`.                                                                         | `since=2022-01-01` |
| `last`     | Number | Cond.    | 최근 N기간. 0 제외. 오늘은 포함하지 않음. `timeUnit` 미지정 시 day 단위.                                           | `last=3`           |
| `offset`   | Number | No       | 기준일을 "오늘에서 N기간 전"으로 이동. 기간 지정(`start/end` 또는 `since` 또는 `last`)과 함께 사용해야 함.         | `offset=3`         |
| `timeUnit` | Enum   | No       | `last`/`offset`의 기간 단위. `day`/`week`/`month`. 기본값 `day`.                                                   | `timeUnit=week`    |
| `tag`      | String | No       | 특정 태그로 필터링. 다중 지정 가능. 지정된 태그 중 하나라도 포함(OR)한 리소스만 반환. 현재 캠페인에 대해서만 제공. | `tag=aa&tag=bb`    |

#### 기간 지정 규칙

- 다음 중 정확히 하나의 방식으로 기간을 지정해야 합니다.
  - `start` + `end`
  - `since`
  - `last`
- `offset`은 위 기간 지정 파라미터와 함께 사용할 수 있습니다.
- `timeUnit`은 `last`/`offset`에만 적용됩니다. 미지정 시 `day` 단위입니다.
- `last=0`은 허용되지 않습니다. 오늘은 조회 기간에 포함되지 않습니다.

:::caution 날짜 형식
날짜는 `YYYY-MM-DD` 형식을 따라야 합니다. 형식 불일치 시 400 응답이 반환됩니다.
:::

## Sample Requests

### 1) 특정 기간 지정

```http
GET https://api.notifly.tech/v1/projects/{project_id}/statistics.csv?start=2022-01-01&end=2022-03-01
Authorization: {auth-key}
Accept: text/csv
```

### 2) 특정 시점부터 오늘 전일까지

```http
GET https://api.notifly.tech/v1/projects/{project_id}/statistics.csv?since=2022-01-01
Authorization: {auth-key}
Accept: text/csv
```

### 3) 최근 N일(오늘 미포함)

```http
GET https://api.notifly.tech/v1/projects/{project_id}/statistics.csv?last=3
Authorization: {auth-key}
Accept: text/csv
```

### 4) 최근 N주 + 기준일 오프셋

```http
GET https://api.notifly.tech/v1/projects/{project_id}/statistics.csv?last=4&offset=3&timeUnit=week
Authorization: {auth-key}
Accept: text/csv
```

### 5) 태그 필터(다중 OR)

```http
GET https://api.notifly.tech/v1/projects/{project_id}/statistics.csv?since=2022-01-01&tag=aa&tag=bb
Authorization: {auth-key}
Accept: text/csv
```

## Response

### Response Headers

| Parameter           | Value                                 |
| ------------------- | ------------------------------------- |
| Status code         | 200 OK                                |
| Content-Type        | text/csv                              |
| Content-Disposition | attachment; filename="statistics.csv" |

### Errors

구글 시트의 ImportData 함수를 사용하는 경우, 응답 크기가 최대 2MB를 초과할 수 없습니다.
아래의 에러가 표시되는 경우, 날짜를 조절해서 응답 크기를 줄여주세요.

:::note Response Size Error
File size exceeds 2MB limit. Please try a shorter date range or filter by specific campaigns/tags.
:::

### CSV Columns

아래와 같은 컬럼 순서로 CSV가 반환됩니다.

1. `date` (예: `2025-09-01`)
2. `campaignId`
3. `campaignTitle`
4. `channel` (예: `web_push`, `email`, `sms`, ...)
5. `sent`
6. `delivered`
7. `clicks`
8. `conversions`

#### Example

```csv
date,campaignId,campaignTitle,channel,sent,delivered,clicks,conversions
2025-09-01,cmp_12345,장바구니 리마인드,web_push,1200,1100,145,37
2025-09-02,cmp_12345,장바구니 리마인드,web_push,980,920,102,28
```

## Error Responses

| Status | Message                                                                                   | When                                                                   |
| ------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 400    | Invalid project ID                                                                        | `project_id`가 32자리가 아니거나 없음                                  |
| 400    | Bad Request: Invalid date format. Expected format: YYYY-MM-DD                             | 날짜 형식이 유효하지 않음                                              |
| 400    | Bad Request: End date must be after start date.                                           | 시작일이 종료일보다 뒤인 경우                                          |
| 400    | Bad Request: Today's date cannot be included in the query range.                          | 오늘 날짜가 조회 범위에 포함된 경우                                    |
| 400    | Invalid request body.                                                                     | 기간 관련 파라미터를 복수로 혼합 사용한 경우 (`start/end` + `last` 등) |
| 400    | Bad Request: Invalid date range: start date cannot be after end date due to large offset. | `offset`으로 인해 날짜 범위가 역전된 경우                              |
| 401    | Unauthorized: Invalid token                                                               | 인증 토큰이 없거나 유효하지 않음                                       |
| 408    | Request timeout. Check the Input Parameters or try again with a shorter date range.       | 대용량 데이터로 인한 타임아웃                                          |
| 500    | Internal Server Error                                                                     | 내부 서버 오류                                                         |

:::tip Google 스프레드시트 사용 예
스프레드시트에서 `IMPORTDATA` 함수를 사용할 수 있습니다. 예: `=IMPORTDATA("https://api.notifly.tech/v1/projects/{project_id}/statistics.csv?last=7")`
:::
