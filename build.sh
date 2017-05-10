#!/bin/bash

#1 创建构建日志文件
CURDATE=$(date '+%Y-%m-%d_%H%M%S')
buildlog=/var/owncloud/data/admin/files/apm/logs/build_$CURDATE.log
touch $buildlog
echo "*******************start**************" >> $buildlog
#2 构建image
docker build -t apm . | tee -a $buildlog
RESULT=$(cat $buildlog | tail -n 1)
if [["$RESULT" != *Successfully*]];then
#3 构建image失败，跳出脚本
  exit -1
fi

echo "*******************end**************" >> $buildlog
