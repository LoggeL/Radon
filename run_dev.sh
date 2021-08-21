#!/usr/bin/env bash
./node_modules/.bin/tsc

node -r dotenv/config dist/index # --dev
