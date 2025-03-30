import { NextRequest } from "next/server";
import { headers } from "next/headers";
import Link from "next/link";

import getSupabase from "@/app/utils/supabase";

async function Page({ params }) {
  const supabase = getSupabase();
  let request = null;

  const par = await params;
  const url = await supabase.from("shared_cards").select().eq("id", par.id);

  const headersList = await headers();
  const referer = headersList.get("referer");

  if (referer) {
    request = new NextRequest(referer);
  }

  return (
    <div className="bg-blue-50 h-full w-full">
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-gray-700 text-xl mb-4">
          Someone sent you this Eid card.❤️{" "}
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
          <img
            src={url?.data[0]?.preview_url}
            alt="Eid Card"
            className="rounded-lg mb-4"
          />

          <p className="text-sm mt-4"> Shareable Link: </p>
          <div className="bg-blue-200 text-gray-800 p-2 rounded ">
            <p className="text-gray-700">{request.nextUrl.toString()}</p>
          </div>
        </div>
        <Link
          href="/"
          className="bg-fuchsia-200 text-gray-800 p-2 rounded mt-8"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default Page;
