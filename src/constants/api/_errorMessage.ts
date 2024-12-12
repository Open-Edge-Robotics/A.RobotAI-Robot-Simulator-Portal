const MESSAGES = {
  CREATE: `생성`,
  DELETE: `삭제`,
  EXECUTE: `실행`,
  STOP: `중지`,
  RETRY: `잠시 후 다시 시도해주세요`,
  CONTACT: `관리자에게 문의하세요`,
  SUCCEEDED: `성공했습니다`,
  FAILED: `실패했습니다`,
  ERROR_OCCURED: `에러가 발생하였습니다`,
  INVALID: `유효하지 않습니다`,
  INSTANCE: `인스턴스`,
  SIMULATION: `시뮬레이션`,
  TEMPLATE: `템플릿`,
  POD: `파드`,
  IMAGE: `이미지`,
  CONTAINER: `컨테이너`,
};

const {
  CREATE,
  DELETE,
  EXECUTE,
  STOP,
  RETRY,
  CONTACT,
  SUCCEEDED,
  FAILED,
  ERROR_OCCURED,
  INVALID,
  INSTANCE,
  SIMULATION,
  TEMPLATE,
  POD,
  IMAGE,
  CONTAINER,
} = MESSAGES;

// 인스턴스&시뮬레이션 실행/종료 실패 시 상태코드에 따른 메시지
export const API_COMMON_ERROR_MESSAGE: { [key in number]: string } = {
  [520]: `아직 ${POD}가 준비 중입니다`,
  [521]: `아직 ${CONTAINER}가 생성 중입니다`,
  [522]: `${IMAGE} pull ${ERROR_OCCURED}`,
  [523]: `ImagePullBackOff ${ERROR_OCCURED}`,
  [524]: `CrashLoopBackOff ${ERROR_OCCURED}`,
  [530]: `알 수 없는 ${ERROR_OCCURED}`,
};

/**
 * @description API 요청 시 상태코드 별 성공/실패 메시지
 */
