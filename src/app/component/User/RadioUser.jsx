"use client";

import { Label, Radio, RadioGroup} from "@heroui/react";
import { useState } from "react";
export function RadioUser({handleInput,Edit}) {
  return (
    <RadioGroup  name="role" value={Edit.role}  onChange={(value) => handleInput({target: { name: "role", value }})}> 
      <Label>Role Change</Label>
      <Radio value="cashier">
        <Radio.Control>
          <Radio.Indicator>
            {({isSelected}) =>
              isSelected ? <span className="text-xs leading-none text-background">✓</span> : null
            }
          </Radio.Indicator>
        </Radio.Control>
        <Radio.Content>
          <Label>cashier</Label>
        </Radio.Content>
      </Radio>
      <Radio value="Admin">
        <Radio.Control>
          <Radio.Indicator>
            {({isSelected}) =>
              isSelected ? <span className="text-xs leading-none text-background">✓</span> : null
            }
          </Radio.Indicator>
        </Radio.Control>
        <Radio.Content>
          <Label>Admin</Label>
        </Radio.Content>
      </Radio>
    </RadioGroup>
  );
}