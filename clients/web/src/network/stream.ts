import { host } from './host';

type StreamMessage = { name: string; data?: unknown };
type Listener = (message: StreamMessage) => void;

const streamUrl = host.replace(/^http/, 'ws') + '/connect';
let socket: WebSocket | null = null;
let reconnectTimer: number | undefined;
const listeners = new Set<Listener>();

const connect = () => {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) return;
  socket = new WebSocket(streamUrl);
  socket.onmessage = (event) => {
    try { listeners.forEach((listener) => listener(JSON.parse(event.data))); } catch (_) { /* ignore malformed events */ }
  };
  socket.onclose = () => {
    socket = null;
    window.clearTimeout(reconnectTimer);
    reconnectTimer = window.setTimeout(connect, 1000);
  };
  socket.onerror = () => socket?.close();
};

export const subscribe = (listener: Listener) => {
  listeners.add(listener);
  connect();
  return () => listeners.delete(listener);
};

export const send = (name: string, body?: unknown) => {
  if (socket?.readyState !== WebSocket.OPEN) return false;
  socket.send(JSON.stringify({ name, body: body == null ? null : JSON.stringify(body) }));
  return true;
};
