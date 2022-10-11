# @rneui/template

## React Native Elements Expo Template

### Usage

#### Stable

        expo init app --template @rneui/template

#### Stable Typescript

        expo init app --template @rneui/template@ts

#### Bleeding Edge (Experimental)

        expo init app --template @rneui/template@edge

#### Bleeding Edge Typescript (Experimental)

        expo init app --template @rneui/template@edge-ts

TODO

1. Store 持久化
   1. 基于 SecureStore 实现 Android/ios 端的 token 存储，并每次启动应用时请求一次用户信息，后端补充一个单独请求用户信息接口，h5 端也要在进入页面时请求，判断 token 有没有失效，链接：https://docs.expo.dev/versions/latest/sdk/securestore/
   2. 解决 Cookie 只在 Set-Cookies 中存在问题
2. expo 登录状态文档查看
3. 消除整个项目的行内样式
