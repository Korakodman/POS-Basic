"use client";

import {Button} from "@heroui/react";

export default function ButtonUI({text,style}) {
  return <Button className={style} onPress={() => console.log("Button pressed")}>{text}</Button>;
}