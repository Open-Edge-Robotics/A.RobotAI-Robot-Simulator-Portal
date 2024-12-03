# 1단계: Node.js 이미지를 사용하여 빌드
FROM node:20 AS build

# 작업 디렉토리 설정
WORKDIR /app

# pnpm을 설치
RUN npm install -g pnpm

# package.json 및 pnpm-lock.yaml 복사
COPY package.json pnpm-lock.yaml ./

# 의존성 설치 (devDependencies 포함)
RUN pnpm install

# 프로젝트 파일 복사
COPY . .

# Next.js 애플리케이션 빌드 (standalone 모드)
RUN pnpm build

# 2단계: 빌드된 파일로 서버 실행
FROM node:20-slim

# 작업 디렉토리 설정
WORKDIR /app

# 환경 변수 설정 (husky 비활성화)
ENV HUSKY_ENABLED=false

# 빌드된 파일을 복사
COPY --from=build /app /app

# 실행에 필요한 의존성만 설치 (devDependencies 제외)
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

# 3000 포트 열기 
EXPOSE 3000

# Next.js 서버 실행
CMD ["pnpm", "start"]
