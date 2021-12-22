import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNews } from "api";
import { INews } from "types";

export const fetchNews = createAsyncThunk<INews[]>("news/get", async () => {
  return await getNews();
});
