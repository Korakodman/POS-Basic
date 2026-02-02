"use client";

import {Button} from "@heroui/react";

export function ButtonUI({text,style}) {
  return <Button className={style} onPress={() => console.log("Button pressed")}>{text}</Button>;
}