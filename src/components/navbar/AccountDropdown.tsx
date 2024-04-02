"use client";

import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AccountDropdown() {
  const { data: sessionData } = useSession();

  return (
    <Dropdown>
      <DropdownTrigger>
        {sessionData !== null ? (
          <Avatar name={sessionData.user.username} />
        ) : (
          <Avatar />
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label="User Event">
        {sessionData !== null ? (
          <DropdownItem
            key="sign-out"
            className="text-danger"
            color="danger"
            onPress={() => void signOut()}
          >
            Sign Out
          </DropdownItem>
        ) : (
          <DropdownItem key="sign-in" onPress={() => void signIn()}>
            Sign In
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
