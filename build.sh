#!/bin/bash

SSH_KEY="${1:-/root/.ssh/id_rsa}"
DOCKER_IMAGE="economistprod/node4-base"
HOST_IP=$(ip route get 1 | awk '{print $NF;exit}')
SINOPIA_URL="http://${HOST_IP}:4873"

[[ ${NPM_TOKEN:-} = '' ]] && { echo "NPM_TOKEN empty"; exit 1; }
[[ ${SAUCE_ACCESS_KEY:-} = '' ]] && { echo "SAUCE_ACCESS_KEY empty"; exit 2; }
[[ ${SAUCE_USERNAME:-} = '' ]] && { echo "SAUCE_USERNAME empty"; exit 3; }

docker pull "${DOCKER_IMAGE}"

exec docker run \
    -v "${SSH_KEY}":/root/.ssh/id_rsa \
    -v "$(pwd)":/code \
    -e NODE_ENV=${NODE_ENV:-test} \
    "${DOCKER_IMAGE}" \
    /bin/sh -cx "\
        trap 'chmod 777 node_modules -R' EXIT && \
        cd /code && \
        umask 000 && \
        printf \"@economist:registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n\" > ~/.npmrc && \
        (curl -I ${SINOPIA_URL} --max-time 5 && npm set registry ${SINOPIA_URL} && echo \"Using sinopia cache registry available on ${SINOPIA_URL}\" || true) && \
        npm i && \
        echo npm run doc:js && \
        echo SAUCE_USERNAME=${SAUCE_USERNAME} SAUCE_ACCESS_KEY=${SAUCE_ACCESS_KEY} npm t && \
        { git config --global user.email 'ecprod@economist.com'; git config --global user.name 'GoCD'; true; } && \
        { [ \"$(git rev-parse --abbrev-ref HEAD)\" != \"master\" ] || npm run pages; } ; \
        RETURN_CODE=\$?; \
        echo \"Build finished with status \${RETURN_CODE}\"; \
        exit \${RETURN_CODE}
    ";


