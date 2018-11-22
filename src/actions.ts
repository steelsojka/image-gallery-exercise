import { State } from './state';

export const actions = {
  updateActiveImage: (index: number | null) => ({ activeImage: index }),
  commentSaved: ({ index, comment }: { index: number, comment: string }) => (state: State) => ({
    isSaving: false,
    pendingComment: '',
    images: [
      ...state.images.slice(0, index),
      {
        ...state.images[index],
        comments: [
          ...state.images[index].comments,
          comment
        ]
      },
      ...state.images.slice(index + 1),
    ]
  }),
  saveComment: () => (state: State, actions: Actions) => {
    setTimeout(() => actions.commentSaved({ index: state.activeImage!, comment: state.pendingComment }), 2000);

    return {
      isSaving: true
    };
  },
  pendingCommentChanged: (comment: string) => ({ pendingComment: comment })
};

type Actions = typeof actions;