/* Common Types ================================== */

export type Problem = {
  id: number;
  title: string;
  efficiency: {
    name: string;
    descriptions: string;
  }[];
};

/* =============================================== */

export type GetWarningListProps = never;

export type GetWarningListResponse = {
  id: number;
  name: string;
  content: string;
}[];

/* =============================================== */

export type GetMyProblemListProps = never;

export type GetMyProblemListResponse = {
  data: {
    correct: Problem[];
    wrong: Problem[];
  };
};

/* =============================================== */

export type GetProblemListProps = {
  classId: number;
  weekId: number;
};

export type GetProblemListResponse = {
  id: number;
  title: string;
  status: 'Correct' | 'Wrong Answer' | 'No Submit';
  problem_warnings: number;
  user_warnings: number;
};

/* =============================================== */

export type GetProblemProps = {
  problemId: number;
};

export type GetProblemResponse = {
  title: string;
  content: string;
  latest_query: string;
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
  classId: number;
  problemId: number;
  data: {
    query: string;
  };
};

export type RunProblemResponse = {
  status: boolean;
  query_result: any;
};

/* =============================================== */

export type SubmitProblemProps = {
  classId: number;
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
