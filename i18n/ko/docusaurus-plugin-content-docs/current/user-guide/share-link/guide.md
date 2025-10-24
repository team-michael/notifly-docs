---
title: 쉐어 링크 가이드
---

# 쉐어 링크 가이드

Notifly Share Link는 외부 도구(예: Google 스프레드시트)의 `IMPORTDATA` 등에서 바로 사용할 수 있도록 통계 데이터를 CSV 형식으로 제공합니다. 발생 일자별로 캠페인 기준 지표를 조회할 수 있습니다.

## Google 스프레드시트 연동방법

1. Google 스프레드시트를 생성해주세요.
2. 연동할 셀에 `IMPORTDATA` 아래 함수를 복사해 붙여넣기 합니다.
   
```excel
=IMPORTDATA("https://api.notifly.tech/v1/projects/{project_id}/statistics.csv")
```

3. 입력한 함수에서 '{project_id}'을 실제 project_id로 대체합니다.
4. 외부 URL에서 데이터를 가져오도록 액세스 권한을 허용해야 합니다. '권한 허용' 버튼을 클릭해주세요.
5. [기간/태그 파라미터](/ko/user-guide/share-link#기간/태그-파라미터)와 작성 예시를 참고하여 불러올 기간을 수정해보세요.
6. 반드시 [주의사항](/ko/user-guide/share-link#주의사항)을 확인해주세요.


## 제공 항목 설명

| 필드명             | 예시                       | 설명                                                                | 특이사항                                                                                                                |
|:-------------------|:---------------------------|:--------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------|
| date               | "2025.10.22"               | 발생 날짜 (KST)                                                     | 스프레드시트 '서식'에서 날짜 서식으로 변경해서 사용해주세요.                                                            |
| resource_type      | "campaign"                 | 리소스 타입 (`campaign` 또는 `user-journey`)                        |                                                                                                                    |
| resource_id        | "cmp123"                   | 리소스 ID                                                           |                                                                                                                      |
| resource_name      | "신규 가입 인사"           | 리소스 이름                                                         |                                                                                                                      |
| node_id            | "node12"                   | 유저여정 메시지 노드ID                                              | 유저 여정이 아닌 경우 공란으로 처리됩니다.                                                                              |
| node_name          | "가입 후 2일 뒤 첫 메시징" | 유저여정 메시지 노드 이름                                           | 유저 여정이 아닌 경우 공란으로 처리됩니다.                                                                              |
| variant_id         | "var123"                   | A/B 테스트 그룹 ID                                                  | A/B 테스트 캠페인이 아닌 경우 공란으로 처리됩니다.                                                                      |
| variant_name       | "A그룹"                    | A/B 테스트 그룹 이름                                                | A/B 테스트 캠페인이 아닌 경우 공란으로 처리됩니다.                                                                      |
| channel            | "push-notification"        | 발송 채널 정보                                                      |                                                                                                                      |
| tags               | ["프로모션"]               | 캠페인 태그 목록                                                    | 태그가 여러개인 경우 콤마(,)로 구분됩니다. <br>태그 설정이 되어있지 않은 경우 공란으로 처리됩니다.                      |
| message_sent       | 1200                       | 발송 성공 수                                                        | 발송 성공으로 집계된 메시지 수                                                                                          |
| message_failed     | 10                         | 발송 실패 수                                                        | 발송 실패로 집계된 메시지 수                                                                                            |
| delivered          | 1150                       | 메시지 수신 수                                                      | 푸시, 이메일처럼 '수신' 또는 '도달'을 확인할 수 있는 경우에만 집계됩니다.<br>※ 기기의 상태, 네트워크 이슈 등의 원인으로 푸시 발송처리는 성공하여도 기기에서 수신되지 않을 수 있습니다.<br>※ 메일박스가 꽉 차있거나 스팸처리 된 경우 이메일 발송은 되어도 수신함에 도달되지 않을 수 있습니다.<br>카카오 메시지, 문자, 팝업은 해당사항이 없기 때문에 공란으로 표기됩니다.                                              |
| click              | 200                        | 클릭 수                                                             | 푸시, 이메일, 팝업처럼 클릭을 집계하는 채널의 경우 표기합니다. <br>카카오 메시지, 문자처럼 클릭을 지원하지 않는 채널은 공란으로 처리합니다.(트래킹링크를 사용하면 카카오 메시지, 문자 채널에서도 클릭을 측정할 수 있습니다.)                                       |
| conversion_1_name  | "구매"                     | 전환이벤트 이름                                                        | 전환이벤트가 발생하지 않은 경우 공란으로 처리됩니다.                                                                    |
| conversion_1_type  | "direct_count_conversion"  | 전환 타입 (`direct_count_conversion` 또는 `total_count_conversion`) | 전환이벤트가 발생하지 않은 경우 공란으로 처리됩니다. <br>※ `direct_count_conversion`: 클릭 이후 추적기간 동안 전환 이벤트가 발생한 경우를 집계<br>※ `total_count_conversion`: 메시지 발송 이후 추적 기간 동안 전환 이벤트가 발생한 경우를 집계(클릭 여부를 고려하지 않음) |
| conversion_1_count | 20                         | 전환 이벤트 수                                                      | 전환이벤트가 발생하지 않은 경우 공란으로 처리됩니다.                                                                    |

    

### 기간/태그 파라미터

| 이름       |  설명                                                                                        | 작성 예시          | 예시 적용 시 기간 <br>(ex.오늘 = 2025-07-01) |
| ---------- |  -------------------------------------------------------------------------------------------| ------------------ | ------------------ |
| `start` & `end` |  특정 기간.                                                                             | `=IMPORTDATA("https://api.notifly.tech/v1/projects/{project_id}/statistics.csv?start=2022-01-01&end=2022-03-01")` |  2022-01-01 ~ 2022-03-01|
| `since`    | 특정 일자부터 오늘 전일까지.                                                                 | `=IMPORTDATA("https://api.notifly.tech/v1/projects/{project_id}/statistics.csv?since=2025-05-01")` | 2025-05-01 ~ 2025-06-30|
| `last`     | 전일부터 최근 N기간. <br>`timeUnit` 미지정 시 day 단위로 집계됩니다.                 | `=IMPORTDATA("https://api.notifly.tech/v1/projects/{project_id}/statistics.csv?last=7")` | 2025-06-24 ~ 2025-06-30(전일부터 최근 7일)|
| `timeUnit` | 기간 단위를 변경. <br>(`day`(기본)/`week`/`month`)<br>`last` 또는 `offset`과 함께 사용합니다.      | `=IMPORTDATA("https://api.notifly.tech/v1/projects/{project_id}/statistics.csv?last=4&timeUnit=week")` | 2025-06-03 ~ 2025-06-30<br>(전일부터 최근 4주) | 
| `offset`   | 기준일을 "N기간 전"으로 이동. <br>`start/end`,`since` 또는 `last`)과 함께 사용해야 합니다.|`=IMPORTDATA("https://api.notifly.tech/v1/projects/{project_id}/statistics.csv?last=4&timeUnit=week&offset=4")`| 2025-05-06 ~ 2025-06-02<br>(전일부터 4주 전을 기준으로 이전 4주간) |
| `tag`      |  특정 태그로 필터링. <br>지정된 태그 중 하나라도 포함(OR)하면 출력합니다.| `=IMPORTDATA("https://api.notifly.tech/v1/projects/{project_id}/statistics.csv?tag=프로모션&tag=공지")` | 태그 '프로모션'과 '공지'를 포함하는 모든 캠페인|


### 주의사항

:::caution 날짜 형식
기간 파라미터에 적용하는 날짜는 `YYYY-MM-DD` 형식을 따라야 합니다. 형식 불일치 시 출력되지 않습니다.
:::

:::note 기준 시간
쉐어 링크 데이터의 기준 시간은 KST입니다. (UTC+9시간)
:::

:::note 전일 데이터 집계 완료 시간
**전일 데이터는 익일 오전 7시(KST)에 집계가 완료됩니다.** 정확한 전일 데이터 조회를 위해서는 오전 7시 이후에 지표를 확인하시기 바랍니다.
:::

:::note 당일 데이터 미포함
쉐어 링크는 당일 데이터를 포함하지 않습니다.
:::

:::note 집계 표기 일자
일자별 데이터는 발생 일자 기준으로 집계 및 표기됩니다. 예를들어 7월 23일 발송한 캠페인의 클릭이 24일에 발생했다면, 23일에 발송, 24일에 클릭 이벤트가 집계됩니다.
:::

### Errors

구글 시트의 ImportData 함수를 사용하는 경우, 응답 크기가 최대 2MB를 초과할 수 없습니다.
아래의 에러가 표시되는 경우, 날짜를 조절해서 응답 크기를 줄여주세요.

:::note Response Size Error
File size exceeds 2MB limit. Please try a shorter date range or filter by specific campaigns/tags.
:::

### CSV 다운로드 API

Notifly Share Link는 통계 데이터를 CSV 형식으로 다운로드할 수 있는 API도 제공합니다. 자세한 사항은 API 가이드를 참고해주세요.


