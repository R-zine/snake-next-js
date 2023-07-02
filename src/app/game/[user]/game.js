"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./styles.scss";

export const Game = ({ id, speed, growth, highscore, width, height }) => {
  const [snake, setSnake] = useState([
    { x: width - 9, y: height - 4 },
    { x: width - 9, y: height - 3 },
    { x: width - 9, y: height - 2 },
    { x: width - 9, y: height - 1 },
  ]);
  const [isReady, setIsReady] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [score, setScore] = useState(0);
  const [foodHelper, setFoodHelper] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const boardRef = useRef(null);

  const direction = useRef("up");

  const newSegments = useRef(0);

  const router = useRouter();

  const initialBoard = useMemo(() => {
    const singleLayer = Array.from({ length: width }, () => "tile");
    return Array.from({ length: height }, () => singleLayer);
  }, []);

  const assignTile = (i, j) => {
    if (snake.some((seg) => seg.x === j && seg.y === i)) return "snake";
    if (isReady && food?.x === j && food?.y === i) return "apple";
    else return "tile";
  };

  const handleClick = (newDirection) => {
    if (newDirection === "up" && direction.current !== "down")
      direction.current = "up";
    if (newDirection === "down" && direction.current !== "up")
      direction.current = "down";
    if (newDirection === "left" && direction.current !== "right")
      direction.current = "left";
    if (newDirection === "right" && direction.current !== "left")
      direction.current = "right";
  };

  const isMobile = useMemo(() => {
    const mobileAndTabletCheck = () => {
      let check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };

    return mobileAndTabletCheck();
  });

  const food = useMemo(() => {
    const spawnRandom = () => ({
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    });

    const tryFood = () => {
      try {
        if (snake.length === width * height - 1) {
          setIsWon(true);
          return null;
        }
        const attempt = spawnRandom();
        if (snake.some((seg) => seg.x === attempt.x && seg.y === attempt.y))
          tryFood();
        else return attempt;
      } catch {
        setIsWon(true);
      }
    };

    return tryFood();
  }, [score, foodHelper]);

  useEffect(() => {
    if (food?.x) setIsReady(true);
    if (!food && !isWon) setFoodHelper((p) => p + 1);
  }, [food, foodHelper, isWon]);

  useEffect(() => {
    const tick = setInterval(() => {
      if (direction.current === "up") {
        setSnake((p) => {
          if (!newSegments.current) p.pop();
          else newSegments.current -= 1;
          return [{ x: p[0].x, y: p[0].y - 1 }, ...p];
        });
      }
      if (direction.current === "down") {
        setSnake((p) => {
          if (!newSegments.current) p.pop();
          else newSegments.current -= 1;
          return [{ x: p[0].x, y: p[0].y + 1 }, ...p];
        });
      }
      if (direction.current === "left") {
        setSnake((p) => {
          if (!newSegments.current) p.pop();
          else newSegments.current -= 1;
          return [{ x: p[0].x - 1, y: p[0].y }, ...p];
        });
      }
      if (direction.current === "right") {
        setSnake((p) => {
          if (!newSegments.current) p.pop();
          else newSegments.current -= 1;
          return [{ x: p[0].x + 1, y: p[0].y }, ...p];
        });
      }
    }, 800 / speed);

    const handleKeyPress = (e) => {
      const { key } = e;
      if (key === "ArrowUp" && direction.current !== "down")
        direction.current = "up";
      if (key === "ArrowDown" && direction.current !== "up")
        direction.current = "down";
      if (key === "ArrowLeft" && direction.current !== "right")
        direction.current = "left";
      if (key === "ArrowRight" && direction.current !== "left")
        direction.current = "right";
    };

    document.addEventListener("keydown", handleKeyPress);

    if (boardRef.current) boardRef.current.classList.add("board");

    return () => {
      clearInterval(tick);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (snake.length === width * height) setIsWon(true);
    if (
      snake[0].x < 0 ||
      snake[0].x > width - 1 ||
      snake[0].y < 0 ||
      (snake[0].y > height - 1 && !isWon)
    )
      setIsOver(true);
    if (
      snake.some((seg, i) => {
        if (i === 0) return false;
        else return seg.x === snake[0].x && seg.y === snake[0].y;
      }) &&
      !isWon
    )
      setIsOver(true);
    if (snake[0].x === food?.x && snake[0].y === food?.y) {
      newSegments.current += growth ? 7 : 2;
      setScore((p) => (growth ? p + 7 * speed : p + 2 * speed));
    }
  }, [snake, food, isWon]);

  useEffect(() => {
    if (isOver && !isWon) router.push(`../end/${id + "&=" + score}`);
    if (isWon) router.push(`../win/${id + "&=" + score}`);
  }, [isOver, score, isWon]);

  return (
    <>
      {isMobile && (
        <div>
          <div className="top" onClick={() => handleClick("up")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM320 256c0 6.7-2.8 13-7.7 17.6l-112 104c-7 6.5-17.2 8.2-25.9 4.4s-14.4-12.5-14.4-22l0-208c0-9.5 5.7-18.2 14.4-22s18.9-2.1 25.9 4.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6z" />
            </svg>
          </div>
          <div className="left" onClick={() => handleClick("left")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM320 256c0 6.7-2.8 13-7.7 17.6l-112 104c-7 6.5-17.2 8.2-25.9 4.4s-14.4-12.5-14.4-22l0-208c0-9.5 5.7-18.2 14.4-22s18.9-2.1 25.9 4.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6z" />
            </svg>
          </div>
          <div className="right" onClick={() => handleClick("right")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM320 256c0 6.7-2.8 13-7.7 17.6l-112 104c-7 6.5-17.2 8.2-25.9 4.4s-14.4-12.5-14.4-22l0-208c0-9.5 5.7-18.2 14.4-22s18.9-2.1 25.9 4.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6z" />
            </svg>
          </div>
          <div className="bottom" onClick={() => handleClick("down")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM320 256c0 6.7-2.8 13-7.7 17.6l-112 104c-7 6.5-17.2 8.2-25.9 4.4s-14.4-12.5-14.4-22l0-208c0-9.5 5.7-18.2 14.4-22s18.9-2.1 25.9 4.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6z" />
            </svg>
          </div>
        </div>
      )}
      <div className="scores">
        <h3>Current score: {score}</h3>
        <h3>Highscore: {highscore}</h3>
      </div>
      <code
        ref={boardRef}
        key="board"
        style={{ "--size": width > height ? width / 11 : height / 11 }}
      >
        {initialBoard.map((r, i) => (
          <div className="row" key={i}>
            {r.map((t, j) => (
              <div key={`${i}${j}`} className={assignTile(i, j)} />
            ))}
          </div>
        ))}
      </code>
    </>
  );
};
