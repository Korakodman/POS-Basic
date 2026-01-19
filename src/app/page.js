import Image from "next/image";
import { Button } from '@heroui/react';
import { Checkbox, Label } from '@heroui/react';
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="">
        <div className="flex items-center gap-3">
      <Checkbox id="basic-terms">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox>
      <Label htmlFor="basic-terms">Accept terms and conditions</Label>
    </div>
      </main>
    </div>
  );
}
