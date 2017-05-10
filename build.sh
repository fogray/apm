#!/bin/bash

#1 创建构建日志文件
CURDATE=$(date '+%Y-%m-%d_%H%M%S')
buildlog=/var/owncloud/data/admin/files/apm/logs/build_$CURDATE.log
touch $buildlog
echo "*******************start**************" >> $buildlog
#2 构建image
docker build -t apm . | tee -a $buildlog

echo "*******************end**************" >> $buildlog
