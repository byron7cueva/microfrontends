import Image from "next/image";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { NextMicroFrontend } from "@/components/nextmfe.component";

const inter = Inter({ subsets: ["latin"] });

/*const RemoteComponent = dynamic(() => import('remote2/button'), {
  ssr: false, suspense: true
});

const ExpernalPage = dynamic(() => import('remote2/pages/index'), {
  ssr: false,
  suspense: true
});

export default function Home() {
  return (
      <RemoteComponent />
  )
}*/

export default function Home() {
  return (
    <div>
      <div>
        <NextMicroFrontend
          remote={{
            url: "http://localhost:3001",
            scope: "remote2",
            module: "Button",
          }}
        />
      </div>
      <div>
        <NextMicroFrontend
          remote={{
            url: "http://localhost:3001",
            scope: "remote2",
            module: "Message",
          }}
          name="Byron"
        />
      </div>
    </div>
  );
}
