"use client"

import { Button } from "@repo/ui/button";
import { useBalance } from "@manaspaytm/store/useBalance";
import client from "@manaspaytm/db/client";

export default function Page(): JSX.Element {
  const balance = useBalance();

  return (
    <div className="2xl font-bold">
      <div>
        Hi there, Balance is {balance}
      </div>
    </div>
  );
}
