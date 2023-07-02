"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./styles.scss";

export const Game = ({
  id,
  title,
  speed,
  growth,
  highscore,
  width,
  height,
}) => {
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
      </code>{" "}
    </>
  );
};
