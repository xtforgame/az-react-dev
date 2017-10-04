import 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
// import { LOCATION_CHANGE } from 'react-router-redux';

export default function makeEpicInjectable(_originalEpic) {
  let originalEpic = (action$, store) =>
    _originalEpic(action$, store)
    // .takeUntil(action$.ofType(LOCATION_CHANGE));

  let emptyEpic = () => Observable.empty();

  const subject = new Subject();
  const injectableEpic = (action$, store) =>
    subject.switchMap(epic => {
      // console.log('epic :', epic);
      return epic(action$, store);
    });

  let injected = false;

  return {
    injectableEpic,
    epic: originalEpic,
    subject,
    inject: function(newEpic) {
      this.epic = newEpic || this.epic;
      subject.next(this.epic);
      injected = true;
      return injectableEpic;
    },
    remove: () => {
      subject.next(emptyEpic);
      injected = false;
      return injectableEpic;
    },
  }
}
