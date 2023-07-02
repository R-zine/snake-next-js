import { prisma } from "@/db";
import { redirect } from "next/navigation";
import "./styles.scss";

async function createUser(data) {
  "use server";

  const userName = data.get("userName")?.valueOf();

  const isAlreadyCreated = !!(await prisma.user.findFirst({
    where: {
      title: userName,
    },
  }));

  if (isAlreadyCreated) {
    redirect(`/userExists/${userName}`);
  }

  await prisma.user.create({
    data: {
      title: userName,
      highscore: 0,
      speed: 1,
      fastGrower: false,
      width: 30,
      height: 30,
    },
  });
}

async function chooseUser(data) {
  "use server";

  const userName = data.get("userName")?.valueOf();

  const isAlreadyCreated = await prisma.user.findFirst({
    where: {
      title: userName,
    },
  });

  if (isAlreadyCreated) {
    redirect(`/start/${isAlreadyCreated.id}`);
  } else {
    redirect(`/userNotFound/${userName}`);
  }
}

export default function Page({ params }) {
  const { user } = params;

  return (
    <section>
      <h2>User {user} already exists!</h2>
      <div>
        <h3>Create a new account:</h3>
        <form action={createUser} className="input">
          <input required type="text" name="userName" />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
            </svg>
          </button>
        </form>
      </div>
      <div>
        <h3>Use an existing account:</h3>
        <form action={chooseUser} className="input">
          <input required type="text" name="userName" />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM320 256c0 6.7-2.8 13-7.7 17.6l-112 104c-7 6.5-17.2 8.2-25.9 4.4s-14.4-12.5-14.4-22l0-208c0-9.5 5.7-18.2 14.4-22s18.9-2.1 25.9 4.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6z" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
