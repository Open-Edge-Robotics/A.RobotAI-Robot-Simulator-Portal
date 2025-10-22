import { SEGMENTS } from "@/constants/navigation";

import ErrorFallback from "./ErrorFallback";
import LinkButton from "../LinkButton";

export default function AuthFallback() {
  return (
    <ErrorFallback message="로그인이 필요합니다">
      <LinkButton to={SEGMENTS.absolute.login} title="로그인">
        로그인
      </LinkButton>
    </ErrorFallback>
  );
}
