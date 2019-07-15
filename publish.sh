#!/bin/bash

# babel -d publish/ $1/ --no-comments
# lessc $1/components/tabbar/tabbar.less publish/components/tabbar/tabbar.css
./node_modules/.bin/babel -d publish/ src --no-comments && ./node_modules/.bin/lessc src/components/tabbar/tabbar.less publish/components/tabbar/tabbar.css

cp -R /Users/fengchengpu/Desktop/CIYUN/Project/TomatoProject/Tomatobean/publish/** /Users/fengchengpu/Desktop/dl-pro/TBExample-master/node_modules/tomatobean
