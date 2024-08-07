---
sidebar_position: 2
---

# 카카오 알림톡 발송

## 개요 {#overview}

노티플라이에서는 사용자들에게 카카오 알림톡을 원하는 타이밍에 보낼 수 있습니다.

- 노티플라이에서는 타 발송 대행사 없이 직접 카카오 알림톡 발송을 하실 수 있습니다.
- 카카오톡 비즈메시지(알림톡, 친구톡)를 발송하려면 카카오톡 채널을 먼저 등록해야 합니다. 카카오톡 채널은 [카카오톡 채널 등록 페이지](https://center-pf.kakao.com)에서 무료로 만들 수 있습니다.
- 카카오톡 비즈메시지 발송을 위해서는 비즈니스 채널로의 전환이 필수입니다. 자세한 정보는 [카카오 비즈니스 가이드](https://kakaobusiness.gitbook.io/main/channel/start)에서 확인해주세요.
- 카카오 알림톡은 **템플릿 기반으로 발송됩니다**. 템플릿은 검수 후 발송 가능하며, 검수 기간은 대략 1~3일정도 소요됩니다. 자세한 내용은 [카카오톡 템플릿 심사 FAQ](https://cs.kakao.com/helps?service=159&category=523&locale=ko)를 참고해 주세요.

## 1. 카카오 알림톡 발신자 정보 등록하기 {#sender-profile}

[카카오 비즈메시지 발송 환경 셋팅 방법](/ko/user-guide/kakaotalk/integration)을 참고하여 채널을 노티플라이에 등록해 주세요.

## 2. 카카오 알림톡 캠페인 시작하기

노티플라이 캠페인 생성 페이지에서 카카오 알림톡을 선택해 주세요.

카카오 알림톡에서 **휴대폰 번호** 정보는 발송에 필요한 필수 요소입니다. 휴대폰 번호를 불러오는 방법은 발송 대상 타입마다 조금씩 상이할 수 있습니다.

### 2-1. 발송 대상 설정

카카오 알림톡의 경우, 지원되는 발송 대상 종류는 다음과 같습니다:

1. 유저 그룹 설정
2. CSV 파일

#### 유저 그룹 설정

자세한 내용은 [유저 그룹 설정](/ko/user-guide/campaigns/campaign-segments/segment#user-group-setup) 섹션을 참고해주세요.

#### CSV 파일

노티플라이 데이터베이스에 등록되지 않은 사용자에게도 직접 발송하고 싶다면, CSV 업로드 기능을 활용할 수 있습니다. 자세한 내용은 [발송 대상 설정 - 2. CSV 업로드](/ko/user-guide/campaigns/campaign-segments/segment#csv-upload) 섹션을 참고해주세요.

- **카카오톡 발송에서 `phone_number` 컬럼은 필수이며 중복되거나 비어있으면 안됩니다.**

등록이 잘 되었다면 다음과 같이 발송 대상과 등록된 필드명이 표시됩니다.

![Kakao alimtalk csv upload result](./img/kakao_alimtalk_csv_upload_result.png)

<!-- TODO: 외부 툴 연동 코호트 -->

### 2-2. 메시지

카카오 알림톡은 **템플릿 기반으로 발송**됩니다. 템플릿에는 치환 가능한 변수 필드가 존재하며, `#{변수}`와 같은 형식으로 되어있습니다. 해당 변수는 **직접 입력**으로도 치환가능하며, **[메시지 개인화](/ko/category/message-personalization)**를 통하여 개인에게 다르게 알림톡을 보낼 수도 있습니다.

1. 유저 그룹 설정을 이용하여 대상을 지정할 때에는, **모든 변수명에 대하여 치환할 문구**를 입력하셔야 합니다. 치환 문구를 입력하실 때에, 개인화가 필요하다면 우측 상단 '메시지 개인화' 버튼을 눌러서 개인화 문구를 추가해주세요. 필요하지 않다면 고정된 내용을 입력해 주세요. 메시지 개인화에 대한 자세한 정보는 [메시지 개인화](/ko/category/message-personalization) 섹션을 참고해주세요.

![Kakao Alimtalk Template Parameter - Build Segment](./img/kakao_alimtalk_template_parameter_build_segment.png)

2. CSV 업로드 기능을 이용한 캠페인인 경우, **CSV 필드명과 카카오톡 템플릿 변수의 이름이 같을 경우 자동으로 매칭됩니다.** 빼먹은신 필드는 직접 입력이 가능하며, 해당 경우에도 메시지 개인화가 가능합니다.

![Kakao Alimtalk Template Parameter - CSV Upload](./img/kakao_alimtalk_template_parameter_csv_upload.png)
