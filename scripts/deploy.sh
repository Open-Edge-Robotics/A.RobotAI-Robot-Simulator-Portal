#!/bin/bash

# Robot Simulator Frontend 자동배포 스크립트
# SSH 키 인증 우선, 없으면 비밀번호 사용
# 사용법: ./scripts/deploy.sh

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 로그 함수
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 배너 출력
echo -e "${BLUE}"
echo "🤖 =============================================="
echo "   Robot Simulator Frontend 자동배포 스크립트"
echo "===============================================${NC}"
echo

# Git 저장소 확인
if [ ! -d ".git" ]; then
    log_error "Git 저장소가 아닙니다. Git 프로젝트 루트 디렉토리에서 실행하세요."
    exit 1
fi

# 현재 브랜치 확인
CURRENT_BRANCH=$(git branch --show-current)
TARGET_BRANCH="deploy"

log_info "현재 브랜치: $CURRENT_BRANCH"
log_info "배포 대상 브랜치: $TARGET_BRANCH"

# Git 상태 확인
if [ -n "$(git status --porcelain)" ]; then
    log_warning "커밋되지 않은 변경사항이 있습니다."
    echo -e "${YELLOW}변경사항:${NC}"
    git status --short
    echo
    read -p "계속하시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "배포를 취소합니다."
        exit 0
    fi
    
    log_info "변경사항을 임시 저장합니다..."
    git stash push -m "Auto-stash before deploy $(date '+%Y-%m-%d %H:%M:%S')"
    STASHED=true
fi

# deploy 브랜치로 전환
if [ "$CURRENT_BRANCH" != "$TARGET_BRANCH" ]; then
    log_info "$TARGET_BRANCH 브랜치로 전환 중..."
    
    if ! git show-ref --verify --quiet refs/heads/$TARGET_BRANCH; then
        log_warning "$TARGET_BRANCH 브랜치가 존재하지 않습니다."
        read -p "현재 브랜치를 기반으로 $TARGET_BRANCH 브랜치를 생성하시겠습니까? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git checkout -b $TARGET_BRANCH
            log_success "$TARGET_BRANCH 브랜치 생성 완료"
        else
            log_info "배포를 취소합니다."
            if [ "$STASHED" = true ]; then
                git stash pop
            fi
            exit 0
        fi
    else
        git checkout $TARGET_BRANCH
        log_success "$TARGET_BRANCH 브랜치로 전환 완료"
    fi
fi

# 원격 저장소에서 최신 코드 가져오기
log_info "원격 저장소에서 최신 코드 가져오는 중..."
if git ls-remote --heads origin $TARGET_BRANCH | grep -q $TARGET_BRANCH; then
    git pull origin $TARGET_BRANCH
    log_success "최신 코드 업데이트 완료"
else
    log_warning "원격 저장소에 $TARGET_BRANCH 브랜치가 없습니다. 로컬 브랜치를 사용합니다."
fi

# .env 파일 확인 및 로드
if [ ! -f ".env" ]; then
    log_error ".env 파일이 없습니다. 팀 리더에게 요청하여 받으세요."
    exit 1
fi

log_info ".env 파일에서 환경변수 로드 중..."
set -a
source .env
set +a

# 필수 환경변수 확인
check_env_var() {
    if [ -z "${!1}" ]; then
        log_error "$1 환경변수가 설정되지 않았습니다."
        exit 1
    fi
}

check_env_var "GITLAB_TOKEN"
check_env_var "DOCKER_HUB_USER"
check_env_var "SERVER_IP"
check_env_var "SSH_PORT"

IMAGE_NAME=${IMAGE_NAME:-"robot-simulator-front"}
log_success "환경변수 로드 완료"

# SSH 연결 방식 결정
log_info "SSH 연결 방식 확인 중..."
SSH_METHOD=""

# SSH 키 인증 테스트
if ssh -o BatchMode=yes -o ConnectTimeout=5 -p $SSH_PORT ubuntu@$SERVER_IP "echo 'test'" 2>/dev/null; then
    log_success "SSH 키 인증 사용 (비밀번호 불필요)"
    SSH_METHOD="key"
    SSH_CMD="ssh -o StrictHostKeyChecking=no -p $SSH_PORT ubuntu@$SERVER_IP"
