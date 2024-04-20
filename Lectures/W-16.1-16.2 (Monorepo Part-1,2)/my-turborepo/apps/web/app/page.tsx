import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";     // Import from package module



export default function Page(): JSX.Element {
  return (
    <div>
      Hi there
      <Button appName="Manas App">Click me</Button>
    </div>
  );
}
