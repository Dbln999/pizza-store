"use client";
import React, { useState } from "react";
import { Button, Dialog, DialogContent } from "@/components/ui";
import { signIn } from "next-auth/react";
import { LoginForm } from "@/components/shared";
import { RegisterForm } from "@/components/shared/modals/auth-modal/form/register-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={"w-[450px] bg-white p-10"}>
        {type === "login" ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
        <hr />
        <div className="flex gap-2">
          <Button
            variant={"secondary"}
            onClick={() =>
              signIn("github", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type={"button"}
            className={"gap-2 h-12 p-2 flex-1"}
          >
            <img
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="github"
              className={"w-6 h-6"}
            />
            GitHub
          </Button>

          <Button
            variant={"secondary"}
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type={"button"}
            className={"gap-2 h-12 p-2 flex-1"}
          >
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="google"
              className={"w-6 h-6"}
            />
            Google
          </Button>
        </div>
        <Button
          variant={"outline"}
          onClick={onSwitchType}
          type={"button"}
          className={"h-12"}
        >
          {type === "login" ? "Зарегистрироваться" : "Войти"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
