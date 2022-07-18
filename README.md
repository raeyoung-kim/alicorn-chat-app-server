# ALICORN 1:1 채팅

<div>
  <img src="https://velog.velcdn.com/images/760kry/post/d8565ee9-84cc-4ee2-b1d4-e82324885405/image.png"/>
</div>

<br />

1:1 대화를 주고 받는 웹 어플리케이션입니다.


## Preview
![](https://velog.velcdn.com/images/760kry/post/8b302b2e-6021-46b9-bdb1-839ba50d4ae3/image.gif)

## Requirements
- 최신 Chrome Browser의 사용을 권장합니다.

## Install
### Client
Root 디렉토리에 `.env.local` 파일을 생성하고 사전에 준비한 server url을 입력합니다.
```
NEXT_PUBLIC_SERVER_API=http://localhost:8080
```
```
git clone https://github.com/raeyoung-kim/alicorn-chat-app-client.git
npm install
npm run dev
```
### Server
Root 디렉토리에 `.env` 파일을 생성하고, 사전에 준비한 MongoDB Connection key 를 입력합니다.
```
MONGODB_CONNECT=mongodb+srv://alicorn-chat-app:alicorn-chat-app@cluster0.1l01rhs.mongodb.net/?retryWrites=true&w=majority
JWT_SECRECT_KEY=<JWT_SECRECT_KEY>
ALLOWED_ORIGIN=http://localhost:3000
```
```
git clone https://github.com/raeyoung-kim/alicorn-chat-app-server.git
npm install
npm run dev
```
## Skills
### Client
- React
- Next
- Recoil
- Javascript
- Typescript
- Eslint
- Socket.io

### Server
- Node
- Express
- Typescript
- MongoDB
- Mongoose
- Eslint

## Project Control
- Version Control: Git, Github
