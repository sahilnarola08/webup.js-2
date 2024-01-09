import { KupListNode } from "@sme.up/ketchup/dist/types/components/kup-list/kup-list-declarations";

export default function useDrawerListItems() {
  const listData: KupListNode[] = [
    {
      value: "Home",
      id: "1",
      icon: "home",
    },
    {
      value: "Logout",
      id: "2",
      icon: "login",
    },
  ];
  return listData;
}
