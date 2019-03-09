const quoteReducer = (state = [], action) => {
   let quoteIndex = 0;
   let quote = null;

   switch (action.type) {
      case "ADD_QUOTE":
         return [...state, action.quote];
      case "REMOVE_QUOTE":
         return state.filter(quote => quote.id !== action.quoteId);
      case "UPVOTE_QUOTE":
         quoteIndex = state.findIndex(quote => quote.id === action.quoteId);
         quote = state[quoteIndex];
         return [
            ...state.slice(0, quoteIndex),
            Object.assign({}, quote, { votes: (quote.votes += 1) }),
            ...state.slice(quoteIndex + 1),
         ];
      case "DOWNVOTE_QUOTE":
         quoteIndex = state.findIndex(quote => quote.id === action.quoteId);
         quote = state[quoteIndex];
         if (quote.votes > 0) {
            return [
               ...state.slice(0, quoteIndex),
               { ...quote, votes: (quote.votes -= 1) },
               ...state.slice(quoteIndex + 1),
            ];
         }
      default:
         return state;
   }
};

export default quoteReducer;
