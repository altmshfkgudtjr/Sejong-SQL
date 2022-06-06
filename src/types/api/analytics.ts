import type { Warning } from './problem';

/* =============================================== */

export type GetClassAnalyticsProps = {
  /** 분반 ID */
  classId: number;
  params: {
    weekId?: number;
    sejongId?: string;
  };
};

export type GetClassAnalyticsResponse = History[];

export type History = {
  /** 사용자-문제매칭 ID */
  usp_id: number;
  /** 사용자 ID */
  user_id: string;
  /** 사용자 학번 */
  sejong_id: string;
  /** 주차 이름 */
  pg_name: string;
  /** 문제 식별값 */
  p_id: number;
  /** 문제 이름 */
  p_title: string;
  /**  True: 정답, False: 오답 */
  accuracy: boolean;
  /** 문제 제출 시간 */
  p_created_at: string;
  /** 본인인지 확인, (분반 관리자의 경우 모두 True) */
  access: boolean;
};

/* =============================================== */

export type GetUserSubmissionProps = {
  uspId: number;
};

export type GetUserSubmissionResponse = {
  /** 문제 ID */
  id: number;
  /** 문제 이름 */
  title: string;
  /** 문제 내용 */
  content: string;
  /** 문제를 푼 쿼리 */
  query: string;
  /** True: 정답, False: 오답 */
  accuracy: boolean;
  warnings: Warning[];
  /** 현재 문제에 사용된 테이블 Description */
  desc_table: {
    table_name: string;
    value: any[];
  }[];
  select_table: {
    table_name: string;
    value: any[];
  }[];
};

/* =============================================== */
