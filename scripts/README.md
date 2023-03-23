## Typesense

Typesense를 이용하여 search bar를 구현합니다. 
매 

Documentation: https://typesense.org/docs/guide/docsearch.html#step-1-set-up-docsearch-scraper

```
chmod +x ./index_docs.sh && ./index_docs.sh
```

이 디렉토리의 .env :

```
TYPESENSE_API_KEY=...
TYPESENSE_HOST=udhtqbp6j3lw5orep-1.a1.typesense.net
TYPESENSE_PORT=443
TYPESENSE_PROTOCOL=https
```

Continuous Integration (CI) 기반 indexing은 아직 구현하지 않았습니다.
