# 빌드 스테이지
FROM node:18-alpine as build

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 의존성 파일들만 먼저 복사 (캐시 최적화)
COPY package.json pnpm-lock.yaml* ./

# .npmrc 파일을 Docker 내에서 직접 생성 (사내 우선, npm fallback)
ARG GITLAB_TOKEN
RUN echo "registry=https://rnd-app.innogrid.com/api/v4/projects/987/packages/npm/" > .npmrc && \
    echo "//rnd-app.innogrid.com/api/v4/projects/987/packages/npm/:_authToken=\"${GITLAB_TOKEN}\"" >> .npmrc

# 사내 레지스트리에서 패키지 설치 시도, 실패 시 npm에서 재시도
RUN pnpm install --frozen-lockfile || (echo "사내 레지스트리 실패, npm 공식 레지스트리로 fallback..." && \
    echo "registry=https://registry.npmjs.org/" > .npmrc && \
    pnpm install --frozen-lockfile)

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN pnpm run build

# 프로덕션 스테이지 (토큰 정보가 포함되지 않음)
FROM nginx:alpine

# 빌드된 파일을 nginx html 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# nginx 템플릿 파일을 templates 디렉토리에 복사
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

# 환경변수 기본값 설정
ENV BACKEND_API_URL=http://101.79.72.52:30020

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]