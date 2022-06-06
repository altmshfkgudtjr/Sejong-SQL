import { useState, useEffect } from 'react';
// hooks
import * as useClassController from 'hooks/controllers/useClassController';
import * as useWeekController from 'hooks/controllers/useWeekController';
import * as useProblemController from 'hooks/controllers/useProblemController';

/**
 * 분반명, 주차명, 문제명 반환 Hook
 */
const useInformation = ({ classId, weekId, problemId }) => {
  const { data: classData } = classId && useClassController.GetClass(classId);
  const { data: weekData } = weekId && useWeekController.GetWeek(weekId);
  const { data: problemData } = problemId && useProblemController.GetProblem(problemId);

  const [className, setClassName] = useState('');
  const [weekName, setWeekName] = useState('');
  const [problemTitle, setProblemTitle] = useState('');

  useEffect(() => {
    if (classData?.result?.name) {
      setClassName(classData.result.name);
    } else {
      setClassName('');
    }
  }, [classData]);

  useEffect(() => {
    if (weekData?.result?.name) {
      setWeekName(weekData.result.name);
    } else {
      setWeekName('');
    }
  }, [weekData]);

  useEffect(() => {
    if (problemData?.result?.title) {
      setProblemTitle(problemData.result.title);
    } else {
      setProblemTitle('');
    }
  }, [problemData]);

  return {
    className,
    weekName,
    problemTitle,
  };
};

export default useInformation;
