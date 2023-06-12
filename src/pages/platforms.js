import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import logo from "../../public/images/logo.svg";
import prime_video from "../../public/images/prime_video.svg";
import hbo from "../../public/images/hbo.svg";
import netflix from "../../public/images/netflix.svg";
import Link from "next/link";

function Platforms() {
  const session = useSession();
  console.log(session);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className=" bg-[#CC3434] p-5 flex flex-col h-screen w-screen overflow-hidden">
      <div className="bg-[#D9D9D9] rounded-md flex flex-col flex-1">
        <nav>
          <Image className="ml-12" src={logo} width={178} height={178}  />
        </nav>
        <div className="flex items-center justify-center teste">
          <Link href="/">
            <Image className="ml-12" src={prime_video} width={264} height={264}  />
          </Link>
          <Link href="/">
            <Image className="ml-12" src={netflix} width={264} height={264}  />
          </Link>
          <Link href="/">
            <Image className="ml-12" src={hbo} width={264} height={264}  />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Platforms;
