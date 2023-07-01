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

export default async function Page({ params }) {
  const { user: userAndToken } = params;

  const [user, _token] = userAndToken.split("%26%3D");

  const userObject = await getUsers(user);

  return (
    <section className="start">
      <h2>Hello {userObject.title}!</h2>
      <div>
        <Link className="link" href={`/game/${user}&=${Math.random() * 10}`}>
          <div>
            <h3>Press the Space key or click here to start a new game.</h3>
          </div>
        </Link>

        <Link className="link" href={`/menu/${user}&=${Math.random() * 10}`}>
          <div>
            <h3>Press M or click here to enter the Menu.</h3>
          </div>
        </Link>
      </div>
      <h3>Your current highscore: {userObject.highscore}</h3>
    </section>
  );
}
