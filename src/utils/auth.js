import { getUid, PUBLIC_USER } from '../firebase.config';

export function hasWriteAccess(expenseForm) {
  const formOwner = expenseForm.creator || PUBLIC_USER;
  return formOwner === PUBLIC_USER || formOwner === getUid();
}