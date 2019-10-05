import { store } from "../../index";
//-------------
import { COMMENTS } from "../../reducers/const";
//-------------
import { setTokenToLocalStorage } from "../localStorage";
//-------------

export async function createComment(typeComment, valueId, comment, user) {
  console.log("typeComment", typeComment);
  console.log("valueId", valueId);
  console.log("comment", comment);
  console.log("user", user);

  let storeInfo = JSON.parse(JSON.stringify(store.getState().comments));

  let commentObject = {};
  commentObject.type = typeComment;
  commentObject.id = valueId;
  commentObject.comment = comment;
  commentObject.user = user;

  let massiveComment =
    typeComment === "project"
      ? storeInfo.projects_comments
      : storeInfo.issues_comments;
  massiveComment.push(commentObject);

  typeComment === "project"
    ? await setTokenToLocalStorage(
        "projects_comments",
        JSON.stringify(massiveComment)
      )
    : await setTokenToLocalStorage(
        "issues_comments",
        JSON.stringify(massiveComment)
      );

  store.dispatch({
    type:
      typeComment === "project"
        ? COMMENTS.SET_PROJECTS_COMMENTS
        : COMMENTS.SET_ISSUES_COMMENTS,
    payload: massiveComment
  });
}
