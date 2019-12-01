#!/bin/sh
cd /Users/liujian/study/chat/node/code_demo/blog_test/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log