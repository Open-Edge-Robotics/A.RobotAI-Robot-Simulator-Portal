# Robot Simulator Frontend - 배포 가이드

React + Vite + pnpm 기반의 가상자율행동체 시뮬레이터 프론트엔드 애플리케이션 배포 가이드입니다.

## 🏗️ 기술 스택

- **프레임워크**: React 18 + Vite
- **패키지 매니저**: pnpm
- **컨테이너화**: Docker + nginx
- **배포**: OpenStack + Ubuntu Server
- **Git 워크플로우**: deploy 브랜치 기반 배포

## 📋 사전 요구사항

### 개발 환경

- Node.js 18 이상
- pnpm 설치
- Docker Desktop
- Git

### 필수 파일 요청

다음 파일들은 보안상 저장소에 포함되지 않습니다. **프로젝트 관리자에게 요청**하세요:

- `.env` - 환경변수 설정
- `.npmrc` - npm 레지스트리 설정 (사내 패키지 접근용)

---

## 🚀 빠른 배포

### ⭐ 자동화 스크립트 사용 (권장)

```bash
# Linux/Mac 환경에서
./scripts/deploy.sh
```

**🔄 자동화 기능:**

- 자동으로 deploy 브랜치 전환 및 최신 코드 동기화
- 작업 중인 변경사항 자동 보호 (stash/restore)
- 배포 후 원래 브랜치로 자동 복귀
- 커밋 해시 기반 버전 태깅으로 추적성 확보

### 수동 배포 (단계별)

1. **의존성 설치 및 빌드**

   ```bash
   pnpm install
   pnpm run build
   ```

2. **Docker 이미지 빌드**

   ```bash
   # 환경변수 로드 필요
   docker build --build-arg GITLAB_TOKEN="$GITLAB_TOKEN" -t robot-simulator-front .
   ```

3. **Docker Hub 푸시**

   ```bash
   docker tag robot-simulator-front your-username/robot-simulator-front:latest
   docker push your-username/robot-simulator-front:latest
   ```

4. **서버 배포**
   ```bash
   # SSH 접속 후
   docker pull your-username/robot-simulator-front:latest
   docker stop robot-simulator-front || true
   docker rm robot-simulator-front || true
   docker run -d -p 3001:80 --name robot-simulator-front --restart unless-stopped your-username/robot-simulator-front:latest
   ```

---

## 🔧 개발 환경 설정

### 1. 저장소 클론

```bash
git clone https://github.com/your-org/robot-simulator-front.git
cd robot-simulator-front
```

### 2. 환경 설정

```bash
# .env.example을 참고하여 .env 파일 생성
cp .env.example .env

# 필요한 값들을 프로젝트 관리자에게 요청하여 입력
nano .env
```

### 3. 의존성 설치

```bash
pnpm install
```

### 4. 개발 서버 실행

```bash
pnpm run dev
```

---

## 🏗️ 빌드 및 배포 아키텍처

### Git 브랜치 전략

```
feat/xxx ──┐
              ├──▶ main ──▶ deploy ──▶ production
feat/yyy ──┘
```

**브랜치 역할:**

- `feat/*`: 개별 기능 개발
- `main`: 안정된 코드 통합
- `deploy`: 배포 전용 (자동 관리됨)

### Docker 멀티스테이지 빌드

```
┌─────────────────┐    ┌─────────────────┐
│   Build Stage   │    │ Production Stage│
│                 │    │                 │
│ • Node.js 18    │───▶│ • nginx alpine  │
│ • pnpm install  │    │ • Static files  │
│ • Build assets  │    │ • Optimized     │
└─────────────────┘    └─────────────────┘
```

### 배포 플로우

```
Local Dev ──▶ Docker Build ──▶ Docker Hub ──▶ Production Server
    │              │              │              │
    └── Code       └── Image      └── Registry   └── Container
        Changes        Creation       Storage        Deployment
```

---

## 📁 프로젝트 구조

```
robot-simulator-front/
├── src/                    # React 소스 코드
├── public/                 # 정적 자산
├── scripts/               # 배포 스크립트
│   ├── deploy.sh         # Linux/Mac 배포 (자동화)
│   └── deploy.ps1        # Windows 배포
├── Dockerfile            # Docker 빌드 설정
├── nginx.conf           # nginx 서버 설정
├── .env.example         # 환경변수 템플릿
├── package.json         # 프로젝트 의존성
└── README.md           # 이 문서
```

---

## 🔐 보안 고려사항

### 환경변수 관리

- `.env` 파일은 Git에 커밋하지 않음
- 민감한 정보는 `.env.example`에 플레이스홀더로 표시
- 실제 값은 팀 내부에서만 공유

### Docker 보안

- 멀티스테이지 빌드로 빌드 의존성 제거
- 최종 이미지에는 소스코드나 토큰 미포함
- nginx 알파인 이미지로 공격 표면 최소화

---

## 🛠️ 개발 워크플로우

### 기능 개발

1. feature 브랜치 생성
2. 로컬에서 개발 및 테스트
3. Pull Request 생성
4. 코드 리뷰 후 main 브랜치 병합

### 배포 프로세스

1. main 브랜치에 코드 머지 완료
2. 배포 스크립트 실행 (`./scripts/deploy.sh`)
3. 자동으로 deploy 브랜치 관리 및 배포
4. 서비스 동작 확인

---

## 🔍 문제 해결

### 일반적인 오류

| 오류               | 원인                    | 해결책                   |
| ------------------ | ----------------------- | ------------------------ |
| 환경변수 로드 실패 | `.env` 파일 없음        | 프로젝트 관리자에게 요청 |
| Docker 빌드 실패   | 네트워크 또는 권한 문제 | Docker Desktop 재시작    |
| 패키지 설치 실패   | 레지스트리 접근 권한    | `.npmrc` 파일 확인       |
| 포트 충돌          | 다른 서비스가 포트 사용 | 포트 번호 변경           |
| 브랜치 전환 실패   | 커밋되지 않은 변경사항  | 스크립트가 자동 처리     |

### 로그 확인

```bash
# 컨테이너 로그 확인
docker logs robot-simulator-front

# 빌드 로그 확인
docker build --no-cache --progress=plain .

# 배포 스크립트 디버그
bash -x ./scripts/deploy.sh
```

### 서비스 상태 확인

```bash
# 컨테이너 상태
docker ps

# 리소스 사용량
docker stats robot-simulator-front

# 배포된 버전 확인
docker images | grep robot-simulator-front
```

---

**Happy Coding! 🚀**
