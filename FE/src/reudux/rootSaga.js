import { all, call } from "redux-saga/effects";
import { watchingBooking } from "./saga/bookingSaga";
import { watchingFeedback } from "./saga/feedbackSaga";


// call saga nào thfi định nghĩa ở đây nhé
export default function* rootSaga() {
  yield all(
   [
    call(watchingBooking),
    call(watchingFeedback)
   ]
  );
}
