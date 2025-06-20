import socket from "./socket";
import store from "../stores/Store";
import apiSlice from "../stores/Slices/ApiSlice";

export const initSocketListeners = () => {
  socket.on("connect", () => {
    console.log("✅ Socket connected (global)");
  });

  socket.on("new_lesson_created", () => {
    store.dispatch(apiSlice.util.invalidateTags(["Prompt", "Lesson"]));
  });

  socket.on("new_category_created", () => {
    store.dispatch(apiSlice.util.invalidateTags(["Category"]));
  });

  socket.on("category_updated", () => {
    store.dispatch(apiSlice.util.invalidateTags(["Category"]));
  });

  socket.on("category_deleted", () => {
    store.dispatch(apiSlice.util.invalidateTags(["Category", "SubCategory"]));
  });

  socket.on("new_SubCategory_created", () => {
    store.dispatch(apiSlice.util.invalidateTags(["SubCategory"]));
  });

  socket.on("subCategory_updated", () => {
    store.dispatch(apiSlice.util.invalidateTags(["SubCategory"]));
  });

  socket.on("subCategory_deleted", () => {
    store.dispatch(apiSlice.util.invalidateTags(["SubCategory"]));
  });

  socket.on("prompt_deleted", () => {
    store.dispatch(apiSlice.util.invalidateTags(["Prompt"]));
  });
};
