#!/bin/bash
docker run -it --env-file=.env -e "CONFIG=$(cat config.json | jq -r tostring)" typesense/docsearch-scraper