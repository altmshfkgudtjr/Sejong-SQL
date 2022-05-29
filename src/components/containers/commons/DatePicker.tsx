import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Picker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko);
// styles
import { typo, boxShadow, animations } from 'sjds';

/**
 * 날짜 및 시간 선택기
 * @param props
 * @param props.defaultDate 기본값
 * @param props.onChange
 */
const DatePicker = ({ defaultDate = new Date(), onChange, ...config }: Props) => {
  const [date, setDate] = useState<Date>(defaultDate);

  const onChange_ = (value: Date) => {
    setDate(value);
    onChange && onChange(value);
  };

  useEffect(() => {
    if (!defaultDate) {
      return;
    }

    setDate(defaultDate);
  }, [defaultDate]);

  return (
    <Wrapper>
      <Picker
        locale="ko"
        selected={date}
        onChange={onChange_}
        onChangeRaw={e => e.preventDefault()}
        dateFormat="yyyy.MM.dd (eee) aa h시 mm분"
        showPopperArrow={false}
        customInput={<DateInput />}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={10}
        timeCaption="시간"
        customTimeInput={<TimeInput />}
        {...config}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .react-datepicker-popper {
    animation: ${animations.fadeIn} 0.1s ease;
  }

  .react-datepicker {
    font-family: inherit;
    background-color: ${({ theme }) => theme.background.bg2};
    ${typo.value2};
    color: ${({ theme }) => theme.text.f2};
    border: 1px solid ${({ theme }) => theme.border.b2};
    border-radius: 8px;
    ${boxShadow.e1};
  }

  .react-datepicker__navigation-icon::before {
    border-width: 2px 2px 0 0;
  }

  .react-datepicker__header {
    text-align: center;
    background-color: ${({ theme }) => theme.background.bg3};
    border-bottom: 1px solid ${({ theme }) => theme.border.b2};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 8px 0;
  }

  .react-datepicker__current-month {
    color: ${({ theme }) => theme.text.f2};
  }

  .react-datepicker__day {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.background.bg2};
    color: ${({ theme }) => theme.text.f3};
    font-size: 12px;
    transition: 0.1s ease;

    &:hover {
      background-color: ${({ theme }) => theme.background.bg4};
    }
  }

  .react-datepicker__day-name {
    color: ${({ theme }) => theme.text.f2};
  }

  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.primary};
    font-weight: 400;

    &:hover {
      background-color: ${({ theme }) => theme.primary};
    }
  }

  .react-datepicker-time__header {
    color: ${({ theme }) => theme.text.f2};
  }

  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
    width: 100%;
  }

  .react-datepicker__time-list {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.background.bg2};
    color: ${({ theme }) => theme.text.f3};
    font-size: 12px;
    transition: 0.1s ease;

    &:hover {
      background-color: ${({ theme }) => theme.background.bg4};
    }
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: ${({ theme }) => theme.primary};
    font-weight: 400;

    &:hover {
      background-color: ${({ theme }) => theme.primary};
    }
  }
`;

const DateInput = styled.input`
  width: 100%;
  max-width: 400px;
  height: 48px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.bg3};
  color: ${({ theme }) => theme.text.f2};
`;

const TimeInput = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: transparent;
  color: ${({ theme }) => theme.text.f2};
`;

type Props = {
  defaultDate?: Date;
  onChange?: (value: Date) => void;
  selectsStart?: boolean;
  selectsEnd?: boolean;
};

export default DatePicker;
