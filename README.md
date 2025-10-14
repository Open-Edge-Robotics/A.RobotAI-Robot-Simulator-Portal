# Robot Simulator Frontend

> **배포 주소**: http://101.79.72.60:3001/ (2025.10.14 기준)

## 📑 목차

- [🏗️ 기술 스택](#️-기술-스택)
- [📋 사전 요구사항](#-사전-요구사항)
- [🔧 개발 환경 설정](#-개발-환경-설정)
- [📁 프로젝트 구조](#-프로젝트-구조)
- [🛠️ 개발 워크플로우](#️-개발-워크플로우)
- [🚀 배포](#-배포)

---

## 🏗️ 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)

- **Frontend**: React 18.3 + TypeScript 5.8 + Vite 7.0
- **라우팅**: React Router DOM 7.7
- **상태 관리**: TanStack Query 5.84
- **스타일링**: Tailwind CSS 4.1 + innogrid-ui
- **HTTP 통신**: Axios 1.11
- **패키지 매니저**: pnpm
- **컨테이너화**: Docker + nginx
- **배포**: OpenStack + Ubuntu Server

## 📋 사전 요구사항

### 개발 환경

- Node.js 18 이상
- pnpm 설치
- Docker Desktop
- Git

### 배포 환경 (배포 담당자만 필요)

- Docker Desktop
- SSH 접근 권한 (SSH 키 또는 비밀번호)

### 필수 파일 요청

다음 파일들은 보안상 저장소에 포함되지 않습니다. **프로젝트 관리자에게 요청**하세요:

- `.env` - 환경변수 설정
- `.npmrc` - npm 레지스트리 설정 (사내 패키지 접근용)

---

## 🔧 개발 환경 설정

### 1. 저장소 클론

```bash
git clone https://github.com/inno-rnd-project/re-robot-simulator-front.git
cd re-robot-simulator-front
```

### 2. 환경 설정

```bash
# .env.example을 참고하여 루트에 .env 파일 생성
cp .env.example .env

# 필요한 값들을 프로젝트 관리자에게 요청하여 입력
nano .env

# 루트에 .npmrc 파일 생성
touch .npmrc

# 사내 레지스트리 키를 프로젝트 관리자에게 요청하여 입력
nano .npmrc
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

## 📁 프로젝트 구조

```
re-robot-simulator-front/
├── src/                    # React 소스 코드
│   ├── apis/               # API 통신 관련
│   ├── components/         # 재사용 가능한 컴포넌트
│   ├── constants/          # 상수 정의
│   ├── contexts/           # React Context
│   │   └── auth/             # 인증 관련 Context
│   ├── hooks/              # Custom Hooks (주로 tanstack-query 관련)
│   ├── pages/              # 페이지 컴포넌트
│   ├── types/              # TypeScript 타입 정의
│   ├── utils/              # 유틸리티 함수
│   ├── App.tsx             # 앱 루트 컴포넌트
│   ├── App.css             # 글로벌 스타일
│   └── main.tsx            # 앱 진입점
├── scripts/                # 배포 스크립트
├── index.html              # HTML 진입점
├── README.md               # 이 문서
└── ...                     # 기타 설정 파일들
```

---

## 🛠️ 개발 워크플로우

### 기능 개발 및 배포

1. feature 브랜치 생성
2. 로컬에서 개발 및 테스트
3. Pull Request 생성
4. 코드 리뷰 후 `main` 브랜치 병합 (Squash Merge)
5. `main` 브랜치에 있는 코드를 `deploy` 브랜치로 병합 (Default Merge)
6. `deploy` 브랜치 배포

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

---

## 🚀 배포

배포 관련 상세 가이드는 **[deploy.md](./deploy.md)** 문서를 참고하세요.

### 빠른 배포

```bash
# Linux/Mac 환경에서
./scripts/deploy.sh
```

---

**Happy Coding! 🚀**
