/* Common Types ================================== */

export type MyClass = {
  /**  분반 ID */
  id: number;
  /** 분반 이름 */
  name: string;
  /** 분반 설명 */
  comment: string;
  /** 개설학기 */
  semester: string;
  /** 분반 활성화(True) / 비활성화(False) */
  activate: boolean;
  /** 반 담당 교수 이름 */
  prof: string;
  /** 분반에서 내 역할 */
  type: 'Super Admin' | 'prof' | 'ta' | 'st';
  /** 주차 리스트 */
  pgroup: {
    id: number;
    name: string;
  }[];
};

/* =============================================== */

export type CreateClassProps = {
  data: {
    /** 분반 이름 (수업명) */
    name: string;
    /** 분반 설명 (수업 설명) */
    comment: string;
    /** 개설학기 */
    semester: string;
    /** 담당 교수 아이디 */
    prof_id: string;
    /** 활성화 여부 */
    activate: boolean;
  };
};

export type CreateClassResponse = never;

/* =============================================== */

export type GetClassProps = {
  /** 분반 ID */
  classId?: number;
};

export type GetClassResponse = MyClass;

export type GetClassListResponse = MyClass[];

/* =============================================== */

export type UpdateClassProps = {
  /** 분반 ID */
  classId: number;
  data: {
    /** 분반 이름 (수업명) */
    name: string;
    /** 분반 설명 (수업 설명) */
    comment: string;
    /** 개설학기 */
    semester: string;
    /** 담당 교수 아이디 */
    prof_id: string;
    /** 활성화 여부 */
    activate: string;
  };
};

export type UpdateClassResponse = never;

/* =============================================== */

export type DeleteClassProps = {
  /** 분반 ID */
  classId: number;
};

export type DeleteClassResponse = never;

/* =============================================== */

export type GetClassMemeberProps = {
  /** 분반 ID */
  classId: number;
};

export type GetClassMemeberResponse = {
  /** 사용자 ID */
  id: string;
  /** 학번 */
  sejong_id: string;
  /** 이름 */
  name: string;
  /** 권한 (조교 또는 학생) */
  type: string;
  /** 특정 분반에 추가된 날짜 */
  created_at: string;
}[];

/* =============================================== */

export type GetUserListProps = {
  /** 분반 ID */
  classId: number;
  /** 사용자 ID */
  userId: string;
};

export type GetUserListResponse = {
  /** 아이디 */
  id: string;
  /** 학번 */
  sejong_id: string;
  /** 이름 */
  name: string;
  /** 해당 분반에 이미 속한 상태인지 아닌지 여부 */
  exists: boolean;
}[];

/* =============================================== */

export type AddClassMemeberProps = {
  /** 분반 ID */
  classId: number;
  /** 추가할 사용자 ID */
  userId: string;
  data: {
    /** ta: 조교, st: 학생 */
    type: 'ta' | 'st';
  };
};

export type AddClassMemeberResponse = never;

/* =============================================== */

export type DeleteClassMemeberProps = {
  /** 분반 ID */
  classId: number;
  /** 제거할 사용자 ID */
  userId: string;
};

export type DeleteClassMemeberResponse = never;
