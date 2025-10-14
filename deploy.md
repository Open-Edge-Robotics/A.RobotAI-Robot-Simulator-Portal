# 배포 가이드

> **배포 주소**: http://101.79.72.60:3001/ (2025.10.14 기준)

## 📑 목차

[1. 빌드 및 배포 아키텍처](#1-빌드-및-배포-아키텍처)

[2. 배포 전 준비사항](#2-배포-전-준비사항)

[3. 빠른 배포](#3-빠른-배포)

[4. 수동 배포](#4-수동-배포)

[5. 문제 해결](#5-문제-해결)

---

## 1. 빌드 및 배포 아키텍처

### Git 브랜치 전략

```
feat/xxx ──┐
              ├──▶ main ──▶ deploy ──▶ production
feat/yyy ──┘
```

**브랜치 역할:**

- `feat/*`: 개별 기능 개발
- `main`: 안정된 코드 통합
- `deploy`: 배포 전용

### 배포 플로우

```
Local Dev ──▶ Docker Build ──▶ Docker Hub ──▶ Production Server
    │              │              │              │
    └── Code       └── Image      └── Registry   └── Container
        Changes        Creation       Storage        Deployment
```

---

## 2. 배포 전 준비사항

### 필수 도구

- **pnpm**: 의존성 관리
- **Docker Desktop**: 컨테이너 이미지 빌드
- **SSH 접근**: 서버 배포용 (SSH 키 또는 비밀번호)

### 환경변수 설정

`.env` 파일에 다음 변수들이 설정되어 있어야 합니다:

```bash
# 필수 환경변수
GITLAB_TOKEN=your_gitlab_token              # GitLab npm 레지스트리 접근용
DOCKER_HUB_USER=your_dockerhub_username     # Docker Hub 사용자명
SERVER_IP=101.79.72.60                      # 배포 서버 IP
SSH_PORT=22                                 # SSH 포트 (기본값: 22)

# 선택 환경변수 (SSH 키가 없는 경우만)
SSH_PASSWORD=your_ssh_password              # SSH 비밀번호
IMAGE_NAME=robot-simulator-front            # Docker 이미지명 (기본값)
```

### SSH 인증 설정 (권장)

비밀번호 없이 자동 배포하려면 SSH 키를 설정하세요:

```bash
# 1. SSH 키 생성 (이미 있다면 생략)
ssh-keygen -t ed25519 -C "robot-simulator-front-deploy"

# 2. 서버에 공개키 복사
ssh-copy-id -p 22 ubuntu@101.79.72.60

# 3. 연결 테스트
ssh -p 22 ubuntu@101.79.72.60 "echo 'SSH 키 설정 완료'"
```

---

## 3. 빠른 배포

### ⭐ 자동화 스크립트 사용 (권장)

```bash
# Linux/Mac 환경에서
./scripts/deploy.sh
```

**🔄 자동화 기능:**

- 자동으로 `deploy` 브랜치 전환 및 최신 코드 동기화
- 작업 중인 변경사항 자동 보호 (stash/restore)
- SSH 키 인증 우선 사용 (없으면 비밀번호 사용)
- 의존성 설치 및 빌드
- Docker 이미지 생성 (태그: `deploy-{커밋해시}`)
- Docker Hub에 이미지 푸시
- 서버에 자동 배포
- 배포 후 원래 브랜치로 자동 복귀
- 컨테이너 상태 확인

### 배포 워크플로우

1. `main` 브랜치에 있는 코드를 `deploy` 브랜치로 병합 (PR)
2. 배포 스크립트 실행: `./scripts/deploy.sh`
3. 스크립트가 자동으로:
   - `deploy` 브랜치로 전환
   - 최신 코드 동기화
   - 빌드 및 Docker 이미지 생성
   - Docker Hub 푸시
   - 서버 배포
   - 원래 브랜치로 복귀
4. 배포 주소로 접속하여 정상 작동 확인: http://101.79.72.60:3001/

---

## 4. 수동 배포

자동화 스크립트를 사용할 수 없는 경우 수동으로 배포할 수 있습니다.

### 1. deploy 브랜치로 전환

```bash
git switch deploy
git pull origin deploy
```

### 2. 의존성 설치 및 빌드

```bash
pnpm install
pnpm run build
```

### 3. Docker 이미지 빌드

```bash
# 환경변수 로드
source .env

# 커밋 해시 확인
COMMIT_HASH=$(git rev-parse --short HEAD)

# 이미지 빌드
docker build --build-arg GITLAB_TOKEN="$GITLAB_TOKEN" \
  -t robot-simulator-front:deploy-$COMMIT_HASH \
  -t robot-simulator-front:latest .
```

### 4. Docker Hub 푸시

```bash
# Docker Hub 로그인 (필요시)
docker login

# 이미지 태그
docker tag robot-simulator-front:deploy-$COMMIT_HASH \
  $DOCKER_HUB_USER/robot-simulator-front:deploy-$COMMIT_HASH
docker tag robot-simulator-front:latest \
  $DOCKER_HUB_USER/robot-simulator-front:latest

# 이미지 푸시
docker push $DOCKER_HUB_USER/robot-simulator-front:deploy-$COMMIT_HASH
docker push $DOCKER_HUB_USER/robot-simulator-front:latest
```

### 5. 서버 배포

```bash
# SSH 접속
ssh -p $SSH_PORT ubuntu@$SERVER_IP

# 서버에서 실행
docker pull $DOCKER_HUB_USER/robot-simulator-front:deploy-$COMMIT_HASH
docker stop robot-simulator-front || true
docker rm robot-simulator-front || true
docker run -d -p 3001:80 \
  --name robot-simulator-front \
  --restart unless-stopped \
  $DOCKER_HUB_USER/robot-simulator-front:deploy-$COMMIT_HASH
```

### 6. 배포 확인

브라우저에서 http://101.79.72.60:3001/ 로 접속하여 정상 작동 확인

---

## 5. 문제 해결

### 일반적인 오류

| 오류                    | 원인                               | 해결책                                          |
| ----------------------- | ---------------------------------- | ----------------------------------------------- |
| 환경변수 로드 실패      | `.env` 파일 없음 또는 변수 누락    | 프로젝트 관리자에게 요청                        |
| Docker가 실행되지 않음  | Docker Desktop 미실행              | Docker Desktop 시작                             |
| SSH 연결 실패           | SSH 키/비밀번호 없음               | SSH 키 설정 또는 `.env`에 비밀번호 추가         |
| sshpass 없음 (비밀번호) | sshpass 미설치                     | `sudo apt-get install sshpass` 또는 SSH 키 설정 |
| Docker 빌드 실패        | 네트워크 또는 권한 문제            | Docker Desktop 재시작                           |
| 패키지 설치 실패        | 레지스트리 접근 권한 또는 `.npmrc` | `.npmrc` 파일 확인                              |
| 포트 충돌               | 다른 서비스가 포트 사용            | 포트 번호 변경 또는 기존 서비스 중지            |
| 브랜치 전환 실패        | 커밋되지 않은 변경사항             | 스크립트가 자동 처리 (stash)                    |

### SSH 키 vs 비밀번호

**SSH 키 방식 (권장):**

- ✅ 비밀번호 입력 불필요
- ✅ 더 안전
- ✅ 자동화에 적합

**비밀번호 방식:**

- ⚠️ `.env`에 비밀번호 저장 필요
- ⚠️ `sshpass` 도구 필요 (Linux에서만 사용 가능)
- ⚠️ 보안상 권장하지 않음

### 로그 확인

```bash
# 컨테이너 로그 확인
ssh -p 22 ubuntu@101.79.72.60 'docker logs robot-simulator-front'

# 최근 로그만 확인
ssh -p 22 ubuntu@101.79.72.60 'docker logs --tail 100 robot-simulator-front'

# 실시간 로그
ssh -p 22 ubuntu@101.79.72.60 'docker logs -f robot-simulator-front'

# 빌드 로그 확인 (로컬)
docker build --no-cache --progress=plain .
```

### 서비스 상태 확인

```bash
# 컨테이너 상태
ssh -p 22 ubuntu@101.79.72.60 'docker ps'

# 리소스 사용량
ssh -p 22 ubuntu@101.79.72.60 'docker stats robot-simulator-front --no-stream'

# 배포된 버전 확인
ssh -p 22 ubuntu@101.79.72.60 'docker images | grep robot-simulator-front'
```

### 롤백

문제 발생 시 이전 버전으로 롤백:

```bash
# 사용 가능한 이미지 확인
ssh -p 22 ubuntu@101.79.72.60 'docker images $DOCKER_HUB_USER/robot-simulator-front'

# 특정 버전으로 롤백
ssh -p 22 ubuntu@101.79.72.60 '
docker stop robot-simulator-front
docker rm robot-simulator-front
docker run -d -p 3001:80 --name robot-simulator-front \
  --restart unless-stopped \
  '$DOCKER_HUB_USER'/robot-simulator-front:deploy-{이전커밋해시}
'
```

---

**Happy Deploying! 🚀**
