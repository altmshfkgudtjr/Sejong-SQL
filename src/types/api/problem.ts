import type { Environment } from './environment';

/* Common Types ================================== */

export type MyProblem = {
  id: number;
  /** 사용자-문제매칭 ID */
  usp_id: number;
  title: string;
  efficiency: {
    name: string;
    descriptions: string;
  }[];
};

export type Problem = {
  id: number;
  title: string;
  status: 'Correct' | 'Wrong Answer' | 'No Submit';
  problem_warnings: number;
  user_warnings: number;
};

export type Warning = {
  id: number;
  name: string;
  content: string;
};

/* =============================================== */

export type GetWarningListProps = never;

export type GetWarningListResponse = Warning[];

/* =============================================== */

export type GetMyProblemListProps = never;

export type GetMyProblemListResponse = {
  data: {
    correct: MyProblem[];
    wrong: MyProblem[];
  };
};

/* =============================================== */

export type GetProblemListProps = {
  weekId: number;
};

export type GetProblemListResponse = Problem[];

/* =============================================== */

export type GetProblemProps = {
  problemId: number;
};

export type GetProblemResponse = {
  id: number;
  title: string;
  content: string;
  latest_query: string;
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

export type CreateProblemProps = {
  classId: number;
  weekId: number;
  data: {
    /** ENV ID */
    env_id: number;
    /** 문제 이름 */
    title: string;
    /** 문제 내용 */
    content: string;
    /** 정답 */
    answer: string;
    /** 제한시간 (기본값 10초) */
    timelimit?: number;
    /** 평가기준 ID 리스트 */
    warnings: number[];
  };
};

export type CreateProblemResponse = never;

/* =============================================== */

export type GetProblemForAdminProps = {
  classId: number;
  problemId: number;
};

export type GetProblemForAdminResponse = {
  id: number;
  title: string;
  content: string;
  answer: string;
  time_limit: number;
  warnings: Warning[];
  env: Environment;
};

/* =============================================== */

export type EditProblemProps = {
  classId: number;
  problemId: number;
  data: {
    /** ENV ID */
    env_id: number;
    /** 문제 이름 */
    title: string;
    /** 문제 내용 */
    content: string;
    /** 정답 */
    answer: string;
    /** 제한시간 (기본값 10초) */
    timelimit?: number;
    /** 평가기준 ID 리스트 */
    warnings: number[];
  };
};

export type EditProblemResponse = never;

/* =============================================== */

export type RemoveProblemProps = {
  classId: number;
  problemId: number;
};

export type RemoveProblemResponse = never;

/* =============================================== */

export type RunProblemProps = {
  problemId: number;
  data: {
    query: string;
  };
};

export type RunProblemResponse = {
  status: boolean;
  query_result: object[] | string;
};

/* =============================================== */

export type RunNewProblemProps = {
  classId: number;
  envId: number;
  data: {
    query: string;
  };
};

export type RunNewProblemResponse = {
  status: boolean;
  query_result: object[] | string;
};

/* =============================================== */

export type SubmitProblemProps = {
  problemId: number;
  data: {
    query: string;
  };
};

export type SubmitProblemResponse = {
  status: 'Success' | 'Fail';
  accuracy: boolean;
  efficiency: {
    name: string;
    descriptions: string;
  }[];
};
