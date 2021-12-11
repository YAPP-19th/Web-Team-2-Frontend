import { LOCAL_STORAGE_KEY } from 'utils/const';

export function changeRemindToggleLocalInfo(isRemind: boolean): void {
  const localStorageItem = localStorage.getItem(
    LOCAL_STORAGE_KEY.USER_REMIND_INFO,
  );
  if (localStorageItem) {
    const origin = JSON.parse(localStorageItem);
    localStorage.setItem(
      LOCAL_STORAGE_KEY.USER_REMIND_INFO,
      JSON.stringify({ ...origin, remindToggle: isRemind }),
    );
  }
}

export function changeRemindCycleLocalInfo(cycle: string): void {
  const localStorageItem = localStorage.getItem(
    LOCAL_STORAGE_KEY.USER_REMIND_INFO,
  );
  if (localStorageItem) {
    const origin = JSON.parse(localStorageItem);
    localStorage.setItem(
      LOCAL_STORAGE_KEY.USER_REMIND_INFO,
      JSON.stringify({ ...origin, remindCycle: cycle }),
    );
  }
}
