---
sidebar_position: 1
---

# Amplitude 연동

Amplitude를 분석 도구로 사용하고 계신 고객사들을 위해 Amplitude로 수집되고 있는 이벤트와 사용자 정보를 노티플라이에서 그대로 연동해서 활용할 수 있는 기능입니다. 노티플라이에 이벤트를 전송하기 위한 별도의 개발 작업 없이 Amplitude의 데이터를 활용하여 캠페인을 실행할 수 있습니다.

- Amplitude의 가격 플랜과 상관 없이 연동 가능합니다.
- Amplitude에서 노티플라이와 같은 외부 툴에 실시간으로 이벤트를 연동하는 것은 월 1천만 이벤트 (10 millon events) 까지 무료입니다.
- 연동이 완료된 시점부터 Amplitude에 로깅되는 이벤트들이 노티플라이에도 준-실시간으로 로깅됩니다.
- 모바일 기기에서 Amplitude로 데이터가 전송되는 딜레이에 따라 노티플라이에 로깅되는 시점도 약간의 딜레이가 발생할 수 있습니다.
- Amplitude 연동으로 수집된 이벤트는 인앱 팝업, 웹 팝업의 발송 시점 결정 이벤트로 활용하실 수 없습니다. 노티플라이의 팝업을 활용하기 위해서는 노티플라이 SDK를 활용하여 이벤트 수집을 할 수 있도록 셋업해 주시기 바랍니다.

## 1. Amplitude에 노티플라이 정보 등록하기

1. Amplitude의 Data 탭에서 Connections - Catalog 를 선택해 주시고, Destinations 탭을 클릭해 주세요.
2. 노티플라이는 AWS의 Kinesis 라는 서비스를 활용하여 Amplitude와 연동을 제공하고 있습니다. Event Streaming 섹션에서 Kinesis Data Stream을 선택해 주세요.
   ![Amplitude data destinations](./img/amplitude_data_destinations.png)
3. Sync Name에 `notifly`를 입력해 주시고 Create Sync 버튼을 클릭해 주세요.
4. Sync의 Settings 탭에서 정보를 다음과 같이 입력합니다.

   - Status: Enabled
   - AWS Region: Asia Pacific (Seoul) - ap-northeast-2
   - Stream Name: `notifly-external-event-streaming`
   - Role ARN: `arn:aws:iam::702197142747:role/amplitude-kinesis-role`

![Amplitude destination settings](./img/amplitude_destination_settings.png)

5. Send Events - Events are sent to Kinesis 가 체크되어 있는 것을 확인하신 후에 노티플라이로 보내실 이벤트를 선택해 주세요.
6. Send Users (optional) - Users are sent to Kinesis 로 체크하시면 Amplitude의 사용자 정보들도 노티플라이에 연동됩니다.

모두 완료하신 후 Save를 클릭하시면 연동이 잘 되었는지를 테스트 하실 수 있는 모달이 생깁니다. 테스트 하시고 Save 하시면 연결이 잘 되었음을 확인 가능하십니다.

![Verify Kinesis Destnation Setup](./img/verify_kinesis_destination_setup.png)

참고자료:

- [Amplitude의 Kinesis 연동 가이드](https://www.docs.developers.amplitude.com/data/destinations/kinesis-data-stream/)

## 2. 노티플라이에 Amplitude 정보 등록하기

1. Amplitude의 Settings (Organization settings)에서 Projects를 클릭합니다.
2. 노티플라이와 연동할 프로젝트를 선택합니다.
3. Project ID를 복사합니다.

![Amplitude project settings](./img/amplitude_project_settings.png)

4. Notifly 제품에서 설정 (프로젝트 설정) - 외부 툴 연동 정보에 Amplitude 연동 정보에 위에 복사한 project_id를 입력합니다.

![Notifly Amplitude info](./img/notifly_amplitude_info.png)

## 3. 최종 확인

위 스텝들을 모두 완료하시면 `amplitude__` 로 시작되는 이벤트들을 노티플라이에서 확인하실 수 있습니다.

![Verify Notifly Amplitude integration](./img/verify_amplitude_integration_end_to_end.png)

## FAQ

- Q. 이미 Amplitude와 다른 외부 툴을 실시간 연동한 상태입니다. 노티플라이와 추가로 연동이 가능한가요?
  - A. 다른 외부 툴과의 연동 유무와 상관없이 가능합니다. Amplitude에서 노티플라이와 같은 외부 툴에 실시간으로 이벤트를 연동하는 것은 월 1천만 이벤트 (10 millon) 까지 무료입니다.
- Q. Amplitude로 전송되는 이벤트 종류 중 일부만 노티플라이에 로깅되는 것 같습니다.
  - A. "1. Amplitude에 Notifly 정보 등록하기"의 Step 5인 Send Events에서 노티플라이에도 로깅할 이벤트가 포함되어 있는지 확인해 주세요.
- Q. Amplitude내의 여러 개의 프로젝트를 등록할 수 있나요?
  - A. 현재 노티플라이에서는 하나의 Amplitude 프로젝트만 연동 가능합니다. 여러개의 프로젝트 연동이 필요하신 경우 contact@notifly.tech 으로 연락 부탁드립니다.
