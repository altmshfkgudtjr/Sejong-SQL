/* Common Types ================================== */

export type Environment = {
  /** Env ID */
  id: number;
  /** Env 소유자 이름 */
  owner: string;
  /** Env 이름 */
  name: string;
  /** 성공일 경우 = Success / 실패일 경우 = 실패 원인이 반환됨 */
  status: string;
  /** 수정 날짜 */
  updated_at: string;
  /** 생성 날짜 */
  created_at: string;
  /** 테이블명 리스트	 */
  table: string[];
};

/* =============================================== */

export type GetClassEnvListProps = {
  /** 분반 ID */
  classId: number;
};

export type GetClassEnvListResponse = Environment[];

/* =============================================== */

export type GetMyEnvListProps = never;

export type GetMyEnvListResponse = Omit<Environment, 'owner'>[];

/* =============================================== */

export type CreateEnvProps = {
  data:
    | FormData
    | {
        class_id: number;
        name: string;
        file: File;
      };
};

export type CreateEnvResponse = never;

/* =============================================== */

export type RemoveEnvProps = {
  /** Env ID */
  envId: number;
};

export type RemoveEnvResponse = never;

/* =============================================== */

export type ConnectEnvToClassProps = {
  /** Env ID */
  envId: number;
  /** 분반 ID */
  classId: number;
};

export type ConnectEnvToClassResponse = never;

/* =============================================== */

export type UnconnectEnvToClassProps = {
  /** Env ID */
  envId: number;
  /** 분반 ID */
  classId: number;
};

export type UnconnectEnvToClassResponse = never;

/* =============================================== */
