"use client";

import store from "@/store";
import React from "react";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: { children: React.ReactElement }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
