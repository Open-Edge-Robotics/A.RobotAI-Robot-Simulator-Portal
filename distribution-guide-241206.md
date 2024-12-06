# 프론트 배포 가이드

- 작성일: 241206
- 작성자: 허우림
- 아래 스탭 순서대로 실행

### `package.json` 스크립트 수정

- 이미지 빌드 시에만 아래처럼 기존 코드에서 새로운 코드로 교체 필요
- 변경 사항 커밋은 남기지말 것

```json
"scripts": {
    // ...
    // "prepare": "husky" <-- 기존 코드
    // 새로운 코드
     "prepare": "if [ \"$HUSKY_ENABLED\" = \"true\" ]; then husky install; fi"
  },
```

### 로컬에서 docker 빌드

- **`docker`, `docker desktop`** 설치 및 로그인 선행되어야 함

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

### putty로 인스턴스 접속

1.  `openstack`에서 세팅해둔 인스턴스 주소로 접속

- 241206 기준

```shell
  hostName : 192.168.160.134

  id: ubuntu
  pw: qwe1212!Q
```

2. 이미지 pull & 실행

```shell
# Docker login
docker login

# Docker hub에 올렸던 이미지 pull받기
docker pull username/robot-simulator-front:latest

# 실행 중인 컨테이너 확인
docker ps

# 이전 프론트 배포 컨테이너 중지
docker stop 컨테이너ID

#새로 pull 받은 이미지로 컨테이너 실행
docker run -d -p 3001:3000 username/robot-simulator-front:latest
```

### 배포 주소

- 241206 기준

http://192.168.160.134:3001
