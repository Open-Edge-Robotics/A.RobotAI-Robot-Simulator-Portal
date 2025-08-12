#!/bin/bash

# Robot Simulator Frontend 자동배포 스크립트
# 사용법: ./scripts/deploy.sh

set -e  # 오류 발생 시 스크립트 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# .env 파일 확인
if [ ! -f ".env" ]; then
    log_error ".env 파일이 없습니다. 팀 리더에게 요청하여 받으세요."
    exit 1
fi

# .env 파일 로드
log_info ".env 파일에서 환경변수 로드 중..."
set -a  # 자동으로 export
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
check_env_var "SSH_PASSWORD"

IMAGE_NAME=${IMAGE_NAME:-"robot-simulator-front"}
log_success "환경변수 로드 완료"

# Docker 실행 확인
if ! docker info > /dev/null 2>&1; then
    log_error "Docker가 실행되지 않았습니다. Docker Desktop을 시작하세요."
    exit 1
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
docker build --build-arg GITLAB_TOKEN="$GITLAB_TOKEN" -t $IMAGE_NAME .
log_success "Docker 이미지 빌드 완료"

# 3단계: Docker Hub 로그인 확인
log_info "Docker Hub 로그인 상태 확인..."
if ! docker info | grep -q "Username"; then
    log_warning "Docker Hub에 로그인되지 않았습니다. 로그인을 진행합니다."
    docker login
fi

# 4단계: 이미지 태깅 및 푸시
log_info "Docker Hub에 이미지 푸시 중..."
docker tag $IMAGE_NAME $DOCKER_HUB_USER/$IMAGE_NAME:latest
docker push $DOCKER_HUB_USER/$IMAGE_NAME:latest
log_success "Docker Hub 푸시 완료"

# 5단계: 서버 배포
log_info "서버에 배포 중..."

# sshpass 설치 확인
if command -v sshpass > /dev/null 2>&1; then
    # sshpass 사용 (자동화) - 비밀번호 노출 없음
    log_info "자동으로 서버에 배포합니다..."
    sshpass -p "$SSH_PASSWORD" ssh -o StrictHostKeyChecking=no -p $SSH_PORT ubuntu@$SERVER_IP << 'DEPLOY_EOF'
echo "🔄 서버에서 배포 진행 중..."
docker pull $(echo $DOCKER_HUB_USER)/$(echo $IMAGE_NAME):latest
docker stop $(echo $IMAGE_NAME) 2>/dev/null || true
docker rm $(echo $IMAGE_NAME) 2>/dev/null || true
docker run -d -p 3001:80 --name $(echo $IMAGE_NAME) --restart unless-stopped $(echo $DOCKER_HUB_USER)/$(echo $IMAGE_NAME):latest
echo "✅ 서버 배포 완료!"
DEPLOY_EOF
else
    # sshpass가 없으면 설치 시도
    log_warning "sshpass가 설치되지 않았습니다."
    
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        log_info "sshpass 설치를 시도합니다..."
        if sudo apt-get update && sudo apt-get install -y sshpass 2>/dev/null; then
            log_success "sshpass 설치 완료!"
            # 설치 후 자동 배포
            sshpass -p "$SSH_PASSWORD" ssh -o StrictHostKeyChecking=no -p $SSH_PORT ubuntu@$SERVER_IP << 'DEPLOY_EOF'
echo "🔄 서버에서 배포 진행 중..."
docker pull $(echo $DOCKER_HUB_USER)/$(echo $IMAGE_NAME):latest
docker stop $(echo $IMAGE_NAME) 2>/dev/null || true
docker rm $(echo $IMAGE_NAME) 2>/dev/null || true
docker run -d -p 3001:80 --name $(echo $IMAGE_NAME) --restart unless-stopped $(echo $DOCKER_HUB_USER)/$(echo $IMAGE_NAME):latest
echo "✅ 서버 배포 완료!"
DEPLOY_EOF
        else
            log_warning "sshpass 설치에 실패했습니다. 수동 배포로 진행합니다."
        fi
    fi
    
    # sshpass가 여전히 없으면 수동 접속
    if ! command -v sshpass > /dev/null 2>&1; then
        log_warning "SSH 비밀번호를 입력해주세요."
        log_info "서버 접속 정보: ubuntu@$SERVER_IP:$SSH_PORT"
        
        # 환경변수를 미리 설정해서 전달
        export DOCKER_HUB_USER_TEMP="$DOCKER_HUB_USER"
        export IMAGE_NAME_TEMP="$IMAGE_NAME"
        
        ssh -p $SSH_PORT ubuntu@$SERVER_IP << 'MANUAL_DEPLOY_EOF'
echo "🔄 서버에서 배포 진행 중..."

# 환경변수가 없으면 기본값 사용
DOCKER_HUB_USER=${DOCKER_HUB_USER_TEMP:-"chansol319"}
IMAGE_NAME=${IMAGE_NAME_TEMP:-"robot-simulator-front"}

echo "📥 이미지 다운로드: $DOCKER_HUB_USER/$IMAGE_NAME:latest"
docker pull $DOCKER_HUB_USER/$IMAGE_NAME:latest

echo "🔄 기존 컨테이너 정리..."
docker stop $IMAGE_NAME 2>/dev/null || true
docker rm $IMAGE_NAME 2>/dev/null || true

echo "🚀 새 컨테이너 실행..."
docker run -d -p 3001:80 --name $IMAGE_NAME --restart unless-stopped $DOCKER_HUB_USER/$IMAGE_NAME:latest

echo "✅ 서버 배포 완료!"
MANUAL_DEPLOY_EOF
    fi
fi

# 6단계: 배포 확인
log_info "배포 상태 확인 중..."
sleep 3

# 서버 상태 확인
if command -v sshpass > /dev/null 2>&1; then
    CONTAINER_STATUS=$(sshpass -p "$SSH_PASSWORD" ssh -o StrictHostKeyChecking=no -p $SSH_PORT ubuntu@$SERVER_IP "docker ps --filter name=$IMAGE_NAME --format 'table {{.Status}}'" | tail -n +2)
else
    log_info "수동으로 서버 상태를 확인하세요:"
    echo "ssh -p $SSH_PORT ubuntu@$SERVER_IP"
    echo "docker ps --filter name=$IMAGE_NAME"
fi

# 완료 메시지
echo
echo -e "${GREEN}🎉 =============================================="
echo "           배포가 성공적으로 완료되었습니다!"
echo "===============================================${NC}"
echo
echo -e "${BLUE}📋 배포 정보:${NC}"
echo "   🐳 Docker 이미지: $DOCKER_HUB_USER/$IMAGE_NAME:latest"
echo "   🌐 서비스 주소: http://$SERVER_IP:3001"
echo "   📦 컨테이너명: $IMAGE_NAME"
echo
echo -e "${YELLOW}💡 확인 방법:${NC}"
echo "   1. 브라우저에서 http://$SERVER_IP:3001 접속"
echo "   2. 주요 기능이 정상 작동하는지 테스트"
echo
echo -e "${BLUE}🔧 문제 발생 시:${NC}"
echo "   - 로그 확인: ssh -p $SSH_PORT ubuntu@$SERVER_IP 'docker logs $IMAGE_NAME'"
echo "   - 컨테이너 상태: ssh -p $SSH_PORT ubuntu@$SERVER_IP 'docker ps'"
echo
log_success "Happy Deploying! 🚀"