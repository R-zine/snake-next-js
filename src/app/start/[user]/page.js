import { prisma } from "@/db";
import Link from "next/link";
import "./styles.scss";

export async function getUsers(id) {
  "use server";

  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  return user;
}

export default function Page({ params }) {
  const { user } = params;

  const userPromise = getUsers(user);

  const userName = userPromise.then((res) => res.title);
  const highscore = userPromise.then((res) => res.highscore);

  return (
    <section>
      <h2>Hello {userName}!</h2>
      <div>
        <Link className="link" href={`/game/${user}`}>
          <div>
            <h3>Press the Space key or click here to start a new game.</h3>
          </div>
        </Link>

        <Link className="link" href={`/menu/${user}`}>
          <div>
            <h3>Press M or click here to enter the Menu.</h3>
          </div>
        </Link>
      </div>
      <h3>Your current highscore: {highscore}</h3>
    </section>
  );
}
