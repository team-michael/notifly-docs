---
sidebar_position: 3
---

# 카카오 친구톡 발송

## 개요 {#overview}

카카오 친구톡은 우리 서비스와 상품을 표현할 수 있는 좋은 채널 중 하나입니다. 특히 자사 서비스 회원에게 텍스트 외에도 다양한 이미지를 함께 보낼 수 있다는 점에서 메시지를 효과적으로 전달할 수 있다는 장점이 있습니다.

카카오 친구톡 메시지를 보내기 위해서는 일반적으로 ‘카카오 비즈니스' 페이지에 접속해 메시지를 보내야 하는데요. 노티플라이를 통해 카카오 친구톡을 발송하면, 개인화/자동화 셋팅이 가능하여 CRM 마케팅 효율을 높일 수 있답니다.

이 가이드를 통해 카카오 친구톡 메시지의 특성을 파악하고, 노티플라이를 활용한 캠페인 셋팅 방법을 알아보도록 하겠습니다.

## 1. 카카오 친구톡 시작하기 {#friendtalk-setup}

### 1-1. 카카오 채널 개설하기 {#friendtalk-create-kakao-channel}

[카카오 채널 관리자 센터](https://business.kakao.com/info/kakaotalkchannel/)를 통해 직접 개설 신청을 해주세요.  
카카오톡 채널 개설 후 비즈니스 채널로 전환이 필요하며, 홈공개 ON 상태여야 합니다.

### 1-2. 노티플라이와 카카오 채널 연결하기 {#friendtalk-connect-kakao-channel-with-notifly}

[카카오 비즈메시지 발송 환경 셋팅 방법](/ko/user-guide/kakaotalk/setup)을 참고하여 채널을 노티플라이에 등록해 주세요.

## 2. 카카오 친구톡의 특성 {#friendtalk-characteristics}

### 2-1. 발송 대상 및 내용 {#friendtalk-dispatch-target-and-content}

- 발송 대상 : 자사 카카오톡 채널을 추가한 유저 중 전화번호를 알고 있는 유저에게만 발송 가능합니다.
- 발송 내용 : 자유입니다.

### 2-2. 발송 형태 및 제작 가이드 {#friendtalk-types}

#### 기본 텍스트형

- 텍스트 : 한/영 구분없이 띄어쓰기 포함 1,000자 이내
- 링크 버튼 : 최대 5개 (세로 배열)

#### 이미지형

- 이미지
  - 파일형식 : JPG, JPEG, PNG
  - 사이즈/용량
    - 800x400(2:1비율)권장/ 5MB
    - 800x800(1:1비율)권장/ 5MB
    - 800x600(4:3비율)권장/ 5MB
- 텍스트 : 한/영 구분없이 띄어쓰기 포함 400자 이내
- 링크 버튼 : 최대 8자 / 최대 5개 (세로 배열)

![Kakao Friendtalk Type - Image](./img/friendtalk-type-image.png)

#### 와이드형

- 이미지
  - 파일형식 : JPG, JPEG, PNG
  - 사이즈/용량 : 800x600 (4:3비율) / 5MB
- 텍스트 : 한/영 구분없이 띄어쓰기 포함 76자 이내
- 링크 버튼 : 최대 8자 / 최대 1개

![Kakao Friendtalk Type - Wide](./img/friendtalk-type-wide-image.png)

#### 와이드 아이템 리스트형

- 타이틀 : 최대 20자
- 이미지
  - 리스트1 이미지
    - 파일형식 : JPG, JPEG, PNG
    - 사이즈/용량 : 800x400 (2:1비율) 권장 / 5MB
  - 리스트2~4 이미지
    - 파일 형식 : JPG, JPEG, PNG
    - 사이즈/용량 : 800x800 (1:1비율) 권장 / 5MB
- 텍스트
  - 리스트1 텍스트 : 한/영 구분없이 띄어쓰기 포함 25자 이내
  - 리스트2~4 텍스트 : 한/영 구분없이 띄어쓰기 포함 30자 이내
- 링크 버튼 : 최대 8자 / 메시지 구간별 최대 2개 (가로 정렬)

![Kakao Friendtalk Type - Wide Item List](./img/friendtalk-type-wide-item-list.png)

#### 캐러셀 피드형

- 타이틀 : 최대 20자
- 이미지
  - 파일형식 : JPG, JPEG, PNG
  - 사이즈/용량
    - 800x400(2:1비율)권장/ 5MB
    - 800x600(4:3비율)권장/ 5MB
    - _캐러셀 1~6 영역의 홍보 이미지는 동일 비율의 이미지로 등록 필요_
- 텍스트 : 한/영 구분없이 띄어쓰기 포함 180자 이내
- 링크 버튼 : 최대 8자 / 메시지 구간별 최대 2개 (가로정렬)

![Kakao Friendtalk Type - Carousel Feed](./img/friendtalk-type-carousel.png)

#### 커머스형

- 상품명 : 최대 30자 이내
- 이미지
  - 파일형식 : JPG, JPEG, PNG
  - 사이즈/용량
    - 800x400(2:1비율)권장/ 5MB
    - 800x600(4:3비율)권장/ 5MB
- 가격 : 숫자만 입력 가
- 부가정보 : 한/영 구분없이 띄어쓰기 포함 32자 이내
- 링크 버튼 : 최대 8자 / 최대 2개

#### 캐러셀 커머스형

- 타이틀 : 최대 20자 이내
- 상품명 : 최대 50자 이내
- 이미지
  - 파일형식 : JPG, JPEG, PNG
  - 사이즈/용량
    - 800x400(2:1비율)권장/ 5MB
    - 800x600(4:3비율)권장/ 5MB
    - _모든 캐러셀 홍보 이미지는 동일 비율의 이미지로 등록 필요_
- 가격 : 숫자만 입력 가
- 부가정보 : 한/영 구분없이 띄어쓰기 포함 32자 이내
- 링크 버튼 : 최대 8자 / 메시지 구간별 최대 2개 (가로정렬)

#### 프리미엄 동영상형

- 동영상
  - 파일형식 : VI, FLV, MP4 권장
    - _카카오TV에 업로드된 영상만 사용 가능 (예시: `https://tv.kakao.com/v/#{숫자}` / `https://tv.kakao.com/channel/#{숫자}/cliplink/#{숫자}`)_
  - 사이즈/용량
    - 2:1 비율 권장/ 1GB
    - 9:16 비율 권장/ 1GB
- 썸네일 이미지
  - 파일형식 : JPG, JPEG, PNG
  - 사이즈/용량
    - 800x400(2:1비율)권장/ 5MB
    - 800x600(4:3비율)권장/ 5MB
- 타이틀 : 최대 20자 이내
- 홍보문구 : 한/영 구분없이 띄어쓰기 포함 76자 이내
- 링크 버튼 : 최대 8자 / 최대 1개
  
<br>

### 2-3. 주의 사항

발송 내용은 KISA에서 제공하는 광고성정보통신망법을 따라야 합니다.  
광고성 메시지를 작성할 때 유의할 사항은 노티플라이 블로그의 [광고성 메시지 전송 가이드 A to Z](https://blog.notifly.tech/understanding-advertising-messages-and-regulations/) 글을 참고해주세요.

## 3. 캠페인 셋팅 가이드 {#friendtalk-campaign-setup-guide}

### 3-1. 기본 정보 및 발송 채널 선택

좌측 네비게이션 바 [캠페인 리스트] 클릭 후 [+캠페인 생성 바로가기] 버튼 클릭을 클릭합니다.

![Create Kakao Friendtalk Campaign](./img/friendtalk-1-campaign-create.png)

기본 정보를 쓰고, 채널을 선택해줍니다.  
①, ② : 캠페인의 내용과 목적을 간단히 요약해서 써 주세요.  
③ : 발송 채널을 선택해주세요. 친구톡을 보내고 싶다면 [카카오 친구톡] 버튼을 클릭해주세요.  
④ : 전환 이벤트를 선택해주세요. 목표 전환 이벤트를 설정하여, 유저들이 캠페인을 수신한 이후 지속적으로 해당 이벤트를 수행하는지, 전환이 더 이상 발생하지 않는 시점은 언제인지와 같은 전환 이벤트 관련 인사이트를 얻을 수 있습니다.  
⑤ : 목표 전환 기여 기간을 설정해주세요. 기여기간을 설정하면, 동시에 여러 개의 캠페인을 동일한 유저에게 발신하는 경우, 성과가 과잉 집계되는 것을 방지할 수 있습니다.

![Kakao Friendtalk Campaign Basic Information](./img/friendtalk-2-campaign-info.png)

### 3-2. 발송 시점 설정

예약 발송 / 이벤트 기반 발송 중 선택해주세요. 예약 발송을 선택하면 일정한 일시, 주기에 원하는 메시지를 발송할 수 있습니다. 이벤트 기반 발송을 선택하면 유저가 사이트/앱 내에서 주요한 행동을 했을 때 그 행동과 관련된 메시지를 보낼 수 있습니다.

①에서 ‘예약 발송’을 선택했다면  
② : 발송 주기로 원하는 발송 일정을 설정해주세요.

![Kakao Friendtalk Campaign - Scheduled Delivery](./img/friendtalk-3-campaign-timing-scheduled.png)

①에서 ‘이벤트 기반 발송'을 선택했다면  
② : 발송 주기로 희망하는 발송 일정을 설정해주세요.

![Kakao Friendtalk Campaign - Event-Triggered Delivery](./img/friendtalk-4-campaign-timing-event-triggered.png)

### 3-3. 발송 대상 설정

발송 대상을 선택하는 방법은 두 가지가 있습니다. 유저 속성 기반 그룹을 설정하거나, 사용자 ID 리스트가 담긴 CSV파일을 업로드 하는 것 입니다.

①에서 [유저 그룹 설정]을 선택했다면, ②에서 전체 발송으로 설정하거나, 유저 그룹을 설정해주세요.

![Kakao Friendtalk Campaign - Segment](./img/friendtalk-6-campaign-segment-condition.png)

②에서 유저 그룹 설정을 세부적으로 하고싶다면 [그룹 추가하기]를 눌러주세요. [그룹 추가하기]를 누르면 팝업이 나타나는데요. 조건 타입을 [사용자 프로퍼티 기반 조건]을 선택하거나, [이벤트 기반 조건] 중 하나를 선택해주세요.

![Kakao Friendtalk Campaign - Segment Group](./img/friendtalk-7-campaign-segment-condition-details.png)

### 3-4. 메시지 구성요소 입력

![Kakao Friendtalk Campaign - Message Content](./img/friendtalk-8-campaign-message.png)

마지막으로 메시지 내용을 입력할 차례입니다.  
① : 자사에서 사용하고 있는 발송 플랫폼을 선택해주세요. (예: notifly)  
② : 메시지 유형을 선택해주세요. 메시지 유형에 따라 템플릿이 바뀝니다.  
③ : 광고성 메시지라면, [광고 메시지 여부]에 체크해주세요. 체크하면 수신자명(자사명)좌측에 (광고)표시가 생깁니다.  
④ : 메시지 내용을 입력하고, 템플릿에 따라 필요한 이미지를 넣어주세요. (메시지 유형별 글자수 및 이미지 사양은 [발송 형태 및 제작 가이드](#friendtalk-types)을 참고해주세요.)  
⑤ : 버튼을 만들어주세요. 버튼명과 버튼을 눌렀을 때 이동할 페이지의 url을 입력해주세요.
![Kakao Friendtalk Campaign - Create Button](./img/friendtalk-9-message-button.png)

⑥ : 메시지 발송 실패 시 대체 메시지를 입력할 수 있습니다.

### 3-5. 테스트 메시지 발송 {#kakao-friendtalk-test-send}

카카오 친구톡 테스트 메시지를 받기 위해선 반드시 자사 카카오톡 채널을 테스트폰 카카오톡 계정에 추가해주세요. 그리고 우측 하단 빨간 버튼 [테스트 발송하기]를 클릭해주세요.  
메시지를 수신할 번호를 입력하고 [테스트 발송하기]를 누르면 테스트 메시지를 받을 수 있습니다.

![Kakao Friendtalk Campaign - Test Send](./img/friendtalk-10-test-message.png)

### 3-6. 캠페인 생성

원하는 조건 설정을 마쳤다면, 최종 확인을 해주세요. 그리고 좌측 하단 [캠페인 생성하기]를 누르면 캠페인이 정상적으로 생성됩니다.

![Kakao Friendtalk Campaign - Final Review](./img/friendtalk-11-campaign-final-review.png)
