import { createSlice } from "@reduxjs/toolkit";
import { User, UserArticleSegment } from "../../config/types";

export interface initialStateUser {
  // isLoadingUser: boolean;
  // errMessUser: null | string;
  user: User | null;
}

const initialState: initialStateUser = {
  // isLoadingUser: true,
  // errMessUser: null,
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    addArticlesToArticleCategory: (state, action) => {
      if (
        state.user &&
        state.user.articles &&
        state.user.articles[
          `${action.payload.articleCategory as keyof UserArticleSegment}`
        ]
      ) {
        state.user.articles[
          action.payload.articleCategory as keyof UserArticleSegment
        ] = [
          action.payload.articleId,
          ...state.user.articles[
            action.payload.articleCategory as keyof UserArticleSegment
          ],
        ];
      }
    },

    deleteArticlesFromArticleCategory: (state, action) => {
      if (
        state.user &&
        state.user.articles &&
        state.user.articles[
          `${action.payload.articleCategory as keyof UserArticleSegment}`
        ]
      ) {
        state.user.articles[
          action.payload.articleCategory as keyof UserArticleSegment
        ].splice(
          state.user.articles[
            action.payload.articleCategory as keyof UserArticleSegment
          ].indexOf(action.payload.articleId),
          1
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loadUser,
  removeUser,
  addArticlesToArticleCategory,
  deleteArticlesFromArticleCategory,
} = userSlice.actions;
export default userSlice.reducer;
