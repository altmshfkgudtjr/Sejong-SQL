/* Common Types ================================== */

export type Environment = {
  /** Env ID */
  id: number;
  /** Env 이름 */
  name: string;
  /** Env 소유자 이름 */
  owner: string;
  /** 성공일 경우 = Success / 실패일 경우 = 실패 원인이 반환됨 */
  status: string;
  /** 수정 날짜 */
  updated_at: string;
  /** 생성 날짜 */
  created_at: string;
  /** 테이블명 리스트	 */
  table: string[];
};

export type MyEnvironment = Omit<Environment, 'owner'>;

/* =============================================== */

export type GetClassEnvListProps = {
  /** 분반 ID */
  classId: number;
};

export type GetClassEnvListResponse = Environment[];

/* =============================================== */

export type GetMyEnvListProps = never;

export type GetMyEnvListResponse = MyEnvironment[];

/* =============================================== */

export type CreateEnvProps = {
  data:
    | FormData
    | {
        class_id?: number;
        name: string;
        file: File;
      };
};

export type CreateEnvResponse = never;

/* =============================================== */

export type DeleteEnvProps = {
  /** Env ID */
  envId: number;
};

export type DeleteEnvResponse = never;

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
