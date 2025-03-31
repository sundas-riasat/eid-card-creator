import { NextRequest } from "next/server";
import { headers } from "next/headers";
import Link from "next/link";

import getSupabase from "@/app/utils/supabase";
import CopyToClipboard from "@/app/components/CopyToClipboard";
import { Download, Home } from "lucide-react";

async function Page({ params }) {
  const supabase = getSupabase();
  let request = null;

  const par = await params;
  const url = await supabase.from("shared_cards").select().eq("id", par.id);

  const headersList = await headers();
  const fullUrl = headersList.get("host") || "";

  if (fullUrl) {
    request = new NextRequest(fullUrl);
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

          <p className="text-sm mt-4"> Shareable Link: {fullUrl}</p>
          <div className="bg-blue-200 text-gray-800 p-2 rounded w-full">
            {/* <p className="text-gray-700">{`https://${request.url.toString()}/view-card/${
              par.id
            }`}</p> */}
          </div>
          <div className="flex items-center justify-start rounded flex-wrap mt-2">
            {/* <CopyToClipboard
              text={`https://${request.referrer.toString()}/view-card/${
                par.id
              }`}
            /> */}

            <Link
              href={url?.data[0]?.preview_url}
              className="bg-yellow-200 p-2 m-1 rounded flex items-center"
            >
              <Download /> Download
            </Link>
            <Link
              href="/"
              className="bg-lime-200 text-gray-800 p-2 rounded m-1 flex items-center"
            >
              <Home /> Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
