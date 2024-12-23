# robot-simulator-front 소개

## 기술 스택

- **언어**: `TypeScript` `^5`
- **프레임워크**: `Next.js` `^14.2.16`
- **Formatter/Linter** : `prettier/ESLint`
- **CSS**: `Tailwind`, `Styled-Component`, `Emotion`
- **UI 라이브러리**: `mui material`, `x-data-grid`, `x-tree-view`
- **상태관리**
  - 서버 상태 :`tanstack/react-query` `^5.59.16`
  - 클라이언트 상태 : `zustand` `^5.0.0`
  - 폼 상태 : `react-hook-form` `^7.53.1`
- **패키지 매니저** : `pnpm`

# 실행 가이드

- `.env.local` 파일에서 `NEXT_PUBLIC_API_URL`(백엔드 api 서버 배포 주소)이 제대로 설정되어있는지 먼저 확인해주세요.

## local에서 실행해보기

### 1. 저장소 Clone

```bash
git clone https://github.com/inno-rnd-project/robot-simulator-front.git
```

```shell
pnpm run dev
```

## 배포하기

- 해당 프로젝트는 `Docker` 환경에서 배포할 수 있습니다.

### 1. 저장소 Clone

- git 저장소를 clone 하여 main 브랜치의 소스코드를 가져옵니다.

```bash
git clone https://github.com/inno-rnd-project/robot-simulator-front.git
```

### 2. `package.json` 스크립트 수정

```json
{
  "scripts": {
    "prepare": "if [ \"$HUSKY_ENABLED\" = \"true\" ]; then husky install; fi"
  }
}
```

- <u>docker 이미지 빌드 시에만</u>, 위처럼 `prepare` 스크립트를 수정해야 합니다.

### 3. local에서 docker 이미지 build & docker hub에 push

- 시작 전, **`docker`, `docker desktop`** 설치 및 로그인이 선행되어야 합니다.

1. docker desktop 실행
2. powershell 접속하여 아래 명령어 실행

```shell
# 로그인 세션 확인. 로그인 안 되어있을 경우 로그인 진행.
docker login

# 해당 next.js 폴더로 이동
cd ./robot-simulator-front

# docker 이미지 빌드 (이미지 이름은 원하는 대로 설정)
docker build -t robot-simulator-front .

# localhost:3000에서 변경 사항 잘 반영되었는지 확인
docker run -p 3000:3000 robot-simulator-front

# docker hub 계정 username을 포함해 태그 달기
docker tag robot-simulator-front username/robot-simulator-front:latest

# docker hub에 이미지 푸시
docker push username/robot-simulator-front:latest
```

### 4. 인스턴스 접속

- 시작 전, **`putty`** 설치 및 인스턴스 생성/세팅이 선행되어야 합니다.

### 5. docker 이미지 pull & run

- 아래 명령어를 순서대로 실행해주세요.
- 사용하지 않는 이미지와 컨테이너들은 바로 정리해주세요.

```shell

# access 권한 없다고 뜰 시 모든 명령어 앞에 sudo 붙이기

# Docker login
docker login

# Docker hub에 올렸던 이미지 pull받기
docker pull username/robot-simulator-front:latest

# 실행 중인 컨테이너 확인
docker ps

# 이전 프론트 배포 컨테이너 중지
docker stop 컨테이너ID

# 새로 pull 받은 이미지로 컨테이너 실행
# 3001 말고 원하는 포트 열어서 사용해도 무방
docker run -d -p 3001:3000 username/robot-simulator-front:latest

# 배포 링크 접속하여 코드 잘 반영되었는지, 버그 없는지 확인

# 전체 컨테이너 목록 확인
docker ps -a

# 사용하지 않는 기존 컨테이너 삭제
docker rm 컨테이너ID

# 컨테이너 정상적으로 삭제되었는지 확인
docker ps -a

# 기존에 pull 받았던 이미지 목록 확인
docker images

# 사용하지 않는 이미지 삭제
docker rmi 이미지ID

# 이미지 정상적으로 삭제되었는지 확인
docker images
```