export const API_MESSAGE: {
  [key in string]: { [key in string]: { [key in string]: string } };
} = {
  INSTANCE: {
    CREATE: {
      201: `${INSTANCE} ${CREATE}에 ${SUCCEEDED}`,
      404: `${SIMULATION} 혹은 ${TEMPLATE}의 아이디가 ${INVALID} ${CONTACT}`,
      500: `데이터가 ${INVALID} ${CONTACT}`,
      DEFAULT: `각 필드를 필수로 입력해주세요`,
    },
    DELETE: {
      201: `${INSTANCE}를 ${DELETE}에 ${SUCCEEDED}`,
      500: `${INSTANCE} ${DELETE}에 ${FAILED} ${CONTACT}`,
    },
    EXECUTE: {
      200: `${INSTANCE} ${EXECUTE}에 ${SUCCEEDED}`,
      500: `${INSTANCE} ${EXECUTE}에 ${FAILED} ${CONTACT}`,
      520: `${INSTANCE} ${EXECUTE} 도중 ${API_COMMON_ERROR_MESSAGE[520]}${RETRY}`,
      521: `${INSTANCE} ${EXECUTE} 도중 ${API_COMMON_ERROR_MESSAGE[521]}${RETRY}`,
      522: `${INSTANCE} ${EXECUTE} 도중 ${API_COMMON_ERROR_MESSAGE[522]} ${CONTACT}`,
      523: `${INSTANCE} ${EXECUTE} 도중 ${API_COMMON_ERROR_MESSAGE[523]} ${CONTACT}`,
      524: `${INSTANCE} ${EXECUTE} 도중 ${API_COMMON_ERROR_MESSAGE[524]} ${CONTACT}`,
      530: `${INSTANCE} ${EXECUTE} 도중 ${API_COMMON_ERROR_MESSAGE[530]} ${CONTACT}`,
    },
    STOP: {
      200: `${INSTANCE} ${STOP}에 ${SUCCEEDED}`,
      500: `${INSTANCE} ${STOP}에 ${FAILED} ${CONTACT}`,
      520: `${INSTANCE} ${STOP} 도중 ${API_COMMON_ERROR_MESSAGE[520]}${RETRY}`,
      521: `${INSTANCE} ${STOP} 도중 ${API_COMMON_ERROR_MESSAGE[521]}${RETRY}`,
      522: `${INSTANCE} ${STOP} 도중 ${API_COMMON_ERROR_MESSAGE[522]} ${CONTACT}`,
      523: `${INSTANCE} ${STOP} 도중 ${API_COMMON_ERROR_MESSAGE[523]} ${CONTACT}`,
      524: `${INSTANCE} ${STOP} 도중 ${API_COMMON_ERROR_MESSAGE[524]} ${CONTACT}`,
      530: `${INSTANCE} ${STOP} 도중 ${API_COMMON_ERROR_MESSAGE[530]} ${CONTACT}`,
    },
  },
  SIMULATION: {
    CREATE: {
      201: `${SIMULATION} ${CREATE}에 ${SUCCEEDED}`,
      409: `이미 존재하는 ${SIMULATION} 이름입니다`,
      500: `데이터 저장 중 오류가 발생했습니다 ${CONTACT}`,
      DEFAULT: `${SIMULATION} 이름과 설명을 입력해주세요`,
    },
    DELETE: {
      201: `${SIMULATION} ${DELETE}에 ${SUCCEEDED}`,
      403: `해당 ${SIMULATION}에 속한 ${INSTANCE}를 먼저 ${DELETE}하고 ${RETRY}`,
      500: `${SIMULATION} ${DELETE}에 ${FAILED} ${CONTACT}`,
    },
    EXECUTE: {
      201: `${SIMULATION} ${EXECUTE}에 ${SUCCEEDED}`,
      500: `${SIMULATION} ${EXECUTE}에 ${FAILED} ${CONTACT}`,
      520: `${SIMULATION} ${EXECUTE} 도중 ${API_COMMON_ERROR_MESSAGE[520]}${RETRY}`,
      521: `${SIMULATION} ${EXECUTE} 도중 ${API_COMMON_ERROR_MESSAGE[521]}${RETRY}`,
      522: `${SIMULATION} ${EXECUTE} 도중 ${API_COMMON_ERROR_MESSAGE[522]} ${CONTACT}`,
      523: `${SIMULATION} ${EXECUTE} 도중 ${API_COMMON_ERROR_MESSAGE[523]} ${CONTACT}`,
      524: `${SIMULATION} ${EXECUTE} 도중 ${API_COMMON_ERROR_MESSAGE[524]} ${CONTACT}`,
      530: `${SIMULATION} ${EXECUTE} 도중 ${API_COMMON_ERROR_MESSAGE[530]} ${CONTACT}`,
    },
    STOP: {
      201: `${SIMULATION} ${STOP}에 ${SUCCEEDED}`,
      500: `${SIMULATION} ${STOP}에 ${FAILED} ${CONTACT}`,
      520: `${SIMULATION} ${STOP} 도중 ${API_COMMON_ERROR_MESSAGE[520]}${RETRY}`,
      521: `${SIMULATION} ${STOP} 도중 ${API_COMMON_ERROR_MESSAGE[521]}${RETRY}`,
      522: `${SIMULATION} ${STOP} 도중 ${API_COMMON_ERROR_MESSAGE[522]} ${CONTACT}`,
      523: `${SIMULATION} ${STOP} 도중 ${API_COMMON_ERROR_MESSAGE[523]} ${CONTACT}`,
      524: `${SIMULATION} ${STOP} 도중 ${API_COMMON_ERROR_MESSAGE[524]} ${CONTACT}`,
      530: `${SIMULATION} ${STOP} 도중 ${API_COMMON_ERROR_MESSAGE[530]} ${CONTACT}`,
    },
  },
  TEMPLATE: {
    DELETE: {
      201: `${TEMPLATE} ${DELETE}에 ${SUCCEEDED}`,
      500: `${TEMPLATE} ${DELETE}에 ${FAILED} ${CONTACT}`,
    },
  },
};
