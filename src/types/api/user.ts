export type SignUpProps = {
  data: {
    id: string;
    name: string;
    pw: string;
  };
};

export type SignUpResponse = {};

/* =============================================== */

export type SignInProps = {
  data: {
    id: string;
    pw: string;
  };
};

export type SignInResponse = {
  access_token: string;
  refresh_token: string;
};

/* =============================================== */

export type AuthorizationSejongUnivProps = {
  data: {
    sejong_id: string;
    sejong_pw: string;
  };
};

export type AuthorizationSejongUnivResponse = {};

/* =============================================== */

export type GetTokenProps = never;

export type GetTokenResponse = {
  access_token: string;
  refresh_token: string;
};

/* =============================================== */

export type GetProfileProps = never;

export type GetProfileResponse = {
  /** 사용자 아이디 */
  id: string;
  /** 세종대학교 학번 반환 (미인증 학생일 경우, null) */
  sejong_id: string;
  name: string;
  /**
   * 사용자 역할
   * - sa: 전체 어드민
   * - general: 서비스 이용자
   */
  role: string;
  /** 사용자 가입 날짜 */
  created_at: string;
  /** 사용자 정보가 수정된 날짜 */
  updated_at: string;
  /** 사용자 비밀번호가 수정된 날짜 */
  pw_updated_at: string;
};

/* =============================================== */

export type UpdateProfileProps = {
  data: {
    old_pw: string;
    new_pw: string;
    name: string;
  };
};

export type UpdateProfileResponse = {};

/* =============================================== */

export type SuccessionProps = {
  data: {
    pw: string;
  };
};

export type SuccessionResponse = {};
