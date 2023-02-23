import React from "react";

export function CurrentUser(props) {
  const { userName } = {
    userName: "",
    ...props,
  };
  return (
    <div>
      {!!userName && (
        <p>
          <b>{userName}</b>
        </p>
      )}
    </div>
  );
}
