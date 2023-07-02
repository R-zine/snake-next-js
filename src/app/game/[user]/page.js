import "./styles.scss";
import { Game } from "./game";

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
    <section className="game">
      <Game
        id={userObject.id}
        speed={userObject.speed}
        growth={userObject.fastGrower}
        highscore={userObject.highscore}
        width={userObject.width}
        height={userObject.height}
      />
    </section>
  );
}
