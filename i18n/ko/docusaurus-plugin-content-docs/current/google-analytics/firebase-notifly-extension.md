# Firebase - Notifly 확장기능

Firebase - Notifly 확장기능은 Firebase (Google Analytics) 전환 이벤트를 Notifly에 전송하는 Google Cloud Functions의 집합입니다. Firebase 프로젝트와 Notifly 간의 원활한 통합을 가능하게 하여 전환 이벤트를 추적하고 이러한 이벤트를 기반으로 Notifly의 기능을 활용할 수 있습니다.

## 사전 요구 사항

Firebase - Notifly 확장기능을 사용하려면 다음이 필요합니다:

- 앱이 포함된 Firebase 프로젝트.
- Firebase 프로젝트에 대해 활성화된 Google Analytics.
- [Firebase CLI](https://firebase.google.com/docs/cli) 설치.
- Firebase 프로젝트를 Blaze 플랜으로 업그레이드.
- 추적할 전환 이벤트 이름 목록.

## 설치

Cloud Functions를 설치(배포)하려면 다음 단계를 따르십시오:

1. Firebase - Notifly 확장기능 리포지토리를 복제합니다:

```
git clone https://github.com/team-michael/firebase-notifly-extension.git
```

2. 복제된 디렉토리로 이동하여 필요한 npm 패키지를 설치합니다:

```
cd firebase-notifly-extension
npm install
```

3. Cloud Functions를 배포합니다:

```
firebase deploy --only functions:firebaseToNotifly
```

## Cloud Functions

Firebase - Notifly 확장기능은 프로젝트에서 지정한 각 전환 이벤트에 대해 하나의 Cloud Function을 생성합니다. 이러한 Cloud Functions는 Firebase 프로젝트에서 해당 전환 이벤트를 수신 대기하고 이벤트 데이터를 Notifly에 전송합니다.

## 청구

이 확장 기능은 서비스의 무료 티어를 초과하면 관련 요금이 발생하는 Google Cloud Platform 서비스를 사용합니다. Firebase - Notifly 확장기능은 Node.js 14+ 런타임이 있는 Cloud Functions를 사용합니다. 청구 및 가격 정보에 대한 자세한 내용은 [Google Cloud Functions 가격](https://cloud.google.com/functions/pricing) 페이지를 참조하십시오.

## 지원

Firebase - Notifly 확장기능에 대한 지원이 필요하거나 질문이 있으시면 contact@workmichael.com으로 문의해 주십시오.
