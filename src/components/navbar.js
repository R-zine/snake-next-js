import Image from "next/image";
import "./navbar.scss";

export default function Navbar() {
  return (
    <nav>
      <div>
        <Image src="/icon.png" width={20} height={20} alt="logo" />
        <h1>The snake game</h1>
      </div>
    </nav>
  );
}
