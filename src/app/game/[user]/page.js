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
  const { user } = params;

  const userObject = await getUsers(user);

  return (
    <section>
      <Game
        id={userObject.id}
        title={userObject.title}
        speed={userObject.speed}
        growth={userObject.fastGrower}
        highscore={userObject.highscore}
        width={userObject.width}
        height={userObject.height}
      />
    </section>
  );
}