else
    # SSH 키가 없으면 비밀번호 방식 사용
    if [ -z "$SSH_PASSWORD" ]; then
        log_error "SSH 키가 없고 SSH_PASSWORD도 설정되지 않았습니다."
        echo
        echo -e "${YELLOW}해결 방법:${NC}"
        echo "1. SSH 키 설정 (추천): ssh-keygen -t ed25519 && ssh-copy-id -p $SSH_PORT ubuntu@$SERVER_IP"
        echo "2. .env 파일에 SSH_PASSWORD 추가"
        exit 1
    fi
    
    # sshpass 확인
    if command -v sshpass > /dev/null 2>&1; then
        log_warning "SSH 비밀번호 인증 사용 (SSH 키 설정을 권장합니다)"
        SSH_METHOD="password"
        SSH_CMD="sshpass -p '$SSH_PASSWORD' ssh -o StrictHostKeyChecking=no -p $SSH_PORT ubuntu@$SERVER_IP"
    else
        log_error "sshpass가 설치되지 않았고 SSH 키도 없습니다."
        echo
        echo -e "${YELLOW}해결 방법:${NC}"
        echo "1. SSH 키 설정 (추천): ssh-keygen -t ed25519 && ssh-copy-id -p $SSH_PORT ubuntu@$SERVER_IP"
        echo "2. sshpass 설치 (Linux): sudo apt-get install sshpass"
        exit 1
    fi
fi

# Docker 실행 확인
if ! docker info > /dev/null 2>&1; then
    log_error "Docker가 실행되지 않았습니다. Docker Desktop을 시작하세요."
    exit 1
fi

# 현재 커밋 정보 표시
CURRENT_COMMIT=$(git rev-parse --short HEAD)
COMMIT_MESSAGE=$(git log -1 --pretty=format:"%s")
log_info "배포할 커밋: $CURRENT_COMMIT - $COMMIT_MESSAGE"

# 배포 확인
echo
read -p "위 정보로 배포를 진행하시겠습니까? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_info "배포를 취소합니다."
    if [ "$CURRENT_BRANCH" != "$TARGET_BRANCH" ]; then
        git checkout $CURRENT_BRANCH
        if [ "$STASHED" = true ]; then
            git stash pop
        fi
    fi
    exit 0
fi

# 1단계: 의존성 설치 및 빌드
log_info "의존성 설치 및 빌드 시작..."
if command -v pnpm > /dev/null 2>&1; then
    pnpm install
    pnpm run build
else
    log_error "pnpm이 설치되지 않았습니다."
    exit 1
fi
log_success "빌드 완료"

# 2단계: Docker 이미지 빌드
log_info "Docker 이미지 빌드 중..."
IMAGE_TAG="$TARGET_BRANCH-$CURRENT_COMMIT"
docker build --build-arg GITLAB_TOKEN="$GITLAB_TOKEN" -t $IMAGE_NAME:$IMAGE_TAG .
docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_NAME:latest
log_success "Docker 이미지 빌드 완료 (태그: $IMAGE_TAG)"

# 3단계: Docker Hub 로그인 확인
log_info "Docker Hub 로그인 상태 확인..."
if ! docker info | grep -q "Username"; then
    log_warning "Docker Hub에 로그인되지 않았습니다. 로그인을 진행합니다."
    docker login
fi

# 4단계: 이미지 태깅 및 푸시
log_info "Docker Hub에 이미지 푸시 중..."
docker tag $IMAGE_NAME:$IMAGE_TAG $DOCKER_HUB_USER/$IMAGE_NAME:$IMAGE_TAG
docker tag $IMAGE_NAME:latest $DOCKER_HUB_USER/$IMAGE_NAME:latest
docker push $DOCKER_HUB_USER/$IMAGE_NAME:$IMAGE_TAG
docker push $DOCKER_HUB_USER/$IMAGE_NAME:latest
log_success "Docker Hub 푸시 완료"

