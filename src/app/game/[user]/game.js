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

  const food = useMemo(() => {
    const spawnRandom = () => ({
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    });

    const tryFood = () => {
      try {
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
  );
};
