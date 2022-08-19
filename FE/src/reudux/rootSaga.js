import { all, call } from "redux-saga/effects";
import { watchingBooking } from "./saga/bookingSaga";
import { watchingChickens } from "./saga/chickensSaga";
import { watchingFeedback } from "./saga/feedbackSaga";
import { watchingSpendings } from "./saga/spendingsSaga";
import { watchingStaffs } from "./saga/staffSaga";


// call saga nào thfi định nghĩa ở đây nhé
export default function* rootSaga() {
  yield all(
   [
    call(watchingBooking),
    call(watchingFeedback),
    call(watchingSpendings),
    call(watchingStaffs),
    call(watchingChickens)
   ]
  );
}
