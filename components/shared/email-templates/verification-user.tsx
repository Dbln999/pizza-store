import * as React from "react";

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => {
  return (
    <div>
      <h1>Ваш код подтверждения: {code}</h1>

      <p>
        <a href={`https://pizza-dbln.netlify.app/api/auth/verify?code=${code}`}>
          Подтвердить регистрацию
        </a>
      </p>
    </div>
  );
};
