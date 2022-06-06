import styled from 'styled-components';

/**
 * SVG 아이콘
 * @param props
 * @param props.name 아이콘명
 * @param props.width 가로길이
 * @param props.height 세로길이
 * @param props.fill 아이콘 fill 색상
 * @param props.stroke 아이콘 stroke 색상
 *
 * @example
 * <Icon name="ic_helpful" />
 * <Icon name="ic_helpful" stroke="#3A3A3A" strokeWidth="1" width="32" />
 *
 * <Icon name="ic_report" stroke="#12b886" />
 *
 * <Icon name="ic_like" />
 * <Icon name="ic_like" stroke="#12b886" strokeWidth="1.6" />
 *
 * <Icon name="ic_dislike" />
 * <Icon name="ic_dislike" stroke="#12b886" strokeWidth="1.6" />
 */
const Icon = ({ name, width = 24, height = 24, fill = '#3A3A3A', ...props }: Props) => {
  console.log(name, fill);
  if (props.stroke && fill === '#3A3A3A') {
    fill = 'rgba(0,0,0,0)';
  }

  return (
    <Wrapper w={width} h={height}>
      <svg width={width} height={height} fill={fill} style={{ pointerEvents: 'none' }} {...props}>
        <use href={`#${name}`} />
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ w?: number; h?: number }>`
  width: ${({ w }) => (w ? `${w}px` : '')};
  height: ${({ h }) => (h ? `${h}px` : '')};
  font-size: 0;
`;

type Props = {
  name: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
};

export default Icon;
