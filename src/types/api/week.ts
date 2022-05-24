/* Common Types ================================== */

export type Week = {
  /** 문제집 아이디 */
  id: number;
  /** 문제집 이름 */
  name: string;
  /** 해당 문제집에 속해있는 문제 개수 (총 N문제) */
  problem_cnt: number;
  /** 해당 문제집에서 풀이한 문제의 개수 */
  solve_cnt: number;
  /** 시험모드 여부 (활성 / 비활성) */
  exam: boolean;
  /** 활성화 여부 */
  activate: boolean;
  /** 활성화 시작시간 */
  activate_start: string;
  /** 활성화 종료시간 */
  activate_end: string;
};

/* =============================================== */

export type GetWeekListProps = {
  classId: number;
};

export type GetWeekListResponse = Week[];

/* =============================================== */

export type CreateWeekProps = {
  classId: number;
  data: {
    /** 주차 이름 */
    name: string;
    /** 주차 설명 */
    comment: string;
    /** 시험모드 여부 */
    exam: boolean;
    /** 활성화 여부 */
    activate: boolean;
    /** 활성화 시작 시간 */
    activate_start: string | null;
    /** 활성화 종료 시간 */
    activate_end: string | null;
  };
};

export type CreateWeekResponse = never;

/* =============================================== */

export type UpdateWeekProps = {
  classId: number;
  weekId: number;
  data: {
    /** 주차 이름 */
    name: string;
    /** 주차 설명 */
    comment: string;
    /** 시험모드 여부 */
    exam: boolean;
    /** 활성화 여부 */
    activate: boolean;
    /** 활성화 시작 시간 */
    activate_start: string | null;
    /** 활성화 종료 시간 */
    activate_end: string | null;
  };
};

export type UpdateWeekResponse = never;

/* =============================================== */

export type RemoveWeekProps = {
  classId: number;
  weekId: number;
};

export type RemoveWeekResponse = never;

/* =============================================== */
