"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  AuthModal,
  CartButton,
  Container,
  ProfileButton,
  SearchInput,
} from "@/components/shared";
import Image from "next/image";
import Link from "next/link";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* left side */}
        <Link href={"/"}>
          <div className={"flex items-center gap-4"}>
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className={"text-2xl uppercase font-black"}>Next Pizza</h1>
              <p className={"text-sm text-gray-400 leading-3"}>
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className={"mx-10 flex-1"}>
            <SearchInput />
          </div>
        )}

        {/*{ Right side}*/}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
