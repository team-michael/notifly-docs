---
sidebar_position: 1
---

# 인앱 팝업 띄우기

## 개요

1. 노티플라이에서는 인앱 팝업을 원하는 타이밍에 띄울 수 있습니다.
2. [Android SDK](/ko/developer-guide/client-sdk/android-sdk)/[iOS SDK](/ko/developer-guide/client-sdk/ios-sdk) 개발 세팅이 선행되어야 합니다.

## 1. 발송 대상 설정

웹 팝업의 경우, 유저 그룹들을 설정하여 발송 대상을 지정하시면 됩니다.
자세한 내용은 [유저 그룹 설정](/ko/user-guide/campaigns/campaign-segments/segment#user-group-setup) 섹션을 참고해주세요.

## 2. 발송 시점 설정

인앱 팝업의 경우, 지원되는 캠페인 발송 시점 종류는 `이벤트 기반 발송`으로, 특정 이벤트가 발생했을 때, 팝업을 띄우게 됩니다.

### 예시

다음과 같이 `add_to_cart` 이벤트 발생 시 즉각 띄우도록 설정할 수 있으며, 시작일과 종료일도 설정할 수 있습니다.

![In App message timing settings](./img/in_app_message_timing.png)

## 3. 메시지

인앱 팝업은 **템플릿 기반으로** 제작하게 됩니다. 사이드바 메뉴 중 `팝업 제작` 하단 `인앱 팝업 제작`을 선택해 제작할 수 있습니다. 템플릿 갤러리에서 원하는 템플릿을 선택한 후 컨트롤 패널을 이용해 커스텀 템플릿을 제작할 수 있으며, 캠페인 생성 시 템플릿을 선택해 사용할 수 있습니다.

_템플릿 기반 팝업 생성_
![In App message template creation](./img/in_app_message_template_creation.png)

![In App message template creation 2](./img/in_app_message_template_creation_2.png)

_생성된 템플릿 선택 (캠페인 생성 플로우)_
![In App message template selection](./img/in_app_message_template_selection.png)
