import { io } from "socket.io-client";
const socket = io("http://localhost:7002");
export default socket;
