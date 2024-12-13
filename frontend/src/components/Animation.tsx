import React from "react";

// SVG 파일 타입 정의
type SvgMap = {
  [key: string]: {
    default: string;
  };
};

const svgs: SvgMap = import.meta.glob("../assets/ball_*.svg", { eager: true });

interface BallPosition {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

interface AnimationState {
  ballPositions: BallPosition[];
}

class Animation extends React.Component<{}, AnimationState> {
  private animationFrameId: number | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      ballPositions: Array.from({ length: Object.keys(svgs).length }, () => ({
        x: Math.random() * 600, // 가로축 시작 지점 랜덤
        y: Math.random() * 300, // 세로축 시작 지점 랜덤
        dx: (Math.random() * 2 - 1) * 2, // 임의의 x 방향 속도
        dy: (Math.random() * 2 - 1) * 2, // 임의의 y 방향 속도
      })),
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  animate = () => {
    this.setState((prevState) => {
      const newPositions = prevState.ballPositions.map((ball) => {
        let { x, y, dx, dy } = ball;

        // 위치 업데이트
        x += dx;
        y += dy;

        // 테두리에 닿았을 때 반사
        if (x < 0 || x > 600 - 50) {
          // 50은 공의 너비
          dx *= -1;
        }
        if (y < 0 || y > 300 - 50) {
          // 50은 공의 높이
          dy *= -1;
        }

        return { x, y, dx, dy };
      });

      return { ballPositions: newPositions };
    });

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  render() {
    return (
      // 컴포넌트 전체 배경
      <div className="w-[800px] mt-8 mb-8 flex justify-center items-center bg-white">
        {/* 추첨 애니메이션 범위 */}
        <div className="w-[600px] h-[300px] relative border-2 rounded-xl bg-gray-200 overflow-hidden">
          {this.state.ballPositions.map((ball, index) => (
            <img
              key={index}
              src={svgs[`../assets/ball_${index + 1}.svg`].default}
              alt={`Ball ${index + 1}`}
              className="absolute"
              style={{
                left: `${ball.x}px`,
                top: `${ball.y}px`,
                width: "50px", // 공의 가로 크기
                height: "50px", // 공의 세로 크기
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Animation;