# 5단계: 서버 배포
log_info "서버에 배포 중..."

DEPLOY_COMMANDS="
echo '🔄 서버에서 배포 진행 중...'
echo '📥 이미지 다운로드: $DOCKER_HUB_USER/$IMAGE_NAME:$IMAGE_TAG'
docker pull $DOCKER_HUB_USER/$IMAGE_NAME:$IMAGE_TAG
echo '🔄 기존 컨테이너 정리...'
docker stop $IMAGE_NAME 2>/dev/null || true
docker rm $IMAGE_NAME 2>/dev/null || true
echo '🚀 새 컨테이너 실행...'
docker run -d -p 3001:80 --name $IMAGE_NAME --restart unless-stopped $DOCKER_HUB_USER/$IMAGE_NAME:$IMAGE_TAG
echo '✅ 서버 배포 완료!'
echo '📋 배포 정보:'
echo '   - 브랜치: $TARGET_BRANCH'
echo '   - 커밋: $CURRENT_COMMIT'
echo '   - 이미지: $DOCKER_HUB_USER/$IMAGE_NAME:$IMAGE_TAG'
"

# SSH 명령 실행
eval "$SSH_CMD \"$DEPLOY_COMMANDS\""

# 6단계: 배포 확인
log_info "배포 상태 확인 중..."
sleep 3

CONTAINER_STATUS=$(eval "$SSH_CMD 'docker ps --filter name=$IMAGE_NAME --format \"table {{.Status}}\"'" | tail -n +2)
if [ -n "$CONTAINER_STATUS" ]; then
    log_success "컨테이너 실행 중: $CONTAINER_STATUS"
else
    log_warning "컨테이너 상태를 확인할 수 없습니다."
fi

# 원래 브랜치로 복귀
if [ "$CURRENT_BRANCH" != "$TARGET_BRANCH" ]; then
    log_info "원래 브랜치($CURRENT_BRANCH)로 복귀 중..."
    git checkout $CURRENT_BRANCH
    
    if [ "$STASHED" = true ]; then
        git stash pop
        log_success "임시 저장된 변경사항을 복원했습니다."
    fi
fi

# 완료 메시지
echo
echo -e "${GREEN}🎉 =============================================="
echo "           배포가 성공적으로 완료되었습니다!"
echo "===============================================${NC}"
echo
echo -e "${BLUE}📋 배포 정보:${NC}"
echo "   🌿 브랜치: $TARGET_BRANCH"
echo "   📝 커밋: $CURRENT_COMMIT"
echo "   📦 메시지: $COMMIT_MESSAGE"
echo "   🐳 Docker 이미지: $DOCKER_HUB_USER/$IMAGE_NAME:$IMAGE_TAG"
echo "   🌐 서비스 주소: http://$SERVER_IP:3001"
echo "   📦 컨테이너명: $IMAGE_NAME"
if [ "$SSH_METHOD" = "password" ]; then
    echo
    echo -e "${YELLOW}💡 SSH 키 설정 권장:${NC}"
    echo "   ssh-keygen -t ed25519 -C \"robot-simulator-front-deploy\""
    echo "   ssh-copy-id -p $SSH_PORT ubuntu@$SERVER_IP"
    echo "   이후 비밀번호 입력 없이 자동 배포됩니다!"
fi
echo
echo -e "${YELLOW}💡 확인 방법:${NC}"
echo "   1. 브라우저에서 http://$SERVER_IP:3001 접속"
echo "   2. 주요 기능이 정상 작동하는지 테스트"
echo
echo -e "${BLUE}🔧 문제 발생 시:${NC}"
echo "   - 로그 확인: ssh -p $SSH_PORT ubuntu@$SERVER_IP 'docker logs $IMAGE_NAME'"
echo "   - 컨테이너 상태: ssh -p $SSH_PORT ubuntu@$SERVER_IP 'docker ps'"
echo "   - 이전 버전 롤백: docker run -d -p 3001:80 --name $IMAGE_NAME $DOCKER_HUB_USER/$IMAGE_NAME:latest"
echo
log_success "Happy Deploying! 🚀"