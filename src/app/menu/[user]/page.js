import { prisma } from "@/db";
import { redirect } from "next/navigation";
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

async function updateUser(data) {
  "use server";

  const userName = data.get("user")?.valueOf();

  const speed = Number(data.get("speed")?.valueOf());
  const fastGrower = Boolean(data.get("fastGrower")?.valueOf());
  const width = Number(data.get("width")?.valueOf());
  const height = Number(data.get("height")?.valueOf());
  const mode = Boolean(data.get("mode")?.valueOf());

  const isAlreadyCreated = await prisma.user.findFirst({
    where: {
      id: userName,
    },
  });

  if (!isAlreadyCreated) {
    throw new Error(
      "User doesn't exist in the database. Try relogging in case your session has expired."
    );
  } else {
    await prisma.user.update({
      where: {
        id: userName,
      },
      data: {
        speed: speed,
        fastGrower: fastGrower,
        dark: mode,
        height: height,
        width: width,
      },
    });
    redirect(`/start/${isAlreadyCreated.id}`);
  }
}

export default async function Page({ params }) {
  const { user } = params;

  const userObject = await getUsers(user);

  return (
    <section className="menu">
      <h2>Menu</h2>
      <form name={user} action={updateUser} method="POST">
        <div>
          <p>Speed:</p>
          <input
            style={{ display: "none" }}
            type="text"
            name="user"
            value={user}
          />
          <div>
            <div>
              <input
                type="radio"
                id="speed1"
                name="speed"
                value="1"
                defaultChecked={userObject.speed === 1}
              />
              <label for="speed1">Slow</label>
            </div>
            <div>
              <input
                type="radio"
                id="speed2"
                name="speed"
                value="4"
                defaultChecked={userObject.speed === 4}
              />
              <label for="speed2">Normal</label>
            </div>
            <div>
              <input
                type="radio"
                id="speed3"
                name="speed"
                value="7"
                defaultChecked={userObject.speed === 7}
              />
              <label for="speed3">Fast</label>
            </div>
            <div>
              <input
                type="radio"
                id="speed4"
                name="speed"
                value="9"
                defaultChecked={userObject.speed === 9}
              />
              <label for="speed3">Faster</label>
            </div>
            <div>
              <input
                type="radio"
                id="speed3"
                name="speed"
                value="12"
                defaultChecked={userObject.speed === 12}
              />
              <label for="speed3">Insane</label>
            </div>
          </div>
        </div>

        <div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="growthRate"
              name="fastGrower"
              defaultChecked={userObject.fastGrower}
            />
            <label for="growthRate">Fast grower?</label>
          </div>
        </div>

        <div>
          <p>Size:</p>
          <div>
            <div>
              <label for="width">Width</label>
              <input
                type="number"
                id="width"
                name="width"
                defaultValue={userObject.width}
                min={10}
                max={50}
                style={{ textAlign: "center" }}
              />
            </div>
            <div>
              <label for="height">Height</label>
              <input
                type="number"
                id="height"
                name="height"
                defaultValue={userObject.height}
                min={10}
                max={50}
                style={{ textAlign: "center" }}
              />
            </div>
          </div>
        </div>

        <div>
          <p>Mode:</p>
          <div>
            <div>
              <input
                type="radio"
                id="light"
                name="mode"
                value="false"
                defaultChecked={!userObject.dark}
              />
              <label for="light">Light</label>
            </div>
            <div>
              <input
                type="radio"
                id="dark"
                name="mode"
                value="true"
                defaultChecked={userObject.dark}
              />
              <label for="dark">Dark</label>
            </div>
          </div>
        </div>

        <button type="submit">
          <div>Save</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
          </svg>
        </button>
      </form>
    </section>
  );
}
