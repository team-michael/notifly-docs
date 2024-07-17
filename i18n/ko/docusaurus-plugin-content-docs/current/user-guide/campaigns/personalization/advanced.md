---
sidebar_position: 2
---

# 고급 사용법

# Connected Content

:::note Connected Content 소개
노티플라이의 Connected Content 기능을 사용하면, 실시간 데이터 또는 노티플라이에서 직접 수집하지 않은 외부 데이터를 메시지에 쉽게 통합할 수 있습니다. 이 기능을 통해 각 사용자에게 맞춤화된 메시지를 제공함으로써 사용자 경험을 향상시킬 수 있습니다.
:::

## 1. Connected Content 이해하기

### Connected Content란 무엇인가요?

노티플라이의 Connected Content 기능은 실시간으로 외부 API를 호출하여 받은 데이터를 메시지에 바로 적용할 수 있게 해주는 기능입니다. 이를 통해 최신 정보를 기반으로 사용자 개인에게 최적화된 데이터를 메시지로 전송할 수 있습니다.

### 주요 활용 사례

1. **개인화된 제품 추천**: 사용자의 과거 행동 데이터를 기반으로 개인화된 상품을 추천할 때
2. **민감한 데이터 전송**: 노티플라이 서버에 저장하지 않고 실시간으로 민감한 정보를 메시지에 포함할 때
3. **실시간 정보 제공**: 사용자의 포인트, 잔액, 주식 가격 등 실시간 정보를 메시지에 포함할 때
4. **외부 시스템과의 연동**: 외부 서비스로부터 필요한 정보를 실시간으로 받아 메시지에 적용할 때

### 지원 채널

- 현재 **앱푸시(App Push)** 채널에서만 지원합니다.

### 사용 가능 항목

- 캠페인 생성 중 **'메시지 및 액션'** 섹션의 다음 항목에서 사용할 수 있습니다:
    - 메시지 제목
    - 메시지 내용
    - 액션
      - URL로 이동
      - 딥링크 열기 

### 장점 및 유의사항

- **장점**: 메시지 발송 직전에 정보를 업데이트하므로, 항상 최신의 데이터를 제공할 수 있습니다. 추가적으로 데이터 저장에 따른 비용이 발생하지 않습니다.
- **유의사항**: Connected Content를 사용하기 위해서는 외부 API의 안정성 및 응답 속도가 중요합니다. 또한, 노티플라이에서는 데이터를 저장하지 않으므로, 데이터 분석이나 장기적인 추적은 불가능합니다.

## 2. Connected Content 설정 방법

노티플라이에서 Connected Content를 활용하기 위한 기본적인 설정 방법을 설명합니다.

### 필요한 구성 요소

1. **{% connected_content %} 태그**: 메시지 내에서 외부 데이터 호출을 선언합니다.
2. **URL**: 호출할 외부 API의 Endpoint입니다.
3. **:save**: API 응답을 저장할 변수를 지정합니다. 변수 이름은 자유롭게 설정할 수 있습니다.

### API 호출 예시

```liquid
{% connected_content https://api.example.com/data :save response %}
```

이 태그는 `https://api.example.com/data` URL로 API 요청을 보내고 응답을 `response`라는 변수에 저장합니다.

### 메시지 내에서 데이터 사용하기

응답으로 받은 데이터는 Liquid 템플릿 언어를 사용하여 메시지 내에서 자유롭게 가공하거나 출력할 수 있습니다.

```liquid
메시지 예시: {{ response.user_data }}
```

## 3. 옵션과 사용법 상세 안내

### 기본 구문

Connected Content 호출을 시작하기 위해서는 다음과 같은 기본 구문을 사용합니다.

```liquid
{% connected_content [URL] :[options] %}
```

### 주요 옵션

1. **:save**
    - API 응답을 변수에 저장합니다.
    - 사용법: `:save 변수명`
    - 예시: `{% connected_content https://api.example.com/profile :save user_profile %}`

2. **:method**
    - 요청할 HTTP 메소드를 지정합니다. 기본값은 GET입니다.
    - 지원하는 메소드: GET, POST
    - 예시: `{% connected_content https://api.example.com/update :method post :body user_data %}`

3. **:headers**
    - 요청에 포함할 HTTP 헤더를 지정합니다.
    - 사용법: `:headers { "Header-Name": "Header-Value", ... }`
    - 예시: `{% connected_content https://api.example.com/data :headers { "Authorization": "Bearer token" } %}`

4. **:body**
    - POST 요청 시 전송할 바디 데이터를 지정합니다.
    - 사용법: `:body JSON_데이터`
    - 예시: `{% connected_content https://api.example.com/update :method post :body { "user_id": "{{user_id}}", "status": "active" } %}`

5. **:content_type**
    - 요청의 Content-Type을 명시합니다.
    - 사용법: `:content_type "application/json"`
    - 예시: `{% connected_content https://api.example.com/data :content_type "application/json" %}`

6. **:basic_auth**
    - 기본 인증을 위한 사용자 이름과 비밀번호를 포함합니다.
    - 사용법: `:basic_auth "username:password"`
    - 예시: `{% connected_content https://api.example.com/secure :basic_auth "user:pass" %}`

### 에러 처리 및 성능 최적화

- **에러 처리**: Connected Content 호출 시 URL이 잘못되었거나 서버에서 4xx, 5xx 응답을 반환할 경우, 기본적으로 메시지가 중단됩니다. 이때, 사용자에게 메시지를 전송하지 않도록 `{% abort_message() %}` 태그를 사용할 수 있습니다.
- **성능 최적화**: 서버의 응답 시간이 5초 이상 걸리는 경우 노티플라이는 자동으로 요청을 중단합니다. 따라서 API 서버가 빠른 응답을 할 수 있도록 성능 최적화가 중요합니다.

### 고급 활용 사례

API에서 가져온 데이터를 Liquid 템플릿으로 더 세밀하게 처리하고 싶은 경우, 조건문이나 반복문을 사용하여 데이터를 다양하게 변형시킬 수 있습니다.

```liquid
{% connected_content https://api.example.com/products :save products %}
{% for product in products.items %}
  - {{ product.name }} 가격: {{ product.price }}
{% endfor %}
```

이 예시에서는 제품 목록을 가져와 각 제품의 이름과 가격을 메시지에 표시합니다.

## 4. 캠페인 실행 및 모니터링

### 캠페인 기획

- **목적 정의**: 메시지에서 외부 데이터를 사용하는 목적을 명확히 합니다.
- **데이터 요구사항 분석**: 필요한 데이터와 해당 데이터를 제공할 수 있는 API를 확인합니다.

### 개발 및 테스트

- **API 연동**: 필요한 API와의 연동을 개발하고 테스트합니다.
- **성능 검증**: API 응답 시간 및 안정성