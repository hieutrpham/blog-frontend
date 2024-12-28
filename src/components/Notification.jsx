import { useSelector } from "react-redux";

export default function Notification() {
  const noti = useSelector((i) => i.notification);

  return <div>{noti}</div>;
}
